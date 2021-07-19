import React, { Component } from 'react';
import { FOOD_ITEMS, SERVER_IP } from '../../private';
import ItemSelector from '../common/itemSelector';

class EditableOrder extends Component
{
    state = {
        order: this.props.order,
        editAction: "Edit",
        isEditing: false,
        selectedItem: ""
    }

    toggleEdit(order, event)
    {
        event.preventDefault();

        if (!this.state.isEditing)
        {
            // Enter editing mode.
            this.setState(sta =>
            {
                return { ...sta, editAction: "Save", isEditing: true };
            });
        }
        else if (this.state.selectedItem === "" ||
                 this.state.selectedItem === order.order_item)
        {
            // Nothing changed, exit editing mode.
            this.setState(sta =>
            {
                return {
                    ...sta, editAction: "Edit", isEditing: false, selectedItem: ""
                };
            });
        }
        else
        {
            // Changes made, prepare the object to send back.
            var changedOrder = { ...order, order_item: this.state.selectedItem };

            // Save...
            this.save(changedOrder)
                .then(saved =>
                {
                    // ...and stop editing if successful.
                    if (saved)
                    {
                        this.setState(
                            {
                                order: changedOrder,
                                editAction: "Edit",
                                isEditing: false,
                                selectedItem: ""
                            });
                    }
                });
        }
    }

    handleItemChanged(item)
    {
        this.setState(sta => { return { ...sta, selectedItem: item } });
    }

    save(order)
    {
        return fetch(
            `${SERVER_IP}/api/edit-order`,
            {
                method: 'POST',
                body: JSON.stringify(
                    {
                        id: order._id,
                        ordered_by: order.ordered_by,
                        quantity: order.quantity,
                        order_item: order.order_item
                    }),
                headers:
                {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(response =>
            {
                console.log("Success?", JSON.stringify(response));
                return response.success;
            })
            .catch(error => { console.error(error); return false;});
    }

    render()
    {
        const order = this.state.order;
        const createdDate = new Date(order.createdAt);

        return (
            <div className="row view-order-container" key={order._id}>
                <div className="col-md-4 view-order-left-col p-3">
                    <h2>{order.order_item}</h2>
                    <ItemSelector
                        hintItem="Change to:"
                        items={FOOD_ITEMS}
                        selectedItem={this.state.selectedItem}
                        onItemSelected={item => this.handleItemChanged(item)}
                        hidden={!this.state.isEditing} />
                    <p>Ordered by: {order.ordered_by || ''}</p>
                </div>
                <div className="col-md-4 d-flex view-order-middle-col">
                    <p>Order placed at {`${createdDate.getHours()}:${createdDate.getMinutes()}:${createdDate.getSeconds()}`}</p>
                    <p>Quantity: {order.quantity}</p>
                </div>
                <div className="col-md-4 view-order-right-col">
                    <button className="btn btn-success"
                        onClick={event => this.toggleEdit(order, event)}>
                        {this.state.editAction}
                    </button>
                    <button className="btn btn-danger">Delete</button>
                </div>
            </div>
        );
    }
}

export default EditableOrder;