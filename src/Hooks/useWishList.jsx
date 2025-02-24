import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { queryClient } from '../App'
import toast from 'react-hot-toast'
import Overlay from '../Components/Overlay/Overlay'
import { useNavigate } from 'react-router-dom'

export default function useWishList() {

    const userToken = localStorage.getItem('userToken')
    const headers = { token: localStorage.getItem('userToken') }

    const navigate = useNavigate()

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
        onMutate: ({ productId }) => {
            const previousWishlist = queryClient.getQueryData(['getUserWishList']);
            let newProducts = [...previousWishlist?.data?.data, { id: productId }];
            queryClient.setQueryData(['getUserWishList'], { ...previousWishlist, data: { ...previousWishlist.data, data: [...newProducts], count: newProducts.length } })
            toast.success('Product added to Wishlist successfully');
            return { previousWishlist }
        },
        onSettled: () => {
            queryClient.invalidateQueries(['getUserWishList']);
        },
        onError: (context) => {
            queryClient.setQueryData(['getUserWishList'], context.previousData)
            if (!userToken) {
                navigate('/signin')
            }
        },
    })

    function deleteProductFromWishList({ productId }) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, { headers })
    }

    const deleteFromWishListResponse = useMutation({
        mutationFn: deleteProductFromWishList,
        onMutate: ({ productId }) => {
            const previousWishlist = queryClient.getQueryData(['getUserWishList']) || { data: { data: [] } };
            console.log(previousWishlist)
            let newProducts = previousWishlist?.data?.data?.filter((product) => product.id !== productId);
            queryClient.setQueryData(['getUserWishList'], { ...previousWishlist, data: { ...previousWishlist.data, data: [...newProducts], count: newProducts.length } })
            toast.success('Product deleted successfully');
            return { previousWishlist }
        },
        onSettled: () => {
            queryClient.invalidateQueries(['getUserWishList']);
        },
        onError: (error, context) => {
            console.error(error);
            if (context?.previousWishlist) {
                queryClient.setQueryData(['getUserWishList'], context.previousWishlist);
            }
        },
    })

    return {
        wishListResponse,
        addToWishListResponse,
        deleteFromWishListResponse
    }

}
