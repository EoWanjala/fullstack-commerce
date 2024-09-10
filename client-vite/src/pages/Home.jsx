import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductIndexList } from '../actions/productsActions'
import { Spinner, Carousel } from '../components'
import FeaturedProducts from '../components/FeaturedProducts'

const Home = () => {
  const dispatch = useDispatch()
  const producstIndexReducer = useSelector((state) => state.producstIndexReducer)

  const { loading:featuredProductsLoading, error:featuredProductsError, featuredProducts } = producstIndexReducer

  const { loading:featuredpopularProductsLoading, error:featuredpopularProductsError, popularProducts } = producstIndexReducer

  const { loading:featuredrecentlyViewedProductsLoading, error:featuredrecentlyViewedProductsError, recentlyViewedProducts } = producstIndexReducer

  useEffect(() => {
    dispatch(getProductIndexList())
  }, [dispatch])

  return (
    <>
      <div className='container mx-auto pt-20 pb-10'>
        <Carousel  className=''/>
        <h1 className='text-3xl font-bold flex flex-wrap justify-center tracking-wide'>Featured Products</h1>
        {featuredProductsLoading ? <Spinner/> : featuredProductsError ? (
          <div className='bg-grade py-2 px-1.5 text-xl font-bold rounded-lg font-white'>{featuredProductsError}</div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 h-1/2'>
            {featuredProducts && featuredProducts.map((product) => (
              <div key={product.id} className='flex'>
                <FeaturedProducts product={product}/>
              </div>
            ))}
          </div>
        )}
        
        <hr className='my-8 border-0 rounded block bg-gray-300 h-px'/>
        
          {/* Popular Products */}
        <h1 className='text-3xl font-bold flex flex-wrap justify-center tracking-wide'>Popular Products</h1>
        {featuredpopularProductsLoading ? <Spinner/> : featuredpopularProductsError ? (
          <div className='bg-grade py-2 px-1.5 text-xl font-bold rounded-lg font-white'>{featuredProductsError}</div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2'>
            {popularProducts && popularProducts.map((product) => (
              <div key={product.id} className='flex'>
                <FeaturedProducts product={product}/>
              </div>
            ))}
          </div>
        )}

        <hr className='my-8 border-0 rounded block bg-gray-300 h-px'/>

        {/* Recently Viewed Products */}
        <h1 className='text-3xl font-bold flex flex-wrap justify-center tracking-wide'>Recently Viewed Products</h1>
        {featuredrecentlyViewedProductsLoading ? <Spinner/> : featuredrecentlyViewedProductsError ? (
          <div className='bg-grade py-2 px-1.5 text-xl font-bold rounded-lg font-white'>{featuredProductsError}</div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2'>
            {recentlyViewedProducts && recentlyViewedProducts.map((product) => (
              <div key={product.id} className='flex'>
                <FeaturedProducts product={product}/>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
    
  )
}

export default Home
