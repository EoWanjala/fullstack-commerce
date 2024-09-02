import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { verifyPayment } from '../actions/paymentAction'
import { Spinner } from '../components'
import { useParams } from 'react-router-dom'
import { clearCart } from '../actions/cartActions'

const PaymentVerification = () => {
    const { ref } = useParams();
    const dispatch = useDispatch();

    const paymentVerify = useSelector((state) => state.verifyPaymentReducer)
    const { loading, error, verificationData } = paymentVerify;

    useEffect(() => {
        if (ref) {
            dispatch(verifyPayment(ref))
        }
    }, [dispatch, ref])

    useEffect(() => {
        if (verificationData && verificationData.payment.payment_status === 'Verified') {
            dispatch(clearCart());  
        }
    }, [dispatch, verificationData]);
  return (
    <div className='container mx-auto pt-10'>
        {loading ? (
            <Spinner />
        ) : error ? (
            {error}
        ) : verificationData ? (
            <div className="text-center">w1`    q <Q1Q>`    </Q1Q>`
          <h2 className='text-4xl font-bold'>Payment Verification</h2>
          <h4 className='text-lg font-medium'>
            Order #{verificationData.placed_order.id} - {verificationData.payment.payment_status}
          </h4>
          {verificationData.payment.payment_status === 'Verified' ? (
            <p className='text-xl font-medium'>Your payment of KES {verificationData.payment.amount} was successful!</p>
          ) : (
            <p>Payment verification failed. Please contact support.</p>
          )}
          </div>
        ) : null}
    </div>
  )
}

export default PaymentVerification