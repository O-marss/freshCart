import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { queryClient } from "../App";

export let CartContext = createContext();


export default function CartContextProvider({ children }) {

  const headers = { token: localStorage.getItem("userToken") };
 
  // ^## Get Cart Function ###
  function getProductsCart() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
      headers
    })
  }

  const cartResponse = useQuery({
    queryKey: ['cart'],
    queryFn: getProductsCart,
    select: (data) => data.data,
    staleTime:false,
  })


  // ^## Update Cart Function ###
  function updateCartProductCount({ productId, count }) {
    return axios.put(
      `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      {
        count
      },
      {
        headers
      });
  }

  const updateResponse = useMutation({
    mutationFn: updateCartProductCount,
    onSuccess: () => {
      queryClient.invalidateQueries(['cart']);
      toast.success('Product count updated successfully');
    },
    onError: (error) => {
      console.error(error);
      toast.error('Failed to update product count');
    },
  })

  // ^### Add Cart Function###
  function addProductToCart({ productId }) {
    return axios.post(
      `https://ecommerce.routemisr.com/api/v1/cart`,
      {
        productId
      },
      {
        headers
      });
  }
  const addResponse = useMutation({
    mutationFn: addProductToCart,
    onSuccess: () => {
      queryClient.invalidateQueries(['cart']);
      toast.success('Product added successfully')
    },
    onError: (error) => {
      console.error(error);
      toast.error('Failed to update product count');
    },
  })

  // ^### Delete Cart Function ###
  function deleteCartProduct({ productId }) {
    return axios.delete(
      `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      {
        headers
      });
  }

  const deleteResponse = useMutation({
    mutationFn: deleteCartProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(['cart']);
      toast.success('Product deleted successfully')
    },
    onError: (error) => {
      console.error(error);
      toast.error('Failed to update product count');
    },
  })

  if(localStorage.getItem('userToken')!==null){
    return (
      <CartContext.Provider
        value={{ cartResponse, updateResponse, addResponse, deleteResponse }}
      >
        {children}
      </CartContext.Provider>
    );
  } else return;
  
}
