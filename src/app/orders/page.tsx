"use client";

import { getOrders } from "@/api";
import Loader from "@/components/Loader/Loader";
import OrderList from "@/components/Orders/OrderList/OrderList";
import { IOrdersList, IPagination } from "@/interfaces";
import React, { useEffect, useState } from "react";

export default function Orders() {
  const [orders, setOrders] = useState<IOrdersList[] | undefined | null>();
  const [pagination, setPagination] = useState<IPagination>({} as IPagination);

  useEffect(() => {
    const getOrdersList = async () => {
      const response = await getOrders();

      if (response) {
        const data = await response.data;

        setOrders(data.items);
        setPagination(() => {
          return {
            currentItems: data.currentItems,
            currentPage: data.currentPage,
            totalItems: data.totalItems,
            totalPages: data.totalPages,
          };
        });
      } else {
        setOrders(null);
      }
    };

    getOrdersList();
  }, []);

  console.log(orders);

  const showElems = () => {
    if (orders === undefined) return <Loader />;

    if (!orders?.length) {
      return (
        <div className="w-full text-center mt-3 text-base leading-none text-[#B3B3B3]">
          Список пуст
        </div>
      );
    } else {
      return <OrderList firstOrders={orders} firstPagination={pagination} />;
    }
  };

  return (
    <div className="container px-3">
      <div className="flex justify-center mt-3 mb-5">
        <h2 id="subTitleLine" className="relative uppercase font-medium">
          Заказы
        </h2>
      </div>

      {showElems()}
    </div>
  );
}
