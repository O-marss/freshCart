import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'

export default function useCategories(url, queryKey) {

    function getCategory() {
        return axios.get(url)
    }

    const response = useQuery({
        queryKey: [queryKey],
        queryFn: getCategory,
        select: (data) => data.data.data
    });

    return response
}
