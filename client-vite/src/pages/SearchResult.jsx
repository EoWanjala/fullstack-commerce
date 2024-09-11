import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { searchProducts } from '../actions/productsActions';
import { FeaturedProducts, Spinner } from '../components';

const SearchResults = () => {
  const { query } = useParams(); 
  const dispatch = useDispatch();

  const [instock, setInstock] = useState(false);
  const [priceFrom, setPriceFrom] = useState(0); 
  const [priceTo, setPriceTo] = useState(100000); 
  const [sorting, setSorting] = useState('-date_added'); 

  const { loading, error, products } = useSelector((state) => state.searchProductReducer);

  useEffect(() => {
    if (query) {
      dispatch(searchProducts(query, instock, priceFrom, priceTo, sorting));
    }
  }, [dispatch, query, instock, priceFrom, priceTo, sorting]);

  return (
    <div className="search-results-container pt-20 px-4 md:px-8">
      <div className="filter-section mb-6 p-4 bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Filters</h2>
        <label className="flex items-center mb-2">
          <input
            type="checkbox"
            checked={instock}
            onChange={(e) => setInstock(e.target.checked)}
            className="mr-2"
          />
          In Stock
        </label>
        <div className="flex flex-col md:flex-row md:space-x-4">
          <label className="flex flex-col mb-2">
            Price From:
            <input
              type="number"
              value={priceFrom}
              onChange={(e) => setPriceFrom(e.target.value)}
              className="border border-gray-300 rounded p-2"
            />
          </label>
          <label className="flex flex-col mb-2">
            Price To:
            <input
              type="number"
              value={priceTo}
              onChange={(e) => setPriceTo(e.target.value)}
              className="border border-gray-300 rounded p-2"
            />
          </label>
          <label className="flex flex-col mb-2">
            Sort By:
            <select value={sorting} onChange={(e) => setSorting(e.target.value)} className="border border-gray-300 rounded p-2">
              <option value="-date_added">Newest</option>
              <option value="price">Price (Low to High)</option>
              <option value="-price">Price (High to Low)</option>
            </select>
          </label>
        </div>
      </div>

      {loading ? (
        <p className="text-center text-gray-500"><Spinner /></p>
      ) : error ? (
        <p className="text-center text-red-500">Error: {error}</p>
      ) : products && products.length > 0 ? (
        <div className="product-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <FeaturedProducts key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No products found for "{query}".</p>
      )}
    </div>
  );
};

export default SearchResults;
