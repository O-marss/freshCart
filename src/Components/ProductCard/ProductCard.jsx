import React from 'react'
import styles from './ProductCard.module.css'
import { Link } from 'react-router-dom'
import { IoCartOutline } from 'react-icons/io5'
import { IoMdHeart } from 'react-icons/io'
import useWishList from '../../Hooks/useWishList'
import useCart from '../../Hooks/useCart'

export default function ProductCard({ product, favoriteList }) {

  const { data } = useWishList('get')
  const { mutate: addCart } = useCart('post');
  const { mutate: deleteFromWishList } = useWishList('delete');
  const { mutate: addToWishList } = useWishList('post');

  const handleAddtoWishList = (id) => {
    addToWishList({ productId: id })
  }

  const handleDeleteFromWishList = (id) => {
    deleteFromWishList({ productId: id })
  }

  const handleAddCart = (id) => {
    addCart({ productId: id });
  };

  return (
    <>
      <div className="w-1/2 md:w-4/12 lg:w-3/12 p-2 md:p-4 lg:p-2 !pt-4 ">
        <div
          className={`${styles.product} pb-2 border border-zinc-200 rounded-2xl overflow-hidden h-[355px] md:h-[420px] lg:h-[460px]`}
        >
          {data.data.length > 0 ? data?.data.map((item) => item.id == product?.id ? <button onClick={() => handleDeleteFromWishList(product?.id)}  ><IoMdHeart className={`${styles.delete_favorite_icon} text-2xl md:text-xl`} /></button> : (
            <button onClick={() => handleAddtoWishList(product?.id)}>
              <IoMdHeart className={`${styles.add_favorite_icon} text-2xl md:text-xl`} />
            </button>
          )

          ) : (
            <button onClick={() => handleAddtoWishList(product?.id)}>
              <IoMdHeart className={`${styles.add_favorite_icon} text-2xl md:text-xl`} />
            </button>
          )}
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
            className={`${styles.card_add} flex gap-2 justify-center items-center text-sm text-white font-semibold bg-[#222] px-5 py-2 mx-auto hover:bg-opacity-75 z-[999]`}
            onClick={() => handleAddCart(product.id)}
          >
            <span>Quick Add</span>
            <IoCartOutline className="text-lg font-semibold" />
          </button>
        </div>
      </div >
    </>
  )
}
