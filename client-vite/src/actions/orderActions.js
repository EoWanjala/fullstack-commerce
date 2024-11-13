import { 
    GET_ALL_ORDERS_REQUEST,
    GET_ALL_ORDERS_SUCCESS,
    GET_ALL_ORDERS_FAIL,
} from "../constants/index"

import axios from 'axios'

//const API_URL = import.meta.env.VITE_BACKEND_API;
const API_URL = import.meta.env.VITE_APP_API_URL || 'http://localhost:8000/api';


export const getOrders = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: GET_ALL_ORDERS_REQUEST,
        })

        const {
            userLoginReducer: { userInfo },
        } = getState()
        

        const config  = {
            headers: {
                "Content-Type" : "application/json",
                Authorization: `Bearer ${userInfo.access}`
            }
        }

        const { data } = await axios.get(
            `${API_URL}/order/orders-list/`, config
        )
        console.log("Order details: ", data)

        dispatch({
            type: GET_ALL_ORDERS_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: GET_ALL_ORDERS_FAIL,
            payload: error.response && error.response.data.details ? error.response.data.details : error.message
        })
    }
}