import {
    put, call, all, takeLatest
} from 'redux-saga/effects';

import { GET_ORDERS, GET_ORDER_ITEMS } from '../constants';

import {
    getOrders as apiGetOrders,
    getOrderItems as apiGetOrderItems
} from '../api';

import { getOrders, getOrderItems } from '../actions';


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
        const result = yield call(apiGetOrderItems, payload);
        yield put(getOrderItems.success({
            orderId: payload,
            items: result
        }));
    } catch (error) {
        yield put(getOrderItems.failure(error));
    }
}


export default function* rootSaga() {
    yield all([
        yield takeLatest(GET_ORDERS, getOrdersSaga),
        yield takeLatest(GET_ORDER_ITEMS, getOrderItemsSaga)
    ]);
}
