import React from 'react'
import { PropagateLoader } from 'react-spinners'
import logo from "../../assets/images/freshcart-logo.svg";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

export default function Loading() {
 
  return <>
    <div className="sweet-loading flex flex-col gap-20 items-center justify-center fixed top-0 left-0 right-0 h-screen bg-white  z-[99999999]">
      <PropagateLoader
        color={'#0aad0a'}
        cssOverride={override}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      <div className='transition-all animate-bounce flex items-center justify-center'><img src={logo} alt=""  className='w-[300px] md:w-[400px] lg:w-[500px]' /></div>
    </div>
  
  </>
}
