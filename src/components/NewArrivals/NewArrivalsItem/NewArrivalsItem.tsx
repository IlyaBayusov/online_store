import Image, { StaticImageData } from "next/image";
import React from "react";

type Props = { id: number; name: string; img: StaticImageData; price: string };

export default function NewArrivalsItem({ id, name, img, price }: Props) {
  return (
    <div className="flex flex-col justify-center">
      <div>
        <Image src={img} alt={name} className="rounded-md" />
      </div>

      <p className="text-xs text-center">{name}</p>
      <p className="text-xs text-center">{price}</p>
    </div>
  );
}
