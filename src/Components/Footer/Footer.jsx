import React from 'react'
import style from './Footer.module.css'
import logo from "../../assets/images/whitelogo.svg";
import { FaFacebook, FaPinterest, FaWhatsapp } from 'react-icons/fa';
import { FaLocationDot, FaSquareXTwitter } from 'react-icons/fa6';
import { AiFillInstagram } from "react-icons/ai";
import { Link } from 'react-router-dom';
import { MdArrowRight } from "react-icons/md";
import { IoIosMail } from 'react-icons/io';

export default function Footer() {

  return <>

    <footer className='bg-[#212121] overflow-hidden relative mt-8 '>
      <div className=' lg:-translate-y-6 2xl:-translate-y-12 absolute top-0 left-0 bottom-0 right-0 z-10 '>
        <svg id="wave" style={{ transform: 'rotate(180deg)', transition: '0.3s' }} viewBox="0 0 1440 200" version="1.1" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="sw-gradient-0" x1={0} x2={0} y1={1} y2={0}><stop stopColor="rgba(243, 244, 245, 1)" offset="0%" /><stop stopColor="rgba(243, 244, 245, 1)" offset="100%" /></linearGradient></defs><path style={{ transform: 'translate(0, 0px)', opacity: 1 }} fill="url(#sw-gradient-0)" d="M0,160L1440,0L2880,100L4320,100L5760,20L7200,60L8640,120L10080,80L11520,180L12960,40L14400,160L15840,0L17280,180L18720,80L20160,120L21600,40L23040,80L24480,40L25920,140L27360,100L28800,20L30240,140L31680,160L33120,80L34560,0L34560,200L33120,200L31680,200L30240,200L28800,200L27360,200L25920,200L24480,200L23040,200L21600,200L20160,200L18720,200L17280,200L15840,200L14400,200L12960,200L11520,200L10080,200L8640,200L7200,200L5760,200L4320,200L2880,200L1440,200L0,200Z" /></svg>
      </div>
      <div className='h-[60px] md:h-[100px] lg:h-[150px] 2xl:h-[200px]'></div>
      <div className='container flex flex-col gap-12 p-8 lg:px-14 lg:py-12 relative z-50'>

        <div className='flex items-center justify-between'>
          <div className='footer_logo'>
            <img src={logo} alt="" className='w-full' />
          </div>
          <div className='footer_social'>
            <ul className='flex gap-3'>
              <li><FaFacebook className='text-[#eeedeb6e] lg:text-2xl rounded-full' /></li>
              <li><FaSquareXTwitter className='text-[#eeedeb6e]  lg:text-2xl rounded-lg' /></li>
              <li><FaPinterest className='text-[#eeedeb6e]  lg:text-2xl rounded-full' /></li>
              <li><AiFillInstagram className='text-[#eeedeb6e] lg:text-2xl rounded-full' /></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap gap-y-5 md:gap-y-0">
          <div className="flex flex-col w-full md:w-1/2 lg:w-1/3 md:order-1 lg:order-1">
            <h5 className='text-white mb-4 font-semibold'>Quick Links</h5>
            <ul className='w-3/4 flex flex-wrap gap-y-3 text-[#eeedeb6e]'>
              <li className='w-1/2'><Link className='flex items-center'><MdArrowRight className='text-xl' /><span>Home</span></Link></li>
              <li className='w-1/2'><Link className='flex items-center'><MdArrowRight className='text-xl' /><span>About</span></Link></li>
              <li className='w-1/2'><Link className='flex items-center'><MdArrowRight className='text-xl' /><span>Services</span></Link></li>
              <li className='w-1/2'><Link className='flex items-center'><MdArrowRight className='text-xl' /><span>Contacts</span></Link></li>
            </ul>
          </div>
          <div className="flex flex-col w-full md:w-1/2 lg:w-1/3 md:order-3 lg:order-2">
            <h5 className='text-white mb-4 font-semibold'>Contact Us</h5>
            <ul className='flex-col gap-y-4 text-[#eeedeb6e]'>
              <li className='flex gap-3 items-center py-3'><FaLocationDot className='text-xl' /> <span>Egypt, Giza</span></li>
              <li className='flex gap-3 items-center py-3'><FaWhatsapp className='text-2xl' /> <span>+20 1151301188</span></li>
              <li className='flex gap-3 items-center py-3'><IoIosMail className='text-2xl' /> <span>omarmoh3010@outlook.com</span></li>
            </ul>
          </div>
          <div className="flex flex-col w-full md:w-1/2 lg:w-1/3 md:order-2 lg:order-3">
            <h5 className='text-white mb-4 font-semibold'>Remain Updated</h5>
            <div className='flex flex-col gap-y-4'>
              <input type="email" placeholder='Your email address' className='px-4 py-3' />
              <Link to={'/register'} className='bg-main py-3 text-white font-semibold text-center w-1/3'>Sign Up</Link>
            </div>
          </div>
        </div>
        <div className='flex flex-col md:flex-row items-center justify-between  text-[#eeedeb6e]'>
          <p className='text-sm font-light'>© 2025 - All Rights Reserved</p>
          <a href={`https://www.linkedin.com/in/omar3010/`} className='font-light'>Designed by <span className='font-bold text-base text-[#F7E987]'>Omar Mohamed</span></a>
        </div>
      </div>
    </footer>
  </>
}
