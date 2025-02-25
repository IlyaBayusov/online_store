"use client";

import React, { useEffect, useState } from "react";
import CategoryItem from "../CategoryItem/CategoryItem";
import Link from "next/link";
import { getCategories } from "@/api";
import { IGetCategories } from "@/interfaces";

export default function CategoryList() {
  const [categories, setCategories] = useState<IGetCategories[]>([]);

  useEffect(() => {
    const getCategoriesArr = async () => {
      const response = await getCategories();
      const categoriesArr: IGetCategories[] = await response.products;

      if (response) {
        setCategories(categoriesArr);
      }
    };

    getCategoriesArr();
  }, []);

  return (
    <div className="container px-3">
      <div className="my-3 w-full grid grid-cols-2 grid-rows-2 gap-3">
        {categories.map((category) => (
          <Link key={category.id} href={String(category.id)}>
            <CategoryItem name={category.name} img={category.imageUrl} />
          </Link>
        ))}
      </div>
    </div>
  );
}
