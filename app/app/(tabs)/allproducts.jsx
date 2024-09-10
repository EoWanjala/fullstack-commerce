import { View, Text, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react'
import Search from '../../components/Search'
import { allproducts } from '../../actions/productsActions';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FeaturedProducts from '../../components/FeaturedProducts';
import Spinner from '../../components/Spinner';

const ProductList = () => {
  const dispatch = useDispatch()

  const allproductsReducer = useSelector((state) => state.allproductsReducer)
  const { loading, error, products } = allproductsReducer

  useEffect(()=> {
    dispatch(allproducts());
  }, [dispatch])

  const renderProduct = ({ item }) => <FeaturedProducts product={item} />

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '' }} className='bg-white'>
      <View className='pt-20'>
        <Search />
      </View>
      <View style={{ flex: 1 }}>
        {loading ? (
          <Spinner /> 
        ) : error ? (
          <View className='bg-red-500 px-1.5 py-2 rounded-lg'>
            <Text className='text-center text-white font-pmedium'>{error}</Text>
          </View>
        ) : (
          <FlatList 
          data= {products}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
          ListHeaderComponent={() => (
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginTop: 10, textAlign: 'center' }}>
              Happy Shopping !!
            </Text>
          )}
          scrollEnabled={true}
          showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </SafeAreaView>
  )
}

export default ProductList