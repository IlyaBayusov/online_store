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

  if (orders === null) return <Loader />;

  if (!orders) {
    return (
      <span className="mt-3 text-base leading-none text-[#B3B3B3]">
        Заказов нет
      </span>
    );
  } else {
    return orders.map((order) => (
      <OrderItem key={order.orderId} order={order} />
    ));
  }
}
