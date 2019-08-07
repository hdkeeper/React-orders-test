import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';

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

    onFilterChange = (event) => {
        const { getOrders } = this.props;
        getOrders(event.target.value);
    }

    render() {
        const { orders } = this.props;

        return (
            <div className="application">
                <div className="header">
                    <h1>Заказы</h1>
                    <TextField label="Фильтр" onChange={this.onFilterChange} />
                </div>

                {orders !== null &&
                    orders.map(order => <OrderCard key={order.id} {...order} />)
                }
            </div>
        );
    }
}
