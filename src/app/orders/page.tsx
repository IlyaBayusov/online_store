"use client";

import { getOrders } from "@/api";
import Loader from "@/components/Loader/Loader";
import OrderItem from "@/components/Orders/OrderItem/OrderItem";
import { IOrdersList } from "@/interfaces";
import React, { useEffect, useState } from "react";

export default function Orders() {
  const [orders, setOrders] = useState<IOrdersList[] | undefined | null>();

  useEffect(() => {
    const getOrdersList = async () => {
      const data = await getOrders();

      if (data) {
        setOrders(data.items);
      } else {
        setOrders(null);
      }
    };

    getOrdersList();
  }, []);

  const showElems = () => {
    if (orders === undefined) return <Loader />;

    if (!orders) {
      return (
        <div className="w-full text-center mt-3 text-base leading-none text-[#B3B3B3]">
          Список пуст
        </div>
      );
    } else {
      return orders.map((order) => (
        <OrderItem key={order.orderId} order={order} />
      ));
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
