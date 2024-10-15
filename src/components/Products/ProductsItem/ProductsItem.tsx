import Image from "next/image";
import React from "react";

type Props = { id: number; name: string; img: string; price: number };

export default function ProductsItem({ id, name, img, price }: Props) {
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
