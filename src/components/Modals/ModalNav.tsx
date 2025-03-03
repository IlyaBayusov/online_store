"use client";

import { INextCategoryProps, useModalStore } from "@/stores/useModalStore";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import {
  categories,
  filtersUpDown,
  modalNav,
  modalNavCategory,
} from "@/constans";
import { useCategoryStore } from "@/stores/useCategoryStore";
import { decodeToken } from "@/utils";
// import { MdFiberNew } from "react-icons/md";
import { IoMdSearch } from "react-icons/io";
import { getProductsSearchWithParams } from "@/api";
import { IFiltersUpDown, IPagination, IProductCategory } from "@/interfaces";
import ProductsItem from "../Products/ProductsItem/ProductsItem";
import { MdOutlineFilterList } from "react-icons/md";
import { HiMiniArrowsUpDown } from "react-icons/hi2";
import FilterUpDownDDM from "../DropDownMenu/FIltersUpDownDDM/FilterUpDownDDM";

export default function ModalNav() {
  const { modals, openModal, closeModal, addModalProps } = useModalStore();
  const { updateCategory } = useCategoryStore();

  const [role, setRole] = useState<string>("");
  const [inputSearch, setInputSearch] = useState("");
  const [products, setProducts] = useState<IProductCategory[]>([]);
  const [pagination, setPagination] = useState<IPagination>({} as IPagination);
  const [isFetch, setIsFetch] = useState<boolean>(false);
  const [filterUpDown, setFilterUpDown] = useState<IFiltersUpDown>(
    filtersUpDown[0]
  );

  useEffect(() => {
    const decodedToken = decodeToken();

    if (decodedToken) {
      setRole(decodedToken.roles);
    }
  }, []);

  useEffect(() => {
    if (!inputSearch) {
      setProducts([]);
      setIsFetch(false);
    }
  }, [inputSearch]);

  const handleModalNav = (
    nextCategory: INextCategoryProps[],
    category: string
  ) => {
    updateCategory(category.toLowerCase());
    addModalProps(modalNavCategory, nextCategory);
    openModal(modalNavCategory);
    closeModal(modalNav);
  };

  const handleClickSearch = async () => {
    const response = await getProductsSearchWithParams(
      undefined,
      undefined,
      undefined,
      inputSearch
    );

    if (response) {
      setIsFetch(true);
      setProducts(response.items);
      setPagination({
        currentItems: response.currentItems,
        currentPage: response.currentPage,
        totalItems: response.totalItems,
        totalPages: response.totalPages,
      });
    }
  };

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputSearch(e.target.value);
  };

  return (
    <div
      className={
        `fixed top-0 -left-full z-[1000] w-full h-full transition-transform duration-700 overflow-y-hidden ` +
        (modals[modalNav] ? "translate-x-full" : "")
      }
    >
      <div className="container absolute top-0 left-0 z-10 h-full">
        <div className="flex flex-col h-full w-full bg-[#121212] p-3">
          <div className="flex justify-end">
            <div onClick={() => closeModal(modalNav)}>
              <IoClose
                className="text-[#B3B3B3] w-5 h-5"
                viewBox="75 75 350 350"
              />
            </div>
          </div>

          <div className="flex flex-col mt-3 overflow-y-auto hide-scrollbar-y">
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

            {!isFetch ? (
              <>
                <nav className="mt-6">
                  <ul className="flex flex-col gap-3">
                    <Link
                      href="/"
                      className="mb-3 bg-[#3A3A3A] rounded-md px-2 py-4 uppercase"
                      onClick={() => closeModal(modalNav)}
                    >
                      Главная
                    </Link>

                    {role === "ADMIN" && (
                      <Link
                        href="/adminMenu"
                        className="mb-3 bg-[#3A3A3A] rounded-md px-2 py-4 uppercase"
                        onClick={() => closeModal(modalNav)}
                      >
                        Админ панель
                      </Link>
                    )}

                    {categories.map((category, index) => (
                      <li
                        key={index}
                        className="relative bg-[#3A3A3A] rounded-md px-2 py-4 flex justify-between items-center"
                        onClick={() =>
                          category.next
                            ? handleModalNav(category.next, category.name)
                            : null
                        }
                      >
                        <p className="uppercase">{category.name}</p>

                        <div className="absolute top-0 right-0 z-10 h-full">
                          <Image
                            src={category.img}
                            alt={category.name}
                            className="object-cover h-full w-auto rounded-r-md"
                          />
                        </div>
                      </li>
                    ))}
                  </ul>
                </nav>

                <div className="flex flex-col justify-start uppercase mt-6 gap-3">
                  <Link
                    href="/cart"
                    className="bg-[#3A3A3A] rounded-md px-2 py-4 uppercase"
                    onClick={() => closeModal(modalNav)}
                  >
                    Корзина
                  </Link>
                  <Link
                    href="/orders"
                    className="bg-[#3A3A3A] rounded-md px-2 py-4 uppercase"
                    onClick={() => closeModal(modalNav)}
                  >
                    Заказы
                  </Link>
                </div>

                <div className="mt-3">
                  <Link
                    href="#"
                    className="flex items-center my-3 text-[#B3B3B3]"
                  >
                    <FaPhoneAlt className="mr-3" />
                    <p>+375 (44) 123 11 11</p>
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center my-3 text-[#B3B3B3]"
                  >
                    <FaPhoneAlt className="mr-3" />
                    <p>+375 (44) 123 11 11</p>
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center my-3 text-[#B3B3B3]"
                  >
                    <FaPhoneAlt className="mr-3" />
                    <p>+375 (44) 123 11 11</p>
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center my-3 text-[#B3B3B3]"
                  >
                    <FaPhoneAlt className="mr-3" />
                    <p>+375 (44) 123 11 11</p>
                  </Link>
                </div>
              </>
            ) : products.length ? (
              <div className="mt-6 mb-2 w-full grid grid-cols-2 gap-3">
                {products.map((product) => (
                  <Link
                    key={product.productId}
                    href={`/${product.subcategoryId}/${product.productId}`}
                  >
                    <ProductsItem
                      name={product.name}
                      img={product.image}
                      price={product.price}
                    />
                  </Link>
                ))}
              </div>
            ) : (
              <span className="mt-6 text-center text-base leading-none text-[#B3B3B3]">
                Список пуст
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
