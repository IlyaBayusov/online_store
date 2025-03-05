"use client";

import { useModalStore } from "@/stores/useModalStore";
import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { modalFilters } from "@/constans";
import { getFiltersByCategory } from "@/api";
import { IGetFiltersByCategory } from "@/interfaces";

export default function ModalFilters() {
  const [filters, setFilters] = useState<IGetFiltersByCategory>(
    {} as IGetFiltersByCategory
  );

  const { modals, closeModal, modalsProps } = useModalStore();

  useEffect(() => {
    const getFilters = async () => {
      console.log(modalsProps[modalFilters]);
      if (!modalsProps[modalFilters]) return;

      const response = await getFiltersByCategory(
        modalsProps[modalFilters]?.categoryId
      );

      console.log(response);
      if (response) {
        setFilters(response);
      }
    };

    getFilters();
  }, [modalsProps[modalFilters]]);

  return (
    <div
      className={
        `fixed top-0 -left-full z-[1000] w-full h-full transition-transform duration-700 overflow-y-hidden ` +
        (modals[modalFilters] ? "translate-x-full" : "")
      }
    >
      <div className="container absolute top-0 left-0 z-10 h-full">
        <div className="flex flex-col h-full w-full bg-[#121212] p-3">
          <div className="flex justify-end">
            <div onClick={() => closeModal(modalFilters)}>
              <IoClose
                className="text-[#B3B3B3] w-5 h-5"
                viewBox="75 75 350 350"
              />
            </div>
          </div>

          {Object.keys(filters).length > 0 ? (
            <div className="flex flex-col mt-3 overflow-y-auto hide-scrollbar-y">
              <div>
                <h2>Производитель</h2>

                {filters.brands.map((brand) => (
                  <div key={brand}>
                    <input type="checkbox" className="" />
                    <label htmlFor={brand}>{brand}</label>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <h1>Loading...</h1>
          )}
        </div>
      </div>
    </div>
  );
}
