import {  useEffect, useState } from "react";
import styles from "./Cart.module.css";
import { FaArrowRight, FaHandshake } from "react-icons/fa";
import { Link, useOutletContext } from "react-router-dom";
import { SiVisa } from "react-icons/si";
import { RiMastercardFill } from "react-icons/ri";
import { IoMdCash } from "react-icons/io";
import { PiSpinnerGapBold } from "react-icons/pi";
import Loading from "../Loading/Loading";
import Overlay from "../Overlay/Overlay";
import useCart from "../../Hooks/useCart";

export default function Cart() {

  const { data, isFetched, isFetching, isLoading } = useCart('get');

  const { mutate: updateCart, isPending } = useCart('put');

  const { mutate: deleteCartItem, isPending: deletePending } = useCart('delete');

  const handleUpdateCart = (id, newCount) => {
    updateCart({ productId: id, count: newCount });
  };

  const handleDeleteCart = (id) => {
    deleteCartItem({ productId: id });
  };

  let [onlinePayment, setOnlinePayment] = useState(true)
  let [cashPayment, setCashPayment] = useState(false)

  const {hideOverlay, showOverlay} = useOutletContext()

  const handleOnlinePayment = (event) => {
    setCashPayment(!event.target.checked)
    setOnlinePayment(event.target.checked);
  };

  const handleCashPayment = (event) => {
    setOnlinePayment(!event.target.checked);
    setCashPayment(event.target.checked);
  };

    useEffect(()=>{
      (isFetching || isPending ? showOverlay() : hideOverlay())
    },[isFetching, isPending])

  return (
    <>
      {isLoading ? <Loading /> :
        <section className="pt-20 mt-12 p-8 lg:px-14 container">
          <h2 className="text-2xl font-semibold mb-3">Your Cart</h2>
          <p className="text-gray-600">
            <span>
              <FaHandshake className="text-6xl inline-block me-2 text-main" />
            </span>{" "}
            <span className="font-semibold">Buy confidently</span>{" "}
            <span className="font-normal">
              with FrechCart's Purchase Protection program for buyers, get a full
              refund in the rare case your item doesn't arrive, arrives damaged,
              or isn't as described
            </span>
          </p>
          {(data?.data) ? (
            <>
              <div className="flex flex-col md:flex-row md:justify-between mt-5">


                <div className="w-full md:w-2/4 lg:w-3/5 lg:pe-20">
                  {data?.data?.products.map((product) => (
                    <div
                      key={product._id}
                      className="border border-gray-300 rounded-xl mb-6 flex flex-col"
                    >
                      <div className="px-2 md:px-2 lg:px-5">
                        <img
                          src={product.product.brand.image}
                          alt={product.product.brand.name}
                          className=" w-1/6 lg:w-1/12 "
                        />
                      </div>

                      <div className="flex flex-col lg:flex-row p-2 md:p-2 lg:p-5 lg:items-start !pt-0">
                        <div className="flex gap-2 justify-between lg:justify-start lg:gap-8 lg:w-3/4">
                          <div className="w-1/3 lg:w-1/4 flex flex-col-reverse  items-center justify-center gap-3">


                            <img
                              src={product.product.imageCover}
                              alt={product.product.title}
                              className="max-h-[230px] rounded-lg"
                            />
                          </div>
                          <div className="w-2/3 md:w-2/3 lg:w-2/3 flex flex-col gap-8">
                            <div>
                              <p className="font-medium text-sm lg:text-base ps-2 lg:ps-0 w-fit">
                                {product.product.title}
                              </p>
                              <div className="flex gap-2 ps-2 lg:ps-0">
                                <p className="text-[10px] md:text-[11px] font-semibold bg-gray-100 w-fit rounded-full px-0.5 lg:px-2 py-1 mt-2">
                                  {product.product.category.name}
                                </p>
                                {product.product.subcategory.map(
                                  (subCategory) => (
                                    <p
                                      key={subCategory._id}
                                      className="text-[10px] md:text-[11px] font-semibold bg-gray-100 w-fit rounded-full px-0.5 lg:px-2 py-1 mt-2"
                                    >
                                      {subCategory.name}
                                    </p>
                                  )
                                )}
                              </div>
                            </div>

                            <div className="flex items-center ps-2 lg:ps-0">
                              <button
                                className={`inline-flex items-center justify-center p-1 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full`}
                                disabled={product.count == 1}
                                onClick={() => {
                                  handleUpdateCart(
                                    product.product.id,
                                    product.count - 1
                                  )
                                }}
                              >
                                <span className="sr-only">Quantity button</span>
                                <svg
                                  className="w-3 h-3"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 18 2"
                                >
                                  <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M1 1h16"
                                  />
                                </svg>
                              </button>
                              <div className="ms-3">

                                {(isPending || isFetching) ? <PiSpinnerGapBold className="text-xl text-center fa-spin" />: isFetched ? <span
                                  id="first_product"
                                  className="w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1"
                                >
                                  {product.count}
                                </span> : ''}

                              </div>
                              <button
                                className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full "
                                onClick={() =>
                                  handleUpdateCart(
                                    product.product.id,
                                    product.count + 1
                                  )
                                }
                              >
                                <span className="sr-only">Quantity button</span>
                                <svg
                                  className="w-3 h-3"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 18 18"
                                >
                                  <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 1v16M1 9h16"
                                  />
                                </svg>
                              </button>

                              <button
                                className="text-[12px] font-bold ms-2 lg:ms-8 p-3 relative after:absolute after:content-[''] after:top-0 after:bottom-0 after:start-0 after:end-0 after:bg-gray-200 after:rounded-full after:scale-0 after:transition-all after:-z-10 after:opacity-0 hover:after:opacity-100 hover:after:scale-100 "
                                onClick={() =>
                                  handleDeleteCart(product.product.id)
                                }
                              >
                                Remove
                                {deletePending && <Overlay />}
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className=" lg:w-1/4">
                          <div className=" flex flex-col items-end justify-start lg:justify-start">
                            <span className="text-main text-lg font-semibold">
                              EGP {(product.price * product.count).toFixed(2)}
                            </span>
                            {product.count > 1 ? (
                              <p className="text-[13px] text-gray-600">
                                (<span className="me-1">EGP</span>
                                {(
                                  (product.price * product.count) / product.count).toFixed(2)}
                                <span className="ms-1">each</span>)
                              </p>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      </div>
                      <Link
                        to={`/productdetails/${product.product.id}`}
                        className="flex justify-end items-center gap-2 py-3 px-8 text-gray-800 font-medium border-t border-gray-300 group relative "
                      >
                        <p>Go to this product</p>
                        <FaArrowRight className="text-[12px] transition-all absolute top-1/2 -translate-y-1/2 start-auto right-3 bottom-0 group-hover:right-2" />
                      </Link>
                    </div>
                  ))}
                </div>

                <div className=" md:w-1/3 md:flex-1 md:px-6">
                  <div className="flex flex-col gap-4">
                    <div>
                      <h4 className="font-semibold mb-3">How you'll pay</h4>
                      <div className="flex flex-col gap-3">
                        <label className={`${styles.label}`}>
                          <input
                            type="radio"
                            id="onlinePayChoice"
                            name="paymentMethod"
                            value="onlinePayChoice"
                            className={`${styles.radio_input}`}
                            checked={onlinePayment}
                            onChange={handleOnlinePayment}
                          />
                          <div className={`${styles.radio_design}`}></div>

                          <div className={`flex gap-4 text-4xl`}>
                            <span>
                              <SiVisa className="text-blue-600" />
                            </span>
                            <span>
                              <RiMastercardFill />
                            </span>
                          </div>
                        </label>
                        <label className={`${styles.label}`}>
                          <input
                            type="radio"
                            id="cashPayChoice"
                            name="paymentMethod"
                            value="cashPayChoice"
                            className={`${styles.radio_input}`}
                            checked={cashPayment}
                            onChange={handleCashPayment}
                          />
                          <div className={`${styles.radio_design}`}></div>

                          <div className={`flex gap-4 items-center `}>
                            <span className="font-semibold">Cash</span>
                            <span>
                              <IoMdCash className="text-green-800 text-4xl" />
                            </span>
                          </div>
                        </label>
                      </div>
                    </div>
                    <div>
                      <div className="flex flex-col gap-5 border-b border-gray-200 pb-3">
                        <div className="flex justify-between">
                          <span className="font-medium">Item(s) total</span>
                          <span>
                            EGP <span>{data?.data.totalCartPrice.toFixed(2)}</span>
                          </span>
                        </div>
                        <div className="flex justify-between ">
                          <span className="font-medium">Shop discount</span>
                          <span>
                            EGP <span>00.00</span>
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-between pt-4 font-semibold ">
                        <span className="">
                          Total ({data?.numOfCartItems} itmes)
                        </span>
                        <span>
                          EGP <span>{data?.data.totalCartPrice.toFixed(2)}</span>
                        </span>
                      </div>
                    </div>
                    <div>

                      {onlinePayment ? <Link
                        to={"/checkout"}
                        className={`w-full mx-auto my-5 flex justify-center px-5 py-3 bg-[#222] text-white hover:bg-opacity-75 hover:scale-[1.03] transition-all focus:ring-none focus:outline-none focus:ring-man font-medium rounded-full`}
                      >
                        Proceed to Checkout
                      </Link> : <Link
                        to={"/cashpayment"}
                        className={`w-full mx-auto my-5 flex justify-center px-5 py-3 bg-[#222] text-white hover:bg-opacity-75 hover:scale-[1.03] transition-all focus:ring-none focus:outline-none focus:ring-man font-medium rounded-full`}
                      >
                        Cash Payment
                      </Link>}

                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div>Not Found any product</div>
          )}
        </section>
      }
    </>
  );
}
