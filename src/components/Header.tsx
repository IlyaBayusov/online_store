"use client";

import { modalNav } from "@/constans";
import { useCartStore } from "@/stores/useCartStore";
import { useModalStore } from "@/stores/useModalStore";
import Link from "next/link";
import React from "react";
import { CgProfile } from "react-icons/cg";
import { FiMenu } from "react-icons/fi";
import { RiShoppingBasketLine } from "react-icons/ri";

export default function Header() {
  const { openModal } = useModalStore();
  const { cart } = useCartStore();

  return (
    <div className="bg-black w-full">
      <div className="container px-3">
        <div className="relative -mx-1.5 flex justify-between items-center">
          <div onClick={() => openModal(modalNav)}>
            <FiMenu className="h-9 w-9 p-1.5" />
          </div>

          <h1
            id="headerTitle"
            className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2  text-xl text-white font-bold leading-5"
          >
            MAN&apos;S
          </h1>

          <div className="flex items-center gap-2">
            <Link href="/cart">
              <div className="relative">
                <RiShoppingBasketLine className="h-8 w-8 p-1.5" />
                <div className="flex justify-center items-center absolute bottom-0 right-0 z-10 w-4 h-4 bg-white rounded-full text-[11px] text-black font-bold border-2 border-black">
                  {cart.length}
                </div>
              </div>
            </Link>

            <CgProfile className="h-8 w-8 p-1.5" />
          </div>
          {/* <div className="flex items-center text-[#969696] text-base">
            <button>Log in</button>
            <span>/</span>
            <button>Sign up</button>
          </div> */}
        </div>
      </div>
    </div>
  );
}
