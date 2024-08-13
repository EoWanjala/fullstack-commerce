import { configureStore } from '@reduxjs/toolkit';
import allReducers from './reducers/index';

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

let initialState = {
    userLoginReducer: { userInfo: userInfoFromStorage }
}

const store = configureStore({
    reducer: allReducers, // Pass the combined reducers directly
    preloadedState: initialState // Provide the initial state to the store
});

export default store;
