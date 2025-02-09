import React, { useContext, useState } from "react";
import style from "./Signin.module.css";
import { useFormik } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

export default function Signin() {
  const [apiError, setApiError] = useState(null);

  let navigate = useNavigate();

  let { setUserToken,setUserName } = useContext(UserContext);

  async function handleSignin(values) {
    try {
      let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`,values);
      localStorage.setItem("userToken", data.token);
      setUserToken(data.token);
      navigate("/");
      localStorage.setItem('userName', data.user.name)
      setUserName(localStorage.getItem('userName'));
    } catch (err) {
      setApiError(err.response.data.message);
    }
  }

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: handleSignin,
  });

  let { handleSubmit, handleBlur, handleChange } = formik;

  return (
    <>
      <section className="flex flex-col items-center justify-center pt-20 mt-12 p-8 lg:px-14 container">
        <form
          id="form"
          onSubmit={handleSubmit}
          className=" w-full md:w-1/2 lg:w-1/3 rounded-3xl flex flex-col gap-5 py-6 mx-auto px-8 bg-white shadow-xl border border-gray-400"
        >
          <div className="flex justify-between">
            <h2 className="text-xl font-semibold">Create your account</h2>
          </div>

          {apiError && (
            <div className="rounded-xl  bg-red-300 text-red-800 font-bold p-3 capitalize">
              {apiError}
            </div>
          ) }
          <div className="mb-1">
            <label
              htmlFor="email"
              className="block mb-1 text-sm font-medium text-[#222] "
            >
              Email address
          
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
              className="block mb-1 text-sm font-medium text-[#222] "
            >
              Password
            
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
            <div className="text-sm mt-3">
              <Link to={`/forgotpassword`}>Forget Password?</Link>
            </div>
          </div>
          <button
            form="form"
            type="submit"
            className={`w-full mx-auto flex justify-center px-5 py-2.5 bg-[#222] text-white text-lg hover:bg-opacity-75 hover:scale-[1.03] transition-all focus:ring-none focus:outline-none focus:ring-man font-medium rounded-full`}
          >
            Sign in
          </button>
        </form>

        <div className="relative text-sm text-[#565959] my-8 px-2 after:absolute after:content-[''] after:top-1/2 after:-start-full after:w-full after:h-[1px] after:bg-[#565959] before:absolute before:content-[''] before:top-1/2 before:-end-full before:w-full before:h-[1px] before:bg-[#565959]">New to FreshCart?</div>
        <div className="w-80 mx-auto register_container relative text-sm text-[#565959] font-medium text-center flex items-center justify-center cursor-pointer z-50 after:hover:shadow-sub-btn p-2 after:hover:scale-[1.02] after:transition-all  after:content-[''] after:absolute after:inset-0  after:border-2 after:border-[#565959] after:rounded-full after:p-4 after:-z-50">
          <Link to={"/register"} className={`w-full`}>
            Create your FreshCart account
          </Link>
        </div>

      </section>
    </>
  );
}
