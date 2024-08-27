import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart, addToCart, removeFromCart } from '../actions/cartActions';
import { Link } from 'react-router-dom';
import { Spinner } from "../components"

const API_URL = import.meta.env.VITE_BACKEND_API;

const CartPage = () => {
    const dispatch = useDispatch();
    const cartReducer = useSelector((state) => state.cartReducer);
    const { cartItems, loading, error } = cartReducer;

    // Fetch cart items on component mount
    useEffect(() => {
        if (!loading && cartItems.length === 0) {
            dispatch(fetchCart());
        }
    }, [dispatch, cartItems, loading]);

    // Handle increasing quantity
    const increaseQuantity = (item) => {
        dispatch(addToCart(item.id, item.quantity + 1, true));
    };

    // Handle decreasing quantity
    const decreaseQuantity = (item) => {
        if (item.quantity > 1) {
            dispatch(addToCart(item.id, item.quantity - 1, true));
        }
    };

    // Handle removing item from cart
    const handleRemoveItem = (productId) => {
        dispatch(removeFromCart(productId));
    };

    // Calculate total price for the cart
    const calculateTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    function numberWithCommas(x) {
        if (x === undefined || x === null) return "0"; 
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return (
        <div className='max-w-7xl mx-auto pt-10'>
            <h1 className='text-4xl font-bold mb-3'>Your Cart</h1>
            {loading ? (
                <Spinner />
            ) : error ? (
                <p>Error: {error}</p>
            ) : cartItems.length === 0 ? (
                <div className="text-center">
                    <p className='text-4xl font-bold'>Cart is empty</p>
                    <Link to="/" className="text-lg text-primary underline">
                        Continue Shopping
                    </Link>
                </div>
            ) : (
                <div className='relative overflow-x-auto'>
                    <table className='w-full text-sm text-left rtl:text-right rounded-lg'>
                        <thead className='text-xl text-primary uppercase bg-gray-50'>
                            <tr>
                                <th className='py-3 px-6'>Image</th>
                                <th className='py-3 px-6'>Product</th>
                                <th className='py-3 px-6'>Price</th>
                                <th className='py-3 px-6'>Quantity</th>
                                <th className='py-3 px-6'>Total</th>
                                <th className='py-3 px-6'>Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map((item) => (
                                <tr key={item.id}>
                                    <td className='py-3 px-6'>
                                        <img
                                            src={`${API_URL}/${item.thumbnail}`}
                                            alt={item.title}
                                            className='w-12 h-12 object-cover'
                                        />
                                    </td>
                                    <td className='py-3 px-6 text-lg font-medium'>{item.title}</td>
                                    <td className='py-3 px-6 text-lg font-medium'>KES {numberWithCommas(item.price)}</td>
                                    <td className='py-3 px-6 text-lg font-medium'>
                                        <button className='bg-gray-300 text-white px-1.5 rounded-full' onClick={() => decreaseQuantity(item)}>-</button>
                                        <span className='mx-2'>{item.quantity}</span>
                                        <button className='bg-blue-600 text-white px-1.5 rounded-full' onClick={() => increaseQuantity(item)}>+</button>
                                    </td>
                                    <td className='py-3 px-6 text-lg font-medium'>KES {numberWithCommas(item.price * item.quantity)}</td>
                                    <td className='py-3 px-6'>
                                        <button
                                            onClick={() => handleRemoveItem(item.id)}
                                            className='bg-red-500 px-1.5 py-1 rounded-lg text-white hover:bg-red-400'
                                        >
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 mt-10 pb-20 mb-10 text-center'>
                        <div className='cols-span-2'>
                            <div className='flex items-center justify-between p-4 rounded-lg w-full'>
                                <input type='text' placeholder='Coupon code'
                                className='py-4 px-2 border rounded-l-lg flex-grow border-gray-400 shadow-md'/>
                                <button className='px-5 py-1.5 md:py-4 bg-primary text-white rounded-r-md hover:bg-primary/55'>Apply Coupon Code</button>
                            </div>
                        </div>
                        <div className='mt-3'>
                            <h2 className='text-2xl font-bold tracking-wide uppercase'>Cart Totals</h2>
                            <hr className='border-0 h-px bg-gray-300 rounded-full my-3'/>
                            <div className='flex flex-col mb-2'>
                                <div className='flex mb-5'>
                                    <p className='text-dark mr-12 text-lg font-normal'>Subtotal</p>
                                    <strong className='text-lg'>KES {numberWithCommas(calculateTotalPrice())}</strong>
                                </div>
                                <div className='mt-5'>
                                    <Link to="/checkout" className='px-10 py-3 bg-primary text-white w-full rounded-full uppercase text-lg tracking-wide hover:bg-primary/65'>
                                        Proceed to Checkout
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;
