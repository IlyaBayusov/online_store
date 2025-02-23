"use client";

import { IProductInCart } from "@/interfaces";
import React from "react";
import CartItem from "../CartItem/CartItem";

type Props = { products: IProductInCart[] };

export default function CartList({ products }: Props) {
  return (
    <div className="flex flex-col justify-center items-center w-full mt-3 mb-[4.75rem]">
      {products.map((product) => (
        <CartItem key={product.productId} product={product} />
      ))}
    </div>
  );
}
