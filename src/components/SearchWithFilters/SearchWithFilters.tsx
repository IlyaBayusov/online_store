"use client";

import React, { useEffect, useState } from "react";
import FilterUpDownDDM from "../DropDownMenu/FIltersUpDownDDM/FilterUpDownDDM";
import { IoMdSearch } from "react-icons/io";
import { useSearchWithFilters } from "@/stores/useSearchWithFilters";

export default function SearchWithFilters() {
  const [inputSearch, setInputSearch] = useState("");

  const clickSearch = useSearchWithFilters((state) => state.clickSearch);
  const setProducts = useSearchWithFilters((state) => state.setProducts);
  const setIsFetch = useSearchWithFilters((state) => state.setIsFetch);

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

      <div className="flex justify-between items-center">
        <FilterUpDownDDM />
      </div>
    </div>
  );
}
