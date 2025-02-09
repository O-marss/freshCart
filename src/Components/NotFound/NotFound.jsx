import React from 'react'
import style from './NotFound.module.css'
import { Link } from 'react-router-dom'
import { BiLeftArrowAlt } from 'react-icons/bi'
import logo from "../../assets/images/freshcart-logo.svg";

export default function NotFound() {

  return <>
    <section className='pt-20 mt-12 p-8 lg:px-14 container flex flex-col justify-center items-start h-screen'>
      <div className='mb-24' >
        <img src={logo} alt="logo" className='w-[300px] lg:w-[500px]' />
      </div>
      <div>
        <h5 className='text-4xl text-gray-600  '>Uh oh!</h5>
        <p className='text-lg text-gray-600 mt-2'>Sorry, the page you were looking for was not found.</p>
        <Link to={'/'} className='flex items-center gap-3 mt-6'><BiLeftArrowAlt className='text-xl' /> Go back to FreshCart.com</Link>
      </div>

    </section>
  </>
}
