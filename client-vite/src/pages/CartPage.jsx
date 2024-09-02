import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../actions/cartActions';
import { initiatePayment } from '../actions/paymentAction';
import { Link, useNavigate } from 'react-router-dom';
import { Spinner } from "../components";

const API_URL = import.meta.env.VITE_BACKEND_API;

const CartPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cartReducer = useSelector((state) => state.cartReducer);
    const { cartItems, loading, error } = cartReducer;
    console.log("Cart Items: ", cartItems)

    const paymentReducer = useSelector((state) => state.initiatePaymentReducer);
    const { paymentData, loading: paymentLoading, error: paymentError } = paymentReducer;
    console.log("Payment data: ", paymentData)

    const userLoginReducer = useSelector(state => state.userLoginReducer);
    const { userInfo } = userLoginReducer;

    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [place, setPlace] = useState("")
    const [zipcode, setZipcode] = useState("")

    const increaseQuantity = (item) => {
        dispatch(addToCart(item.id, item.quantity + 1, true));
    };

    const decreaseQuantity = (item) => {
        if (item.quantity > 1) {
            dispatch(addToCart(item.id, item.quantity - 1, true));
        }
    };

    const handleRemoveItem = (productId) => {
        dispatch(removeFromCart(productId));
    };

    const calculateTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const calculateTotalQuantity = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };

    const handleCheckout = (e) => {
        e.preventDefault();
        const orderData = {
            items: cartItems.map(item => ({
                id: item.id,
                title: item.title,
                price: item.price,
                quantity: item.quantity,
                total_price: item.total_price,
                thumbnail: item.thumbnail,
                url: item.url,
                num_available: item.num_available,
            })),
            total_cost: calculateTotalPrice(),
            total_quantity: calculateTotalQuantity(),
            first_name: userInfo.first_name || firstName,
            last_name: userInfo.last_name || lastName,
            email: userInfo.email || email,
            address: userInfo.address || address,
            zipcode: userInfo.zipcode || zipcode,
            place: userInfo.place || place,
            phone: userInfo.phone || phone,
        };
    
        console.log("Order Data: ", orderData);
        dispatch(initiatePayment({ order: orderData }));
        navigate('/checkout');
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
                <p>Error: {typeof error === 'string' ? error : error.message || 'An error occurred'}</p>
            ) : cartItems.length === 0 ? (
                <div className="text-center">
                    <p className='text-4xl font-bold mb-3'>Cart is empty</p>
                    <Link to="/" className="text-lg text-white px-1.5 py-1.5 rounded-lg bg-blue-500">
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
                                <button className='px-5 py-4 md:py-4 bg-primary text-white rounded-r-md hover:bg-primary/55'>Apply Coupon Code</button>
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
                                <div className='mt-5 mx-3'>
                                    <form onSubmit={handleCheckout}>
                                        <div className='mb-5'>
                                            <label className='block mb-2 text-sm font-medium'>First Name</label>
                                            <input className='bg-gray-50 placeholder-gray-300 p-2.5 block border border-gray-300 w-full shadow-md rounded-lg'
                                            type='first name'
                                            placeholder={userInfo.first_name}
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}/>
                                        </div>
                                        <div className='mb-5'>
                                            <label className='block mb-2 text-sm font-medium'>Last Name</label>
                                            <input className='bg-gray-50 placeholder-gray-300 p-2.5 block border border-gray-300 w-full shadow-md rounded-lg'
                                            type='first name'
                                            placeholder={userInfo.last_name}
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}/>
                                        </div>
                                        <div className='mb-5'>
                                            <label className='block mb-2 text-sm font-medium'>Email</label>
                                            <input className='bg-gray-50 placeholder-gray-300 p-2.5 block border border-gray-300 w-full shadow-md rounded-lg'
                                            type='email'
                                            placeholder={userInfo.email}
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}/>
                                        </div>
                                        <div className='mb-5'>
                                            <label className='block mb-2 text-sm font-medium'>Address</label>
                                            <input className='bg-gray-50 placeholder-gray-300 p-2.5 block border border-gray-300 w-full shadow-md rounded-lg'
                                            type='first name'
                                            placeholder={userInfo.address|| 'N/A'}
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}/>
                                        </div>
                                        <div className='mb-5'>
                                            <label className='block mb-2 text-sm font-medium'>Zipcode</label>
                                            <input className='bg-gray-50 placeholder-gray-300 p-2.5 block border border-gray-300 w-full shadow-md rounded-lg'
                                            type='first name'
                                            placeholder={userInfo.zipcode || 'N/A'}
                                            value={zipcode}
                                            onChange={(e) => setZipcode(e.target.value)}/>
                                        </div>
                                        <div className='mb-5'>
                                            <label className='block mb-2 text-sm font-medium'>Place</label>
                                            <input className='bg-gray-50 placeholder-gray-300 p-2.5 block border border-gray-300 w-full shadow-md rounded-lg'
                                            type='first name'
                                            placeholder={userInfo.place || 'N/A'}
                                            value={place}
                                            onChange={(e) => setPlace(e.target.value)}/>
                                        </div>
                                        <div className='mb-5'>
                                            <label className='block mb-2 text-sm font-medium'>Phone Number</label>
                                            <input className='bg-gray-50 placeholder-gray-300 p-2.5 block border border-gray-300 w-full shadow-md rounded-lg'
                                            type='phonenmber'
                                            placeholder={userInfo.phone || 'N/A'}
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}/>
                                        </div>
                                        
                                        <button 
                                        onClick={handleCheckout} 
                                        className={`px-10 py-3 ${cartItems.length === 0 ? 'bg-gray-300' : 'bg-primary hover:bg-primary/80'} text-white w-full rounded-full uppercase text-lg tracking-wide`}
                                        disabled={cartItems.length === 0}  
                                        >
                                            Proceed to Checkout
                                        </button>
                                    </form>
                                   
                               
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
