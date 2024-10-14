"use client";

import Image, { StaticImageData } from "next/image";
import React from "react";

type Props = { id: number; name: string; img: string; price: string };

export default function NewArrivalsItem({ id, name, img, price }: Props) {
  console.log(img);

  return (
    <div className="flex flex-col justify-center">
      <div>
        <Image
          src={img}
          alt={name}
          height={200}
          width={200}
          className="rounded-md"
        />
      </div>

      <p className="text-xs text-center">{name}</p>
      <p className="text-xs text-center">{price}</p>
    </div>
  );
}
