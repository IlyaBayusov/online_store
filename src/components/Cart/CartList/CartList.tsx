"use client";

import { IProductInCart } from "@/interfaces";
import React, { useEffect } from "react";
import CartItem from "../CartItem/CartItem";
import { useCartStore } from "@/stores/useCartStore";

type Props = { products: IProductInCart[] };

export default function CartList({ products }: Props) {
  const { updateSum } = useCartStore();

  useEffect(() => {
    const totalSum = products.reduce((acc, product) => {
      return acc + product.price * product.quantity;
    }, 0);
    updateSum(totalSum);
  }, [products, updateSum]);

  return (
    <div className="flex flex-col justify-center items-center w-full mt-3 mb-[4.75rem]">
      {products.map((product) => (
        <CartItem key={product.productId} product={product} />
      ))}
    </div>
  );
}
