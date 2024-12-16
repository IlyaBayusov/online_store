import Image, { StaticImageData } from "next/image";
import React from "react";

type Props = { name: string; img: StaticImageData };

export default function CategoryItem({ name, img }: Props) {
  return (
    <div className="flex flex-col justify-center">
      <div className="relative w-full h-[228px] bg-[#F0F0F0] flex justify-center items-center rounded-md">
        <Image
          src={img}
          alt={name}
          fill
          objectFit="cover"
          className="rounded-md"
        />
      </div>

      <p className="text-sm text-center">{name}</p>
    </div>
  );
}
