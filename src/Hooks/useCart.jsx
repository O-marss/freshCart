import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { queryClient } from "../App";

export default function useCart() {

    const userToken = localStorage.getItem("userToken");
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
        onMutate: async ({ productId }) => {
            await queryClient.cancelQueries(['cart'])
            const previousCart = queryClient.getQueryData(['cart'])
            queryClient.setQueryData(['cart'], (oldCart) => {
                if (!oldCart?.data?.products) return oldCart;
                return {
                    ...oldCart,
                    data: {
                        ...oldCart.data,
                        products: oldCart.data.products.map((item) =>
                            item._id === productId ? { ...item, count } : item
                        ),
                    },
                };
            })

            return { previousCart }
        },
        onSettled: () => {
            queryClient.invalidateQueries(['cart'])
        },
        onError: (err, newTodo, context) => {
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
        onMutate: async ({ productId }) => {
            await queryClient.cancelQueries(['cart'])
            const previousCart = queryClient.getQueryData(['cart'])
            queryClient.setQueryData(['cart'], (oldCart) => {
                if (!oldCart) return oldCart;
                return {
                    ...oldCart,
                    data: {
                        ...oldCart?.data,
                        products: oldCart?.data?.products?.map(
                            (item) => item._id == productId ? { ...item } : item
                        ),
                    },
                };
            })
            return { previousCart }
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['cart']);
            toast.success('Product added successfully')
        },
        onError: (context) => {
            queryClient.setQueryData(['cart'], context.previousCart)
            toast.error('Failed.. Please make sure that you are logged in.');
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
        onMutate: async ({ productId }) => {
            await queryClient.cancelQueries(['cart'])
            const previousCart = queryClient.getQueryData(['cart'])
            queryClient.setQueryData(['cart'], (oldCart) => {
                if (!oldCart) return oldCart;
                return {
                    ...oldCart,
                    data: {
                        ...oldCart?.data,
                        products: oldCart?.data?.products?.filter(
                            (item) => item._id !== productId
                        ),
                    },
                };
            })
            return { previousCart }
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['cart']);
        },
        onError: (context) => {
            queryClient.setQueryData(['cart'], context.previousCart)
            toast.error('Failed to update product count');
        },
    })

    return {
        cartResponse,
        updateResponse,
        addResponse,
        deleteResponse
    }
}
