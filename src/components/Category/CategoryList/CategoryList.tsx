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
      const categoriesArr: IGetCategories[] = await response;

      if (response) {
        setCategories(categoriesArr);
      }
    };

    getCategoriesArr();
  }, []);

  return (
    <div className="container px-3">
      <div className="my-3 w-full grid grid-cols-2 grid-rows-2 gap-3">
        {categories.map((category) =>
          category.subcategories.map((subCategory) => (
            <Link key={subCategory.id} href={String(subCategory.id)}>
              <CategoryItem
                name={subCategory.name}
                img={subCategory.imageUrl}
              />
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
