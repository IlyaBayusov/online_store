"use client";

import { getOrders } from "@/api";
import OrdersItem from "@/components/Orders/OrdersItem/OrdersItem";
import { IOrdersGet } from "@/interfaces";
import Link from "next/link";
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
    <div className="w-full px-3">
      <div className="my-2 w-full grid grid-cols-2 gap-3">
        {orders.map((order, index) => (
          <Link
            key={index}
            href={`/${order.categoryName.toLowerCase()}/${order.productId}`}
          >
            <OrdersItem order={order} />
          </Link>
        ))}
      </div>
    </div>
  );
}
