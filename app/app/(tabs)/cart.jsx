import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { addToCart, removeFromCart } from '../../actions/cartActions'
import Spinner from '../../components/Spinner'
import React, { useState, useEffect } from 'react'
import { initiatePayment } from "../../actions/paymentActions"
import { router } from "expo-router"
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { logout } from '../../actions/userActions'

const CartItem = ({ item }) => {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  const fullImageUrl = apiUrl + item.thumbnail; 
  const dispatch = useDispatch();

  const increaseQuantity = () => {
    dispatch(addToCart(item.id, item.quantity + 1, true));
  };

  const decreaseQuantity = () => {
    if (item.quantity > 1) {
      dispatch(addToCart(item.id, item.quantity - 1, true));
    }
  };

  const handleRemoveItem = () => {
    dispatch(removeFromCart(item.id));
  };

  function numberWithCommas(x) {
    if (x === undefined || x === null) return "0"; 
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <View className='flex flex-row p-4 border border-gray-200'>
      <Image 
        source={{ uri: fullImageUrl }}  
        className='w-16 h-16 rounded'
        resizeMode='cover'
      />
      <View className='ml-4 flex-1'>
        <Text className='text-gray-600'>{item.title}</Text>
        <Text className='text-gray-600'> KES {numberWithCommas(item.price)}</Text>
        
        <View className='flex flex-row items-center'>
          <TouchableOpacity onPress={increaseQuantity}>
            <Text className='bg-blue-600 text-white px-1.5 rounded-full'>+</Text>
          </TouchableOpacity>
          
          <Text className='mx-2 text-gray-600'>{item.quantity}</Text>
          
          <TouchableOpacity onPress={decreaseQuantity}>
            <Text className='bg-gray-300 text-white px-1.5 rounded-full'>-</Text>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity onPress={handleRemoveItem}>
          <Text className='text-red-600'>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Cart = () => {
  const dispatch = useDispatch();
  const cartReducer = useSelector((state) => state.cartReducer);
  const { cartItems, loading, error } = cartReducer;

  const paymentReducer = useSelector((state) => state.initiatePaymentReducer);
  const { paymentData, loading: paymentLoading, error: paymentError } = paymentReducer;

  const userLoginReducer = useSelector(state => state.userLoginReducer);
  const { userInfo, error:Usererror } = userLoginReducer;

  const [firstName, setFirstName] = useState(userInfo?.first_name || "");
  const [lastName, setLastName] = useState(userInfo?.last_name || "");
  const [email, setEmail] = useState(userInfo?.email || "");
  const [address, setAddress] = useState(userInfo?.address || "");
  const [phone, setPhone] = useState(userInfo?.phone || "");
  const [place, setPlace] = useState(userInfo?.place || "");
  const [zipcode, setZipcode] = useState(userInfo?.zipcode || "");
  const [formError, setFormError] = useState("");

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const calculateTotalQuantity = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const validateForm = () => {
    if (!firstName || !lastName || !email || !address || !phone || !place || !zipcode) {
      return false;
    }
    return true;
  };

  useEffect(() => {
    if (paymentError?.code === "token_not_valid") {
      alert("Session expired. Please log in again.");
      dispatch(logout());
    }
  }, [Usererror]);

  const handleCheckout = () => {
    if ( paymentError) {
      alert("You need to log in to proceed to checkout.");
      dispatch(logout());
      router.replace('/login')
      return;
    }

    if (!validateForm()) {
      setFormError("Please fill in all the required fields.");
      return;
    }

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
      total_price: calculateTotalPrice(),
      total_quantity: calculateTotalQuantity(),
      first_name: firstName,
      last_name: lastName,
      email: email,
      address: address,
      zipcode: zipcode,
      place: place,
      phone: phone,
    };

    dispatch(initiatePayment({ order: orderData }));
    router.replace('/checkout');
  };

  function numberWithCommas(x) {
    if (x === undefined || x === null) return "0"; 
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <ScrollView className='px-4 pt-10 h-full pb-20'
    contentContainerStyle={{ flexGrow: 1 }}>
      <Text className='text-2xl font-bold mb-4'>Cart</Text>

      {loading ? (
        <Spinner />
      ) : error ? (
        <Text className='text-red-600'>{error}</Text>
      ) : cartItems.length === 0 ? (
        <View className='text-center'>
          <Text className='text-gray-600 font-pmedium'>Your cart is empty</Text>
        </View>
      ) : (
        cartItems.map((item) => (
          <CartItem key={item.id} item={item} />
        ))
      )}

      <View className='mt-4 mb-3'>
        <Text className='text-lg font-pbold'>Total Price: KES {numberWithCommas(calculateTotalPrice())}</Text>
      </View>
      <View className=''>
        <Text className='text-lg font-pbold'>Qty: {calculateTotalQuantity()} Items</Text>
      </View>

      <View className='w-full mt-3 flex justify-center pb-20'>
        <Text className='text-3xl font-pbold mb-4'>Billing Form</Text>
        <FormField 
          title='First Name'
          value={firstName}
          handleChangeText={(text) => setFirstName(text)} 
          placeholder='First Name'
        />
        <FormField 
          title='Last Name'
          value={lastName}
          handleChangeText={(text) => setLastName(text)}
          placeholder='Last Name'
        />
        <FormField 
          title='Email'
          value={email}
          handleChangeText={(text) => setEmail(text)} 
          placeholder='Email'
        />
        <FormField 
          title='Address'
          value={address}
          handleChangeText={(text) => setAddress(text)} 
          placeholder='Address'
        />
        <FormField 
          title='Place'
          value={place}
          handleChangeText={(text) => setPlace(text)} 
          placeholder='Place'
        />
        <FormField 
          title='Phone Number'
          value={phone}
          handleChangeText={(text) => setPhone(text)} 
          placeholder='Phone Number'
        />
        <FormField 
          title='Zip Code'
          value={zipcode}
          handleChangeText={(text) => setZipcode(text)} 
          placeholder='Zip Code'
        />

        {formError && <Text className="text-red-600 p-3 rounded mb-5 text-center">{formError}</Text>}
        {paymentError && <Text className="bg-black-100 text-white p-3 rounded mb-5 text-center">{paymentError}</Text>}
        
        <CustomButton 
          title='Checkout'
          onPress={handleCheckout} 
          containerStyles='mt-2'
          isLoading={paymentLoading}
        />
      </View>
    </ScrollView>
  );
};


export default Cart;
