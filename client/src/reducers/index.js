import { combineReducers } from 'redux';

import orders from './orders';
import orderItems from './order-items';

export default combineReducers({ orders, orderItems });
