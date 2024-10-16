"use client";

import { IProductInfo } from "@/interfaces/index";
import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getCodeColor } from "@/utils";
import ProductTabs from "../Tabs/ProductTabs";

type Props = {
  id: number;
  arrProduct: IProductInfo[];
  productIdInArray: number;
};

export default function ProductInfo({
  id,
  arrProduct,
  productIdInArray,
}: Props) {
  const [arrProducts, setArrProducts] = useState<IProductInfo[]>(arrProduct);
  const [nowProduct, setNowProduct] = useState<IProductInfo>(
    arrProduct[productIdInArray]
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [selectedSize, setSelectedSize] = useState<number>(
    Number(nowProduct.sizes[0])
  );
  const [selectedColor, setSelectedColor] = useState<string>(nowProduct.color);
  const [selectedTab, setSelectedTab] = useState<string>();

  const params = useParams();

  return (
    <div className="container px-3">
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center gap-3">
          {/* 1 блок */}
          <div className="flex flex-col items-center gap-3 mt-3">
            <div>
              Main / Shoes / Chelsea /{" "}
              <span className="text-orange-200">Chelsea suede brown</span>
            </div>
            <Image
              src={nowProduct.images[0]}
              width={351}
              height={494}
              alt={nowProduct.name}
              className="rounded-md max-w-[75%]"
            />

            <div className="w-full flex justify-between items-center">
              {nowProduct.images.map((item, index) => (
                <Image
                  key={index}
                  src={item}
                  width={351}
                  height={494}
                  alt={nowProduct.name}
                  className="max-w-16 rounded-md"
                />
              ))}
            </div>
          </div>

          {/* 2 блок */}
          <div className="flex flex-col w-full">
            <div className="flex flex-col items-center text-[#FFE4E4] text-center">
              <h1>{nowProduct.name}</h1>
              <p>{`${nowProduct.price} РУБ`}</p>
            </div>

            <div className="flex flex-col items-start mt-3">
              <div className="full">
                <p>Цвет: {selectedColor}</p>
                <div className="flex items-center gap-2 mt-1">
                  {arrProducts.map((item) => (
                    <Link
                      key={item.id}
                      href={`/${params.products}/${item.id}`}
                      className=""
                    >
                      <div
                        style={{
                          background: getCodeColor(item.color.toLowerCase()),
                        }}
                        className={
                          "w-6 h-6 rounded-full " +
                          (item.color == selectedColor
                            ? "border-2 border-white"
                            : "")
                        }
                        onClick={() => setSelectedColor(nowProduct.color)}
                      ></div>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="mt-1 w-full">
                <p>Размер: {selectedSize}</p>
                <div className="flex justify-between items-center mt-1 w-full">
                  {nowProduct.sizes.map((size, index) => (
                    <button
                      key={index}
                      className={
                        "py-2 px-5 rounded-md text-base " +
                        (Number(size) == selectedSize
                          ? "bg-[#895D5D] text-white"
                          : "bg-white text-black")
                      }
                      onClick={() => setSelectedSize(Number(size))}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 3 блок */}
          <ProductTabs description={nowProduct.description} />
        </div>
      </div>
    </div>
  );
}
