import { IOrdersGet } from "@/interfaces";
import Image from "next/image";
import React from "react";

type Props = { order: IOrdersGet };

export default function OrdersItem({ order }: Props) {
  return (
    <div className="flex flex-col justify-center">
      <div>
        <Image
          src={order.image}
          alt={order.image}
          height={200}
          width={200}
          className="rounded-md"
        />
      </div>

      <p className="text-base font-bold text-start">{`${order.price} РУБ.`}</p>
      <p className="text-sm text-start">{order.productName}</p>
    </div>
  );
}
