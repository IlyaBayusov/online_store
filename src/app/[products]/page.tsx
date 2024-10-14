import React from "react";
import { notFound } from "next/navigation";
import { categories } from "@/constans";
// Chelsea - id - 1
// Sneakers - id - 2
// Pants - id - 3
// Shirts - id -4
// Ties - id - 5
// Belts - id - 6

export default function Products({ params }: { params: { products: string } }) {
  const { products } = params;

  console.log(products);

  if (
    !categories
      .map((item) => item.next)
      .flat()
      .find((item) => item?.urlName == products)
  ) {
    return notFound();
  }

  return <div>products</div>;
}
