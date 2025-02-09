import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { PiSpinnerGapBold } from "react-icons/pi";
import { UserContext } from "../../context/UserContext";

export default function Register() {
  const [apiError, setApiError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  let navigate = useNavigate();
  let { setUserToken,setUserName, userName } = useContext(UserContext);

  

  async function handleRegister(values) {
    try {
      setIsLoading(true);
      let { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/signup`,
        values
      );
      localStorage.setItem("userToken", data.token);
      setUserToken(data.token);
      localStorage.setItem('userName', data.user.name)
      setApiError("success");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err) {
      setApiError(err.response.data.message);
      setIsLoading(false);
    }
  }

  let validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .min(3, "Must be more than 3 characters")
      .max(15, "Must be less than 15 characters"),
    email: Yup.string().required("email is required").email("Invalid Email"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        "Minimum eight characters, at least one letter and one number"
      ),
    rePassword: Yup.string()
      .required("repassword is required")
      .oneOf([Yup.ref("password")], "repassword doesn't match"),
    phone: Yup.string().matches(
      /^(?:01[0125]\d{8})?$|^$/,
      "Please provide only egyptian phone number"
    ),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: handleRegister,
  });

  let { handleSubmit, handleBlur, handleChange } = formik;

  return (
    <>
      <section className="flex flex-col items-center justify-center pt-20 mt-12 p-8 lg:px-14 container">
        <form
          id="form"
          onSubmit={handleSubmit}
          className="w-full lg:w-1/2 rounded-3xl flex flex-col gap-5 py-6 mx-auto px-8 bg-white shadow-xl border border-gray-400"
        >
          <h2 className="text-xl font-semibold">Create your account</h2>
          {apiError && apiError !== "success" ? (
            <div className="rounded-xl  bg-red-300 text-red-800 font-bold p-3">
              {apiError}
            </div>
          ) : apiError == "success" ? (
            <div className="rounded-xl bg-green-600 text-white font-bold p-3">
              Account created successfully
            </div>
          ) : (
            ""
          )}
          <div className="mb-1">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-[#222] "
            >
              Your name{" "}
              <span className="text-red-500 ms-[0.5px] font-bold text-lg">
                *
              </span>
            </label>
            <div>
              <input
                type="text"
                name="name"
                id="name"
                value={formik.values.name}
                onBlur={handleBlur}
                onChange={handleChange}
                className=" rounded-lg bg-white border border-gray-700 text-[#222]   focus:ring-[#222]  focus:border-[#222] block flex-1 min-w-0 w-full text-sm p-2.5 focus-visible:outline-none"
                placeholder="Omar Mohamed"
              />
              {formik.errors.name && formik.touched.name && (
                <div className="rounded-lg bg-red-400 text-white text-sm font-bold px-3 py-3">
                  {formik.errors.name}
                </div>
              )}
            </div>
          </div>
          <div className="mb-1">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-[#222] "
            >
              Email address{" "}
              <span className="text-red-500 ms-[0.5px] font-bold text-lg">
                *
              </span>
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formik.values.email}
              onBlur={handleBlur}
              onChange={handleChange}
              className="shadow-inner bg-white border border-gray-700  text-[#222]  text-sm rounded-lg focus:ring-[#222]  focus:border-[#222] block w-full p-2.5  focus-visible:outline-none"
              placeholder="name@example.com"
            />
            {formik.errors.email && formik.touched.email && (
              <div className="rounded-lg bg-red-400 text-white text-sm font-bold px-3 py-3">
                {formik.errors.email}
              </div>
            )}
          </div>
          <div className="mb-1">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-[#222] "
            >
              Your password{" "}
              <span className="text-red-500 ms-[0.5px] font-bold text-lg">
                *
              </span>
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formik.values.password}
              onBlur={handleBlur}
              onChange={handleChange}
              className="shadow-inner bg-white border border-gray-700 text-[#222]  text-sm rounded-lg focus:ring-[#222]  focus:border-[#222] block w-full p-2.5  focus-visible:outline-none"
              placeholder="Password"
            />
            {formik.errors.password && formik.touched.password && (
              <div className="rounded-lg bg-red-400 text-white text-sm font-bold px-3 py-3">
                {formik.errors.password}
              </div>
            )}
          </div>
          <div className="mb-1">
            <label
              htmlFor="rePassword"
              className="block mb-2 text-sm font-medium text-[#222] "
            >
              Repeat password{" "}
              <span className="text-red-500 ms-[0.5px] font-bold text-lg">
                *
              </span>
            </label>
            <input
              type="password"
              name="rePassword"
              id="rePassword"
              value={formik.values.rePassword}
              onBlur={handleBlur}
              onChange={handleChange}
              className="shadow-inner bg-white border border-gray-700 text-[#222]  text-sm rounded-lg focus:ring-[#222]  focus:border-[#222] block w-full p-2.5  focus-visible:outline-none"
              placeholder="Confirm Password"
            />
            {formik.errors.rePassword && formik.touched.rePassword && (
              <div className="rounded-lg bg-red-400 text-white text-sm font-bold px-3 py-3">
                {formik.errors.rePassword}
              </div>
            )}
          </div>

          <div className="mb-1">
            <label
              htmlFor="phone"
              className="block mb-2 text-sm font-medium text-[#222] "
            >
              Your Phone
            </label>
            <input
              type="tel"
              name="phone"
              id="phone"
              value={formik.values.phone}
              onBlur={handleBlur}
              onChange={handleChange}
              className="shadow-inner bg-white border border-gray-700 text-[#222]  text-sm rounded-lg  focus:ring-[#222]  focus:border-[#222] block w-full p-2.5  focus-visible:outline-none"
              placeholder="+20 Optional"
            />
            {formik.errors.phone && formik.touched.phone && (
              <div className="rounded-lg bg-red-400 text-white text-sm font-bold px-3 py-3">
                {formik.errors.phone}
              </div>
            )}
          </div>
          <div className="text-sm">
            By clicking Register you agree to FreshCart's{" "}
            <span>
              <Link href="" className="text-blue-500">
                Terms of Use
              </Link>
            </span>{" "}
            and{" "}
            <span>
              <Link href="" className="text-blue-500">
                Privacy Policy
              </Link>
            </span>
            .
          </div>
          <button
            form="form"
            type="submit"
            className={`${
              !formik.isValid || !formik.dirty
                ? "bg-gray-400 cursor-not-allowed"
                : "text-white bg-[#222] hover:bg-opacity-75 focus:ring-4 focus:outline-none focus:ring-[#222]"
            } font-medium rounded-full text-lg px-5 py-2.5 w-full mx-auto flex justify-center`}
          >
            {isLoading ? (
              <PiSpinnerGapBold className="text-3xl text-center fa-spin " />
            ) : (
              "Register"
            )}
          </button>
        </form>
      </section>
    </>
  );
}
