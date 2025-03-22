"use client";

import { getProductsCart } from "@/api";
import CartList from "@/components/Cart/CartList/CartList";
import { modalCartDeleteProduct } from "@/constans";
import { IProductInCart } from "@/interfaces";
import { useByProductsStore } from "@/stores/useByProducts";
import { useCartStore } from "@/stores/useCartStore";
import { useModalStore } from "@/stores/useModalStore";
import Head from "next/head";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Cart() {
  const [products, setProducts] = useState<IProductInCart[]>([]);
  const [sum, setSum] = useState<number>(0);

  const cart = useCartStore((state) => state.cart);
  const getProductsInCart = useCartStore((state) => state.getProductsInCart);

  const modalsProps = useModalStore((state) => state.modalsProps);

  const updateProducts = useByProductsStore((state) => state.updateProducts);

  const router = useRouter();

  useEffect(() => {
    getProducts();
    getProductsInCart();
  }, []);

  useEffect(() => {
    if (modalsProps[modalCartDeleteProduct]?.isDeleted) {
      getProducts();
    }
  }, [modalsProps]);

  useEffect(() => {
    const totalSum = cart.reduce(
      (acc, product) => acc + product.price * product.quantity,
      0
    );
    setSum(totalSum);
  }, [cart]);

  const getProducts = async () => {
    const data: IProductInCart[] | undefined = await getProductsCart();
    if (data) {
      setProducts(data);
    }
  };

  const handleBuy = () => {
    updateProducts(products);
    router.push("/cart/buyProducts");
  };

  console.log("рендер");

  return (
    <>
      <Head>
        <title>Корзина</title>
        <meta name="description" content="Главная страница" />
      </Head>

      <div className="container px-3">
        <div className="flex flex-col justify-center items-center w-full">
          <div className="mt-3 w-full bg-black rounded-t-2xl rounded-b-md">
            <h1 className="py-2 px-3 text-xl uppercase">Корзина</h1>
          </div>

          <CartList products={products} />
        </div>

        {products.length ? (
          <button
            className="flex flex-col items-center fixed bottom-7 left-1/2 -translate-x-1/2 z-[1000] w-[calc(100%-1.5rem)] py-2 rounded-md bg-orange-400"
            onClick={handleBuy}
          >
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
    </>
  );
}
