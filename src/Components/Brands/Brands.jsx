import React, { useState } from 'react'
import style from './Brands.module.css'
import useBrands from '../../Hooks/useBrands'
import ReactPaginate from "react-paginate";
import Loading from '../Loading/Loading';
import { Link } from 'react-router-dom';

export default function Brands() {

  let { data: brands, isLoading } = useBrands(`https://ecommerce.routemisr.com/api/v1/brands`, `getAllBrands`);

  function PaginatedItems({ itemsPerPage }) {
    const [itemOffset, setItemOffset] = useState(0);
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = brands?.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(brands?.length / itemsPerPage);
    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % brands?.length;
      setItemOffset(newOffset);
    }

    return <>
      <div className='flex flex-wrap justify-center items-center'>
        {currentItems?.map((brand) =>
        (
          <Link key={brand._id} to={`/specificbrand/${brand._id}`} className=' w-1/2 md:w-1/3 lg:w-1/4 flex justify-center items-center group'>
            <img src={brand.image} alt={brand.name} className=" rounded-xl transition-all group-hover:shadow-xl group-hover:border group-hover:border-[#0aad0a] group-hover:scale-[.7]" />
          </Link>
        )
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
  }
  return (
    <>
      {isLoading ? <Loading /> :
        <>
          <section className='pt-20 mt-12 lg:px-14 container'>
            <div className='px-8 lg:px-0'>

              <span className='text-2xl lg:text-4xl text-start font-semibold text-main'>All our Brands</span>
              <p className='text-gray-600 '>Bringing you a collection of trusted brands, designed to meet your every need</p>
            </div>
            <div className=''>
              <PaginatedItems itemsPerPage={12} />
            </div>
          </section>
        </>
      }
    </>
  )
}
