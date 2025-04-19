"use client";

import { IProductCategory } from "@/interfaces";
import Image from "next/image";
import React from "react";
import { MdOutlineImageNotSupported } from "react-icons/md";

type Props = { arrival: IProductCategory };

export default function NewArrivalsItem({ arrival }: Props) {
  return (
    <div className="flex flex-col justify-center">
      <div className="relative w-full h-[228px] bg-[#F0F0F0] flex justify-center items-center rounded-md">
        {arrival.image ? (
          <Image
            src={arrival.image}
            alt={arrival.name}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="rounded-md"
          />
        ) : (
          <MdOutlineImageNotSupported className="w-14 h-14 text-gray-400 absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2" />
        )}
      </div>

      <p className="text-base font-bold text-start">{`${arrival.price} РУБ.`}</p>
      <p className="text-sm text-start">{arrival.brandName}</p>
      <p className="text-sm text-start">{arrival.name}</p>
    </div>
  );
}
