import { View, Text, FlatList } from 'react-native';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategoryDetail } from '../../actions/productsActions';
import { SafeAreaView } from 'react-native-safe-area-context';
import Spinner from '../../components/Spinner';
import FeaturedProducts from '../../components/FeaturedProducts';
import { useLocalSearchParams } from 'expo-router';

const CategoryDetailScreen = () => {
  const { slug } = useLocalSearchParams();


  const dispatch = useDispatch();

  const categoryDetailReducer = useSelector((state) => state.categoryDetailReducer);
  const { category, loading, error, products } = categoryDetailReducer;

  useEffect(() => {
    console.log("Slug:", slug);
    if (slug) {
      dispatch(getCategoryDetail(slug));
    }
  }, [dispatch, slug]);

  const renderProduct = ({ item }) => <FeaturedProducts product={item} />;

  return (
    <SafeAreaView>
      <View>
        {loading ? (
          <Spinner />
        ) : error ? (
          <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
            <Text style={{ backgroundColor: 'red', padding: 4, borderRadius: 4, color: 'white', fontWeight: 'bold' }}>{error}</Text>
          </View>
        ) : (
          <FlatList
            data={products}
            renderItem={renderProduct}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
            ListHeaderComponent={() => (
              <Text style={{ fontSize: 24, fontWeight: 'bold', marginTop: 10, textAlign: 'center' }}>
                {category.title}
              </Text>
            )}
            scrollEnabled={true}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default CategoryDetailScreen;
