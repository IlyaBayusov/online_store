"use client";

import { getCountAndPriceProductsCart, getProductsCart } from "@/api";
import CartList from "@/components/Cart/CartList/CartList";
import { modalCartDeleteProduct } from "@/constans";
import { IPagination, IProductInCart } from "@/interfaces";
import { useByProductsStore } from "@/stores/useByProducts";
import { useCartStore } from "@/stores/useCartStore";
import { useModalStore } from "@/stores/useModalStore";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Cart() {
  const [products, setProducts] = useState<IProductInCart[]>([]);
  const [pagination, setPagination] = useState<IPagination>({} as IPagination);

  const cart = useCartStore((state) => state.cart);
  const count = useCartStore((state) => state.count);
  const price = useCartStore((state) => state.price);
  const getProductsInCart = useCartStore((state) => state.getProductsInCart);
  const getCount = useCartStore((state) => state.getCount);
  const getPrice = useCartStore((state) => state.getPrice);

  const modalsProps = useModalStore((state) => state.modalsProps);

  const updateProducts = useByProductsStore((state) => state.updateProducts);

  const router = useRouter();

  useEffect(() => {
    const fc = async () => {
      const data: {
        countOfProducts: number;
        totalPrice: number;
      } = await getCountAndPriceProductsCart();

      if (data) {
        getCount(data.countOfProducts);
        getPrice(data.totalPrice);
      }

      getProducts();
    };

    fc();
  }, []);

  useEffect(() => {
    if (modalsProps[modalCartDeleteProduct]?.isDeleted) {
      getProducts();
    }
  }, [modalsProps]);

  const getProducts = async () => {
    const response = await getProductsCart();

    if (response) {
      const data = await response.data;

      setProducts(data.items);
      setPagination(() => {
        return {
          currentItems: data.currentItems,
          currentPage: data.currentPage,
          totalItems: data.totalItems,
          totalPages: data.totalPages,
        };
      });

      getProductsInCart(data.items, {
        currentItems: data.currentItems,
        currentPage: data.currentPage,
        totalItems: data.totalItems,
        totalPages: data.totalPages,
      });

      return data;
    }

    return;
  };

  const handleBuy = () => {
    updateProducts(products);
    router.push("/cart/buyProducts");
  };

  const showElems = () => {
    return cart.length ? (
      <CartList
        products={products}
        cbSetProducts={setProducts}
        pagination={pagination}
        cbSetPagination={setPagination}
      />
    ) : (
      <span className="mt-3 text-base leading-none text-[#B3B3B3]">
        Корзина пуста
      </span>
    );
  };

  return (
    <div className="container px-3">
      <div className="flex flex-col justify-center items-center w-full">
        <div className="mt-3 w-full bg-black rounded-t-2xl rounded-b-md">
          <h1 className="py-2 px-3 text-xl uppercase">Корзина</h1>
        </div>

        {showElems()}
      </div>

      {products.length ? (
        <button
          className="flex flex-col items-center fixed bottom-7 left-1/2 -translate-x-1/2 z-[1000] w-[calc(100%-1.5rem)] py-2 rounded-md bg-orange-400"
          onClick={handleBuy}
        >
          <span className="text-base leading-none">К оформлению</span>
          <span className="text-base leading-none">{`${count} шт., ${price} руб.`}</span>
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
