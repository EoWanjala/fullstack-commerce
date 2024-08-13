import {
    USER_LOGIN_SUCCESS,
    USER_LOGIN_REQUEST,
    USER_LOGIN_FAIL,
    USER_LOGOUT,

    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL
} from '../constants/index'

import axios from 'axios'

const API_URL = import.meta.env.VITE_BACKEND_API;
  
// Login
export const login = (username, password) => async (dispatch) => {
  try {
      dispatch({
          type: USER_LOGIN_REQUEST
      })

      const config = {
          headers: {
              'Content-type': 'application/json'
          }
      }

      const { data } = await axios.post(
          `${API_URL}/userprofile/login/`,
          { 'username': username, 'password': password },
          config
      )

      dispatch({
          type: USER_LOGIN_SUCCESS,
          payload: data
      })

      localStorage.setItem('userInfo', JSON.stringify(data)) // will create a new key-value pair in localStorage
      // also see store.js file

  } catch (error) {
      dispatch({
          type: USER_LOGIN_FAIL,
          payload: error.response && error.response.data.detail ? error.response.data.detail : error.message
      })
  }
}

// logout
export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo')
  dispatch({
    type: USER_LOGOUT
  })
  dispatch({
    type: MPESA_TRANSACTION_RESET
  })
}

// Register
export const register = (username, first_name, last_name, email, password, confirm_password) => async (dispatch) => {
  try {
      dispatch({ type: USER_REGISTER_REQUEST })

      const config = {
          headers: {
              'Content-type': 'application/json'
          }
      }

      const { data } = await axios.post(`${API_URL}/userprofile/register/`,
          { 'username': username, 'first_name': first_name, 'last_name': last_name, 'email': email, 'password': password, "confirm_password":confirm_password},
          config
      )
      // console.log("User Info: ",data)
      dispatch({
          type: USER_REGISTER_SUCCESS,
          payload: data
      })

      dispatch({
          type: USER_LOGIN_SUCCESS,
          payload: data
      })

      localStorage.setItem('userInfo', JSON.stringify(data))
  }
  catch (error) {
      dispatch({
          type: USER_REGISTER_FAIL,
          payload: error.response && error.response.data.detail ? error.response.data.detail : error.message
      })
  }
}

