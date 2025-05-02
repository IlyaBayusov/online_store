"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import FavItem from "../FavItem/FavItem";
import { IFavsGet, IPagination } from "@/interfaces";
import { getFav } from "@/api";

type Props = {
  firstFavs: IFavsGet[];
  firstPagination: IPagination;
};

export default function FavList({ firstFavs, firstPagination }: Props) {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [favs, setFavs] = useState<IFavsGet[]>(firstFavs);
  const [pagination, setPagination] = useState<IPagination>(firstPagination);

  useEffect(() => {
    const getProductsLoading = async () => {
      if (pagination.currentPage >= pagination.totalPages - 1) {
        window.removeEventListener("scroll", handleScroll);
        return;
      }

      console.log("Достигли низа, подгружаем ещё...");

      const response = await getFav(pagination.currentPage + 1);

      if (response) {
        const data = await response.data;

        setFavs((prev) => {
          return [...prev, ...data.items];
        });
        setPagination(() => {
          return {
            currentItems: data.currentItems,
            currentPage: data.currentPage,
            totalItems: data.totalItems,
            totalPages: data.totalPages,
          };
        });
      }

      setIsFetching(false);
    };

    if (favs && pagination && isFetching) {
      getProductsLoading();
    }
  }, [isFetching]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = async (e: Event) => {
    const target = e.target as Document;
    const scrollTop = target.documentElement.scrollTop;
    const innerHeight = window.innerHeight;
    const scrollHeight = target.documentElement.scrollHeight;

    if (
      scrollHeight - (scrollTop + innerHeight) < 100 &&
      pagination.currentPage < pagination.totalPages - 1
    ) {
      setIsFetching(true);
    } else {
      setIsFetching(false);
    }
  };

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
