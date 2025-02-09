import React, { useEffect, useState } from 'react'
import style from './Favorites.module.css'
import useWishList from '../../Hooks/useWishList'
import Loading from '../Loading/Loading';
import ProductCard from '../ProductCard/ProductCard';
import ReactPaginate from 'react-paginate';
import logo from "../../assets/images/freshcart-logo.svg";

export default function Favorites() {

  const { data, isLoading } = useWishList('get')
  const [favoriteList, setFavoriteList] = useState(true)

  function PaginatedItems({ itemsPerPage }) {
    const [itemOffset, setItemOffset] = useState(0);
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = data?.data?.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(data?.data?.length / itemsPerPage);
    const handlePageClick = (event) => {
      const newOffset =
        (event.selected * itemsPerPage) % products?.length;
      setItemOffset(newOffset);
    };

    return (
      <>
        <div className="flex flex-wrap justify-center">
          {currentItems.map((product) =>
            <ProductCard
              key={product.id}
              product={product}
              favoriteList={favoriteList}
            />
          )}
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

  return <>
    <section className='pt-20 mt-12 lg:px-14 container'>
      <div className='px-8 lg:px-0'>
        <span className='text-2xl lg:text-4xl text-start font-semibold text-main'>Your Favorites</span>
        <p className='text-gray-600 '>A personalized collection of your most-loved products.</p>
      </div>
      {isLoading ? <Loading /> : (
        <>
          <div>
            {data.data.length ? (

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
        </>)
      }
    </section>
  </>
}
