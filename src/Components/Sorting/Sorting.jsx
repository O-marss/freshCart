import React from 'react'
import style from './Sorting.module.css'

export default function Sorting({sortValue,setSortValue}) {

  return <>
    <div className='flex justify-end items-center'>
      <select className='border-2 border-[#222] rounded-lg px-3 py-2 text-sm font-medium'
        value={sortValue}
        onChange={(e) => (
          setSortValue(e.target.value)
        )}>
        <option value={`default`} >Default sorting</option>
        <option value={`popularity`} >Sort by popularity</option>
        <option value={`rating`}>Sort by average rating</option>
        <option value={`latest`}>Sort by latest</option>
        <option value={`priceAsc`}>Sort by price: low to high</option>
        <option value={`priceDes`}>Sort by price: high to low</option>
      </select>
    </div>
  </>
}
