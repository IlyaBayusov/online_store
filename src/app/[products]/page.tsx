"use client";

import React, { useEffect, useState } from "react";
import { notFound, useParams } from "next/navigation";
import { categories } from "@/constans";
import ProductsList from "@/components/Products/ProductsList/ProductsList";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import axios from "axios";

// Chelsea - id - 1
// Sneakers - id - 2
// Trousers - id - 3
// Shirts - id -4
// Ties - id - 5
// Belts - id - 6

const fetchProducts = async (products: string) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/v1/products/${products}/category`
    );

    const data = await response.data;

    return data;
  } catch (error) {
    console.error("ERROR PRODUCTS", error);
  }
};

export default function Products() {
  const [data, setData] = useState([]);

  const params: Params = useParams();

  useEffect(() => {
    const getProducts = async () => {
      const productsData = await fetchProducts(params.products);

      setData(productsData.products);
    };

    getProducts();
  }, [params.products]);

  if (
    !categories
      .map((item) => item.next)
      .flat()
      .find((item) => item?.urlName == params.products)
  ) {
    return notFound();
  }
  return <ProductsList category={params.products} products={data} />;
}
