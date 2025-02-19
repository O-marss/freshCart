import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from './ProductDetails.module.css'
import Rating from "react-rating";
import { IoIosArrowDown, IoIosArrowUp, IoMdHeart } from "react-icons/io";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Thumbs, FreeMode, Mousewheel } from "swiper/modules";
import Loading from "../Loading/Loading";
import useProducts from "../../Hooks/useProducts";
import useCart from "../../Hooks/useCart";
import RelatedProducts from "../RelatedProducts/RelatedProducts";
import useWishList from "../../Hooks/useWishList";

export default function ProductDetails() {
  let { id } = useParams();
  const [quantity, setQuantity] = useState(0);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const { data: product, isLoading } = useProducts(`https://ecommerce.routemisr.com/api/v1/products/${id}`, `productDetails${id}`)
  const { data: cart } = useCart('get')
  const { mutate: addCart } = useCart('post');
  const { mutate: updateCart, isPending } = useCart('put');
  const { mutate: deleteCartItem, isPending: deletePending } = useCart('delete');
  const { data: wishlist } = useWishList('get');
  const { mutate: addToWishList } = useWishList('post');
  const { mutate: deleteFromWishList } = useWishList('delete');

  const handleAddCart = (id) => {
    addCart({ productId: id });
  };

  const handleUpdateCart = (id, newCount) => {
    updateCart({ productId: id, count: newCount });
  };

  const handleDeleteCart = (id) => {
    deleteCartItem({ productId: id });
  };

  const handleAddtoWishList = (id) => {
    addToWishList({ productId: id })
  }

  const handleDeleteFromWishList = (id) => {
    deleteFromWishList({ productId: id })
  }

  useEffect(() => {
    cart?.data?.products.map((product) => product.product?.id == product?.id ? setQuantity(product.count) : setQuantity(0))
  }, [cart, wishlist])


  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <section className="flex flex-col lg:flex-row items-center justify-center  pt-20 mt-12 p-8 lg:px-14 container">
          <div className="w-full md:w-3/4 lg:w-1/3 flex flex-col-reverse lg:flex-row  items-center gap-14">
            <Swiper
              onSwiper={setThumbsSwiper}
              grabCursor={true}
              freeMode={true}
              watchSlidesProgress={true}
              mousewheel={true}
              modules={[FreeMode, Navigation, Thumbs, Mousewheel]}
              className=" swiper-pics w-full lg:w-1/5 lg:max-h-[500px] cursor-pointer"
              breakpoints={{
                0: {
                  direction: "horizontal",
                  spaceBetween: 3,
                  slidesPerView: 3

                },
                768: {
                  direction: "horizontal",
                  spaceBetween: 5,
                  slidesPerView: 4,
                },
                1024: {
                  direction: "vertical",
                  spaceBetween: 10,
                  slidesPerView: "auto",
                },
              }}
            >

              {product?.images.map((image, index) => (
                <SwiperSlide key={index}>
                  <img src={image} alt={product.title} />
                </SwiperSlide>
              ))}

            </Swiper>
            <Swiper
              modules={[Navigation, Pagination, Thumbs]}
              navigation={true}
              grabCursor={true}
              thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
              slidesPerView={1}
              className="detailsSwiper select-none w-full lg:w-full"
            >
              {product?.images.map((image, index) => (
                <SwiperSlide key={product.id + index}>
                  <div className="flex">
                    <img src={image} alt={product.title} />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="w-full lg:w-1/3 h-full mt-8 lg:mt-0">
            <div className="lg:ps-12 flex flex-col justify-center items-start gap-6">
              <div className="flex items-center justify-between w-full">
                <span className="text-sm font-medium text-gray-400">
                  Pr.ID: {product.id}
                </span>

                {wishlist?.data.length > 0 ? wishlist?.data.map((item) => (item.id == product?.id) ?
                  <button onClick={() => handleDeleteFromWishList(product?.id)}>
                    <IoMdHeart className={`${styles.delete_favorite_icon} text-2xl md:text-xl`} />
                  </button> : (
                    <button onClick={() => handleAddtoWishList(product?.id)}>
                      <IoMdHeart className={`${styles.add_favorite_icon} text-2xl md:text-xl`} />
                    </button>
                  )
                ) : (
                  <button onClick={() => handleAddtoWishList(product?.id)}>
                    <IoMdHeart className={`${styles.add_favorite_icon} text-2xl md:text-xl`} />
                  </button>
                )}
              </div>
              <h3 className="text-2xl font-semibold text-[#222]">
                {product.title}
              </h3>

              <p className="text-sm font-medium text-gray-600 leading-[1.6]">
                {product.description}
              </p>

              <div>
                <Rating
                  readonly
                  initialRating={product.ratingsAverage}
                  emptySymbol={
                    <i className=" fa-regular fa-star text-[#ffc908]"></i>
                  }
                  fullSymbol={<i className="fa fa-star text-[#ffc908]"></i>}
                />
                <span className="ms-4 me-2 font-medium text-main">
                  {product.ratingsAverage}
                </span>
                <span className="text-sm font-medium text-gray-400">
                  ({product.ratingsQuantity} reviews)
                </span>
              </div>
              <div>
                {product.priceAfterDiscount ? (
                  <>
                    <div className="flex items-center gap-6">
                      <div className="flex flex-col items-start">
                        <span className="line-through text-red-600 text-xl font-medium">
                          EGP {product.price.toFixed(2)}
                        </span>
                        <span className="text-[#0f743b] text-2xl font-semibold">
                          EGP {product.priceAfterDiscount.toFixed(2)}
                        </span>
                      </div>
                      <span className="bg-[#a0e193] py-2 px-3 rounded-full font-medium">
                        {(
                          ((product.price - product.priceAfterDiscount) /
                            product.price) *
                          100
                        ).toFixed(0)}
                        % Off
                      </span>
                    </div>
                  </>
                ) : (
                  <span className="text-main text-xl font-semibold">
                    EGP {product.price.toFixed(2)}
                  </span>
                )}
                <p className="text-sm text-gray-400">
                  Shipping and taxes extra
                </p>
              </div>

              <div className="flex items-center">
                <label
                  htmlFor="quantity-input"
                  className="block me-2 text-sm font-medium"
                >
                  Quantity
                </label>
                <div className="relative flex items-center max-w-[6rem]">
                  <span
                    className="border border-gray-300  text-center focus:ring-blue-500 focus:border-blue-500 block py-2.5 w-full text-lg  "
                  >
                    {quantity}
                  </span>


                  <div>
                    <button
                      type="button"
                      id="increment-button"
                      className="  hover:bg-gray-200 p-2 ms-1 focus:ring-gray-100  focus:ring-none focus:outline-none "
                      onClick={() => {
                        handleUpdateCart(product.id,
                          quantity + 1)
                      }}
                    >
                      <IoIosArrowUp />
                    </button>
                    <button
                      type="button"
                      id="decrement-button"
                      className=" hover:bg-gray-200 p-2 ms-1 focus:ring-gray-100  focus:ring-none focus:outline-none "
                      onClick={() => {
                        handleUpdateCart(product.id,
                          quantity - 1)
                      }}
                      disabled={quantity <= 1}
                    >
                      <IoIosArrowDown />
                    </button>
                  </div>
                </div>
                {quantity < 1 ? <button className="bg-main text-white px-5 py-4  lg:px-5 lg:py-3  lg:text-lg font-medium flex-1  lg:ms-6 hover:bg-[#517e51]" onClick={() => { handleAddCart(product.id) }}>
                  Add to Cart
                </button> : <button className="bg-main text-white px-5 py-4  lg:px-5 lg:py-3  lg:text-lg font-medium flex-1  lg:ms-6 hover:bg-[#517e51]" onClick={() => { handleDeleteCart(product.id) }}>
                  Remove from Cart
                </button>}

              </div>
            </div>
          </div>
        </section>
      )}
      <RelatedProducts categoryName={product?.category.name} />
    </>
  );
}
