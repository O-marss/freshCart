import React, { useEffect, useState } from 'react'
import style from './Overlay.module.css'
import useOverlay from '../../Hooks/useOverlay'

export default function Overlay({isOpen}) {

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-25 z-[9999] flex items-center justify-center"
        >
        </div>)}
    </>
  )
}
