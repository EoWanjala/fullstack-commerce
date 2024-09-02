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
    initiatePaymentReducer,
    verifyPaymentReducer
} from "./paymentReducer"

import {
    userLoginReducer,
    userRegisterReducer,
} from "./userReducer"

import {
    getAllOrdersReducer,
} from './orderReducer'

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
    getAllOrdersReducer,
    initiatePaymentReducer,
    verifyPaymentReducer
})

export default allReducers