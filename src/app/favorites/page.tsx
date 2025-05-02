"use client";

import { getFav } from "@/api";
import FavList from "@/components/Fav/FavList/FavList";
import Loader from "@/components/Loader/Loader";
import { IFavsGet, IPagination } from "@/interfaces";
import React, { useEffect, useState } from "react";

export default function Favorites() {
  const [favs, setFavs] = useState<IFavsGet[] | undefined | null>();
  const [pagination, setPagination] = useState<IPagination>({} as IPagination);

  useEffect(() => {
    const getFavsList = async () => {
      const response = await getFav();

      if (response) {
        const data = await response.data;

        setFavs(data.items);
        setPagination(() => {
          return {
            currentItems: data.currentItems,
            currentPage: data.currentPage,
            totalItems: data.totalItems,
            totalPages: data.totalPages,
          };
        });
      } else {
        setFavs(null);
      }
    };

    getFavsList();
  }, []);

  console.log(favs);

  const showElems = () => {
    if (favs === undefined) return <Loader />;

    if (!favs?.length) {
      return (
        <div className="text-center mt-3 text-base leading-none text-[#B3B3B3]">
          Список пуст
        </div>
      );
    } else {
      return <FavList firstFavs={favs} firstPagination={pagination} />;
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
