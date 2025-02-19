import React, { useState } from "react";

export default function useSorting() {

    const handleSorting = (array, method) => {
        if (method == 'default') {
            return array
        }
        else if (method == 'rating') {
            return array.sort((a, b) => b.ratingsAverage - a.ratingsAverage)
        } else if (method == 'popularity') {
            return array.sort((a, b) => b.sold - a.sold)
        } else if (method == 'latest') {
            return array.sort((a, b) => b.createdAt - a.createdAt)
        } else if (method == 'priceAsc') {
            return array.sort((a, b) => a.price - b.price)
        } else if (method == 'priceDes') {
            return array.sort((a, b) => b.price - a.price)
        }
    }

    return {
        handleSorting,
    };
}
