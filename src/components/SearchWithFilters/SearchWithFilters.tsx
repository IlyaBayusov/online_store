"use client";

import React, { useEffect, useState } from "react";
import FilterUpDownDDM from "../DropDownMenu/FIltersUpDownDDM/FilterUpDownDDM";
import { IoMdSearch } from "react-icons/io";
import { useSearchWithFilters } from "@/stores/useSearchWithFilters";
import { FiFilter } from "react-icons/fi";
import { useModalStore } from "@/stores/useModalStore";
import { modalFilters } from "@/constans";

type Props = {
  disabledFilters?: boolean;
  categoryId?: number;
};

export default function SearchWithFilters({
  disabledFilters,
  categoryId,
}: Props) {
  const [inputSearch, setInputSearch] = useState("");

  const { openModal, addModalProps } = useModalStore();

  const clickSearch = useSearchWithFilters((state) => state.clickSearch);
  const setProducts = useSearchWithFilters((state) => state.setProducts);
  const setIsFetch = useSearchWithFilters((state) => state.setIsFetch);
  const setSearchP = useSearchWithFilters((state) => state.setSearchP);

  useEffect(() => {
    if (!inputSearch) {
      setProducts([]);
      setIsFetch(false);
    }
  }, [inputSearch]);

  const handleClickSearch = () => {
    clickSearch({ searchParam: inputSearch });
  };

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputSearch(e.target.value);
    setSearchP(e.target.value);
  };

  const handleClickFilters = () => {
    openModal(modalFilters);

    if (categoryId) {
      addModalProps(modalFilters, { categoryId, inputSearch });
    }
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="w-full flex justify-center items-center gap-2">
        <input
          type="text"
          placeholder="Поиск"
          className="py-2 px-4 w-full text-sm bg-[#3A3A3A] text-white rounded-md"
          onChange={handleChangeSearch}
          value={inputSearch}
          onKeyDown={(e) => e.key === "Enter" && handleClickSearch()}
        />
        <button className="py-2" onClick={handleClickSearch}>
          <IoMdSearch className="h-5 w-5 text-white" />
        </button>
      </div>

      {disabledFilters && (
        <div className="flex justify-between items-center">
          <FilterUpDownDDM />

          <button
            className="flex items-center gap-1 rounded-md text-sm text-white"
            onClick={handleClickFilters}
          >
            <FiFilter className="h-5 w-5" />

            <p>Фильтры</p>
          </button>
        </div>
      )}
    </div>
  );
}
