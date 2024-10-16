import React from "react";
import { notFound } from "next/navigation";
import { categories } from "@/constans";
import ProductsList from "@/components/Products/ProductsList/ProductsList";

// Chelsea - id - 1
// Sneakers - id - 2
// Trousers - id - 3
// Shirts - id -4
// Ties - id - 5
// Belts - id - 6

const fetchProducts = async (products: string) => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/v1/products/${products}/category`
    );
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("ERROR PRODUCTS", error);
  }
};

export default async function Products({
  params,
}: {
  params: { products: string };
}) {
  const { products } = params;
  const productsData = await fetchProducts(products);

  if (
    !categories
      .map((item) => item.next)
      .flat()
      .find((item) => item?.urlName == products)
  ) {
    return notFound();
  }

  console.log(productsData);

  return (
    <div>
      <ProductsList category={products} products={productsData.products} />
    </div>
  );
}
