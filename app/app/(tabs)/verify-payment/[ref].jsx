import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useLocalSearchParams } from 'expo-router';
import Spinner from '../../../components/Spinner';
import CustomButton from '../../../components/CustomButton';
import { useDispatch, useSelector } from 'react-redux';
import { verifyPayment } from '../../../actions/paymentActions';
import { clearCart } from '../../../actions/cartActions';

const Ref = () => {
  const { ref } = useLocalSearchParams()
  const dispatch = useDispatch();

  const paymentVerify = useSelector((state) => state.verifyPaymentReducer)
  const { loading, error, verificationData } = paymentVerify;
  console.log("Payment ver:", paymentVerify)
  console.log("Verifying payment with ref:", JSON.stringify(ref));


  useEffect(() => {
    if (ref) {
      dispatch(verifyPayment(ref.reference));
    } else {
      console.error("Invalid ref value:", ref);
    }
  }, [dispatch, ref]);
  
  

  useEffect(() => {
  if (verificationData && verificationData.payment.payment_status === 'Verified') {
      dispatch(clearCart());  
  }
  }, [dispatch, verificationData]);

  return (
    <View className = 'container mx-auto pt-20'>
      {loading ? (
        <Spinner />
      ) : error ? (
        <Text className='text-red-600'>{error}</Text>
      ) : verificationData ? (
        <>
          <Text className = 'text-lg font-pbold text-center'>Payment Verification</Text>
          <Text className='text-xl font-pmedium mt-3'>Order #{verificationData.placed_order.id} - {verificationData.payment.payment_status}</Text>
          {verificationData.payment.payment_status === 'Verified' ? (
          <Text className='text-lg font-pbold text-center mt-5'>Your Payment of KES {verificationData.payment.amount} was successful!</Text>
          ):
          (
          <Text className='font-pmedium text-xl mt-3'>Payment verification failed. Please contact support.</Text>
          )}
          <CustomButton
              title='Continue Shopping'
              onPress={() => router.push('/home')}
              containerStyles="w-full mt-7 mb-4 "
          />
        </>
        
      ): null}
    </View>
  )
}

export default Ref