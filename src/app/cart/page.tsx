"use client";

import { getProductsCart } from "@/api";
import { IProductInCart } from "@/interfaces";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa6";

export default function Cart() {
  const [products, setProducts] = useState<IProductInCart[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      const data: IProductInCart[] = await getProductsCart();
      setProducts(data);
    };

    getProducts();
  }, []);

  return (
    <div className="container px-3">
      <div className="flex flex-col justify-center items-center w-full">
        <div className="mt-3 w-full bg-black rounded-t-2xl rounded-b-md">
          <h1 className="py-2 px-3 text-xl uppercase">Корзина</h1>
        </div>

        <div className="flex flex-col justify-center items-center w-full mt-3">
          {products.map((product) => (
            <div
              key={product.productId}
              className="flex flex-col justify-center items-center w-full p-3 bg-black mb-3 rounded-md"
            >
              <div className="flex justify-start gap-3 w-full">
                <div className="max-w-20">
                  <Image
                    width={350}
                    height={500}
                    src={product.image}
                    alt={product.productName}
                    className="rounded-md"
                  />
                </div>
                <div className="flex flex-col justify-start">
                  <h2 className="text-base leading-5">{product.productName}</h2>

                  <div className="text-sm text-start mt-1">
                    {/* <p>Цвет: {product.color}</p> */}
                    <p>Размер: {product.sizes}</p>
                    <p>Артикул: {product.productId}</p>
                  </div>

                  <div className="flex justify-start items-center mt-2">
                    <button className="w-6 h-6 flex justify-center items-center bg-fuchsia-700 rounded-md">
                      <FaMinus className="w-4 h-4 text-white" />
                    </button>
                    <div className="flex justify-center items-center w-6 h-6">
                      <p className="text-base text-center">
                        {product.quantity}
                      </p>
                    </div>
                    <button className="w-6 h-6 flex justify-center items-center bg-fuchsia-700 rounded-md">
                      <FaPlus className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </div>
              </div>

              <div></div>
            </div>
          ))}
        </div>
      </div>

      {products.length ? (
        <button className="flex flex-col items-center fixed bottom-7 left-1/2 -translate-x-1/2 z-[1000] w-[calc(100%-1.5rem)] py-2 rounded-md bg-orange-400">
          <span className="text-base leading-none">К оформлению</span>
          <span className="text-base leading-none">{`${products.length} шт., общ. стоимость`}</span>
        </button>
      ) : (
        <button
          disabled
          className="flex flex-col items-center fixed bottom-7 left-1/2 -translate-x-1/2 z-[1000] w-[calc(100%-1.5rem)] py-2 rounded-md bg-[#3A3A3A]"
        >
          <span className="text-base leading-none text-[#B3B3B3]">
            Корзина пуста
          </span>
        </button>
      )}
    </div>
  );
}
