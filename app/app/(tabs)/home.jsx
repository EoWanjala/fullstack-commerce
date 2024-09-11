import { StatusBar } from 'expo-status-bar';
import { Text, View, FlatList, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { getProductIndexList } from '../../actions/productsActions';
import FeaturedProducts from '../../components/FeaturedProducts';
import Spinner from '../../components/Spinner';
import Search from "../../components/Search";
import Carousel from '../../components/Carousel';

export default function Home() {
  const dispatch = useDispatch();
  const producstIndexReducer = useSelector((state) => state.producstIndexReducer);

  const { loading: featuredProductsLoading, error: featuredProductsError, featuredProducts } = producstIndexReducer;

  useEffect(() => {
    dispatch(getProductIndexList());
  }, [dispatch]);

  const renderProduct = ({ item }) => <FeaturedProducts product={item} />;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '' }} className='bg-white'>
      <View>
        <Text className='text-4xl font-pbold mt-10 ml-3'>Find The Most </Text>
        <Text className='text-4xl font-pbold ml-3 text-red-500'>Reliable Assets </Text>
        <View className='pt-2'>
          <Search />  
        </View> 
      </View>
      <ScrollView style={{ flex: 1 }}>
      <View style={{ height: 300 }} className=''> 
        <View>
          
        </View>
          <Carousel />
        </View>
        <View style={{ flex: 1 }}>
          {featuredProductsLoading ? (
            <Spinner />
          ) : featuredProductsError ? (
            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
              <Text style={{ backgroundColor: 'red', padding: 8, borderRadius: 8, color: 'white', fontWeight: 'bold' }}>
                {featuredProductsError}
              </Text>
            </View>
          ) : (
            <FlatList
              data={featuredProducts}
              renderItem={renderProduct}
              keyExtractor={(item) => item.id.toString()}
              numColumns={2}
              contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
              ListHeaderComponent={() => (
                <Text style={{ fontSize: 24, fontWeight: 'bold', marginTop: 10, textAlign: 'center' }}>
                  Featured Products
                </Text>
              )}
              scrollEnabled={false} // Disable scrolling for FlatList
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
