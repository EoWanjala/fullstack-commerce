import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Cart = () => {
    const cartReducer = useSelector((state) => state.cartReducer)
    const { cartItems } = cartReducer
  return (
    <Link to={'/cart'}>
        <div className='mx-3 relative'>
            <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="file: mt-1 h-6 w-6 bg-gray-200 rounded-full mb-4 cursor-pointer">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
            {Array.isArray(cartItems) && cartItems.length > 0 && (
        <span className='absolute -top-2 -right-2 inline-flex items-center justify-center w-4 h-4 text-xs font-semibold text-white bg-red-500 rounded-full'>
          {cartItems.length}
        </span>
      )}
        </div>
    </Link>
    
  )
}

export default Cart