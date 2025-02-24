import React from 'react'
import styles from './ProductCard.module.css'
import { Link } from 'react-router-dom'
import { IoCartOutline } from 'react-icons/io5'
import { IoMdHeart } from 'react-icons/io'
import useWishList from '../../Hooks/useWishList'
import useCart from '../../Hooks/useCart'

export default function ProductCard({ product }) {
  const userToken = localStorage.getItem('userToken');

  const { wishListResponse, addToWishListResponse, deleteFromWishListResponse } = useWishList();
  const { cartResponse, addResponse, deleteResponse } = useCart();
  const { data: cartData } = cartResponse;
  const { mutate: addCart } = addResponse;
  const { mutate: deleteCart } = deleteResponse;
  const { data } = wishListResponse;
  const { mutate: deleteProductFromWishList } = deleteFromWishListResponse;
  const { mutate: addToWishList } = addToWishListResponse;

  const handleAddtoWishList = (id) => {
    addToWishList({ productId: id })
  }

  const handleDeleteFromWishList = (id) => {
    deleteProductFromWishList({ productId: id })
  }

  const handleAddCart = (id) => {
    addCart({ productId: id });
  };

  const handleDeleteCart = (id) => {
    deleteCart({ productId: id });
  };

  return (
    <>
      <div className="w-1/2 md:w-4/12 lg:w-3/12 p-2 md:p-4 lg:p-2 !pt-4 ">
        <div
          className={`${styles.product} pb-2 border border-zinc-200 rounded-2xl overflow-hidden h-[355px] md:h-[420px] lg:h-[460px]`}
        >
          {userToken && data?.data.length > 0 ? <button onClick={() =>
            data?.data.some((item) => item.id === product?.id)
              ? handleDeleteFromWishList(product?.id)
              : handleAddtoWishList(product?.id)
          }>
            <IoMdHeart className={`${data?.data.some((item) => item.id === product?.id)
              ? styles.delete_favorite_icon
              : styles.add_favorite_icon} text-2xl md:text-xl`}
            />
          </button> : (
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
            onClick=
            {cartData?.data?.products?.some((item) => item.product?.id === product?.id) ? () => handleDeleteCart(product?.id) : () => handleAddCart(product?.id)}
          >
            {cartData?.data?.products?.some((item) => item.product?.id === product?.id) ? <span>Remove from</span> : <span>Quick Add</span>}
            <IoCartOutline className="text-lg font-semibold" />
          </button>
        </div>
      </div>
    </>
  )
}
