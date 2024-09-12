import { StatusBar } from 'expo-status-bar';
import { Animated, Text, View, FlatList, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useRef } from 'react';
import { getProductIndexList } from '../../actions/productsActions';
import FeaturedProducts from '../../components/FeaturedProducts';
import Spinner from '../../components/Spinner';
import Search from "../../components/Search";
import Carousel from '../../components/Carousel';
import { listCategories } from '../../actions/productsActions';
import { Link } from 'expo-router';

const AnimatedCategoryTitle = ({ title }) => {
  const translateX = useRef(new Animated.Value(300)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(translateX, {
        toValue: -300,
        duration: 10000,
        useNativeDriver: true,
      })
    ).start();
  }, [translateX]);

  return (
    <Animated.View style={{ transform: [{ translateX }] }}>
      <Text className='text-secondary text-md font-pbold'>{title}</Text>
    </Animated.View>
  );
};

export default function Home() {
  const dispatch = useDispatch();
  const producstIndexReducer = useSelector((state) => state.producstIndexReducer);
  const { loading: featuredProductsLoading, error: featuredProductsError, featuredProducts } = producstIndexReducer;

  const categoryListReducer = useSelector((state) => state.categoryListReducer);
  const { loading: categoryListLoading, error: categoryListError, categories } = categoryListReducer;

  useEffect(() => {
    dispatch(getProductIndexList());
  }, [dispatch]);

  useEffect(() => {
    dispatch(listCategories());
  }, [dispatch]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '' }} className='bg-white'>
      <View>
        <Text className='text-4xl font-pbold mt-10 ml-3'>Find The Most </Text>
        <Text className='text-4xl font-pbold ml-3 text-red-500'>Reliable Assets </Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', padding: 10 }} className='bg-[#2C2C2C] px-2 py-2 rounded-lg pt-2'>
          {categories.map(category => (
            <Link key={category.id} href={`category/${category.slug}`} className='flex-1'>
              <AnimatedCategoryTitle title={category.title} />
            </Link>
          ))}
        </View>
        <Search />
      </View>
      <ScrollView style={{ flex: 1 }}>
        <View style={{ height: 300 }}>
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
              renderItem={({ item }) => <FeaturedProducts product={item} />}
              keyExtractor={(item) => item.id.toString()}
              numColumns={2}
              contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
              ListHeaderComponent={() => (
                <Text style={{ fontSize: 24, fontWeight: 'bold', marginTop: 10, textAlign: 'center' }}>
                  Featured Products
                </Text>
              )}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
