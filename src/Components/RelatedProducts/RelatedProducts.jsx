import React from 'react'
import styles from './RelatedProducts.module.css'
import useProducts from '../../Hooks/useProducts'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from "swiper/modules";
import { IoMdHeart } from 'react-icons/io';
import { Link, useParams } from 'react-router-dom';
import { IoCartOutline } from 'react-icons/io5';
import useCart from '../../Hooks/useCart';
import useWishList from '../../Hooks/useWishList';
import 'swiper/css';

export default function RelatedProducts({ categoryName }) {

  let { data: products } = useProducts(`https://ecommerce.routemisr.com/api/v1/products`, `getRelatedProducts`);

  const { mutate: addCart } = useCart('post');
  const { mutate: addToWishList } = useWishList('post');

  const handleAddCart = (id) => {
    addCart({ productId: id });
  };

  const handleAddtoWishList = (id) => {
    addToWishList({ productId: id })
  }
  return <>
    <section className='pt-20 p-8 lg:px-14 container'>
      <h2 className='md:text-3xl font-serif ms-4 font-normal'>You may also like</h2>
      <div className="relative">
        <Swiper
          modules={[Navigation]}
          navigation={true}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerGroup: 2,
              slidesPerView: 3,
              spaceBetween: 0,
            },
            1024: {
              slidesPerGroup: 1,
              slidesPerView: 5,
              spaceBetween: 10,
            },
          }}
          className="mySwiper !static"
        >
          {products?.filter((product) => product?.category?.name === categoryName)
            ?.map((product) => (
              <SwiperSlide key={product?.id} className="py-5 ps-3 select-none !z-[1] ">
                <div className=" p-2 md:p-4 lg:p-2 !pt-4 ">
                  <div
                    className={`${styles.product} pb-2 border border-zinc-200 rounded-2xl overflow-hidden h-[510px] md:h-[370px] lg:h-[380px] 2xl:h-[450px]`}
                  >
                    <button onClick={() => handleAddtoWishList(product?.id)}>
                      <IoMdHeart className={`${styles.card_favorite_icon} text-2xl md:text-xl`} />
                    </button>
                    <Link to={`/productdetails/${product?.id}`}>
                      <div className="relative ">
                        <img
                          src={product?.imageCover}
                          alt={product?.title}
                          className="mt-0 border-b border-zinc-200 md:max-h-[350px] w-full"
                        />
                      </div>

                      <div className="px-3 py-2 space-y-2">
                        <h3 className="text-sm font-medium line-clamp-1 ">
                          {product?.title}
                        </h3>
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
                    </Link>
                    <button
                      className={`${styles.card_add} flex gap-2 justify-center items-center text-sm text-white font-semibold bg-[#222] px-5 py-2 mx-auto hover:bg-opacity-75 z-[9999999999999999999]`}
                      onClick={() => handleAddCart(product.id)}
                    >
                      <span>Quick Add</span>
                      <IoCartOutline className="text-lg font-semibold" />
                    </button>
                  </div>
                </div >
              </SwiperSlide>))
          }
        </Swiper>
      </div>
    </section>
  </>
}
