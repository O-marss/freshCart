import { Link, useNavigate, } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import { useState } from "react";

export default function ForgotPassword() {

  const navigate = useNavigate()

  const [requestMsg, setRequestMsg] = useState('')
  const [verifyMsg, setVerifyMsg] = useState('')

  async function verifyResetCode(values) {
    try {
      let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, values);
      navigate(`/resetpassword`)
      setVerifyMsg(data.message)
      console.log(data)
    } catch (err) {
      console.log(err);
    }
  }

  async function RequestResetCode(values) {
    try {
      let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, values);
      setRequestMsg(data.message)
      console.log(data)
    } catch (err) {
      console.log(err);
    }
  }

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    onSubmit: RequestResetCode
  })

  const codeFormik = useFormik({
    initialValues: {
      resetCode: '',
    },
    onSubmit: verifyResetCode
  })

  const { handleSubmit, handleBlur, handleChange } = formik
  return (
    <>
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
            <div className="request_msg text-lg mt-3 text-green-700">{requestMsg}</div>
          </div>
          <button
            form="form"
            type="submit"
            className={`w-full mx-auto flex justify-center px-5 py-2.5 bg-[#222] text-white text-lg hover:bg-opacity-75 hover:scale-[1.03] transition-all focus:ring-none focus:outline-none focus:ring-man font-medium rounded-full`}
          >

            Request a reset code
          </button>
        </form>
        <form
          id="codeForm"
          className=" w-full md:w-1/2 lg:w-1/3 flex flex-col gap-5 py-6 mx-auto px-8 bg-white mt-3 "
          onSubmit={codeFormik.handleSubmit}>
          <div className="mb-1">
            <label
              htmlFor="resetCode"
              className="block mb-1 text-sm font-medium text-[#222] "
            >
              Reset Code
            </label>
            <input
              type="text"
              name="resetCode"
              id="resetCode"
              value={codeFormik.values.resetCode}
              className="shadow-inner bg-white border border-gray-700  text-[#222]  text-sm rounded-lg focus:ring-[#222]  focus:border-[#222] block w-full p-2.5  focus-visible:outline-none"
              placeholder="XXXXXX"
              onBlur={codeFormik.handleBlur}
              onChange={codeFormik.handleChange}
            />
            <div className="verify_msg text-lg mt-3 text-green-700">{verifyMsg}</div>
          </div>
          <button
            form="codeForm"
            type="submit"
            className={`w-full mx-auto flex justify-center px-5 py-2.5 bg-[#222] text-white text-lg hover:bg-opacity-75 hover:scale-[1.03] transition-all focus:ring-none focus:outline-none focus:ring-man font-medium rounded-full`}
          >
            Reset your pasword
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
