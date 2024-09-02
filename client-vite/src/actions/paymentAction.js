import axios from 'axios';
import {
  INITIATE_PAYMENT_REQUEST,
  INITIATE_PAYMENT_SUCCESS,
  INITIATE_PAYMENT_FAIL,
  VERIFY_PAYMENT_REQUEST,
  VERIFY_PAYMENT_SUCCESS,
  VERIFY_PAYMENT_FAIL,
} from '../constants/index';

const API_URL = import.meta.env.VITE_BACKEND_API;

// Initiate Payment Action
export const initiatePayment = (orderData) => async (dispatch, getState) => {
  try {
    dispatch({ type: INITIATE_PAYMENT_REQUEST });

    const {
      userLoginReducer: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.access}`,
      },
      withCredentials: true,
    };

    const { data } = await axios.post(`${API_URL}/payment/initiate-payment/`, orderData, config);

    dispatch({
      type: INITIATE_PAYMENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: INITIATE_PAYMENT_FAIL,
      payload:
        error.response && error.response.data.error_message
          ? error.response.data.error_message
          : error.message,
    });
  }
};


// Verify Payment Action
export const verifyPayment = (ref) => async (dispatch, getState) => {
  try {
    dispatch({ type: VERIFY_PAYMENT_REQUEST });

    const {
      userLoginReducer: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.get(`${API_URL}/payment/verify-payment/${ref}/`, config);

    dispatch({
      type: VERIFY_PAYMENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: VERIFY_PAYMENT_FAIL,
      payload:
        error.response && error.response.data.error_message
          ? error.response.data.error_message
          : error.message,
    });
  }
};
