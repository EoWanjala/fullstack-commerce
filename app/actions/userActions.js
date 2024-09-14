import {
    USER_LOGIN_SUCCESS,
    USER_LOGIN_REQUEST,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL
} from "../constant/index";

import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from "expo-router";

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

// Helper function to handle expired tokens
const handleTokenExpiration = async (dispatch) => {
    alert("Session expired. Please log in again.");
    await AsyncStorage.removeItem('userInfo'); // Remove user data
    dispatch({ type: USER_LOGOUT });
    router.replace("/login");
};

// Login
export const login = (username, password) => async (dispatch) => {
    try {
        dispatch({ type: USER_LOGIN_REQUEST });

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        };

        const { data } = await axios.post(
            `${apiUrl}/userprofile/login/`,
            { username, password },
            config
        );

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        });

        await AsyncStorage.setItem('userInfo', JSON.stringify(data)); // Store data using AsyncStorage
    } catch (error) {
        // Check if the error is due to an invalid or expired token
        if (error.response && error.response.data.code === "token_not_valid") {
            handleTokenExpiration(dispatch);
        } else {
            dispatch({
                type: USER_LOGIN_FAIL,
                payload: error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message
            });
        }
    }
};

// Logout
export const logout = () => async (dispatch) => {
    await AsyncStorage.removeItem('userInfo'); // Remove user data using AsyncStorage
    dispatch({ type: USER_LOGOUT });
};

// Register
export const register = (username, first_name, last_name, email, password, confirm_password) => async (dispatch) => {
    try {
        dispatch({ type: USER_REGISTER_REQUEST });

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        };

        const { data } = await axios.post(
            `${apiUrl}/userprofile/register/`,
            {
                username,
                first_name,
                last_name,
                email,
                password,
                confirm_password
            },
            config
        );

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        });

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        });

        await AsyncStorage.setItem('userInfo', JSON.stringify(data)); // Store data using AsyncStorage
    } catch (error) {
        if (error.response && error.response.data.code === "token_not_valid") {
            handleTokenExpiration(dispatch);
        } else {
            dispatch({
                type: USER_REGISTER_FAIL,
                payload: error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message
            });
        }
    }
};
