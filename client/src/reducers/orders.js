import { GET_ORDERS_SUCCESS } from '../constants';

const initialState = null;

/*  Описание заказов:
    [
        { id, docNum, docDate, description },
        ...
    ]
*/

export default function orders(state = initialState, action) {
    switch (action.type) {
        case GET_ORDERS_SUCCESS: {
            return action.payload;
        }
        
        default: {
            return state;
        }
    }
}
