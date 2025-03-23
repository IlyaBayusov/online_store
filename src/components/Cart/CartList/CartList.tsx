"use client";

import { IProductInCart } from "@/interfaces";
import React, { memo, useMemo } from "react";
import CartItem from "../CartItem/CartItem";

type Props = { products: IProductInCart[] };

export default memo(function CartList({ products }: Props) {
  const cartList = useMemo(
    () =>
      products.map((product) => (
        <CartItem key={product.productId} product={product} />
      )),
    [products]
  );

  return (
    <div className="flex flex-col justify-center items-center w-full mt-3 mb-[4.75rem]">
      {cartList}
    </div>
  );
});
