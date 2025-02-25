"use client";

import React, { useEffect, useState } from "react";
import { notFound, useParams } from "next/navigation";
import ProductsList from "@/components/Products/ProductsList/ProductsList";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import axios from "axios";
import { IGetCategories, IPagination } from "@/interfaces";
import { getCategories } from "@/api";

// Chelsea - id - 1
// Sneakers - id - 2
// Trousers - id - 3
// Shirts - id -4
// Ties - id - 5
// Belts - id - 6

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
  const [category, setCategory] = useState<IGetCategories>();

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
      const response = await getCategories();
      const categoriesArr: IGetCategories[] = await response.products;

      const categoryId = categoriesArr
        .map((item: IGetCategories) => item.id)
        .find((item: number) => String(item) === params.products);

      if (!categoryId) {
        return notFound();
      } else {
        setCategory(categoriesArr[categoryId - 1]);
      }
    };

    getCategoriesArr();
  }, [params.products]);

  if (category) {
    return (
      <ProductsList
        category={category}
        products={products}
        pagination={pagination}
      />
    );
  }
}
