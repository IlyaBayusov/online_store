"use client";

import { getProductsCart } from "@/api";
import { modalNav } from "@/constans";
import { IProductInCart } from "@/interfaces";
import { useModalStore } from "@/stores/useModalStore";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FiMenu } from "react-icons/fi";
import { RiShoppingBasketLine } from "react-icons/ri";
import { MdOutlineShoppingBag, MdFavorite } from "react-icons/md";
import { ProfileDropDownMenu } from "./DropDownMenu/ProfileDropDownMenu/ProfileDropDownMenu";
import { useCartStore } from "@/stores/useCartStore";

export default function Header() {
  const [products, setProducts] = useState<IProductInCart[]>([]);
  const { openModal } = useModalStore();
  const { cart } = useCartStore();

  useEffect(() => {
    const getProducts = async () => {
      const data: IProductInCart[] | undefined = await getProductsCart();

      if (data) {
        setProducts(data);
      }
    };

    getProducts();
  }, []);

  return (
    <div className="bg-black w-full">
      <div className="container px-3">
        <div className="relative -mx-1.5 flex justify-between items-center">
          <div onClick={() => openModal(modalNav)}>
            <FiMenu className="h-9 w-9 p-1.5" />
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
    </div>
  );
}
