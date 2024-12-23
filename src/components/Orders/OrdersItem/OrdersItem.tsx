import { IOrdersGet } from "@/interfaces";
import { getStatusRu } from "@/utils";
import Image from "next/image";
import React from "react";

type Props = { order: IOrdersGet };

export default function OrdersItem({ order }: Props) {
  return (
    <div className="flex flex-col justify-center">
      <div className="relative">
        <div className="relative w-full h-[228px] bg-[#F0F0F0] flex justify-center items-center rounded-md">
          <Image
            src={order.image}
            alt={order.productName}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="rounded-md"
          />
        </div>

        <div className="absolute top-1 right-0 z-10 flex flex-col justify-end">
          <p className="bg-orange-400 px-2 p-0.5 text-sm rounded-s-md">
            {getStatusRu(order.status)}
          </p>
        </div>

        <div className="absolute bottom-0 right-0 z-10 flex flex-col justify-end bg-black bg-opacity-50 rounded-tl-md rounded-br-md p-1">
          <p className="text-xs text-white">Размер: {order.size}</p>
          <p className="text-xs text-white">Кол-во: {order.quantity} шт.</p>
        </div>
      </div>

      <p className="text-base font-bold text-start">{`${order.price} РУБ.`}</p>
      <p className="text-sm text-start">{order.productName}</p>
    </div>
  );
}
