import React from "react";
import style from "./CashPayment.module.css";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import useCart from "../../Hooks/useCart";

export default function CashPayment() {
  const headers = { token: localStorage.getItem("userToken") };

  let { data: cart } = useCart('get')

  let navigate = useNavigate()

  async function handleCashPayment(shippingAddress) {
    try {
      let { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cart.cartId}`,
        {
          shippingAddress,
        },
        {
          headers,
        }
      );
      navigate("/allorders");
    } catch (err) {
      console.log(err);
    }
  }

  let validationSchema = Yup.object().shape({
    details: Yup.string()
      .required("Please write a minimum 2 words")
      .min(3, "Must be more than 5 characters")
      .max(15, "Must be less than 50 characters"),
    city: Yup.string().required("City is required"),
    phone: Yup.string()
      .matches(
        /^(?:01[0125]\d{8})?$|^$/,
        "Please provide only egyptian phone number"
      )
      .required("Please Enter your phone number"),
  });

  let formik = useFormik({
    initialValues: {
      details: "",
      city: "",
      phone: "",
    },
    validationSchema,
    onSubmit: handleCashPayment,
  });

  let { handleSubmit, handleBlur, handleChange } = formik;

  return (
    <>
      <section className="flex flex-col items-center justify-center pt-20 mt-12  lg:px-14 container">
        <form
          id="form"
          onSubmit={handleSubmit}
          className=" w-full md:w-3/4 lg:w-1/2  flex flex-col gap-5 py-6 mx-auto px-8 bg-white"
        >
          <div className="flex justify-between">
            <h2 className=" text-2xl md:text-3xl lg:text-4xl font-medium font-serif tracking-wide ">
              Enter your shipping address
            </h2>
          </div>
          <div className="mb-1">
            <label htmlFor="city" className="block mb-1 text-lg font-medium ">
              City <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="city"
              id="city"
              value={formik.values.city}
              onBlur={handleBlur}
              onChange={handleChange}
              className={`shadow-inner bg-white border border-gray-700  text-sm rounded-lg focus:ring-[#222]  focus:border-[#222] block w-full px-2.5 py-3.5  focus-visible:outline-none ${formik.errors.city &&
                formik.touched.city &&
                "bg-red-100 border border-red-600 focus:ring-red-600  focus:border-red-600"
                }`}
              placeholder="Enter your city"
            />
            {formik.errors.city && formik.touched.city && (
              <div className="rounded-lg text-red-500 py-3">
                {formik.errors.city}
              </div>
            )}
          </div>
          <div className="mb-1">
            <label htmlFor="phone" className="block mb-1 text-lg font-medium">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              id="phone"
              value={formik.values.phone}
              onBlur={handleBlur}
              onChange={handleChange}
              className={`shadow-inner bg-white border border-gray-700  text-sm rounded-lg focus:ring-[#222]  focus:border-[#222] block w-full px-2.5 py-3.5  focus-visible:outline-none ${formik.errors.phone &&
                formik.touched.phone &&
                "bg-red-100 border border-red-600 focus:ring-red-600  focus:border-red-600"
                }`}
              placeholder="+20 "
            />
            {formik.errors.phone && formik.touched.phone && (
              <div className="rounded-lg text-red-500 py-3">
                {formik.errors.phone}
              </div>
            )}
          </div>

          <div className="mb-1">
            <label
              htmlFor="details"
              className="block mb-1 text-lg font-medium "
            >
              Details
            </label>
            <textarea
              type="text"
              name="details"
              id="details"
              value={formik.values.details}
              onBlur={handleBlur}
              onChange={handleChange}
              className={`shadow-inner bg-white border border-gray-700  text-sm rounded-lg focus:ring-[#222]  focus:border-[#222] block w-full px-2.5 py-3.5  focus-visible:outline-none ${formik.errors.details &&
                formik.touched.details &&
                "bg-red-100 border border-red-600 focus:ring-red-600  focus:border-red-600"
                }`}
              placeholder="Write your comment here"
              rows={"5"}
            />
            {formik.errors.details && formik.touched.details && (
              <div className="rounded-lg text-red-500 py-3">
                {formik.errors.details}
              </div>
            )}
          </div>

          <button
            form="form"
            type="submit"
            className={`w-full mx-auto flex justify-center px-5 py-2.5 bg-[#222] text-white text-lg hover:bg-opacity-75 hover:scale-[1.03] transition-all focus:ring-none focus:outline-none focus:ring-man font-medium rounded-full`}
          >
            Confirm Order
          </button>
          <div className="text-sm">
            By choosing “Confirm Order,” you consent to sharing your phone
            number with sellers if they need to give shipping carriers this info
            to ship your package or provide order updates.
          </div>
        </form>
      </section>
    </>
  );
}
