import Link from "next/link";
import React from "react";
import NewArrivalsItem from "../NewArrivalsItem/NewArrivalsItem";
// import { newArrivals } from "@/constans";

type Props = { newArrivals: object[] };

export default function NewArrivalsList({ newArrivals }: Props) {
  return (
    <div className="container px-3">
      <div className="flex justify-center mt-3 mb-5">
        <h2 id="subTitleLine" className="relative uppercase font-medium">
          Новые поступления
        </h2>
      </div>
      <div className="my-2 w-full grid grid-cols-3 grid-rows-2 gap-2 gap-y-2">
        {newArrivals.map((arrival) => (
          <Link key={arrival.productId} href="#">
            <NewArrivalsItem
              id={arrival.productId}
              name={arrival.name}
              img={arrival.image}
              price={arrival.price}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
