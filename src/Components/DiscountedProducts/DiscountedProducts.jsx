import styles from "./DiscountedProducts.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { IoCartOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";
import useProducts from "../../Hooks/useProducts";
import useWishList from "../../Hooks/useWishList";
import useCart from "../../Hooks/useCart";
import { IoMdHeart } from "react-icons/io";

export default function DiscountedProducts() {

  const userToken = localStorage.getItem('userToken')

  const { data, isLoading } = useProducts(
    "https://ecommerce.routemisr.com/api/v1/products",
    "recentProducts"
  );

  const { wishListResponse , addToWishListResponse, deleteFromWishListResponse} = useWishList()
  const { addResponse } = useCart();

  const { data: wishList } = wishListResponse;
  console.log(wishList)
  const { mutate: addCart } = addResponse;
  const { mutate: deleteFromWishList } = deleteFromWishListResponse;
  const { mutate: addToWishList } = addToWishListResponse;

  const handleAddCart = (id) => {
    addCart({ productId: id });
  };

  const handleAddtoWishList = (id) => {
    addToWishList({ productId: id })
  }

  const handleDeleteFromWishList = (id) => {
    deleteFromWishList({ productId: id })
  }

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <h3 className="mb-0 mt-8 ms-3 text-xl md:text-2xl font-semibold text-center md:text-start">
            Today's big deals
          </h3>

          <section className="relative">
            <Swiper
              modules={[Navigation]}
              navigation={true}
              breakpoints={{
                640: {
                  slidesPerView: 0,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerGroup: 2,
                  slidesPerView: 2,
                  spaceBetween: 0,
                },
                1024: {
                  slidesPerGroup: 4,
                  slidesPerView: 4,
                  spaceBetween: 20,
                },
              }}
              className="mySwiper !static"
            >
              {data?.map(
                (product, index) =>
                  product.priceAfterDiscount &&
                  product.ratingsAverage >= 4 && (
                    <SwiperSlide key={product.id} className="py-5 ps-3 select-none !z-[1] ">
                      <div
                        className={`${styles.product} lg:space-y-0 pb-2 border border-zinc-200 rounded-2xl overflow-hidden`}
                      >
                        {userToken && wishList?.data?.length > 0 ? wishList?.data.map((item) => (item.id == product?.id) ?
                          <button key={item.id} onClick={() => handleDeleteFromWishList(product?.id)}>
                            <IoMdHeart className={`${styles.delete_favorite_icon} text-2xl md:text-xl`} />
                          </button> : (
                            <button key={item.id} onClick={() => handleAddtoWishList(product?.id)}>
                              <IoMdHeart className={`${styles.add_favorite_icon} text-2xl md:text-xl`} />
                            </button>
                          )
                        ) : (
                          <button onClick={() => handleAddtoWishList(product?.id)}>
                            <IoMdHeart className={`${styles.add_favorite_icon} text-2xl md:text-xl`} />
                          </button>
                        )}

                        <Link to={`/productdetails/${product.id}`}>
                          <div className="relative ">
                            <img
                              src={product.imageCover}
                              alt={product.title}
                              className="mt-0 border-b border-zinc-200 max-h-[350px]  w-full object-fill"
                            />
                          </div>

                          <div className="px-3 py-2 space-y-2">
                            <h3 className="text-sm font-medium line-clamp-1 ">
                              {product.title}
                            </h3>
                            {product.priceAfterDiscount ? (
                              <>
                                <div className="flex items-center justify-between">
                                  <div className="flex flex-col items-start">
                                    <span className="text-[#0f743b] text-xl font-semibold">
                                      EGP{" "}
                                      {product.priceAfterDiscount.toFixed(2)}
                                    </span>
                                    <div className="flex gap-3 items-center">
                                      <span className="line-through text-gray-700 text-sm">
                                        EGP {product.price.toFixed(2)}
                                      </span>
                                      <span className="bg-[#a0e193] py-1 px-3 text-[11px] rounded-full font-semibold">
                                        {(
                                          ((product.price -
                                            product.priceAfterDiscount) /
                                            product.price) *
                                          100
                                        ).toFixed(0)}
                                        % Off
                                      </span>
                                    </div>
                                  </div>
                                  <div className="text-sm space-x-2 text-end">
                                    <span className="font-semibold">
                                      {product.ratingsAverage}
                                    </span>
                                    <span>
                                      <i className="fa fa-star text-[#ffc908]"></i>
                                    </span>
                                    <span className="text-[12px]">
                                      ({product.ratingsQuantity})
                                    </span>
                                  </div>
                                </div>
                              </>
                            ) : (
                              <div className="flex justify-between items-center">
                                <span className="text-[#0f743b] text-sm font-semibold">
                                  EGP {product.price.toFixed(2)}
                                </span>
                                <div className="text-sm space-x-2 text-end">
                                  <span className="font-semibold">
                                    {product.ratingsAverage}
                                  </span>
                                  <span>
                                    <i className="fa fa-star text-[#ffc908]"></i>
                                  </span>
                                  <span className="text-[12px]">
                                    ({product.ratingsQuantity})
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
                    </SwiperSlide>
                  )
              )}
            </Swiper>
          </section>
        </>
      )}
    </>
  );
}
