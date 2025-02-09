import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useProducts(url, queryKey) {
  function getProduct() {
    return axios.get(url);
  }

  let response = useQuery({
    queryKey: [queryKey],
    queryFn: getProduct,
    select:(data)=> data.data.data
  });

  return response
}
