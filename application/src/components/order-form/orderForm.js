import React, { Component } from 'react';
import { Template } from '../../components';
import { connect } from 'react-redux';
import { FOOD_ITEMS, SERVER_IP } from '../../private';
import ItemSelector from '../common/itemSelector';
import './orderForm.css';

const ADD_ORDER_URL = `${SERVER_IP}/api/add-order`

const mapStateToProps = (state) => ({
    auth: state.auth,
})

class OrderForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            order_item: "",
            quantity: "1"
        }
    }

    menuItemChosen(item)
    {
        this.setState({ order_item: item });
    }

    menuQuantityChosen(event) {
        this.setState({ quantity: event.target.value });
    }

    submitOrder(event) {
        event.preventDefault();

        if (this.state.order_item === "")
        {
            console.warn("No food item selected!");
            return;
        }

        fetch(ADD_ORDER_URL, {
            method: 'POST',
            body: JSON.stringify({
                order_item: this.state.order_item,
                quantity: this.state.quantity,
                ordered_by: this.props.auth.email || 'Unknown!',
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(response => console.log("Success", JSON.stringify(response)))
        .catch(error => console.error(error));
    }

    render() {
        return (
            <Template>
                <div className="form-wrapper">
                    <form>
                        <label className="form-label">I'd like to order...</label><br />
                        <ItemSelector
                            hintItem="Lunch menu:" items={FOOD_ITEMS}
                            selectedItem={this.state.order_item}
                            onItemSelected={(item) => this.menuItemChosen(item)}
                            className="menu-select" />
                        <br />
                        <label className="qty-label">Qty:</label>
                        <select value={this.state.quantity} onChange={(event) => this.menuQuantityChosen(event)}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                        </select>
                        <button type="button" className="order-btn" onClick={(event) => this.submitOrder(event)}>Order It!</button>
                    </form>
                </div>
            </Template>
        );
    }
}

export default connect(mapStateToProps, null)(OrderForm);