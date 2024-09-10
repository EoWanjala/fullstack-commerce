// AllProducts.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { allproducts } from '../actions/productsActions';
import { FeaturedProducts, Spinner } from '../components';

const AllProduct = () => {
    const dispatch = useDispatch();
    const allproductsReducer = useSelector((state) => state.allproductsReducer);
    const { loading, error, products, page, pages } = allproductsReducer;

    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        dispatch(allproducts(currentPage));
    }, [dispatch, currentPage]);

    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < pages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <div className="container mx-auto pt-20 pb-20">
            <h1 className="text-3xl font-bold flex flex-wrap justify-center tracking-wide">😊 Happy Shopping !!!</h1>
            {loading ? (
                <Spinner />
            ) : error ? (
                <div className="bg-grade py-2 px-1.5 text-xl font-bold rounded-lg font-white">{error}</div>
            ) : (
                <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 h-1/2">
                        {products && products.map((product) => (
                            <div key={product.id} className="flex">
                                <FeaturedProducts product={product} />
                            </div>
                        ))}
                    </div>
                    {/* Pagination Controls */}
                    <div className="flex justify-between py-5">
                        <button
                            onClick={handlePrevious}
                            disabled={currentPage === 1}
                            className={`btn ${currentPage === 1 ? 'disabled' : ''} cursor-pointer text-lg bg-purple-800 text-white px-1.5 py-2 rounded-lg hover:bg-purple-500 font-medium`}
                        >
                            Previous
                        </button>
                        <span className='text-xl font-medium'>Page {page} of {pages}</span>
                        <button
                            onClick={handleNext}
                            disabled={currentPage === pages}
                            className={`btn ${currentPage === pages ? 'disabled' : ''} cursor-pointer text-lg font-mediun bg-violet-700 px-1.5 py-2 rounded-md hover:bg-violet-500 text-white`}
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AllProduct;
