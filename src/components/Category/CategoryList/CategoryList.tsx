import { categories } from "@/constans";
import React from "react";
import CategoryItem from "../CategoryItem/CategoryItem";
import Link from "next/link";

type Props = {};

export default function CategoryList({}: Props) {
  return (
    <div className="container px-3">
      <div className="my-3 w-full grid grid-cols-2 grid-rows-2 gap-3">
        {categories.map((category) => (
          <Link key={category.id} href="#">
            <CategoryItem
              id={category.id}
              name={category.name}
              img={category.img}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
