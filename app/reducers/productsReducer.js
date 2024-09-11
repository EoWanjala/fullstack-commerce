import {
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS,
    ALL_PRODUCTS_FAIL,

    PRODUCTS_INDEX_REQUEST,
    PRODUCTS_INDEX_SUCCESS,
    PRODUCTS_INDEX_FAIL,

    SEARCH_PRODUCTS_REQUEST,
    SEARCH_PRODUCTS_SUCCESS,
    SEARCH_PRODUCTS_FAIL,

    CATEGORY_DETAIL_REQUEST,
    CATEGORY_DETAIL_SUCCESS,
    CATEGORY_DETAIL_FAIL,

    PRODUCT_DETAIL_REQUEST,
    PRODUCT_DETAIL_SUCCESS,
    PRODUCT_DETAIL_FAIL,

    PRODUCT_REVIEW_REQUEST,
    PRODUCT_REVIEW_SUCCESS,
    PRODUCT_REVIEW_FAIL,

    CATEGORY_LIST_REQUEST, 
    CATEGORY_LIST_SUCCESS, 
    CATEGORY_LIST_FAIL,

} from "../constant/index"

// Reducer for products index
export const producstIndexReducer = (state = {
    featuredProducts: [],
    featuredCategories: [],
    popularProducts: [],
    recentlyViewedProducts: []
}, action) => {
    switch (action.type) {
        case PRODUCTS_INDEX_REQUEST:
            return { ...state, loading: true };
        
        case PRODUCTS_INDEX_SUCCESS:
            return {
                ...state,
                loading: false,
                featuredProducts: action.payload.featured_products,
                featuredCategories: action.payload.featured_categories,
                popularProducts: action.payload.popular_products,
                recentlyViewedProducts: action.payload.recently_viewed_products,
            };

        case PRODUCTS_INDEX_FAIL:
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
};

// Reducer for all products
export const allproductsReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case ALL_PRODUCTS_REQUEST:
            return { ...state, loading: true, products: [] };

        case ALL_PRODUCTS_SUCCESS:
            return {
                ...state,
                loading: false,
                products: action.payload.results,
            };

        case ALL_PRODUCTS_FAIL:
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
};

// Reducer for search products
export const searchProductReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case SEARCH_PRODUCTS_REQUEST:
            return { ...state, loading: true, products: [] };

        case SEARCH_PRODUCTS_SUCCESS:
            return {
                ...state,
                loading: false,
                products: action.payload,
            };

        case SEARCH_PRODUCTS_FAIL:
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
};

// Reducer for category detail
export const categoryDetailReducer = (state = { category: {}, products: [] }, action) => {
    switch (action.type) {
        case CATEGORY_DETAIL_REQUEST:
            return { ...state, loading: true, category: {}, products: [] };

        case CATEGORY_DETAIL_SUCCESS:
            return {
                ...state,
                loading: false,
                category: action.payload.category,
                products: action.payload.products,
            };

        case CATEGORY_DETAIL_FAIL:
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
};

export const categoryListReducer = (state = { categories: [] }, action) => {
    switch (action.type) {
        case CATEGORY_LIST_REQUEST:
            return { loading: true, categories: [] };
        case CATEGORY_LIST_SUCCESS:
            return { loading: false, categories: action.payload };
        case CATEGORY_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

// Reducer for product detail
export const productDetailReducer = (state = { product: {}, relatedProducts: [] }, action) => {
    switch (action.type) {
        case PRODUCT_DETAIL_REQUEST:
            return { ...state, loading: true, product: {}, relatedProducts: [] };
            

        case PRODUCT_DETAIL_SUCCESS:
            return {
                ...state,
                loading: false,
                product: action.payload,
                relatedProducts: action.payload.related_products,
            };

        case PRODUCT_DETAIL_FAIL:
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
};



export const productReviewReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_REVIEW_REQUEST:
            return { loading: true };

        case PRODUCT_REVIEW_SUCCESS:
            return { loading: false, success: true, review: action.payload };

        case PRODUCT_REVIEW_FAIL:
            return { loading: false, error: action.payload };

        default:
            return state;
    }
};