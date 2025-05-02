"use client";

import { IOrdersList, IPagination } from "@/interfaces";
import React, { useEffect, useState } from "react";
import OrderItem from "../OrderItem/OrderItem";
import { getOrders } from "@/api";

type Props = { firstOrders: IOrdersList[]; firstPagination: IPagination };

export default function OrderList({ firstOrders, firstPagination }: Props) {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [orders, setOrders] = useState<IOrdersList[]>(firstOrders);
  const [pagination, setPagination] = useState<IPagination>(firstPagination);

  useEffect(() => {
    const getProductsLoading = async () => {
      if (pagination.currentPage >= pagination.totalPages - 1) {
        window.removeEventListener("scroll", handleScroll);
        return;
      }

      console.log("Достигли низа, подгружаем ещё...");

      const response = await getOrders(pagination.currentPage + 1);

      if (response) {
        const data = await response.data;

        setOrders((prev) => {
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

    if (orders && pagination && isFetching) {
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

  return (
    <div className="my-2 w-full grid grid-cols-2 gap-3">
      {orders.length &&
        orders.map((order) => <OrderItem key={order.orderId} order={order} />)}
    </div>
  );
}
