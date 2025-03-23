"use client";

import React, { useEffect, useState } from "react";
import CategoryItem from "../CategoryItem/CategoryItem";
import Link from "next/link";
import { getSubCategories } from "@/api";
import { IGetSubCategories } from "@/interfaces";

export default function CategoryList() {
  const [subCategories, setSubCategories] = useState<IGetSubCategories[]>([]);

  useEffect(() => {
    const getCategoriesArr = async () => {
      const response = await getSubCategories();
      const categoriesArr: IGetSubCategories[] = await response.items;
      console.log(response);

      if (response) {
        setSubCategories(categoriesArr);
      }
    };

    getCategoriesArr();
  }, []);

  return (
    <div className="container px-3">
      <div className="my-3 w-full grid grid-cols-2 grid-rows-2 gap-3">
        {subCategories.length ? (
          subCategories.map((subCategory) => (
            <Link key={subCategory.id} href={String(subCategory.id)}>
              <CategoryItem
                name={subCategory.name}
                img={subCategory.imageUrl}
              />
            </Link>
          ))
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
    </div>
  );
}
