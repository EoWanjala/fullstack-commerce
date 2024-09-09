import React, { useEffect } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetail } from '../../../../actions/productsActions';
import { useLocalSearchParams } from 'expo-router';
import Spinner from '../../../../components/Spinner';
import FeaturedProducts from '../../../../components/FeaturedProducts';
import { addToCart } from '../../../../actions/cartActions';

const ProductDetailScreen = () => {
    const { category_slug, slug } = useLocalSearchParams();
    const dispatch = useDispatch();
  
    const productDetailReducer = useSelector((state) => state.productDetailReducer);
    const { loading, error, product, relatedProducts } = productDetailReducer;
  
    useEffect(() => {
      if (category_slug && slug) {
        dispatch(getProductDetail(category_slug, slug));
      }
    }, [dispatch, category_slug, slug]);
  
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;
    const fullImageUrl = apiUrl + product.image;

    const handleAddToCart = (productId) => {
      dispatch(addToCart(productId, 1, false))
    }
  
    function numberWithCommas(x) {
      if (x === undefined || x === null) return 'N/A';
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  
    const renderItem = ({ item }) => <FeaturedProducts product={item} />;
  
    const renderHeader = () => (
      <>
      {loading ? (
        <Spinner /> 
      ) : (
        error ? (
          <Text className='text-white bg-red-500 px-1.5 py-2 rounded-lg'>{error}</Text>
        ) :(
          <>
          <View style={{ padding: 10 }} className='pt-20'>
            <Image source={{ uri: fullImageUrl }} style={{ width: '100%', height: 300, borderRadius: 8 }} />
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginVertical: 8 }}>{product.title}</Text>
            <Text style={{ fontSize: 20, color: 'black', marginBottom: 8 }} className='font-pbold'>KES {numberWithCommas(product.price)}</Text>
            <Text style={{ fontSize: 16, color: 'black' }} className='text-lg'>{product.description}</Text>
            <TouchableOpacity
            onPress={() => handleAddToCart(product.id)}>
              <Text className='bg-red-600 text-center text-white w-1/2 text-lg py-2 rounded-lg hover:bg-red-400 mt-2 font-pbold'>Add to Cart</Text>
            </TouchableOpacity>
            {product.variants && product.variants.length > 0 && (
            <View className='mt-5'>
              <Text className='text-xl font-pbold mb-3'>Available Variants</Text>
              <View className='grid grid-cols-2 gap-3'>
                {product.variants.map((variant) => (
                  <View key={variant.id} className='border rounded-lg shadow-sm'>
                    <Image source={{ uri: apiUrl + variant.thumbnail }} style={{ width: '100%', height: 300, borderRadius: 8 }} />
                    <Text className='font-pmedium text-xl ml-2 mt-2'>{variant.title}</Text>
                    <Text style={{ fontSize: 20, color: 'black', marginBottom: 8 }} className='font-pbold ml-2'>KES {numberWithCommas(variant.price)}</Text>
                    <Text style={{ fontSize: 20, color: 'black', marginBottom: 8 }} className='font-pbold ml-2'>Available: {variant.num_available}</Text>
                    <TouchableOpacity
                    onPress={()=> handleAddToCart(variant.id)}>
                        <Text className='bg-red-600 text-center text-white w-1/2 text-lg py-2 rounded-lg hover:bg-red-400 mt-2 font-pbold ml-2 mb-2'>Add to Cart</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </View>
            )}
            <Text className='flex items-center justify-center mt-5 text-xl font-pbold'>
              Related Products
            </Text>
        </View>
          </>
        )
      )}
        
        
      </>
    );
  
    return (
      <FlatList
        ListHeaderComponent={renderHeader}
        data={relatedProducts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListHeaderComponentStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      />
    );
  };
  
  export default ProductDetailScreen;