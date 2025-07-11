"use client";

import React, { useEffect, useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { CgProfile } from "react-icons/cg";
import Link from "next/link";
import { decodeToken } from "@/utils";
import { adminMenuPage, authPage, profilePage, registrPage } from "@/constans";
import { useRouter } from "next/navigation";

export const ProfileDropDownMenu = () => {
  const [isAuth, setIsAuth] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const decoded = decodeToken();

    if (decoded?.id) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, []);

  const handleClick = () => {
    const decoded = decodeToken();

    if (decoded?.id && decoded.roles === "USER")
      router.push(`${profilePage}/${decoded?.id}`);
  };

  const showElems = () => {
    const decoded = decodeToken();

    if (!decoded?.id) return;

    if (decoded.roles === "ADMIN" || "MANAGER") {
      return (
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className="relative z-50 min-w-[220px] rounded-md bg-black border border-white border-opacity-30 "
            sideOffset={5}
          >
            <DropdownMenu.Label className="px-3 flex items-center">
              <CgProfile className="h-8 w-8 p-1.5 -ml-1.5" />
              <Link
                href={`${profilePage}/${decoded?.id}`}
                className="leading-none text-sm"
              >
                Профиль
              </Link>
            </DropdownMenu.Label>

            <DropdownMenu.Separator className="h-[1px] bg-white bg-opacity-30" />

            <div className="flex flex-col items-center">
              <Link href={`${profilePage}/${decoded?.id}`}>
                <DropdownMenu.Item className="group text-sm px-3 pt-1.5">
                  <button className="px-3 py-0.5 rounded-md border border-white border-opacity-30">
                    Профиль
                  </button>
                </DropdownMenu.Item>
              </Link>

              <Link href={adminMenuPage}>
                <DropdownMenu.Item className="group text-sm px-3 py-1.5">
                  <button className="px-3 py-0.5 rounded-md border border-white border-opacity-30">
                    Админ панель
                  </button>
                </DropdownMenu.Item>
              </Link>
            </div>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      );
    }
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild onClick={handleClick}>
        <button className="" aria-label="Customise options">
          <CgProfile className="h-8 w-8 p-1.5" />
        </button>
      </DropdownMenu.Trigger>

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

      {showElems()}
    </DropdownMenu.Root>
  );
};
