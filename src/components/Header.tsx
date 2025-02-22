"use client";

import { modalNav } from "@/constans";
import { useModalStore } from "@/stores/useModalStore";
import Link from "next/link";
import React from "react";
import { FiMenu } from "react-icons/fi";
import { RiShoppingBasketLine } from "react-icons/ri";
import { MdOutlineShoppingBag, MdFavorite } from "react-icons/md";
import { ProfileDropDownMenu } from "./DropDownMenu/ProfileDropDownMenu/ProfileDropDownMenu";
import { CitiesDDM } from "./DropDownMenu/CitiesDDM/CitiesDDM";

export default function Header() {
  const { openModal } = useModalStore();

  return (
    <header className="bg-black w-full">
      <div className="container px-3">
        <div className="relative -mx-1.5 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div onClick={() => openModal(modalNav)}>
              <FiMenu className="h-9 w-9 p-1.5" />
            </div>

            <CitiesDDM />
          </div>

          <Link
            href={"/"}
            id="headerTitle"
            className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2  text-xl text-white font-bold leading-5"
          >
            MAN&apos;S
          </Link>

          <div className="flex items-center gap-1">
            <Link href="/cart">
              <div className="relative">
                <RiShoppingBasketLine className="h-8 w-8 p-1.5" />
                {/* <div className="flex justify-center items-center absolute bottom-0 right-0 z-10 w-4 h-4 bg-white rounded-full text-[11px] text-black font-bold border-2 border-black">
                  {cart.length}
                </div> */}
              </div>
            </Link>

            <Link href="/orders">
              <MdOutlineShoppingBag className="h-8 w-8 p-1.5" />
            </Link>

            <Link href="/favorites">
              <MdFavorite className="h-8 w-8 p-1.5" />
            </Link>

            <ProfileDropDownMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
