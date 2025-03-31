"use client";

import { getOrders } from "@/api";
import OrderItem from "@/components/Orders/OrderItem/OrderItem";
import { IOrdersList } from "@/interfaces";
import React, { useEffect, useState } from "react";

export default function Orders() {
  const [orders, setOrders] = useState<IOrdersList[]>([]);

  useEffect(() => {
    const getOrdersList = async () => {
      const response = await getOrders();
      if (response) {
        setOrders(response.items);
      }
    };

    getOrdersList();
  }, []);

  if (!orders) return <div>Loading...</div>;

  return orders.map((order) => <OrderItem key={order.orderId} order={order} />);
}
