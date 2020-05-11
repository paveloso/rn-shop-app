import Product from "../../models/product";

import ApiConfig from '../../config/ApiConfig';

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const fetchProducts = () => {

    return async dispatch => {
        try {
            const response = await fetch(ApiConfig.apiUrl + 'products.json'
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

            console.log(resData);

            const loadedProducts = [];
            for (const key in resData) {
                loadedProducts.push(new Product(key, 'u1', resData[key].title, resData[key].imageUrl, resData[key].description, resData[key].price));
            }

            dispatch({ type: SET_PRODUCTS, products: loadedProducts });
        } catch (err) {
            // send to custom analytics server
            console.error('Ошибка:', error);
            throw err;
        }
        
    };
};

export const deleteProduct = productId => {
    return async dispatch => {

        const response = await fetch(ApiConfig.apiUrl + `products/${productId}.json`, 
        {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Something went wrong!');
        }

        dispatch({ type: DELETE_PRODUCT, pid: productId });

    };
};

export const createProduct = (title, description, imageUrl, price) => {
    return async dispatch => {
        // any async code goes here
        const response = await fetch(ApiConfig.apiUrl + 'products.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                description,
                imageUrl,
                price
            })
        });

        const resData = await response.json();

        console.log(resData);

        dispatch({
            type: CREATE_PRODUCT,
            productData: {
                id: resData.name,
                title,
                description,
                imageUrl,
                price
            }
        })
    };
};

export const updateProduct = (id, title, description, imageUrl) => {
    return async dispatch => {

        const response = await fetch(ApiConfig.apiUrl + `products/${id}.json`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                description,
                imageUrl
            })
        });

        if (!response.ok) {
            throw new Error('Something went wrong!');
        }

        dispatch({
            type: UPDATE_PRODUCT,
            pid: id,
            productData: {
                title,
                description,
                imageUrl
            }
        });
    };
};