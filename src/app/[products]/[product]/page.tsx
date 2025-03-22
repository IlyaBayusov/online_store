import ProductInfo from "@/components/ProductInfo/ProductInfo";
import { IGetCategories, IProductInfo } from "@/interfaces/index";
import axios from "axios";
import { notFound } from "next/navigation";
import React from "react";

const fetchProducts = async (productId: string) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/v1/products/${productId}`
    );

    const data = await response.data;

    return data;
  } catch (error) {
    console.error("Ошибка получения продукта: ", error);

    return { status: 500, message: "Internal Server Error" };
  }
};

const getCategories = async () => {
  try {
    const response = await axios.get(
      "http://localhost:8080/api/v1/subcategories",
      {
        headers:
          typeof window !== "undefined"
            ? {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              }
            : {},
      }
    );

    if (response.status !== 200) {
      console.error("Ошибка получения категорий: статус", response.status);
      return null;
    }

    return response.data;
  } catch (error) {
    console.error("Ошибка получения категорий:", error);
    return null;
  }
};

export default async function Product({
  params,
}: {
  params: { product: string; products: string };
}) {
  const { product, products } = params;

  // Получаем продукт
  const arrProduct: IProductInfo[] | null = await fetchProducts(product);
  if (!arrProduct) {
    return notFound();
  }

  // Проверяем, есть ли такой продукт
  const productIndex = arrProduct.findIndex(
    (item) => String(item.id) === product
  );
  if (productIndex === -1) {
    return notFound();
  }

  // Получаем категории
  const response = await getCategories();

  const categoriesArr: IGetCategories[] = response.items;

  // Проверяем, существует ли такая категория
  const category = categoriesArr.find((item) => String(item.id) === products);
  if (!category) {
    return notFound();
  }

  // Проверяем, принадлежит ли продукт этой категории
  if (arrProduct[productIndex].categoryName !== String(category.name)) {
    return notFound();
  }

  return (
    <ProductInfo
      productIdInArray={productIndex}
      arrProduct={arrProduct}
      category={category}
    />
  );
}
