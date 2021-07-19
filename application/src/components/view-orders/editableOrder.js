import React, { Component } from 'react';
import { FOOD_ITEMS, QTTY_ITEMS, SERVER_IP } from '../../private';
import ItemSelector from '../common/itemSelector';

class EditableOrder extends Component
{
    state = {
        order: this.props.order,
        editAction: "Edit",
        isEditing: false,
        selectedItem: "",
        selectedQuantity: ""
    }

    toggleEdit(order, event)
    {
        event.preventDefault();

        // To be assigned below, if we're currently editing.
        var changedOrder;

        if (!this.state.isEditing)
        {
            // Enter editing mode.
            this.setState(sta =>
            {
                return { ...sta, editAction: "Save", isEditing: true };
            });
        }
        else if ((changedOrder = this.getChanges(this.state)) == null)
        {
            // Nothing changed, exit editing mode.
            this.setState(sta =>
            {
                return {
                    ...sta,
                    editAction: "Edit",
                    isEditing: false,
                    selectedItem: "",
                    selectedQuantity: ""
                };
            });
        }
        else
        {
            // Changes made, try to save...
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
                                selectedItem: "",
                                selectedQuantity: ""
                            });
                    }
                });
        }
    }

    handleDelete(order, event)
    {
        event.preventDefault();

        this.delete(order)
            .then(deleted =>
            {
                if (deleted)
                {
                    this.props.onDelete(order._id);
                }
            });
    }

    handleItemChanged(item)
    {
        this.setState(sta => { return { ...sta, selectedItem: item } });
    }

    handleQttyChanged(qtty)
    {
        this.setState(sta => { return { ...sta, selectedQuantity: qtty } });
    }

    getChange(selectedVal, originalVal)
    {
        const changed =
            selectedVal !== "" && selectedVal !== originalVal;

        return { changed, value: changed ? selectedVal : originalVal };
    }

    getChanges(state)
    {
        const order = state.order;
        const item = this.getChange(state.selectedItem, order.order_item);
        const qtty = this.getChange(state.selectedQuantity, order.quantity);

        return item.changed || qtty.changed
            ? { ...order, order_item: item.value, quantity: qtty.value }
            : null;
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

    delete(order)
    {
        return fetch(
            `${SERVER_IP}/api/delete-order`,
            {
                method: 'POST',
                body: JSON.stringify(
                    {
                        id: order._id
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
            .catch(error => { console.error(error); return false; });
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
                    <ItemSelector
                        hintItem="Change to:"
                        items={QTTY_ITEMS}
                        selectedItem={this.state.selectedQuantity}
                        onItemSelected={item => this.handleQttyChanged(item)}
                        hidden={!this.state.isEditing} />
                </div>
                <div className="col-md-4 view-order-right-col">
                    <button className="btn btn-success"
                        onClick={event => this.toggleEdit(order, event)}>
                        {this.state.editAction}
                    </button>
                    <button className="btn btn-danger"
                        onClick={event => this.handleDelete(order, event)}>
                        Delete
                    </button>
                </div>
            </div>
        );
    }
}

export default EditableOrder;