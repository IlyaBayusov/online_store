"use client";

import { maxPagesInPagination, maxButtonsUpToDotsInPagin } from "@/constans";
import { IPagination } from "@/interfaces";
import React from "react";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";

type Props = { pagination: IPagination };

export default function Pagination({ pagination }: Props) {
  const { currentPage, totalPages } = pagination;

  const getPaginationButtons = () => {
    const pages = [];

    const startPage = Math.max(
      1,
      currentPage + 1 - Math.floor(maxPagesInPagination / 3)
    );
    const endPage = Math.min(
      totalPages,
      startPage + maxButtonsUpToDotsInPagin - 1
    );

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    console.log(startPage, endPage);
    return pages;
  };

  console.log(getPaginationButtons());

  return (
    <div>
      <div className="flex flex-nowrap flex-row justify-between items-center gap-2">
        <button className="px-2 py-1 border rounded-md">
          <MdOutlineKeyboardArrowLeft className="h-5 w-5 p-px text-gray-400" />
        </button>

        <div>
          {getPaginationButtons().map((number, index) => (
            <button
              key={index}
              value={number}
              className="px-2 py-1 border rounded-md"
            >
              {number}
            </button>
          ))}
          {getPaginationButtons().length >= maxButtonsUpToDotsInPagin && (
            <>
              <button disabled className="px-2 py-1 border rounded-md">
                ...
              </button>
              <button
                value={totalPages}
                className="px-2 py-1 border rounded-md"
              >
                {totalPages}
              </button>
            </>
          )}
        </div>

        <button className="px-2 py-1 border rounded-md">
          <MdOutlineKeyboardArrowRight className="h-5 w-5 p-px text-gray-400" />
        </button>
      </div>
    </div>
  );
}
