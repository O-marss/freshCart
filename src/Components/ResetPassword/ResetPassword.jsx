import React, { useState } from 'react'
import style from './ResetPassword.module.css'
import { useFormik } from 'formik'
import axios from 'axios';
import * as Yup from "yup";

export default function ResetPassword() {

  const [resetMsg, setResetMsg] = useState(null)

  async function resetUserPassword(values) {
    try {
      let { data } = await axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, values);
      setResetMsg(data)
    } catch (err) {
      console.log(err);
    }
  }

  let validationSchema = Yup.object().shape({
    email: Yup.string().required("email is required").email("Invalid Email"),
    newPassword: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        "Minimum eight characters, at least one letter and one number"
      ),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      newPassword: '',
    },
    validationSchema,
    onSubmit: resetUserPassword
  })
  const { handleSubmit, handleBlur, handleChange } = formik

  return (
    <section className="flex flex-col items-center justify-center pt-20 mt-12 p-8 lg:px-14 container">
      <form
        id="form"
        className=" w-full md:w-1/2 lg:w-1/3 rounded-3xl flex flex-col gap-5 py-6 mx-auto px-8 bg-white shadow-xl border border-gray-400"
        onSubmit={handleSubmit}
      >
        <div className="flex justify-between">
          <h2 className="text-xl font-semibold">Reset your password</h2>
        </div>

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
            className="shadow-inner bg-white border border-gray-700  text-[#222]  text-sm rounded-lg focus:ring-[#222]  focus:border-[#222] block w-full p-2.5  focus-visible:outline-none"
            placeholder="name@example.com"
            onBlur={handleBlur}
            onChange={handleChange}
          />

          {formik.errors.email && formik.touched.email && (
            <div className="rounded-lg bg-red-400 text-white text-sm font-bold px-3 py-3">
              {formik.errors.email}
            </div>
          )}
        </div>

        <div className="mb-1">
          <label
            htmlFor="newPassword"
            className="block mb-1 text-sm font-medium text-[#222] "
          >
            New Password

          </label>
          <input
            type="text"
            name="newPassword"
            id="newPassword"
            value={formik.values.newPassword}
            className="shadow-inner bg-white border border-gray-700  text-[#222]  text-sm rounded-lg focus:ring-[#222]  focus:border-[#222] block w-full p-2.5  focus-visible:outline-none"
            placeholder="name@example.com"
            onBlur={handleBlur}
            onChange={handleChange}
          />
          {formik.errors.newPassword && formik.touched.newPassword && (
            <div className="rounded-lg bg-red-400 text-white text-sm font-bold px-3 py-3">
              {formik.errors.newPassword}
            </div>
          )}
          {resetMsg && <div className="reset_msg text-lg mt-3 text-green-700">Your password reset successfully</div>
          }

        </div>
        <button
          form="form"
          type="submit"
          className={`w-full mx-auto flex justify-center px-5 py-2.5 bg-[#222] text-white text-lg hover:bg-opacity-75 hover:scale-[1.03] transition-all focus:ring-none focus:outline-none focus:ring-man font-medium rounded-full`}
        >
          Submit the new password
        </button>
      </form>
    </section>
  )

}
