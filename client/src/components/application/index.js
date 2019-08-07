import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getOrders } from 'actions';
import { OrderCard } from 'components';

import './style.less';


const mstp = state => ({
    orders: state.orders
});

const mdtp = { getOrders };

@connect(mstp, mdtp)
export default class Application extends Component {
    componentDidMount() {
        const { orders, getOrders } = this.props;
        if (orders === null) {
            getOrders();
        }
    }

    render() {
        const { orders } = this.props;

        return (
            <div className="application">
                <h1>Заказы</h1>
                

                {orders !== null &&
                    orders.map(order => <OrderCard key={order.id} {...order} />)
                }
            </div>
        );
    }
}
