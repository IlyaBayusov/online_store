"use client";

import React, { useEffect, useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { FaMapMarkerAlt } from "react-icons/fa";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { getCities } from "@/api";
import { IGetCity } from "@/interfaces";
import Cookies from "js-cookie";

export const CitiesDDM = () => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [city, setCity] = useState<IGetCity>({} as IGetCity);
  const [cities, setCities] = useState<IGetCity[]>([]);

  useEffect(() => {
    const fetchGetCities = async () => {
      const response = await getCities();

      if (!response) return;

      setCities(response.items);

      const userCityName = Cookies.get("userCityName");
      const userCityId = Cookies.get("userCityId");

      if (typeof userCityName === "string" && typeof userCityId === "string") {
        setCity({
          city: userCityName,
          id: Number(userCityId),
        });
      } else {
        setCity(response.items[0]);
      }
    };

    fetchGetCities();
  }, []);

  useEffect(() => {
    if (city.city) {
      Cookies.set("userCityName", city.city, {
        expires: 30, // срок действия (в днях)
        path: "/", // доступно на всём сайте
        secure: false, // только HTTPS
        sameSite: "Strict", // предотвращает CSRF-атаки
      });

      Cookies.set("userCityId", String(city.id), {
        expires: 30, // срок действия (в днях)
        path: "/", // доступно на всём сайте
        secure: false, // только HTTPS
        sameSite: "Strict", // предотвращает CSRF-атаки
      });
    }
  }, [city]);

  return (
    <DropdownMenu.Root open={isActive} onOpenChange={setIsActive}>
      <DropdownMenu.Trigger asChild>
        <div className="py-1">
          <button
            className="flex items-center py-0.5 text-sm h-full"
            aria-label="Customise options"
          >
            <FaMapMarkerAlt className="w-3 h-3 relative -top-0.5 left-0 z-10 mr-0.5" />
            {cities.length ? (
              <p className="truncate max-w-[60px]">{city.city}</p>
            ) : (
              <p className="truncate max-w-[60px]">Минск</p>
            )}

            {isActive ? (
              <IoMdArrowDropup className="w-3 h-3" />
            ) : (
              <IoMdArrowDropdown className="w-3 h-3" />
            )}
          </button>
        </div>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="relative z-50 min-w-[220px] rounded-md bg-black border border-white border-opacity-30 "
          sideOffset={5}
        >
          <DropdownMenu.Label className="px-3 flex justify-center">
            <p className="py-2 text-center leading-none text-sm">
              Выберите город
            </p>
          </DropdownMenu.Label>

          {cities.length && (
            <div className="max-h-40 overflow-y-scroll">
              {cities.map((item) => (
                <div key={item.city}>
                  <DropdownMenu.Separator className="h-[1px] bg-white bg-opacity-30" />

                  <DropdownMenu.Item
                    className="group text-sm px-3 cursor-pointer"
                    onClick={() => setCity(item)}
                  >
                    <p className="py-1 rounded-md">{item.city}</p>
                  </DropdownMenu.Item>
                </div>
              ))}
            </div>
          )}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
