import { configureStore } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import allReducers from './reducers';

const loadUserInfo = async () => {
    try {
        const userInfo = await AsyncStorage.getItem('userInfo');
        return userInfo ? JSON.parse(userInfo) : null;
    } catch (error) {
        console.error('Failed to load user info from storage:', error);
        return null;
    }
};

const initializeStore = async () => {
    const userInfoFromStorage = await loadUserInfo();

    let initialState = {
        userLoginReducer: { userInfo: userInfoFromStorage },
    };

    const store = configureStore({
        reducer: allReducers, 
        preloadedState: initialState,
        
    });

    return store;
};

export default initializeStore;
