import React, { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getCategoryDetail } from '../actions/productsActions'
import Spinner from "../components/Spinner"
import FeaturedProducts from '../components/FeaturedProducts'

const CategoryDetail = () => {
    const dispatch = useDispatch()
    const { slug } = useParams()

    const categoryDetailReducer = useSelector((state)=>state.categoryDetailReducer)
    const { category } = categoryDetailReducer
    const { loading, error, products } = categoryDetailReducer


    useEffect(()=> {
        dispatch(getCategoryDetail(slug))
    }, [dispatch, slug])
    
  return (
    <div className='max-w-7xl mx-auto pt-10'>
        <h1 className='text-gray-700 text-4xl font-bold flex items-center justify-center'>{category.title}</h1>
        <div className='mx-3'>
            {loading && <Spinner/>}
            <div>{error ? <div className='bg-grade px-2 py-1.5 rounded-lg text-white'>{error}</div> :
            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2 '>
                {products && products.map((product)=> 
                <div key={product.id} className=''>
                    <Link to={`/product/${category.slug}/${product.slug}/`} className='text-gray-700 hover:text-gray-500'>
                    <FeaturedProducts product={product}/>
                    </Link>
                </div>)}
            </div>}
            </div>
        </div>
        
    </div>
  )
}

export default CategoryDetail