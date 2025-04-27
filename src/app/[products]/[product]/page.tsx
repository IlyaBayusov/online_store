import { fetchProducts, getSubCategoryId } from "@/axios";
import ProductInfo from "@/components/ProductInfo/ProductInfo";
import { IProductInfo } from "@/interfaces/index";
import { notFound } from "next/navigation";
import React from "react";

export default async function Product({
  params,
}: {
  params: { product: string; products: string };
}) {
  const { product, products } = params;

  // Получаем категории
  const response = await getSubCategoryId(products);
  if (!response) {
    return notFound();
  }

  const data = response?.data;

  // Получаем продукт
  const arrProduct: IProductInfo[] | null = await fetchProducts(product);

  if (!arrProduct) {
    return notFound();
  }

  // Проверяем, есть ли такой продукт
  const productIndex = arrProduct?.findIndex(
    (item) => String(item.id) === product
  );
  if (productIndex === -1) {
    return notFound();
  }

  // Проверяем, принадлежит ли продукт этой категории
  if (arrProduct[productIndex]?.categoryName !== String(data.name)) {
    return notFound();
  }

  return (
    <ProductInfo
      productIdInArray={productIndex}
      arrProduct={arrProduct}
      category={data}
    />
  );
}
