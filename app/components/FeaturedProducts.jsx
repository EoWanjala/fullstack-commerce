import { View, Text, Image } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native';

const FeaturedProducts = ({ product }) => {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  const fullImageUrl = apiUrl + product.image;

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <View style={{ width: '50%', paddingHorizontal: 4, marginBottom: 16 }} className='mt-10'>
      <TouchableOpacity className='flex flex-col bg-white border border-gray-200 rounded-lg shadow overflow-hidden' style={{ height: 420 }}>
        <Image 
          source={{ uri: fullImageUrl }} 
          style={{ width: '100%', height: 200 }}
          resizeMode="cover" 
        />
        <View className='p-4'>
          <View className='text-center'>
            <Text className='text-lg font-bold'>{product.title}</Text>
            <View className='flex flex-row items-center spac-x-1 rtl:space-x-reverse mt-1'>
              <Text>⭐</Text>
              <Text>⭐</Text>
              <Text>⭐</Text>
              <Text>⭐</Text>
              <Text>⭐</Text>
              <Text className='text-xs text-blue-800 font-psemibold px-2.5 py-0.5 rounded'>5.0</Text>
            </View>
            <View className='flex flex-col items-center justify-between mx-3 mt-1'>
              <Text className='text-gray-600 text-lg font-pbold uppercase'>
                KES {numberWithCommas(product.price)}
              </Text>
              <TouchableOpacity className='block text-center font-pbold py-2 text-white'>
               
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default FeaturedProducts;
