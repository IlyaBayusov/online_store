"use client";

import { getFiltersByCategory } from "@/api";
import { minMaxValueInputFilter, modalFilters } from "@/constans";
import { IGetFiltersByCategory } from "@/interfaces";
import { useModalStore } from "@/stores/useModalStore";
import { useSearchWithFilters } from "@/stores/useSearchWithFilters";
import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";

export default function ModalFilters() {
  const [filters, setFilters] = useState<IGetFiltersByCategory>(
    {} as IGetFiltersByCategory
  );
  const [optionBrands, setOptionBrands] = useState<string[]>([]);
  const [optionSizes, setOptionSizes] = useState<string[]>([]);
  const [optionColors, setOptionColors] = useState<string[]>([]);
  const [minValue, setMinValue] = useState<string>("0");
  const [maxValue, setMaxValue] = useState<string>("0");

  const { modals, closeModal, modalsProps } = useModalStore();

  const clickSearch = useSearchWithFilters((state) => state.clickSearch);
  const searchP = useSearchWithFilters((state) => state.searchP);

  useEffect(() => {
    const getFilters = async () => {
      if (!modalsProps[modalFilters] || !modalsProps[modalFilters].categoryId)
        return;

      const response = await getFiltersByCategory(
        modalsProps[modalFilters].categoryId
      );

      if (response) {
        setFilters(response);
      }
    };

    getFilters();
  }, [modalsProps[modalFilters]]);

  const handleClickFilterBrands = (value: string) => {
    setOptionBrands((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const handleClickFilterColors = (value: string) => {
    setOptionColors((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const handleClickFilterSizes = (value: string) => {
    setOptionSizes((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!modalsProps[modalFilters]) {
      // ------------------------------------------выкинуть ошибку
      return;
    }

    clickSearch({
      searchParam: searchP[modalsProps[modalFilters].keyName],
      keyName: modalsProps[modalFilters].keyName,
      brands: optionBrands,
      colors: optionColors,
      sizes: optionSizes,
      minPrice: +minValue || null,
      maxPrice: +maxValue || null,
      categoryId: modalsProps[modalFilters].categoryId,
    });

    console.log({
      searchParam: searchP[modalsProps[modalFilters].keyName],
      brands: optionBrands,
      colors: optionColors,
      sizes: optionSizes,
      minPrice: +minValue,
      maxPrice: +maxValue,
      categoryId: modalsProps[modalFilters].categoryId,
    });

    closeModal(modalFilters);
  };

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
            <form
              onSubmit={handleSubmit}
              className="flex flex-col mt-3 overflow-y-auto hide-scrollbar-y"
            >
              <div>
                <h2>Производитель</h2>

                {filters.brands.map((brand) => (
                  <div key={brand}>
                    <input
                      type="checkbox"
                      id={`brand-${brand}`}
                      className=""
                      onChange={() => handleClickFilterBrands(brand)}
                    />
                    <label htmlFor={`brand-${brand}`}>{brand}</label>
                  </div>
                ))}
              </div>

              <div>
                <h2>Цвет</h2>

                {filters.colors.map((color) => (
                  <div key={color}>
                    <input
                      type="checkbox"
                      id={`color-${color}`}
                      className=""
                      onChange={() => handleClickFilterColors(color)}
                    />
                    <label htmlFor={`color-${color}`}>{color}</label>
                  </div>
                ))}
              </div>

              <div>
                <h2>Размер</h2>

                {filters.sizes.map((size) => (
                  <div key={size}>
                    <input
                      type="checkbox"
                      id={`size-${size}`}
                      className=""
                      onChange={() => handleClickFilterSizes(size)}
                    />
                    <label htmlFor={`size-${size}`}>{size}</label>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="от"
                  className="border border-[#3A3A3A] rounded-md text-black"
                  value={minValue}
                  onChange={(e) =>
                    +e.target.value > minMaxValueInputFilter
                      ? setMinValue(String(minMaxValueInputFilter))
                      : setMinValue(e.target.value.slice(0, 6))
                  }
                />
                <input
                  type="number"
                  placeholder="до"
                  className="border border-[#3A3A3A] rounded-md text-black"
                  value={maxValue}
                  onChange={(e) =>
                    +e.target.value > minMaxValueInputFilter
                      ? setMaxValue(String(minMaxValueInputFilter))
                      : setMaxValue(e.target.value.slice(0, 6))
                  }
                />
              </div>

              <button
                type="submit"
                className="mt-3 px-4 py-1 bg-orange-600 rounded-md"
              >
                Готово
              </button>
            </form>
          ) : (
            <h1>Loading...</h1>
          )}
        </div>
      </div>
    </div>
  );
}
