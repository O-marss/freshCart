import React, { useEffect, useRef, useState } from 'react'
import styles from '../Navbar/Navbar.module.css'
import { FiSearch } from 'react-icons/fi';
import useProducts from '../../Hooks/useProducts';
import { Link } from 'react-router-dom';

export default function MobileSearchBar({ hideOverlay, showOverlay }) {
  const [isFocused, setIsFocused] = useState(false);
  const userToken = localStorage.getItem('userToken')
  const [searchValue, setSearchValue] = useState('')
  const { data } = useProducts(`https://ecommerce.routemisr.com/api/v1/products`, `getSearchProducts`);
  const menuRef = useRef(null);

  const handleBlur = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.relatedTarget)) {
      setSearchValue('');
    }
  };

  useEffect(() => {
    (searchValue ? showOverlay() : hideOverlay())
  }, [searchValue])

  return <>
    <div
      className={`${styles.nav_search
        } bg-white flex-1 items-center rounded-full border-2 border-[#222] m-1 relative z-[99999] ${userToken ? "flex" : "hidden"
        } md:hidden`}
      ref={menuRef} tabIndex={-1} onBlur={handleBlur}

    >
      <input
        type="search"
        className={`${styles.nav_search_bar} w-full ps-1 md:ps-4 py-2.5 md:py-3 rounded-full outline-none text-sm font-light md:text-[16px] transition-all placeholder:text-sm  placeholder:font-normal md:placeholder:ps-2 placeholder:text-[16px] md:placeholder:text-[16px] placeholder:font-sans`}
        placeholder="Search"
        value={searchValue}
        onFocus={() => setIsFocused(true)}
        onBlur={() => {
          setIsFocused(false)
          setSearchValue('')
        }}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <div
        className={`${styles.search_icon} bg-main rounded-full p-[0.4rem] me-1`}
      >
        <FiSearch className=" text-md md:text-2xl text-white" />
      </div>

      {/* Search Output */}
      <div className={`absolute top-14 left-0 right-0 md:-left-20 md:-right-20 lg:left-0 lg:right-0  bg-white z-[9999]  mx-auto flex flex-col gap-5 p-5 transition-all h-0 opacity-0 rounded-xl ${searchValue && "!max-h-[400px] !h-auto overflow-y-auto opacity-100"}`}>
        {data?.filter((product) => searchValue.trim().toLowerCase() === '' ? '' : product.title.toLowerCase().startsWith(searchValue.trim().toLowerCase())).map((product) =>
          <Link className='flex gap-3 items-center justify-start hover:bg-black hover:bg-opacity-5'>
            <div className='w-1/4 lg:w-1/12'>
              <img src={product.imageCover} alt="" className='' />
            </div>

            <div className='w-3/4'>
              <p>{product.title}</p>
              {product?.priceAfterDiscount ? (
                <>
                  <div className="flex flex-col items-start justify-between">
                    <div className="flex flex-col items-start">
                      <span className="text-[#0f743b] text-sm md:text-xl font-semibold">
                        EGP{" "}
                        {product?.priceAfterDiscount.toFixed(2)}
                      </span>
                      <div className="flex gap-1 md:gap-3 items-center">
                        <span className="line-through text-gray-700 text-[12px] md:text-sm">
                          EGP {product?.price.toFixed(2)}
                        </span>
                        <span className="text-[11px] rounded-full font-semibold">
                          (
                          {(
                            ((product?.price -
                              product?.priceAfterDiscount) /
                              product?.price) *
                            100
                          ).toFixed(0)}
                          % Off
                          )
                        </span>
                      </div>
                    </div>
                    <div className="text-sm space-x-2 text-end">
                      <span className="font-semibold">
                        {product?.ratingsAverage}
                      </span>
                      <span>
                        <i className="fa fa-star text-[#ffc908]"></i>
                      </span>
                      <span className="text-[12px]">
                        ({product?.ratingsQuantity})
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex flex-col justify-between items-start ">
                  <span className="text-[#0f743b] text-sm md:text-xl font-semibold">
                    EGP {product?.price.toFixed(2)}
                  </span>
                  <div className="text-sm space-x-2 text-end">
                    <span className="font-semibold">
                      {product?.ratingsAverage}
                    </span>
                    <span>
                      <i className="fa fa-star text-[#ffc908]"></i>
                    </span>
                    <span className="text-[12px]">
                      ({product?.ratingsQuantity})
                    </span>
                  </div>
                </div>
              )}
            </div>
          </Link>)}
      </div>
    </div>
  </>
}
