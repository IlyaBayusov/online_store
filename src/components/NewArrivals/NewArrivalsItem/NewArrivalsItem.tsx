"use client";

import { IProductCategory } from "@/interfaces";
import Image from "next/image";
import React from "react";

type Props = { arrival: IProductCategory };

export default function NewArrivalsItem({ arrival }: Props) {
  return (
    <div className="flex flex-col justify-center">
      <div className="relative w-full h-[228px] bg-[#F0F0F0] flex justify-center items-center rounded-md">
        <Image
          src={arrival.image}
          alt={arrival.name}
          fill
          style={{ objectFit: "cover" }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="rounded-md"
        />
      </div>

      <p className="text-base font-bold text-start">{`${arrival.price} РУБ.`}</p>
      <p className="text-sm text-start">{arrival.name}</p>
    </div>
  );
}
