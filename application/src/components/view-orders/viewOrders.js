import React, { Component } from 'react';
import { Template } from '../../components';
import { SERVER_IP } from '../../private';
import EditableOrder from './editableOrder';
import './viewOrders.css';

class ViewOrders extends Component {
    state = {
        orders: []
    }

    componentDidMount() {
        fetch(`${SERVER_IP}/api/current-orders`)
            .then(response => response.json())
            .then(response => {
                if(response.success) {
                    this.setState({ orders: response.orders });
                } else {
                    console.log('Error getting orders');
                }
            });
    }

    render() {
        return (
            <Template>
                <div className="container-fluid">
                    {this.state.orders.map(order =>
                    {
                        return <EditableOrder order={order} />;
                    })}
                </div>
            </Template>
        );
    }
}

export default ViewOrders;
