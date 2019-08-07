import {
    put, call, all, takeLatest, debounce
} from 'redux-saga/effects';

import { GET_ORDERS, GET_ORDER_ITEMS } from './constants';

import {
    getOrders as apiGetOrders,
    getOrderItems as apiGetOrderItems
} from './api';

import { getOrders, getOrderItems } from './actions';


function* getOrdersSaga({ payload }) {
    try {
        const result = yield call(apiGetOrders, payload.filter);
        yield put(getOrders.success(result));
    } catch (error) {
        yield put(getOrders.failure(error));
    }
}

function* getOrderItemsSaga({ payload }) {
    try {
        const orderId = payload;
        const result = yield call(apiGetOrderItems, orderId);
        yield put(getOrderItems.success({
            orderId,
            items: result
        }));
    } catch (error) {
        yield put(getOrderItems.failure(error));
    }
}


export default function* rootSaga() {
    yield all([
        yield debounce(300, GET_ORDERS, getOrdersSaga),
        yield takeLatest(GET_ORDER_ITEMS, getOrderItemsSaga)
    ]);
}
