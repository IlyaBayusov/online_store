"use client";

import React, { memo, useEffect, useMemo, useState } from "react";
import CartItem from "../CartItem/CartItem";
import { IPagination, IProductInCart } from "@/interfaces";
import { getProductsCart } from "@/api";

type Props = {
  firstProducts: IProductInCart[];
  firstPagination: IPagination;
};

export default memo(function CartList({
  firstProducts,
  firstPagination,
}: Props) {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [products, setProducts] = useState<IProductInCart[]>(firstProducts);
  const [pagination, setPagination] = useState<IPagination>(firstPagination);

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

        setProducts((prev) => {
          return [...prev, ...data.items];
        });
        setPagination(() => {
          return {
            currentItems: data.currentItems,
            currentPage: data.currentPage,
            totalItems: data.totalItems,
            totalPages: data.totalPages,
          };
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
});
