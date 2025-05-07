"use client";

import { getProductAdmin, postEnableProductAdmin } from "@/api";
import { IProductInfo } from "@/interfaces";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { IoIosOptions } from "react-icons/io";

export default function ProductsAdmin() {
  const [isActive, setIsActive] = useState(true);
  const [products, setProducts] = useState<IProductInfo[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      const data = await getProductAdmin();

      if (data) {
        setProducts(data);
      }
    };
    getProducts();
  }, [isActive]);

  const handleClickIsActive = async (productId: number) => {
    const data = await postEnableProductAdmin(productId, !isActive);

    if (data) {
      setIsActive(!isActive);
    }
  };

  console.log("актив", isActive);

  return (
    <div className="flex flex-col w-full px-3 bg-white">
      пагинация
      {products ? (
        <table className="text-black uppercase text-xs text-center -mx-3 mt-3">
          <thead>
            <tr className="text-black">
              <th>Название / Артикул</th>
              <th>Цена</th>
              <th>Кол-во</th>
              <th>Статус</th>
              <th>Изменить</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr className="border-b border-slate-300" key={product.name}>
                <td>
                  <div className="ml-1 flex items-start text-start">
                    <div className="max-w-12">
                      <Image
                        width={175}
                        height={250}
                        src={product.images[0]}
                        alt={product.name}
                      />
                    </div>
                    <div className="flex flex-col items-start max-w-32 text-wrap">
                      <p>{product.name}</p>
                      <p>{product.id}</p>
                    </div>
                  </div>
                </td>
                <td>{product.price}</td>
                <td>
                  {product.quantities.reduce((acc, currentValue) => {
                    return acc + currentValue;
                  }, 0)}
                </td>
                <td>
                  <button onClick={() => handleClickIsActive(product.id)}>
                    {product.isActive ? "Вкл." : "Выкл."}
                  </button>
                </td>
                <td className="h-full">
                  <div className="flex justify-center items-center ">
                    <button className="py-1 px-2">
                      <IoIosOptions className="h-5 w-5 p-px" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>isLoading</div>
      )}
    </div>
  );
}
