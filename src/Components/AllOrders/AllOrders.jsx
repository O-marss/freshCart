import React from "react";
import style from "./AllOrders.module.css";
import "swiper/css";
import "swiper/css/navigation";
import 'swiper/css/effect-cards';
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Loading/Loading";
import { SwiperSlide, Swiper } from "swiper/react";
import { EffectCards } from "swiper/modules";
import moment from "moment/moment";
import { Link } from "react-router-dom";

export default function AllOrders() {
  const token = localStorage.getItem("userToken");
  const { id: userId } = jwtDecode(token);

  function getUserOrders() {
    return axios.get(
      `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`
    );
  }

  const { data, isLoading } = useQuery({
    queryKey: ["getUserOrders"],
    queryFn: getUserOrders,
    select: (data) => data.data,
  });

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (<>
        <section className="pt-20 mt-12 p-8 lg:px-14 container">
          <h2 className=" text-3xl text-main font-bold text-center md:text-start">All Your Orders</h2>
          <p className="text-gray-600 text-center md:text-start">Here you can find a list of all your orders, including their status and details.</p>
          {data.map((order) => (
            <div key={order.id} className="flex flex-col md:flex-row gap-8 py-10 border-b border-gray-200 items-center">
              <Swiper
                modules={[EffectCards]}
                grabCursor={true}
                effect={'cards'}
                className="userOrderSwiper w-full md:w-1/2 lg:w-1/3"
              >
                {order.cartItems.map((product) => (
                  <SwiperSlide key={product._id} className="!flex flex-row-reverse border border-gray-200 " >
                    <Link to={`/productdetails/${product.product.id}`} className="w-full group relative ">
                      <img
                        src={product.product.imageCover}
                        alt={product.product.title}
                        className="border-l border-gray-200"
                      />
                      <div className="overlay flex items-center justify-center text-white text-sm md:text-base font-bold cursor-pointer bg-black bg-opacity-50 absolute transition-all top-0 left-0 bottom-0 right-0 translate-y-full group-hover:translate-y-0">Check This Product</div>
                    </Link>
                    <div className=" bg-white p-3 w-full flex flex-col justify-around text-[12px] md:text-sm">
                      <div className=" font-semibold text-sm md:text-base">{product.product.title}</div>
                      <div className="font-semibold"><span className=" me-1 text-gray-600">Category:</span>{product.product.category.name}</div>
                      <div className="font-semibold"><span className=" me-1 text-gray-600">Brand:</span>{product.product.brand.name}</div>
                      <div className="font-semibold"><span className=" me-1 text-gray-600">Count:</span>{product.count}</div>
                      <div>
                        <div className="font-semibold"><span className=" me-2 text-gray-600">Price:</span>{(product.price * product.count).toFixed(2)} EGP</div>

                        {product.count > 1 ? (
                          <p className="text-[11px] md:text-[13px] text-main">
                            (<span className="me-1">EGP</span>
                            {(
                              (product.price * product.count) /
                              product.count
                            ).toFixed(2)}
                            <span className="ms-1">each</span>)
                          </p>
                        ) : (
                          ""
                        )}
                      </div>

                    </div>

                  </SwiperSlide>
                ))}
              </Swiper>

              <div className="w-full md:w-1/2 lg:w-1/4 mx-auto">
                <div className="p-5 flex flex-col gap-4 bg-gray-50 text-sm">
                  <p className="text-red-500 font-semibold"><span className=" me-2 text-[#222]">Order Id:</span> {order.id}</p>
                  <p className="text-gray-600"><span className="font-semibold me-2 text-[#222]">Creation Date:</span> {moment(order.createdAt).format('LL')}</p>
                  <p><span className="font-semibold me-2">Order Delivered:</span> {order.isDelivered}</p>
                  <p><span className="font-semibold me-2 ">Order Paid:</span>{!order.isPaid}</p>
                  <div className="border-y border-gray-300 py-3 space-y-2">
                    <p className="font-semibold">Shipping Address:</p>
                    <p className=" me-2 text-gray-600"><span className="font-semibold text-[#222]">City:</span> {order.shippingAddress.city}</p>
                    <p className="me-2 text-gray-600"><span className="font-semibold text-[#222]">Phone: </span>{order.shippingAddress.phone}</p>
                  </div>

                  <p><span className="font-semibold me-2">Shipping Price:</span> {(order.shippingPrice).toFixed(2)}</p>
                  <p><span className="font-semibold me-2">Tax Price:</span> {(order.taxPrice).toFixed(2)}</p>
                  <p className="text-lg text-main font-semibold "><span className="me-2 text-[#222]">Total Price:</span> {(order.totalOrderPrice).toFixed(2)} EGP</p>
                </div>
              </div>
            </div>
          ))}
        </section>
      </>
      )}
    </>
  );
}
