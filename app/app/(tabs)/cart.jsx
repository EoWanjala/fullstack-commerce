import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { addToCart, removeFromCart } from '../../actions/cartActions'
import Spinner from '../../components/Spinner'
import React from 'react'

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
  const cartReducer = useSelector((state) => state.cartReducer);
  const { cartItems, loading, error } = cartReducer;
  
  console.log("Cart Items: ", cartItems);

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const calculateTotalQuantity = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };
  function numberWithCommas(x) {
    if (x === undefined || x === null) return "0"; 
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

  return (
    <ScrollView className='p-4 pb-20 pt-20 m'>
      <Text className='text-2xl font-bold mb-4'>
        Cart
      </Text>
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
      
      <View className='mt-4 mb-10'>
        <Text className='text-lg font-pbold'>Total Price: KES {numberWithCommas(calculateTotalPrice())}</Text>
      </View>
    </ScrollView>
  );
};

export default Cart;
