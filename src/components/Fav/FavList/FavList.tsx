import Link from "next/link";
import React from "react";
import FavItem from "../FavItem/FavItem";
import { IFavsGet } from "@/interfaces";

type Props = {
  favs: IFavsGet[];
};

export default function FavList({ favs }: Props) {
  return (
    <div className="container px-3">
      <div className="flex justify-center mt-3 mb-5">
        <h2 id="subTitleLine" className="relative uppercase font-medium">
          Избранные
        </h2>
      </div>

      {favs.length ? (
        <div className="my-2 w-full grid grid-cols-2 gap-3">
          {favs.map((fav, index) => (
            <Link key={index} href={`/${fav.subcategoryId}/${fav.productId}`}>
              <FavItem fav={fav} />
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-sm text-center text-[#B3B3B3] font-semibold mb-3">
          Список пуст
        </p>
      )}
    </div>
  );
}
