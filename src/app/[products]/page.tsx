"use client";

import React, { useEffect, useState } from "react";
import { notFound, useParams } from "next/navigation";
import { categoriesList } from "@/constans";
import ProductsList from "@/components/Products/ProductsList/ProductsList";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import axios from "axios";
import { ICategory } from "@/interfaces";

// Chelsea - id - 1
// Sneakers - id - 2
// Trousers - id - 3
// Shirts - id -4
// Ties - id - 5
// Belts - id - 6

const fetchProducts = async (products: string) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/v1/products/${products}/category&category=${products}`
    );

    const data = await response.data;

    return data;
  } catch (error) {
    console.error("ERROR PRODUCTS", error);
  }
};

export default function Products() {
  const [data, setData] = useState([]);
  const [category, setCategory] = useState<ICategory>();

  const params: Params = useParams();

  useEffect(() => {
    const getProducts = async () => {
      const productsData = await fetchProducts(params.products);

      setData(productsData.products);
    };

    setCategory(params.products);

    getProducts();
  }, [params.products]);
  console.log(data);

  if (
    !categoriesList
      .map((item) => item.name)
      .find((item) => item.toLowerCase() === params.products.toLowerCase())
  ) {
    return notFound();
  }

  if (category) {
    return <ProductsList category={category} products={data} />;
  }
}
