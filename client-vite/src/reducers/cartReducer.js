import {
    CART_ADD_ITEM_REQUEST,
    CART_ADD_ITEM_SUCCESS,
    CART_ADD_ITEM_FAIL,
    
    CART_REMOVE_ITEM_REQUEST,
    CART_REMOVE_ITEM_SUCCESS,
    CART_REMOVE_ITEM_FAIL,

    CART_CLEAR_REQUEST,
    CART_CLEAR_SUCCESS,
    CART_CLEAR_FAIL,

    CART_FETCH_REQUEST,
    CART_FETCH_SUCCESS,
    CART_FETCH_FAIL,
} from "../constants/index";

const initialState = {
    cartItems: [],
    loading: false,
    error: null,
};

// Reducer function to handle cart actions
export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case CART_FETCH_REQUEST:
        case CART_ADD_ITEM_REQUEST:
        case CART_REMOVE_ITEM_REQUEST:
        case CART_CLEAR_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case CART_ADD_ITEM_SUCCESS:
            const item = action.payload;
            const existItem = state.cartItems.find(x => x.id === item.id);
            
            if (existItem) {
                return {
                    ...state,
                    loading: false,
                    cartItems: state.cartItems.map(x => 
                        x.id === existItem.id ? {...x, quantity: item.quantity} : x  // Use the quantity from the backend
                    ),
                };
            } else {
                return {
                    ...state,
                    loading: false,
                    cartItems: [...state.cartItems, item],
                };
            }
            
        case CART_REMOVE_ITEM_SUCCESS:
            return {
                ...state,
                loading: false,
                cartItems: state.cartItems.filter(x => x.id !== action.payload),
            };

        case CART_CLEAR_SUCCESS:
            return {
                ...state,
                loading: false,
                cartItems: [],
            };

        case CART_FETCH_SUCCESS:
            return {
                ...state,
                loading: false,
                cartItems: action.payload.cart,
            };

        case CART_ADD_ITEM_FAIL:
        case CART_REMOVE_ITEM_FAIL:
        case CART_CLEAR_FAIL:
        case CART_FETCH_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};
