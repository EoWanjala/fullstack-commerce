import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart } from '../actions/cartActions';

const CartPage = () => {
    const dispatch = useDispatch();
    const cartReducer = useSelector((state) => state.cartReducer);
    const { cartItems, loading, error } = cartReducer;
    console.log("Cart Fetched State: ",cartItems)

    useEffect(() => {
        if (!loading && cartItems.length === 0) {
          dispatch(fetchCart());
        }
      }, [dispatch, cartItems, loading]);

    return (
        <div>
            <h1>Your Cart</h1>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error}</p>
            ) : cartItems.length === 0 ? (
                <p>No items added to the cart.</p>
            ) : (
                <ul>
                    {cartItems.map((item) => (
                        <li key={item.id}>
                            <p>{item.title}</p>
                            <p>Quantity: {item.quantity}</p>
                            <p>Price: KES {item.price}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CartPage;