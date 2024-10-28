"use client";

import { IProductCategory } from "@/interfaces";
import Image, { StaticImageData } from "next/image";
import React from "react";

type Props = { arrival: IProductCategory };

export default function NewArrivalsItem({ arrival }: Props) {
  return (
    <div className="flex flex-col justify-center">
      <div>
        <Image
          src={arrival.image}
          alt={arrival.name}
          height={200}
          width={200}
          className="rounded-md"
        />
      </div>

      <p className="text-xs text-center">{arrival.name}</p>
      <p className="text-xs text-center">{arrival.price}</p>
    </div>
  );
}
