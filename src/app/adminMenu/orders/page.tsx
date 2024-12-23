"use client";

import { getOrders } from "@/api";
import OrdersList from "@/components/Orders/OrdersList/OrdersList";
import { IOrdersGet } from "@/interfaces";
import React, { useEffect, useState } from "react";

export default function OrdersAdmin() {
  const [orders, setOrders] = useState<IOrdersGet[]>([]);

  useEffect(() => {
    const getOrdersList = async () => {
      const data: IOrdersGet[] | undefined = await getOrders();
      if (data) setOrders(data);
    };

    getOrdersList();
  }, []);

  if (orders.length === 0)
    return <div className="py-1 w-full flex justify-center">Список пуст</div>;
  if (!orders)
    return <div className="py-1 w-full flex justify-center">Loading...</div>;

  return (
    <div>
      <OrdersList orders={orders} />
    </div>
  );
}
