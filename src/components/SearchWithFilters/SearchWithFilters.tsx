"use client";

import { modalFilters } from "@/constans";
import { useModalStore } from "@/stores/useModalStore";
import { useSearchWithFilters } from "@/stores/useSearchWithFilters";
import React, { useEffect, useState } from "react";
import { FiFilter } from "react-icons/fi";
import { IoMdSearch } from "react-icons/io";
import FilterUpDownDDM from "../DropDownMenu/FIltersUpDownDDM/FilterUpDownDDM";

type Props = {
  disabledFilters?: boolean;
  disabledSearch?: boolean;
  categoryId?: number;
  keyName: string;
};

export default function SearchWithFilters({
  disabledFilters,
  disabledSearch,
  categoryId,
  keyName,
}: Props) {
  const [inputSearch, setInputSearch] = useState("");

  const { openModal, addModalProps } = useModalStore();

  const clickSearch = useSearchWithFilters((state) => state.clickSearch);
  const setProducts = useSearchWithFilters((state) => state.setProducts);
  const setSearchP = useSearchWithFilters((state) => state.setSearchP);
  const setIsFetch = useSearchWithFilters((state) => state.setIsFetch);

  useEffect(() => {
    if (!inputSearch) {
      setProducts(keyName, []);
    }
  }, [inputSearch]);

  const handleClickSearch = () => {
    setIsFetch(keyName, true);
    clickSearch({ searchParam: inputSearch, categoryId, keyName });
  };

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputSearch(e.target.value);
    setSearchP(keyName, e.target.value);
  };

  const handleClickFilters = () => {
    openModal(modalFilters);

    if (categoryId) {
      addModalProps(modalFilters, { categoryId, inputSearch, keyName });
    }
  };

  return (
    <div className="w-full flex flex-col gap-2">
      {disabledSearch && (
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
      )}

      {disabledFilters && (
        <div className="flex justify-between items-center">
          <FilterUpDownDDM keyName={keyName} />

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
