"use client";

import React, { useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { CgProfile } from "react-icons/cg";
import Link from "next/link";
import { decodeToken } from "@/utils";
import { authPage, profilePage, registrPage } from "@/constans";
import { useRouter } from "next/navigation";

export const ProfileDropDownMenu = () => {
  const [isAuth, setIsAuth] = useState(false);

  const router = useRouter();

  const handleClickProfile = () => {
    const decoded = decodeToken();

    if (decoded?.id) {
      setIsAuth(true);
      router.push(`${profilePage}/${decoded?.id}`);
    } else {
      setIsAuth(false);
    }
  };

  return (
    <DropdownMenu.Root>
      <button
        className=""
        onClick={handleClickProfile}
        aria-label="Customise options"
      >
        <CgProfile className="h-8 w-8 p-1.5" />
      </button>

      {!isAuth && (
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className="relative z-50 min-w-[220px] rounded-md bg-black border border-white border-opacity-30 "
            sideOffset={5}
          >
            <DropdownMenu.Label className="px-3 flex items-center">
              <CgProfile className="h-8 w-8 p-1.5 -ml-1.5" />
              <p className="leading-none text-sm">Профиль</p>
            </DropdownMenu.Label>

            <DropdownMenu.Separator className="h-[1px] bg-white bg-opacity-30" />

            <div className="flex flex-col items-center">
              <Link href={authPage}>
                <DropdownMenu.Item className="group text-sm px-3 pt-1.5">
                  <button className="px-3 py-0.5 rounded-md border border-white border-opacity-30">
                    Войти
                  </button>
                </DropdownMenu.Item>
              </Link>

              <Link href={registrPage}>
                <DropdownMenu.Item className="group text-sm px-3 py-1.5">
                  <button className="px-3 py-0.5 rounded-md border border-white border-opacity-30">
                    Зарегистрироваться
                  </button>
                </DropdownMenu.Item>
              </Link>
            </div>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      )}
    </DropdownMenu.Root>
  );
};
