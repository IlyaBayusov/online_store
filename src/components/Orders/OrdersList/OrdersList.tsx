import { IOrdersGet } from "@/interfaces";
import Link from "next/link";
import React from "react";
import OrdersItem from "../OrdersItem/OrdersItem";

type Props = { products: IOrdersGet[] };

export default function OrdersList({ products }: Props) {
  return (
    <div className="container px-3">
      <div className="flex justify-center mt-3 mb-5">
        <h2 id="subTitleLine" className="relative uppercase font-medium">
          Заказы
        </h2>
      </div>

      <div className="my-2 w-full grid grid-cols-2 gap-3">
        {products.map((product, index) => (
          <Link
            key={index}
            href={`/${product.subcategoryId}/${product.productId}`}
          >
            <OrdersItem order={product} />
          </Link>
        ))}
      </div>
    </div>
  );
}
