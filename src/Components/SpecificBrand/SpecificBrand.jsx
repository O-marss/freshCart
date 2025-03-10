import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useProducts from "../../Hooks/useProducts.jsx";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import Loading from "../Loading/Loading.jsx";
import logo from "../../assets/images/freshcart-logo.svg";
import useBrands from "../../Hooks/useBrands.jsx";
import ProductCard from "../ProductCard/ProductCard.jsx";
import Sorting from "../Sorting/Sorting.jsx";
import useSorting from "../../Hooks/useSorting.jsx";

export default function SpecificBrand() {
  const { id } = useParams();

  const { data: brand } = useBrands(
    `https://ecommerce.routemisr.com/api/v1/brands/${id}`,
    `getSpecificBrand${id}`
  );

  const { data: products, isLoading } = useProducts(
    `https://ecommerce.routemisr.com/api/v1/products`,
    `allProducts`
  );

  const [brandProducts, setBrandProducts] = useState([]);
  const { handleSorting } = useSorting();
  const [sortValue, setSortValue] = useState('default');
  const [sortedProducts, setSortedProducts] = useState([]);

  useEffect(() => {
    if (products && brand) {
      const filteredProducts = products?.filter((product) => product.brand.name === brand?.name)
      setBrandProducts(filteredProducts);
    }
  }, [products, brand]);

  useEffect(() => {
    const sorted = handleSorting([...brandProducts], sortValue);
    setSortedProducts(sorted);
  }, [brandProducts, sortValue])


  function PaginatedItems({ itemsPerPage }) {
    const [itemOffset, setItemOffset] = useState(0);
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = sortedProducts?.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(sortedProducts?.length / itemsPerPage);
    const handlePageClick = (event) => {
      const newOffset =
        (event.selected * itemsPerPage) % sortedProducts?.length;
      setItemOffset(newOffset);
    };

    return (
      <>
        <div className="flex flex-wrap justify-center items-center ">
          {currentItems?.map(
            (product) =>
              product.brand.name == brand?.name && (
                <ProductCard key={product.id} product={product} />
              )
          )}
        </div>
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          containerClassName="pagination"
          activeClassName="active"
        />
      </>
    );
  }

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <section className="pt-20 lg:px-14 container">

            {sortedProducts?.length ? (
              <>

                <div className="flex justify-center items-center pb-8 lg:pb-0">
                  <img src={brand?.image} alt="" />
                </div>
                <Sorting sortValue={sortValue} setSortValue={setSortValue} />
                <PaginatedItems itemsPerPage={8} />
              </>
            ) : (
              <div className="flex flex-col items-center pt-12">
                <img src={logo} alt="" width={500} className="p-12" />
                <p className="text-xl md:text-xl lg:text-2xl text-center mb-5 md:mb-2">
                  We’re sorry, but the products in this brand are unavailable
                  right now.
                </p>
                <p className="md:text-lg text-gray-600 text-center">
                  In the meantime, feel free to explore other categories or
                  reach out to us for more help
                </p>
              </div>
            )}
          </section>
        </>
      )}
    </>
  );
}
