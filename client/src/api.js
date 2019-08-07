/**
 * GET-запрос для JSON-данных
 * @param {string} url
 * @returns Promise -> any
 */
const get = url => fetch(url)
    .then((result) => {
        if (!result.ok) {
            return Promise.reject(result);
        }
        return result.json();
    })
    .catch(error => Promise.reject(error));


/**
 * Получить список заказов
 * @param {string} filter - необязательно
 * @returns Promise -> array
 */
export const getOrders = (filter) => {
    let url = '/api/order';
    if (filter) {
        url += '?filter=' + encodeURIComponent(filter);
    }
    return get(url);
};

/**
 * Получить позиции заказа
 * @param {int} orderId
 * @returns Promise -> array
 */
export const getOrderItems = orderId => get(`/api/order/${orderId}`);
