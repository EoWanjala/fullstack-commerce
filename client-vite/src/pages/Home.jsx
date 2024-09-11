import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductIndexList } from '../actions/productsActions'
import { Spinner, Carousel, Banner } from '../components'
import FeaturedProducts from '../components/FeaturedProducts'
import { headphones, smart, iphone } from '../assets'

import AOS from "aos";
import "aos/dist/aos.css";

const BannerData = {
  discount: "30% OFF",
  title: "Fine Smile",
  date: "10 Jan to 28 Jan",
  image: iphone,
  title2: "Air Solo Bass",
  title3: "Winter Sale",
  title4:
    "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque reiciendis",
  bgColor: "#f42c37",
};

const BannerData2 = {
  discount: "30% OFF",
  title: "Happy Hours",
  date: "14 Jan to 28 Jan",
  image: smart,
  title2: "Smart Solo",
  title3: "Winter Sale",
  title4:
    "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque reiciendis",
  bgColor: "#2dcc6f",
}


const Home = () => {

  React.useEffect(() => {
    AOS.init({
      duration :800,
      easing: 'ease-in-sine',
      delay:100,
      offset: 100
    })
    AOS.refresh()
  }, [])

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
        
        <Banner data = {BannerData}/>
        
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

          <Banner data= {BannerData2} />

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
