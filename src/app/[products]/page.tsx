"use client";

import React, { useEffect, useState } from "react";
import { notFound, useParams } from "next/navigation";
import ProductsList from "@/components/Products/ProductsList/ProductsList";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import axios from "axios";
import { IGetSubCategories, IPagination } from "@/interfaces";
import { getSubCategories } from "@/api";
import { IoMdSearch } from "react-icons/io";

const fetchProducts = async (urlName: string) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/v1/products/${urlName}/category`
    );
    const data = await response.data;

    return data;
  } catch (error) {
    console.error("ERROR PRODUCTS", error);
  }
};

export default function Products() {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState<IPagination>({} as IPagination);
  const [category, setCategory] = useState<IGetSubCategories>();
  const [inputSearch, setInputSearch] = useState("");

  const params: Params = useParams();

  useEffect(() => {
    const getProducts = async () => {
      const productsData = await fetchProducts(params.products);

      setProducts(productsData.items);
      setPagination({
        currentItems: productsData.currentItems,
        currentPage: productsData.currentPage,
        totalItems: productsData.totalItems,
        totalPages: productsData.totalPages,
      });
    };

    getProducts();
  }, [params.products]);

  useEffect(() => {
    const getCategoriesArr = async () => {
      const response = await getSubCategories();
      const categoriesArr: IGetSubCategories[] = await response.products;

      const categoryId = categoriesArr
        .map((item: IGetSubCategories) => item.id)
        .find((item: number) => String(item) === params.products);

      if (!categoryId) {
        return notFound();
      } else {
        setCategory(categoriesArr[categoryId - 1]);
      }
    };

    getCategoriesArr();
  }, [params.products]);

  useEffect(() => {
    setInterval(() => {}, 500);
  }, [inputSearch]);

  const handleClickSearch = (e) => {
    setInputSearch(e.target.value);
  };

  if (category) {
    return (
      <>
        <div className="mt-3 px-3 w-full flex justify-center items-center gap-2">
          <input
            type="text"
            placeholder="Поиск"
            className="py-2 px-4 w-full text-sm bg-[#3A3A3A] text-white rounded-md"
            onChange={handleClickSearch}
            value={inputSearch}
          />
          <button className="py-2">
            <IoMdSearch className="h-5 w-5 text-white" />
          </button>
        </div>

        <ProductsList
          category={category}
          products={products}
          pagination={pagination}
        />
      </>
    );
  }
}
