import React, { useEffect } from "react";
import style from "./SpecificCategory.module.css";
import useCategories from "../../Hooks/useCategories";
import { useParams } from "react-router-dom";
import useProducts from "../../Hooks/useProducts.jsx";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import Loading from "../Loading/Loading.jsx";
import logo from "../../assets/images/freshcart-logo.svg";
import ProductCard from "../ProductCard/ProductCard.jsx";

export default function Categories() {
  const { id } = useParams();

  const { data: category } = useCategories(
    `https://ecommerce.routemisr.com/api/v1/categories/${id}`,
    `getAllCategories${id}`
  );

  const { data: products, isLoading } = useProducts(
    `https://ecommerce.routemisr.com/api/v1/products`,
    `recentProducts${id}`
  );

  const { data: subCategories } = useCategories(
    `https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`,
    `getAllSubCategories${id}`
  );

  const [categoryProduct, setCategoryProduct] = useState([]);

  useEffect(() => {
    if (products && category) {
      setCategoryProduct(
        products?.filter((product) => product.category?.name === category?.name)
      );
    } else {
      setCategoryProduct([]);
    }
  }, [products, category]);

  function PaginatedItems({ itemsPerPage }) {
    const [itemOffset, setItemOffset] = useState(0);
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = categoryProduct?.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(categoryProduct?.length / itemsPerPage);
    const handlePageClick = (event) => {
      const newOffset =
        (event.selected * itemsPerPage) % categoryProduct?.length;
      setItemOffset(newOffset);
    };

    return (
      <>
        <div className="flex flex-wrap justify-center items-center">
          {currentItems?.map(
            (product) =>
              product.category.name == category?.name && (
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
          <section className="pt-20">
            <div className="text-center text-[12px] md:text-sm text-white bg-[#4A4947] p-8 md:p-24 pt-12">
              {subCategories?.map((subCategory, index) => (
                <span key={subCategory._id}>
                  {subCategory?.name}
                  {index !== subCategories?.length - 1 && " / "}
                </span>
              ))}
              <h2 className="text-3xl md:text-5xl text-center font-semibold mt-5">
                {category?.name}
              </h2>
              <p className="text-[12px] md:text-sm pt-8">*Orders processed in up to 3 business days. Actual delivery times will vary.</p>
            </div>

            <div className="container">
              {categoryProduct.length ? (

                <PaginatedItems itemsPerPage={8} />

              ) : (
                <div className="flex flex-col items-center pt-12">
                  <img src={logo} alt="" width={500} className="p-12" />
                  <p className="text-xl md:text-xl lg:text-2xl text-center mb-5 md:mb-2">
                    We’re sorry, but the products in this category are unavailable
                    right now.
                  </p>
                  <p className="md:text-lg text-gray-600 text-center">
                    In the meantime, feel free to explore other categories or
                    reach out to us for more help
                  </p>
                </div>
              )}
            </div>
          </section>
        </>
      )}
    </>
  )
}
