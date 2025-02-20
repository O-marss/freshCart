import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { queryClient } from '../App'
import toast from 'react-hot-toast'

export default function useWishList() {

    const userToken = localStorage.getItem('userToken')
    const headers = { token: localStorage.getItem('userToken') }

    function getuserWishList() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, { headers })
    }

    const wishListResponse =
        useQuery({
            queryKey: ['getUserWishList'],
            queryFn: getuserWishList,
            enabled: !!userToken,
            select: (data) => data.data
        })

    function addProductToWishList({ productId }) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,
            {
                productId
            },
            {
                headers
            }
        )
    }

    const addToWishListResponse = useMutation({
        mutationFn: addProductToWishList,
        onSuccess: () => {
            queryClient.invalidateQueries(['getUserWishList']);
            toast.success('Product added successfully');
        },
        onError: (error) => {
            console.log(error);
            toast.error('Failed.. Please make sure that you are logged in.');
        },
    })

    function deleteProductFromWishList({ productId }) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, { headers })
    }

    const deleteFromWishListResponse = useMutation({
        mutationFn: deleteProductFromWishList,
        onSuccess: () => {
            queryClient.invalidateQueries(['cart']);
            toast.success('Product deleted successfully');
        },
        onError: (error) => {
            console.error(error);
            toast.error('Failed to delete product ');
        },
    })

    return {
        wishListResponse,
        addToWishListResponse,
        deleteFromWishListResponse
    }

}
