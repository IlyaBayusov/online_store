"use client";

import { getFav } from "@/api";
import FavList from "@/components/Fav/FavList/FavList";
import Loader from "@/components/Loader/Loader";
import { IFavsGet } from "@/interfaces";
import React, { useEffect, useState } from "react";

export default function Favorites() {
  const [favs, setFavs] = useState<IFavsGet[] | undefined | null>();

  useEffect(() => {
    const getFavsList = async () => {
      const data = await getFav();

      if (data) {
        setFavs(data.items);
      } else {
        setFavs(null);
      }
    };

    getFavsList();
  }, []);

  const showElems = () => {
    if (favs === undefined) return <Loader />;

    if (!favs) {
      return (
        <div className="text-center mt-3 text-base leading-none text-[#B3B3B3]">
          Список пуст
        </div>
      );
    } else {
      return <FavList favs={favs} />;
    }
  };

  return (
    <div className="container px-3">
      <div className="flex justify-center mt-3 mb-5">
        <h2 id="subTitleLine" className="relative uppercase font-medium">
          Избранные
        </h2>
      </div>

      {showElems()}
    </div>
  );
}
