import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { router } from 'expo-router';
import Spinner from '../../components/Spinner';
import { Paystack, paystackProps } from 'react-native-paystack-webview';

const Checkout = () => {
  const [showPaystack, setShowPaystack] = useState(false); // State to show the Paystack component
  const paystackWebViewRef = useRef(paystackProps.PayStackRef);

  const paymentReducer = useSelector((state) => state.initiatePaymentReducer);
  const { paymentData, loading, error } = paymentReducer;
  console.log('Payment data: ', paymentData);

  const userLogin = useSelector((state) => state.userLoginReducer);
  const { userInfo } = userLogin;

  const cartReducer = useSelector((state) => state.cartReducer);
  const { cartItems } = cartReducer;
  console.log('Cart Items: ', cartItems);

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const numberWithCommas = (x) => {
    if (x === undefined || x === null) return '0';
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const handlePaymentSuccess = (ref) => {
    router.replace(`/verify-payment/${ref}`);
  };

  return (
    <View className="flex-1 items-center justify-center p-4">
      {loading && <Spinner />}
      {error && <Text className="text-red-600">{error}</Text>}

      <View className="w-full items-center">
        <Text className="text-2xl font-medium mb-4">Hello, {userInfo.username}</Text>
        <Text className="text-lg mb-4">
          You're about to pay KES {numberWithCommas(calculateTotalPrice())} for your order.
        </Text>

        <TouchableOpacity
          onPress={() => paystackWebViewRef.current.startTransaction()}
          className="bg-blue-600 py-3 px-6 rounded-full"
        >
          <Text className="text-white text-lg">Make Payment</Text>
        </TouchableOpacity>

        {/* Conditionally render the Paystack component */}
        {paymentData &&(
          <Paystack
            paystackKey={paymentData.paystack_pub_key}
            // paystackSecretKey='sk_test_f81f0539d6571ce92bee4b31f2e9e4c2079d2944'
            amount={paymentData.payment.amount } 
            billingEmail={paymentData.payment.email}
            billingName={userInfo.username}
            refNumber={paymentData.payment.ref}
            currency="KES"
            onSuccess={handlePaymentSuccess}
            onCancel={(e) => {
              Alert.alert('Payment cancelled', 'Please complete the payment to proceed');
              console.log(e);
            }}
            ref={paystackWebViewRef}
          />
        )}
      </View>
    </View>
  );
};

export default Checkout;
