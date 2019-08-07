import {
    GET_ORDERS, GET_ORDERS_SUCCESS, GET_ORDERS_FAILURE,
    GET_ORDER_ITEMS, GET_ORDER_ITEMS_SUCCESS, GET_ORDER_ITEMS_FAILURE
} from '../constants';

/**
 * Получить список заказов
 * @param {string} filter - необязательно
 */
export const getOrders = filter => ({
    type: GET_ORDERS,
    payload: { filter }
});

/**
 * Получить позиции заказа
 * @param {int} orderId 
 */
export const getOrderItems = orderId => ({
    type: GET_ORDER_ITEMS,
    payload: orderId
});

/**
 * Добавить дополнительные действия
 * @param {function} action 
 * @param {object} what - { action: 'ACTION_CONST' }
 */
const addActions = (action, what) => {
    Object.keys(what).forEach((name) => {
        action[name] = payload => ({ type: what[name], payload });
    });
};

addActions(getOrders, {
    success: GET_ORDERS_SUCCESS,
    failure: GET_ORDERS_FAILURE
});

addActions(getOrderItems, {
    success: GET_ORDER_ITEMS_SUCCESS,
    failure: GET_ORDER_ITEMS_FAILURE
});
