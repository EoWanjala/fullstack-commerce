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
} from "../constant/index";

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
                const newCartItems = action.payload; // This should be the full updated cart
            
                // Merge new cart items with existing ones
                const updatedCartItems = state.cartItems.map(item => {
                    const newItem = newCartItems.find(i => i.id === item.id);
                    return newItem ? { ...item, quantity: newItem.quantity } : item;
                });
            
                // Add any new items that are not already in the cart
                const finalCartItems = [...updatedCartItems];
            
                newCartItems.forEach(item => {
                    if (!finalCartItems.find(i => i.id === item.id)) {
                        finalCartItems.push(item);
                    }
                });
            
                return {
                    ...state,
                    loading: false,
                    cartItems: finalCartItems,
                };
            
        
        
        case CART_REMOVE_ITEM_SUCCESS:
            return {
                ...state,
                loading: false,
                cartItems: action.payload, // Update the cart items with the response
            };
        ;

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
                cartItems: action.payload || [],
            };

            case CART_ADD_ITEM_FAIL:
            case CART_REMOVE_ITEM_FAIL:
            case CART_FETCH_FAIL:
            return {
            ...state,
            loading: false,
            error: action.payload.message || action.payload, // Ensure it's a string
            };


        default:
            return state;
    }
};
