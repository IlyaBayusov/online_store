import Link from "next/link";
import React from "react";
import NewArrivalsItem from "../NewArrivalsItem/NewArrivalsItem";
import { newArrivals } from "@/constans";

type Props = {};

export default function NewArrivalsList({}: Props) {
  return (
    <div className="container px-3">
      <div className="flex justify-center mt-3 mb-5">
        <h2 id="subTitleLine" className="relative uppercase font-medium">
          Новые поступления
        </h2>
      </div>
      <div className="my-2 w-full grid grid-cols-3 grid-rows-2 gap-2 gap-y-2">
        {newArrivals.map((arrival) => (
          <Link key={arrival.id} href="#">
            <NewArrivalsItem
              id={arrival.id}
              name={arrival.name}
              img={arrival.img}
              price={arrival.price}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
