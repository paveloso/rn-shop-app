import Order from "../../models/order";

import ApiConfig from '../../config/ApiConfig';

export const ADD_ORDER = 'ADD_ORDER';
export const SET_ORDERS = 'SET_ORDERS';

export const fetchOrders = () => {
    return async dispatch => {

        try {
            const response = await fetch(ApiConfig.apiUrl + 'orders/u1.json'
            // , {
                // method: 'GET', //this is default method, not need to specify
                // headers: {
                //     'Content-Type': 'application/json'
                // }, // -> no headers needed for GET request
                // and no BODY needed for GET request
            // }
            );

            if (!response.ok) {
                throw new Error('Something went wrong!')
            }

            const resData = await response.json();
            const loadedOrders = [];
            for (const key in resData) {
                loadedOrders.push(new Order(key, resData[key].cartItems, resData[key].totalAmount, new Date(resData[key].date)));
            }

            console.log(resData);

            dispatch({ type: SET_ORDERS, orders: loadedOrders });
        } catch (err) {
            // send to custom analytics server
            throw err;
        }
    };
};

export const addOrder = (cartItems, totalAmount) => {
    return async dispatch => {

        const date = new Date();

        const response = await fetch(ApiConfig.apiUrl + 'orders/u1.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cartItems,
                totalAmount,
                date: date.toISOString()
            })
        });

        if (!response.ok) {
            throw new Error('Something went wrong!');
        }

        const resData = await response.json();

        dispatch({
            type: ADD_ORDER, 
            orderData: { id: resData.name, items: cartItems, amount: totalAmount, date: date } 
        })
    };
};