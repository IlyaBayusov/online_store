import ProductInfo from "@/components/ProductInfo/ProductInfo";
import { IProductInfo } from "@/interfaces/Index";
import React from "react";

type Props = {};

const fetchProducts = async (productId: string) => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/v1/products/${productId}`
    );

    if (!response.ok) {
      throw {
        status: response.status,
        message: `Ошибка запроса товара с id: ${productId}`,
      };
    }

    const data = await response.json();

    return data;
  } catch (error) {
    if (
      error?.code == 404 ||
      error?.message == `Product with id = ${productId}  not found`
    ) {
      return { message: `Product with id = ${productId}  not found` };
    }
    if (error instanceof TypeError && error.message === "Failed to fetch") {
      console.error("Network error: Failed to fetch the resource.");
      return {
        status: 0,
        message: "Network error. Please check your connection.",
      };
    }

    console.error("ERROR PRODUCTS", error);

    return { status: 500, message: "Internal Server Error" };
  }
};

export default async function Product({
  params,
}: {
  params: { product: string };
}) {
  const { product } = params;

  const arrProduct: IProductInfo[] = await fetchProducts(product);
  console.log(arrProduct);

  const productIdInArray = await arrProduct
    .map((item) => item.id)
    .indexOf(Number(product));

  if (arrProduct)
    return (
      <ProductInfo
        id={Number(product)}
        productIdInArray={productIdInArray}
        arrProduct={arrProduct}
      />
    );
}
