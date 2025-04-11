"use client";

import Link from "next/link";
import React from "react";
import ProductsItem from "../ProductsItem/ProductsItem";
import {
  IGetSubCategories,
  IPagination,
  IProductCategory,
} from "@/interfaces/index";
import SearchWithFilters from "@/components/SearchWithFilters/SearchWithFilters";
import { filtersKeyProductsPage } from "@/constans";
import Pagination from "@/components/Pagination/Pagination";

type Props = {
  category: IGetSubCategories;
  products: IProductCategory[];
  pagination: IPagination;
  keyName: string;
};

export default function ProductsList({
  category,
  products,
  pagination,
  keyName,
}: Props) {
  return (
    <div className="container px-3">
      <div className="flex justify-center mt-3 mb-5">
        <h2 id="subTitleLine" className="relative uppercase font-medium">
          {category.name}
        </h2>
      </div>

      <div className="w-full flex justify-center items-center gap-2">
        <SearchWithFilters
          disabledSearch={false}
          disabledFilters={true}
          categoryId={category.id}
          keyName={filtersKeyProductsPage}
        />
      </div>

      {pagination && <Pagination pagination={pagination} keyName={keyName} />}

      {products?.length ? (
        <div className="my-2 w-full grid grid-cols-2 gap-3">
          {products.map((product) => (
            <Link
              key={product.productId}
              href={`/${category.id}/${product.productId}`}
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
      ) : (
        <p className="text-sm text-center text-[#B3B3B3] font-semibold mb-3">
          Список пуст
        </p>
      )}
    </div>
  );
}
