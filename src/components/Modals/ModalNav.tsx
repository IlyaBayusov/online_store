"use client";

import {
  categories,
  filtersKeyModalNav,
  modalNav,
  modalNavCategory,
} from "@/constans";
import { useCategoryStore } from "@/stores/useCategoryStore";
import { INextCategoryProps, useModalStore } from "@/stores/useModalStore";
import { decodeToken } from "@/utils";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";

import { useSearchWithFilters } from "@/stores/useSearchWithFilters";
import Image from "next/image";
import { FaPhoneAlt } from "react-icons/fa";
import ProductsItem from "../Products/ProductsItem/ProductsItem";
import SearchWithFilters from "../SearchWithFilters/SearchWithFilters";
import Loader from "../Loader/Loader";
// import { IProductCategory } from "@/interfaces";

export default function ModalNav() {
  const isFetchingRef = useRef(false);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const { modals, openModal, closeModal, addModalProps } = useModalStore();
  const { updateCategory } = useCategoryStore();

  const isLoading = useSearchWithFilters((state) => state.isLoading);
  const products = useSearchWithFilters((state) => state.products);
  const getProductsLoading = useSearchWithFilters(
    (state) => state.getProductsLoading
  );
  const searchP = useSearchWithFilters((state) => state.searchP);
  const isFetch = useSearchWithFilters((state) => state.isFetch);
  const clearAll = useSearchWithFilters((state) => state.clearAll);
  const pagination = useSearchWithFilters((state) => state.pagination);

  const [role, setRole] = useState<string>("");
  const [hasMore, setHasMore] = useState<boolean>(true);
  // const [renderedProducts, setRenderedProducts] = useState<IProductCategory[]>(
  //   []
  // );

  useEffect(() => {
    const decodedToken = decodeToken();

    if (decodedToken) {
      setRole(decodedToken.roles);
    }
  }, []);

  // useEffect(() => {
  //   const allProducts = products[filtersKeyModalNav];

  //   const newProducts = allProducts.filter(
  //     (product) =>
  //       !renderedProducts.some((p) => p.productId === product.productId)
  //   );

  //   if (newProducts.length > 0) {
  //     setRenderedProducts((prev) => [...prev, ...newProducts]);
  //   }
  // }, [products[filtersKeyModalNav]]);

  const handleScroll = useCallback(async () => {
    const scrollElement = scrollContainerRef.current;

    if (
      !scrollElement ||
      !modals[modalNav] ||
      !hasMore ||
      isFetchingRef.current
    )
      return;

    if (
      pagination[filtersKeyModalNav].currentPage ===
      pagination[filtersKeyModalNav].totalPages - 1
    ) {
      setHasMore(false);
    }

    const { scrollTop, scrollHeight, clientHeight } = scrollElement;

    if (scrollTop + clientHeight >= scrollHeight - 200) {
      isFetchingRef.current = true;
      console.log("Достигли низа, подгружаем ещё...");

      const prevScrollTop = scrollTop;

      await getProductsLoading({
        searchParam: searchP[filtersKeyModalNav],
        keyName: filtersKeyModalNav,
      });

      requestAnimationFrame(() => {
        scrollElement.scrollTop = prevScrollTop;
        isFetchingRef.current = false;
      });
    }
  }, [modals, searchP]);

  const handleModalNav = (
    nextCategory: INextCategoryProps[],
    category: string
  ) => {
    updateCategory(category.toLowerCase());
    addModalProps(modalNavCategory, nextCategory);
    openModal(modalNavCategory);
    closeModal(modalNav);
  };

  const showElements = () => {
    if (
      !isFetch[filtersKeyModalNav] ||
      (isFetch[filtersKeyModalNav] && !searchP[filtersKeyModalNav].length)
    ) {
      return (
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
            <Link href="#" className="flex items-center my-3 text-[#B3B3B3]">
              <FaPhoneAlt className="mr-3" />
              <p>+375 (44) 123 11 11</p>
            </Link>
            <Link href="#" className="flex items-center my-3 text-[#B3B3B3]">
              <FaPhoneAlt className="mr-3" />
              <p>+375 (44) 123 11 11</p>
            </Link>
            <Link href="#" className="flex items-center my-3 text-[#B3B3B3]">
              <FaPhoneAlt className="mr-3" />
              <p>+375 (44) 123 11 11</p>
            </Link>
            <Link href="#" className="flex items-center my-3 text-[#B3B3B3]">
              <FaPhoneAlt className="mr-3" />
              <p>+375 (44) 123 11 11</p>
            </Link>
          </div>
        </>
      );
    }

    if (isLoading[filtersKeyModalNav] && isFetch[filtersKeyModalNav]) {
      return <Loader />;
    }

    if (products[filtersKeyModalNav].length && isFetch[filtersKeyModalNav]) {
      return (
        <div className="mt-6 mb-2 w-full grid grid-cols-2 gap-3">
          {products[filtersKeyModalNav].map((product) => (
            <Link
              key={product.productId}
              href={`/${product.subcategoryId}/${product.productId}`}
            >
              <ProductsItem
                name={product.name}
                img={product.image}
                price={product.price}
                brandName={product.brandName}
              />
            </Link>
          ))}
        </div>
      );
    } else {
      return (
        <span className="mt-6 text-center text-base leading-none text-[#B3B3B3]">
          Список пуст
        </span>
      );
    }
  };

  const handleClickClose = () => {
    closeModal(modalNav);

    setTimeout(() => clearAll(filtersKeyModalNav), 750);
  };

  return (
    <div
      className={
        `fixed top-0 -left-full z-[1000] w-full h-full transition-transform duration-700 overflow-y-hidden ` +
        (modals[modalNav] ? "translate-x-full" : "")
      }
    >
      {/* {products[filtersKeyModalNav].length > 0 && isFetchingRef.current && (
        <div className="absolute top-0 left-0 z-[1000] flex justify-center items-center w-full h-full bg-white bg-opacity-35">
          <Loader />
        </div>
      )} */}

      <div className="container absolute top-0 left-0 z-10 h-full">
        <div className="flex flex-col h-full w-full bg-[#121212] p-3">
          <div className="flex justify-end">
            <div onClick={handleClickClose}>
              <IoClose
                className="text-[#B3B3B3] w-5 h-5"
                viewBox="75 75 350 350"
              />
            </div>
          </div>

          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className={
              "flex flex-col mt-3 hide-scrollbar-y " +
              (isFetchingRef.current ? "overflow-y-hidden" : "overflow-y-auto")
            }
          >
            <SearchWithFilters
              disabledFilters={false}
              disabledSearch={true}
              keyName={filtersKeyModalNav}
            />

            {showElements()}
          </div>
        </div>
      </div>
    </div>
  );
}
