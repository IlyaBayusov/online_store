import { IOrdersGet } from "@/interfaces";
import Link from "next/link";
import React from "react";
import OrdersItem from "../OrdersItem/OrdersItem";

type Props = { orders: IOrdersGet[] };

export default function OrdersList({ orders }: Props) {
  return (
    <div className="container px-3">
      <div className="flex justify-center mt-3 mb-5">
        <h2 id="subTitleLine" className="relative uppercase font-medium">
          Заказы
        </h2>
      </div>
      {orders.length ? (
        <div className="my-2 w-full grid grid-cols-2 gap-3">
          {orders.map((order, index) => (
            <Link
              key={index}
              href={`/${order.subcategoryId}/${order.productId}`}
            >
              <OrdersItem order={order} />
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-sm text-center text-[#B3B3B3] font-semibold mb-3">
          Список пуст
        </p>
      )}
    </div>
  );
}
