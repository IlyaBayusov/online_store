"use client";

import { getFav } from "@/api";
import FavList from "@/components/Fav/FavList/FavList";
import { IFavsGet } from "@/interfaces";
import React, { useEffect, useState } from "react";

export default function Favorites() {
  const [favs, setFavs] = useState<IFavsGet[]>([]);

  useEffect(() => {
    const getFavsList = async () => {
      const response = await getFav();
      console.log(response);

      if (response) {
        setFavs(response.items);
      }
    };

    getFavsList();
  }, []);

  if (!favs) return <div>Loading...</div>;

  return <FavList favs={favs} />;
}
