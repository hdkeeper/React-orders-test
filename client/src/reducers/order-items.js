import { GET_ORDER_ITEMS_SUCCESS } from '../constants';

const initialState = {};

/*  Элементы заказов:
    {
        orderId: [
            { id, name, price, qty, sum },
            ...
        ],
        ...
    }
*/

export default function orderItems(state = initialState, action) {
    switch (action.type) {
        case GET_ORDER_ITEMS_SUCCESS: {
            const { orderId, items } = action.payload;
            return { ...state, [orderId]: items };
        }

        default: {
            return state;
        }
    }
}
