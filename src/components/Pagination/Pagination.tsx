"use client";

import { maxPagesInPagination, maxButtonsUpToDotsInPagin } from "@/constans";
import { IPagination } from "@/interfaces";
import { useSearchWithFilters } from "@/stores/useSearchWithFilters";
import React from "react";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";

type Props = { pagination: IPagination; keyName: string };

export default function Pagination({ pagination, keyName }: Props) {
  const { currentPage, totalPages } = pagination;
  const clickSearch = useSearchWithFilters((state) => state.clickSearch);
  const searchP = useSearchWithFilters((state) => state.searchP);
  const categorId = useSearchWithFilters((state) => state.categorId);

  const getPaginationButtons = () => {
    const pages = [];

    let startPage = Math.max(
      1,
      currentPage + 1 - Math.floor(maxPagesInPagination / 3)
    );
    const endPage = Math.min(
      totalPages,
      startPage + maxButtonsUpToDotsInPagin - 1
    );

    for (
      let i = startPage;
      endPage - startPage + 1 < maxButtonsUpToDotsInPagin;
      i--
    ) {
      startPage--;
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const handleClickBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget;
    const value = btn.value;

    if (value) {
      console.log(value);

      clickSearch({
        searchParam: searchP[keyName],
        keyName,
        categoryId: categorId[keyName],
        page: Number(value) - 1,
      });
    }
  };

  const showBtnDots = () => {
    if (getPaginationButtons().length < maxButtonsUpToDotsInPagin) return;

    if (totalPages - maxPagesInPagination / 3 > currentPage + 1) {
      return (
        <>
          <button
            disabled
            className="px-2 py-0.5 text-white hover:text-gray-400 transition "
          >
            ...
          </button>
          <button
            value={totalPages}
            className="px-2 py-0.5 text-white hover:text-gray-400 transition "
          >
            {totalPages}
          </button>
        </>
      );
    }
  };

  return (
    <div className="mt-1 mb-4 w-full flex justify-center text-base">
      <div className="max-w-[360px] flex flex-nowrap flex-row items-center">
        <button className="px-2 py-0.5 text-white hover:text-gray-400 transition ">
          <MdOutlineKeyboardArrowLeft className="h-6 w-6 p-px text-white" />
        </button>

        <>
          {getPaginationButtons().map((number, index) => (
            <button
              key={index}
              value={number}
              disabled={currentPage + 1 === number}
              className={
                "px-2 py-0.5  " +
                `${
                  currentPage + 1 === number
                    ? "text-gray-400 border-b border-gray-400"
                    : "text-white   transition"
                }`
              }
              onClick={handleClickBtn}
            >
              {number}
            </button>
          ))}
          {showBtnDots()}
        </>

        <button className="px-2 py-0.5 text-white hover:text-gray-400 transition ">
          <MdOutlineKeyboardArrowRight className="h-6 w-6 p-px text-white" />
        </button>
      </div>
    </div>
  );
}
