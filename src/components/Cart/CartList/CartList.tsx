"use client";

import React, { useEffect, useMemo, useState } from "react";
import CartItem from "../CartItem/CartItem";
import { IPagination, IProductInCart } from "@/interfaces";
import { getProductsCart } from "@/api";
import { useModalStore } from "@/stores/useModalStore";
import { modalCartDeleteProduct } from "@/constans";
import { useCartStore } from "@/stores/useCartStore";

type Props = {
  products: IProductInCart[];
  cbSetProducts: (newProducts: IProductInCart[]) => void;

  pagination: IPagination;
  cbSetPagination: (newPagination: IPagination) => void;
};

export default function CartList({
  products,
  cbSetProducts,
  pagination,
  cbSetPagination,
}: Props) {
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const modalsProps = useModalStore((state) => state.modalsProps);
  const getProductsInCart = useCartStore((state) => state.getProductsInCart);

  useEffect(() => {
    if (modalsProps[modalCartDeleteProduct]?.isDeleted) {
      window.addEventListener("scroll", handleScroll);
    }
  }, [modalsProps]);

  useEffect(() => {
    const getProductsLoading = async () => {
      if (pagination.currentPage >= pagination.totalPages - 1) {
        window.removeEventListener("scroll", handleScroll);
        return;
      }

      console.log("Достигли низа, подгружаем ещё...");

      const response = await getProductsCart(pagination.currentPage + 1);

      if (response) {
        const data = await response.data;

        cbSetProducts([...products, ...data.items]);
        getProductsInCart([...products, ...data.items], pagination);
        cbSetPagination({
          currentItems: data.currentItems,
          currentPage: data.currentPage,
          totalItems: data.totalItems,
          totalPages: data.totalPages,
        });
      }

      setIsFetching(false);
    };

    if (products && pagination && isFetching) {
      getProductsLoading();
    }
  }, [isFetching]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = async (e: Event) => {
    const target = e.target as Document;
    const scrollTop = target.documentElement.scrollTop;
    const innerHeight = window.innerHeight;
    const scrollHeight = target.documentElement.scrollHeight;

    if (
      scrollHeight - (scrollTop + innerHeight) < 100 &&
      pagination.currentPage < pagination.totalPages - 1
    ) {
      setIsFetching(true);
    } else {
      setIsFetching(false);
    }
  };

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
}
