"use client";

import { getProductsCart } from "@/api";
import CartList from "@/components/Cart/CartList/CartList";
import { modalCartDeleteProduct } from "@/constans";
import { IProductInCart } from "@/interfaces";
import { useCartStore } from "@/stores/useCartStore";
import { useModalStore } from "@/stores/useModalStore";
import React, { useEffect, useState } from "react";

export default function Cart() {
  const [products, setProducts] = useState<IProductInCart[]>([]);
  const { sum } = useCartStore();
  const { modalsProps } = useModalStore();

  const getProducts = async () => {
    const data: IProductInCart[] = await getProductsCart();
    setProducts(data);
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    if (modalsProps[modalCartDeleteProduct]?.isDeleted) {
      getProducts();
    }
  }, [modalsProps]);

  return (
    <div className="container px-3">
      <div className="flex flex-col justify-center items-center w-full">
        <div className="mt-3 w-full bg-black rounded-t-2xl rounded-b-md">
          <h1 className="py-2 px-3 text-xl uppercase">Корзина</h1>
        </div>

        <CartList products={products} />
      </div>

      {products.length ? (
        <button className="flex flex-col items-center fixed bottom-7 left-1/2 -translate-x-1/2 z-[1000] w-[calc(100%-1.5rem)] py-2 rounded-md bg-orange-400">
          <span className="text-base leading-none">К оформлению</span>
          <span className="text-base leading-none">{`${products.length} шт., ${sum} руб.`}</span>
        </button>
      ) : (
        <button
          disabled
          className="flex flex-col items-center fixed bottom-7 left-1/2 -translate-x-1/2 z-[1000] w-[calc(100%-1.5rem)] py-2 rounded-md bg-[#3A3A3A]"
        >
          <span className="text-base leading-none text-[#B3B3B3]">
            Корзина пуста
          </span>
        </button>
      )}
    </div>
  );
}
