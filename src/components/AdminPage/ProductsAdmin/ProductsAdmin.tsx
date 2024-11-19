"use client";

import { IProductInfo } from "@/interfaces";
import Image from "next/image";
import React from "react";
import { IoIosOptions } from "react-icons/io";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";

type Props = {
  products: IProductInfo[];
};

export default function ProductsAdmin({ products }: Props) {
  return (
    <div className="flex flex-col w-full px-3 bg-white">
      <div>str</div>

      <div className="flex flex-col items-center">
        <button>
          <MdOutlineKeyboardArrowLeft className="h-5 w-5 p-px" />
        </button>
      </div>

      {products ? (
        <table className="text-black uppercase text-xs text-center -mx-3">
          <thead>
            <tr className="text-red-400">
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
                <td>Вкл.</td>
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
