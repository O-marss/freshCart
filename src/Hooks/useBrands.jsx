import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'

export default function useBrands(url, queryKey) {
  function getBrands(){
    return axios.get(url)
  }

  let response = useQuery({
    queryKey: [queryKey],
    queryFn: getBrands,
    select: (data)=>data.data.data
  })

  return response
}
