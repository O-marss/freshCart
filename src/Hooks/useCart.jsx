import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { queryClient } from "../App";
import { useNavigate } from "react-router-dom";

export default function useCart() {

    const userToken = localStorage.getItem("userToken");
    const headers = { token: localStorage.getItem("userToken") };
    const navigate = useNavigate()

    // ^## Get Cart Function ###
    function getProductsCart() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
            headers
        })
    }
    const cartResponse = useQuery({
        queryKey: ['cart'],
        queryFn: getProductsCart,
        enabled: !!userToken,
        select: (data) => data.data,
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
        onMutate: ({ productId, count }) => {
            const previousCart = queryClient.getQueryData(['cart'])
            const updatedProducts = previousCart.data.data.products.map((item) =>
                item.product.id === productId
                    ? { ...item, count }
                    : item
            );
            queryClient.setQueryData(['cart'], { ...previousCart, data: { ...previousCart.data, data: { ...previousCart.data.data, products: [...updatedProducts] }, numOfCartItems: updatedProducts.length } })

            return { previousCart }
        },
        onSettled: () => {
            queryClient.invalidateQueries(['cart'])
        },
        onError: (context) => {
            queryClient.setQueryData(['cart'], context.previousCart)
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
        onMutate: ({ productId }) => {
            const previousCart = queryClient.getQueryData(['cart'])

            let newProducts = [...previousCart.data.data.products, { id: productId }];
            queryClient.setQueryData(['cart'], { ...previousCart, data: { ...previousCart.data, data: { ...previousCart.data.data, products: [...newProducts] }, numOfCartItems: newProducts.length } })
            toast.success('Product added to cart successfully');

            return { previousCart }
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['cart']);
        },
        onError: (context) => {
            queryClient.setQueryData(['cart'], context.previousCart)
            if (!userToken) {
                navigate('/signin')
            }
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
        onMutate: ({ productId }) => {
            const previousCart = queryClient.getQueryData(['cart'])
            const newData = previousCart?.data?.data?.products?.filter((item) => item.product.id !== productId)
            queryClient.setQueryData(['cart'], { ...previousCart, data: { ...previousCart.data, data: { ...previousCart.data.data, products: [...newData] }, numOfCartItems: newData.length } })
            return { previousCart };
        },
        onError: (error, context) => {
            console.log(error);
            queryClient.invalidateQueries(['cart']);
        },
    })

    return {
        cartResponse,
        updateResponse,
        addResponse,
        deleteResponse
    }
}
