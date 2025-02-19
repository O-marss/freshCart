import React, { useEffect, useState } from 'react'
import style from './Products.module.css'
import useProducts from '../../Hooks/useProducts';
import ReactPaginate from 'react-paginate';
import ProductCard from '../ProductCard/ProductCard';
import Loading from '../Loading/Loading';
import logo from "../../assets/images/freshcart-logo.svg";
import useSorting from '../../Hooks/useSorting';
import Sorting from '../Sorting/Sorting';

export default function Products() {

  let { data: products, isLoading } = useProducts(
    `https://ecommerce.routemisr.com/api/v1/products`,
    `allProducts`
  );

  const { handleSorting } = useSorting();
  const [sortValue, setSortValue] = useState('default');
  const [sortedProducts, setSortedProducts] = useState([]);
  useEffect(() => {
    if (products) {
      const sorted = handleSorting([...products], sortValue);
      setSortedProducts(sorted);
    }
  }, [sortValue, products]);

  function PaginatedItems({ itemsPerPage }) {
    const [itemOffset, setItemOffset] = useState(0);
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = sortedProducts?.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(sortedProducts?.length / itemsPerPage);

    const handlePageClick = (event) => {
      const newOffset =
        (event.selected * itemsPerPage) % sortedProducts?.length;
      setItemOffset(newOffset);
    };

    return (
      <>
        <div className='flex flex-wrap justify-center'>
          {currentItems.map((product) =>
            <ProductCard
              key={product.id}
              product={product}
            />)}
        </div>
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          containerClassName="pagination"
          activeClassName="active"
        />
      </>
    );
  }

  return (
    <div className='pt-20 mt-12 lg:px-14 container'>
      <div className='px-8 lg:px-0 pb-8 lg:pb-0'>
        <span className='text-2xl lg:text-4xl text-start font-semibold text-main'>All our Products</span>
        <p className='text-gray-600 '>Quality, innovation, and reliability—experience the best with all our products.</p>
      </div>
      <>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <Sorting sortValue={sortValue} setSortValue={setSortValue} />
            <div>
              <div>
                {sortedProducts?.length ? (
                  <PaginatedItems itemsPerPage={12} />
                ) : (
                  <div className="flex flex-col items-center pt-12">
                    <img src={logo} alt="" width={500} className="p-12" />
                    <p className="text-xl md:text-xl lg:text-2xl text-center mb-5 md:mb-2">
                      We’re sorry, but the products in this category are unavailable
                      right now.
                    </p>
                    <p className="md:text-lg text-gray-600 text-center">
                      In the meantime, feel free to explore other categories or
                      reach out to us for more help
                    </p>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </>
    </div>
  )

}
