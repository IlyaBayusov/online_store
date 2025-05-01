import Link from "next/link";
import React from "react";
import FavItem from "../FavItem/FavItem";
import { IFavsGet } from "@/interfaces";

type Props = {
  favs: IFavsGet[];
};

export default function FavList({ favs }: Props) {
  return (
    <>
      <div className="my-2 w-full grid grid-cols-2 gap-3">
        {favs.map((fav, index) => (
          <Link key={index} href={`/${fav.subcategoryId}/${fav.productId}`}>
            <FavItem fav={fav} />
          </Link>
        ))}
      </div>
    </>
  );
}
