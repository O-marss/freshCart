import React, { useEffect } from "react";
import styles from "./Home.module.css";
import DiscountedProducts from "../DiscountedProducts/DiscountedProducts";
import useCategories from "../../Hooks/useCategories";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";

export default function Home() {
  let { data, isLoading } = useCategories(`https://ecommerce.routemisr.com/api/v1/categories`, 'getFeatureCategories');
  return (
    <>
      <section className="pt-20 mt-12 p-8 lg:px-14 container">
        <div className=" md:flex space-y-8 md:space-y-0 md:space-x-6 pb-8 ">
          <Link to={'products'} className={`${styles.home_cover} block w-full md:w-6/12 lg:w-7/12 rounded-xl cursor-pointer transition-all`}>
            <div className="h-full flex flex-col items-center justify-end pb-14 lg:justify-center lg:items-center lg:pb-0 lg:w-1/2 lg:ps-12 ">
              <p className="text-xl lg:text-3xl font-medium">Shop smart, Live better</p>
              <p className="lg:text-lg lg:font-medium ">Bringing happiness to your cart.</p>
              <button className="bg-[#222] text-white px-5 py-3 rounded-full transition-all mt-5  hover:bg-opacity-75 hover:shadow-xl">Shop our Products</button>
            </div>
          </Link>
          <Link to={'brands'} className={`${styles.home_card} block w-full md:w-6/12 lg:w-5/12 rounded-xl p-8 cursor-pointer transition-all`}>
            <div className="h-full flex flex-col justify-end items-start">
              <p className="text-3xl font-bold text-[#fff]">Brands</p>
              <button className="font-bold text-[#fff]">Shop Now</button>
            </div>
          </Link>
        </div>
        <DiscountedProducts />
        <div className="pt-8">
          <h3 className="mb-5 ms-3 text-xl md:text-2xl font-semibold text-center md:text-start">Categories you'll love to shop</h3>
          {isLoading ? <Loading /> :
            <div className={` flex items-center mg:gap-3 flex-wrap`}>
              {
                data?.map((category, index) => index > 3 && (
                  <Link key={category._id} to={`specificCategory/${category._id}`} className={`w-1/2 md:w-1/3 lg:w-1/6 mx-auto p-1 flex items-center flex-col gap-3 group`}>
                    <img src={category.image} alt="" className="size-[200px] rounded-xl group-hover:shadow-xl group-hover:border group-hover:border-[#0aad0a]" />
                    <p className="text-start font-semibold text-gray-700 ">{category.name}</p>
                  </Link>
                ))
              }
            </div>
          }
        </div>
      </section>
    </>
  );
}
