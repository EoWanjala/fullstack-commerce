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

const API_URL = import.meta.env.VITE_BACKEND_API;

// cartActions.js
export const addToCart = (productId, quantity = 1 , updateQuantity = false) => async (dispatch) => {
    try {
      dispatch({ 
        type: CART_ADD_ITEM_REQUEST, 
        payload: { productId, quantity, updateQuantity } 
      });
      
      const response = await axios.post(`${API_URL}/api/cart/`, { 
        product_id: productId, 
        quantity, 
        update_quantity: updateQuantity 
      });
      console.log("Response date: ", response)
  
      if (response.data) {
        dispatch({
          type: CART_ADD_ITEM_SUCCESS,
          payload: response.data,
        });
      } else {
        throw new Error('No data returned from the API');
      }
    } catch (error) {
      console.error("Error adding to cart: ", error);
      dispatch({
        type: CART_ADD_ITEM_FAIL,
        payload: error.response ? error.response.data : error.message,
      });
    }
  };
  
export const removeFromCart = (productId) => async (dispatch) => {
    try {
        dispatch({ type: CART_REMOVE_ITEM_REQUEST, payload: { productId } });
        const { data } = await axios.delete(`${API_URL}/api/cart/`, {
            data: { product_id: productId }
        });
        dispatch({
            type: CART_REMOVE_ITEM_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: CART_REMOVE_ITEM_FAIL,
            payload: error.response ? error.response.data : error.message,
        });
    }
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
        const { data } = await axios.get(`${API_URL}/api/cart/`);
        dispatch({
            type: CART_FETCH_SUCCESS,
            payload: data, 
        });
    } catch (error) {
        dispatch({
            type: CART_FETCH_FAIL,
            payload: error.response ? error.response.data : error.message,
        });
    }
};
