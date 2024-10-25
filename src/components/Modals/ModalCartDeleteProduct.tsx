"use client";

import React from "react";
import { IoClose } from "react-icons/io5";

export default function ModalCartDeleteProduct() {
  return (
    <div
      className={`fixed top-0 -0 z-[1000] w-full h-full bg-black bg-opacity-40 transition-all overflow-y-hidden `}
    >
      <div
        className={
          "absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-md flex flex-col bg-[#121212] p-3"
        }
      >
        <div className="flex justify-end">
          <div>
            <IoClose
              className="text-[#B3B3B3] w-5 h-5"
              viewBox="75 75 350 350"
            />
          </div>
        </div>

        <div className="mt-3 flex justify-center text-center">
          <p className="text-base">Вы хотите удалить товар из корзины?</p>
        </div>

        <div className="mt-3 flex justify-around items-center">
          <button className="py-2 px-4 text-[#B3B3B3]">Да</button>
          <button className="py-2 px-4 text-[#B3B3B3]">Нет</button>
        </div>
      </div>
    </div>
  );
}
