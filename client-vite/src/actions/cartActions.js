import axios from 'axios'

import {
    CART_ADD_ITEM_SUCCESS,
    CART_ADD_ITEM_REQUEST,
    CART_ADD_ITEM_FAIL,

    CART_CLEAR_REQUEST,
    CART_CLEAR_SUCCESS,
    CART_CLEAR_FAIL,

    CART_REMOVE_ITEM_REQUEST,
    CART_REMOVE_ITEM_SUCCESS,
    CART_REMOVE_ITEM_FAIL,

    CART_FETCH_REQUEST,
    CART_FETCH_SUCCESS,
    CART_FETCH_FAIL,
} from "../constants/index"

//const API_URL = import.meta.env.VITE_BACKEND_API;
const API_URL = import.meta.env.VITE_APP_API_URL || 'http://localhost:8000/api';

// cartActions.js
export const addToCart = (productId, quantity = 1, updateQuantity = false) => async (dispatch) => {
    try {
        dispatch({
            type: CART_ADD_ITEM_REQUEST,
            payload: { productId, quantity, updateQuantity }
        });
  
        // Sending request to the backend
        const response = await axios.post(`${API_URL}/api/cart/`, {
            product_id: productId,
            quantity,
            update_quantity: updateQuantity
        });
  
        console.log("Response data addtoCart: ", response.data);  // Check the structure of the response
        console.log("Response data addtoCart response: ", response);  // Check the structure of the response
  
        if (response.data.cart) {
            dispatch({
                type: CART_ADD_ITEM_SUCCESS,
                payload: response.data.cart, // Dispatch the updated cart data
            });
        } else {
            throw new Error('Unexpected response format');
        }
    } catch (error) {
        console.error("Error adding to cart: ", error.response ? error.response.data : error.message);
        dispatch({
            type: CART_ADD_ITEM_FAIL,
            payload: error.response ? error.response.data : error.message,
        });
    }
  };

  
  export const removeFromCart = (productId) => (dispatch, getState) => {
    dispatch({ type: CART_REMOVE_ITEM_REQUEST });
    const { cartItems } = getState().cartReducer;

    // Filter out the item to be removed
    const updatedCartItems = cartItems.filter(item => item.id !== productId);

    // Dispatch the success action with the updated cart
    dispatch({
        type: CART_REMOVE_ITEM_SUCCESS,
        payload: updatedCartItems,
    });
};



export const clearCart = () => async(dispatch) => {
    try {
        dispatch({ type: CART_CLEAR_REQUEST })
        const { data } = await axios.put(`${API_URL}/api/cart/`
        )
        dispatch({
            type: CART_CLEAR_SUCCESS,
            payload: data,
            })
    } catch (error) {
        dispatch({
            type: CART_CLEAR_FAIL,
            payload: error.response.data,
            })
        }

}

export const fetchCart = () => async (dispatch) => {
    try {
      dispatch({ type: CART_FETCH_REQUEST });
      const response = await axios.get(`${API_URL}/api/cart/`);
      console.log("Response data: ", response.data);
      dispatch({
        type: CART_FETCH_SUCCESS,
        payload: response.data.cart, // Ensure payload is the cart array
      });
    } catch (error) {
      dispatch({
        type: CART_FETCH_FAIL,
        payload: error.response ? error.response.data : error.message,
      });
    }
  };

// //import axios from 'axios';

// import {
//     CART_ADD_ITEM_SUCCESS,
//     CART_ADD_ITEM_REQUEST,
//     CART_ADD_ITEM_FAIL,

//     CART_CLEAR_REQUEST,
//     CART_CLEAR_SUCCESS,
//     CART_CLEAR_FAIL,

//     CART_REMOVE_ITEM_REQUEST,
//     CART_REMOVE_ITEM_SUCCESS,
//     CART_REMOVE_ITEM_FAIL,

//     CART_FETCH_REQUEST,
//     CART_FETCH_SUCCESS,
//     CART_FETCH_FAIL,
// } from "../constants/index";

// const API_URL = import.meta.env.VITE_BACKEND_API;
// const apiUrl = import.meta.env.VITE_APP_API_URL || 'http://localhost:8000/api';

// // cartActions.js
// export const addToCart = (productId, quantity = 1, updateQuantity = false) => async (dispatch) => {
//     try {
//         dispatch({
//             type: CART_ADD_ITEM_REQUEST,
//             payload: { productId, quantity, updateQuantity }
//         });
  
//         // Sending request to the backend
//         const response = await axios.post(`${API_URL}/api/cart/`, {
//             product_id: productId,
//             quantity,
//             update_quantity: updateQuantity
//         });
  
//         console.log("Response data addToCart: ", response.data);  // Check the structure of the response
//         console.log("Response data addToCart response: ", response);  // Check the structure of the response
  
//         if (response.data.cart) {
//             dispatch({
//                 type: CART_ADD_ITEM_SUCCESS,
//                 payload: response.data.cart, // Dispatch the updated cart data
//             });
//         } else {
//             throw new Error('Unexpected response format');
//         }
//     } catch (error) {
//         console.error("Error adding to cart: ", error.response ? error.response.data : error.message);
//         dispatch({
//             type: CART_ADD_ITEM_FAIL,
//             payload: error.response ? error.response.data : error.message,
//         });
//     }
// };

// export const removeFromCart = (productId) => (dispatch, getState) => {
//     dispatch({ type: CART_REMOVE_ITEM_REQUEST });
//     const { cartItems } = getState().cartReducer;

//     // Filter out the item to be removed
//     const updatedCartItems = cartItems.filter(item => item.id !== productId);

//     // Dispatch the success action with the updated cart
//     dispatch({
//         type: CART_REMOVE_ITEM_SUCCESS,
//         payload: updatedCartItems,
//     });
// };

// export const clearCart = () => async(dispatch) => {
//     try {
//         dispatch({ type: CART_CLEAR_REQUEST });
//         const { data } = await axios.put(`${API_URL}/api/cart/`);
//         dispatch({
//             type: CART_CLEAR_SUCCESS,
//             payload: data,
//         });
//     } catch (error) {
//         dispatch({
//             type: CART_CLEAR_FAIL,
//             payload: error.response ? error.response.data : error.message,
//         });
//     }
// };

// export const fetchCart = () => async (dispatch) => {
//     try {
//         dispatch({ type: CART_FETCH_REQUEST });
//         const response = await axios.get(`${API_URL}/api/cart/`);
//         console.log("Response data: ", response.data);
//         dispatch({
//             type: CART_FETCH_SUCCESS,
//             payload: response.data.cart, // Ensure payload is the cart array
//         });
//     } catch (error) {
//         dispatch({
//             type: CART_FETCH_FAIL,
//             payload: error.response ? error.response.data : error.message,
//         });
//     }
// };

// // Fetch orders from the backend
// export const fetchOrders = async () => {
//     try {
//         const response = await fetch(`${apiUrl}/orders`);
//         if (!response.ok) {
//             throw new Error('Failed to fetch orders');
//         }
//         return await response.json();
//     } catch (error) {
//         console.error('Error fetching orders:', error);
//         throw error;
//     }
// };

