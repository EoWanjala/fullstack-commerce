import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../actions/userActions'
import { getOrders } from '../actions/orderActions'
import { router } from 'expo-router'
import Spinner from "../components/Spinner"


const MyAccount = () => {
  const dispatch = useDispatch()
  const userLoginReducer = useSelector((state)=> state.userLoginReducer)
  const { loading, error, userInfo } = userLoginReducer;

  const getAllOrdersReducer = useSelector((state)=> state.getAllOrdersReducer)
  const { orders, loading:loadingOrders, error: errorOrders } = getAllOrdersReducer

  useEffect(()=> {
    if (errorOrders && errorOrders.code === "token_not_valid") {
      Alert.alert("Error", "Your session has expired. Please login again.");
      dispatch(logout());
      router.replace('/login')
    }
  }, [errorOrders,dispatch])

  const handlelogout = () => {
    dispatch(logout())
    router.replace('/home')
  }

  return (
    <ScrollView className='pt-20 mx-3'>
      {loading ? (
        <ActivityIndicator size="large" color="#FFC107" />
      ) : error ? (
        <Text className = 'text-white bg-red-500 px-1.5 py-2 rounded-lg text-lg font-pmedium'>{error}</Text>
      ) : (
        <>
          <Text className='text-3xl font-pbold mt-10'>My Account</Text>
          <TouchableOpacity
          onPress={handlelogout}
          className='bg-red-500 px-1.5 w-1/2 rounded-lg py-2'>
            <Text className='text-xl text-white font-pbold text-center'>Logout</Text>
          </TouchableOpacity>
          <View className='mt-10'>
            <Text className='text-xl font-bold'>Username: 
              <Text className='text-lg font-pmedium ml-2'>{userInfo?.username}</Text>
            </Text>
            <Text className='text-xl font-bold'>First Name: 
              <Text className='text-lg font-pmedium ml-2'>{userInfo?.first_name}</Text>
            </Text>
            <Text className='text-xl font-bold'>Last Name: 
              <Text className='text-lg font-pmedium ml-2'>{userInfo?.last_name}</Text>
            </Text>
            <Text className='text-xl font-bold'>Email: 
              <Text className='text-lg font-pmedium ml-2'>{userInfo?.email}</Text>
            </Text>
            <Text className='text-xl font-bold'>Address: 
              <Text className='text-lg font-pmedium ml-2'>{userInfo?.address}</Text>
            </Text>
            <Text className='text-xl font-bold'>Zip code: 
              <Text className='text-lg font-pmedium ml-2'>{userInfo?.zipcode}</Text>
            </Text>
            <Text className='text-xl font-bold'>Phone Number: 
              <Text className='text-lg font-pmedium ml-2'>{userInfo?.phone}</Text>
            </Text>
            <Text className='text-xl font-bold'>Place: 
              <Text className='text-lg font-pmedium ml-2'>{userInfo?.place}</Text>
            </Text>
          </View>
        </>
      )}
      <View className='mt-10'>
        <Text className='text-3xl font-pbold flex items-center justify-center mt-5'>My Orders</Text>
        {loadingOrders ? ( 
          <Spinner />
        ) : errorOrders ? (
          <Text className='bg-red-500 px-1.5 w-1/2 rounded-lg py-2'>{errorOrders}</Text>
        ) : orders && orders.length > 0 ? (
          orders.map((order)=> (
            <View key={order.id} className='border border-gray-300 p-4 rounded-lg'>
              <Text className='text-lg font-pmedium'>Date: {new Date(order.created_at).toLocaleDateString()}</Text>
              <Text className='text-lg font-pmedium'>Status: {order.status}</Text>

              <View>
                {order.items.map((item)=> (
                  <View key={item.id} className='flex-row flex justify-between mb-2'>
                    <Text className='text-lg font-medium'>{item.product.title}</Text>
                    <Text className='text-lg font-medium'>Qty: {item.quantity}</Text>
                    <Text className='text-lg font-medium'>KES {item.price}</Text>
                  </View>
                ))}
              </View>
              <View className="bg-gray-100 p-3 mt-3">
                <Text className="text-lg">Subtotal: {order.total_quantity}</Text>
                <Text className="text-lg">Paid: {order.paid_amount || 'Not Paid'}</Text>
              </View>
            </View>
          
          ))
        ) : (
          <Text className='text-2xl font-bold text-gray-500 text-center'>You don't have any orders yet...</Text>
        )
      }
      </View>
    </ScrollView>
  )
}

export default MyAccount