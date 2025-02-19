import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { queryClient } from "../App";

export default function useCart(method) {

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
        onMutate: async () => {
            await queryClient.cancelQueries(['cart'])
            const previousCart = queryClient.getQueryData(['cart'])
            queryClient.setQueryData(['cart'], (oldCart) => {
                if (!oldCart?.data?.products) return oldCart;
                return {
                    ...oldCart,
                    data: {
                        ...oldCart.data,
                        products: oldCart.data.products.map((item) =>
                            item.product._id === productId ? { ...item, count } : item
                        ),
                    },
                };
            })

            return { previousCart }
        },
        onSettled: () => {
            queryClient.invalidateQueries(['cart'])
            toast.success('Product count updated successfully');
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

    if (method?.toLowerCase() == 'get') {
        return cartResponse
    } else if (method?.toLowerCase() == 'put') {
        return updateResponse
    } else if (method?.toLowerCase() == 'post') {
        return addResponse
    } else if (method?.toLowerCase() == 'delete') {
        return deleteResponse
    }
}
