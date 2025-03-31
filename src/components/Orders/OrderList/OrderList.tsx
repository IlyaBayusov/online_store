import { IOrdersList } from "@/interfaces";
import React from "react";
import OrderItem from "../OrderItem/OrderItem";

type Props = { orders: IOrdersList[] };

export default function OrderList({ orders }: Props) {
  return (
    <div className="container px-3">
      <div className="flex justify-center mt-3 mb-5">
        <h2 id="subTitleLine" className="relative uppercase font-medium">
          Заказы
        </h2>
      </div>

      <div className="my-2 w-full grid grid-cols-2 gap-3">
        {orders.length ? (
          orders.map((order) => <OrderItem key={order.orderId} order={order} />)
        ) : (
          <p className="text-sm text-center text-[#B3B3B3] font-semibold mb-3">
            Список пуст
          </p>
        )}
      </div>
    </div>
  );
}
