"use client";

import Link from "next/link";
import React, { useLayoutEffect, useState } from "react";
import {
  IoIosNotifications,
  IoMdArrowBack,
  IoIosOptions,
} from "react-icons/io";
import { FaHouse } from "react-icons/fa6";
import { IoSearchSharp } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import { useModalStore } from "@/stores/useModalStore";
import { modalNewProductAdmin } from "@/constans";
import { usePathname } from "next/navigation";

export default function HeaderAdmin() {
  const [pageName, setPageName] = useState<string>("Товары");

  const { openModal } = useModalStore();

  const path = usePathname();

  useLayoutEffect(() => {
    if (path === "/adminMenu/orders") setPageName("Заказы");
    if (path === "/adminMenu") setPageName("Товары");
  });

  return (
    <div className="w-full">
      <div className="flex flex-col items-center w-full">
        <div className="flex justify-between items-center px-3 bg-black py-1 w-full">
          <Link href="/" className="text-base">
            Перейти на главную
          </Link>

          <div>
            <IoIosNotifications className="h-5 w-5" />
          </div>
        </div>

        <div className="flex justify-between items-center px-3 bg-white w-full border-b">
          <div className="flex items-center gap-3">
            <FaHouse className="h-4 w-4 text-black text-opacity-80" />

            <Link
              href="/adminMenu/orders"
              className="text-base text-black text-opacity-80 py-2"
            >
              Заказы
            </Link>
            <Link
              href="/adminMenu"
              className="text-base text-black text-opacity-80 py-2"
            >
              Товары
            </Link>
          </div>

          <div className="flex items-center gap-1">
            <input
              type="text"
              placeholder="Найти"
              className="border border-gray-300 text-slate-400 text-sm py-1 px-2 rounded-md"
            />
            <button className="py-2">
              <IoSearchSharp className="h-5 w-5 text-green-600" />
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center px-3 bg-white w-full">
          <div className="flex items-center gap-1">
            <button className="py-0.5 px-2">
              <IoMdArrowBack className="h-5 w-5 text-green-600" />
            </button>

            <h1 className="text-black py-2">{pageName}</h1>
          </div>

          <div className="flex items-center gap-1">
            <button className="py-1 px-2">
              <IoIosOptions className="h-5 w-5 p-px text-green-600" />
            </button>

            <button
              className="py-1 px-2 bg-green-600 rounded-md"
              onClick={() => openModal(modalNewProductAdmin)}
            >
              <FaPlus className="h-5 w-5 p-px text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
