import { combineReducers } from 'redux'

import {
    allproductsReducer,
    producstIndexReducer,
    productDetailReducer,
    categoryDetailReducer,
    categoryListReducer,
    searchProductReducer,
    productReviewReducer
} from "./productsReducer"

import {
    cartReducer
} from "./cartReducer"

import {
    userLoginReducer,
    userRegisterReducer,
} from "./userReducer"

const allReducers = combineReducers({
    allproductsReducer,
    producstIndexReducer,
    productDetailReducer,
    categoryDetailReducer,
    categoryListReducer,
    searchProductReducer,
    productReviewReducer,
    userLoginReducer,
    userRegisterReducer,
    cartReducer,
})

export default allReducers