import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getProductDetail } from '../actions/productsActions'
import { FeaturedProducts, Spinner } from '../components'
import { addToCart } from '../actions/cartActions'

const ProductDetail = () => {
    const { category_slug, slug } = useParams()
    const dispatch = useDispatch()

    const productDetailReducer = useSelector((state) => state.productDetailReducer)
    const { loading, error, product } = productDetailReducer
    const { loading:relatedProductsLoading, error:relatedProductsError, relatedProducts } = productDetailReducer
    // console.log("Related Products", relatedProducts)
    

    const API_URL = import.meta.env.VITE_BACKEND_API;
    const mainImageUrl = API_URL + product.image

    useEffect(() => {
        dispatch(getProductDetail(category_slug, slug))
    }, [category_slug, slug])

    const handleAddToCart = (productId) => {
        dispatch(addToCart(productId, 1, false)); 
    };

    function numberWithCommas(x) {
        if (x === undefined || x === null) return "0"; 
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    
    return (
        <div className='max-w-7xl mx-auto pb-20 pt-10'>
            {loading && <Spinner />}
            {error ? (
                <div className='bg-grade text-white font-medium px-2 py-1.5 rounded-md flex text-center'>{error}</div>
            ) : (
                <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                    <div className='bg-white shadow-md mt-5 ml-2 rounded-t-lg'>
                        <img src={mainImageUrl} alt={product.title} className='w-full' />
                        {/* Render Additional Product Images */}
                        <div className='flex gap-1 mt-5'>
                            {product.images && product.images.map((img, index) => (
                                <div key={index} className=''>
                                    <img
                                        src={API_URL + img.image}
                                        alt={`Product image ${index + 1}`}
                                        className='w-[200px]'
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className='mt-5 mx-3'>
                        <div className='flex flex-row relative'>
                            <h1 className='text-2xl font-bold'>{product.title}</h1>
                            <p className='flex absolute right-1 mb-3'>
                                <span className='mt-1 text-2xl font-bold text-green-400 mr-2'>{product.rating}</span>
                                <svg className="w-9 h-9 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                                </svg>
                            </p>
                        </div>
                        <div className='pt-5'>
                        <h1 className='text-3xl font-bold'>KES {numberWithCommas(product.price)}</h1>

                            <p className='text-lg font-medium text-gray-600 tracking-wide'>{product.description}</p>
                            <p className='text-lg font-medium tracking-wide my-2'>Available: {product.num_available}</p>

                            <button
                           onClick={() => handleAddToCart(product.id)}
                            className='bg-grade px-2 py-1.5 text-white rounded-md hover:bg-red-400 mt-2 font-medium'>Add to Cart</button>
                        </div>

                        {/* Render Product Variants */}
                        {product.variants && product.variants.length > 0 && (
                            <div className='mt-8'>
                                <h2 className='text-lg font-bold mb-3'>Available Variants:</h2>
                                <div className='grid grid-cols-2 gap-4'>
                                    {product.variants.map((variant) => (
                                        <div key={variant.id} className='border p-4 rounded-lg shadow-sm'>
                                            <img src={API_URL + variant.thumbnail} alt={variant.title} className='w-full mb-2'/>
                                            <h3 className='font-medium'>{variant.title}</h3>
                                            <p className='text-2xl font-bold'>Price: KES {numberWithCommas(product.price)}</p>
                                            <p className='text-md font-medium'>Available: {variant.num_available}</p>
                                            <button onClick={() => handleAddToCart(variant.id)} className='bg-grade px-2 py-1.5 text-white font-medium rounded-lg hover:bg-red-400'>
                                            Add to Cart
                                        </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
            <hr className='my-5 rounded-full h-px bg-gray-500 shadow'/>
            {relatedProductsLoading && <Spinner />}
            {relatedProductsError && <div className="text-white bg-grade px-2 py-1.5">{relatedProductsError}</div>}
            <h1 className='mx-2 text-3xl font-bold tracking-wide'>Related Products</h1>
            <div className='flex flex-col md:flex-row items-center justify-center'>
              {relatedProducts && relatedProducts.map((product) => (
                <div key={product.id} className='w-full p-2'>
                  <FeaturedProducts product={product} />
                  </div>
              ))}
            </div>
        </div>
    )
}

export default ProductDetail
