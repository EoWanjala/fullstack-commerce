import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../actions/userActions'
import { useNavigate } from 'react-router-dom'
import { getOrders } from '../actions/orderActions'
import Spinner from './Spinner'


const Myaccount = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userLoginReducer = useSelector((state)=> state.userLoginReducer)
    const {userInfo, loading, error} = userLoginReducer

    const getAllOrdersReducer = useSelector((state)=> state.getAllOrdersReducer)
    const {orders, loading:loadingOrders, error:errorOrders} = getAllOrdersReducer
    console.log("Orders: ", orders)

    useEffect(()=>{
        dispatch(getOrders())
    }, [dispatch])

    const handlelogout = () => {
        dispatch(logout());
        navigate('/')
    }
  return (
    <div className='pt-20 pb-20 container mx-auto min-h-screen'>
        <div className='flex mx-3 flex-col'>
            <h1 className='text-4xl font-bold italic text-gray-600'>My Account</h1>
            <button onClick={handlelogout} className='bg-grade w-1/4 mt-2 text-white py-2 font-medium rounded-lg text-lg hover:bg-red-500'>Logout</button>
            <p className='font-bold text-lg tracking-wide  mt-10'><span className='font-bold mr-2 text-gray-500 '>username:</span>
                {userInfo.username}
            </p>
            <p className='font-bold text-lg tracking-wide  mt-2'><span className='font-bold mr-2 text-gray-500 '>First Name:</span>
                {userInfo.first_name}
            </p>
            <p className='font-bold text-lg tracking-wide  mt-2'><span className='font-bold mr-2 text-gray-500 '>Last Name:</span>
                {userInfo.last_name}
            </p>
            <p className='font-bold text-lg tracking-wide  mt-2'><span className='font-bold mr-2 text-gray-500 '>Address:</span>
                {userInfo.address}
            </p>
            <p className='font-bold text-lg tracking-wide  mt-2'><span className='font-bold mr-2 text-gray-500 '>Zipcode:</span>
                {userInfo.zipcode}
            </p>
            <p className='font-bold text-lg tracking-wide  mt-2'><span className='font-bold mr-2 text-gray-500 '>Email:</span>
                {userInfo.email}
            </p>
            <p className='font-bold text-lg tracking-wide  mt-2'><span className='font-bold mr-2 text-gray-500 '>Phone Number:</span>
                {userInfo.phone}
            </p>
        </div>
        <div className='mt-10 mx-3'>
            <h1 className='text-4xl font-bold italic text-gray-600 flex items-center justify-center'> My Orders</h1>
            <div className='flex flex-col mt-5'>
                {loadingOrders ? (
                    <Spinner />
                ) : 
                errorOrders ? (
                <div className='bg-red-500 text-white p-3 rounded mb-5 text-center mt-2'>
                    {errorOrders}
                </div> 
                ): orders && orders.length > 0 ? (
                    <div>
                        {orders.map((order) => (
                            <div key={order.id} className='border p-4 rounded-lg mb-4 border-gray-300'>
                                <div className='bg-gray-100 p-4 flex justify-between items-center'>
                                    <p><strong>Date:</strong> {new Date(order.created_at).toLocaleDateString()}</p>
                                    <p><strong>Status:</strong> {order.status}</p>
                                </div>
                                <div className='p-4'>
                                    <table className='min-w-full divide-y divide-gray-400'>
                                        <thead>
                                            <tr>
                                                <th className='px-4 py-2 '>Title</th>
                                                <th className='px-4 py-2'>Quantity</th>
                                                <th className='px-4 py-2'>Price</th>
                                            </tr>
                                            
                                        </thead>

                                        <tbody className='bg-white divide-y divide-gray-200'>
                                            {order.items.map((item) => (
                                                <tr key={item.id} className='hover:bg-gray-100'>
                                                    <td className='px-4 py-2 font-medium'>{item.product.title || 'No Title Available'}</td>
                                                    <td className='px-4 py-2 font-medium'>{item.quantity}</td>
                                                    <td className='px-4 py-2 font-medium'>KES {item.price}</td>
                                                </tr>
                                                ))}
                                        </tbody>
                                        <tfoot className='bg-gray-100'>
                                            <tr>
                                                <td className='px-4 py-2 text-lg font-medium'>Subtotal:</td>
                                                <td className='px-4 py-2 font-medium'>{order.total_quantity}</td>
                                                <td className='px-4 py-2 font-medium'>{order.paid_amount  || "Not paid"}</td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className='text-2xl font-bold text-gray-500 mt-5 flex items-center justify-center'>You don't have any orders yet...</p>
                )}
            </div>
        </div>
    </div>
  )
}

export default Myaccount