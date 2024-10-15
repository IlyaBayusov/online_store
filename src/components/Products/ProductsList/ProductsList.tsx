"use client";

import Link from "next/link";
import React, { useState } from "react";
import ProductsItem from "../ProductsItem/ProductsItem";

type Props = { category: string; products: object[] };

export default function ProductsList({ category, products }: Props) {
  const [isLoading, setIsLoading] = useState(true);

  console.log(products);

  return (
    <div className="container px-3">
      <div className="flex justify-center mt-3 mb-5">
        <h2 id="subTitleLine" className="relative uppercase font-medium">
          {category}
        </h2>
      </div>
      <div className="my-2 w-full grid grid-cols-3 grid-rows-2 gap-2 gap-y-2">
        {products.map((product) => (
          <Link key={product.productId} href="#">
            <ProductsItem
              id={product.productId}
              name={product.name}
              img={product.image}
              price={product.price}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
