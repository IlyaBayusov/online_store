"use client";

import { colors, modalNewProductAdmin } from "@/constans";
import { useModalStore } from "@/stores/useModalStore";
import React, { useState } from "react";
import { IoClose } from "react-icons/io5";

export default function ModalNewProductAdmin() {
  const { modals, closeModal } = useModalStore();

  const [selectedColor, setSelectedColor] = useState("#f0f0f0");

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedColor(e.target.value);
  };

  return (
    <div
      className={
        `top-0 -0 z-[1000] w-full h-full bg-black bg-opacity-40 transition-all overflow-y-hidden ` +
        (modals[modalNewProductAdmin] ? "fixed" : "hidden")
      }
      onClick={() => closeModal(modalNewProductAdmin)}
    >
      <div
        className="absolute top-0 left-0 z-10 w-full h-full flex flex-col bg-[#121212] p-3"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center pb-2 border-b border-[#B3B3B3]">
          <h1 className="text-[#B3B3B3] uppercase">Создание товара</h1>

          <div onClick={() => closeModal(modalNewProductAdmin)}>
            <IoClose
              className="text-[#B3B3B3] w-5 h-5"
              viewBox="75 75 350 350"
            />
          </div>
        </div>

        <div className="mt-3">
          <form action="submit" className="text-base flex flex-col">
            <div className="flex flex-col">
              <label>Название</label>
              <input
                type="text"
                placeholder="Название"
                className="px-2 py-1 rounded-md text-black"
              />
            </div>

            <div className="flex flex-col mt-3">
              <label>Описание</label>
              <textarea
                id="largeText"
                name="largeText"
                rows={5}
                cols={50}
                placeholder="Описание"
                className="p-2 rounded-md text-black"
              ></textarea>
            </div>

            <div className="flex justify-between items-start">
              <div className="flex flex-col">
                <label>Цена</label>
                <input
                  type="number"
                  placeholder="Цена"
                  maxLength={4}
                  className="px-2 py-1 rounded-md max-w-20 text-black"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="color">Цвет</label>

                <div className="flex items-center gap-3">
                  <select
                    id="color"
                    value={selectedColor}
                    onChange={handleChange}
                    className="rounded-md text-black px-2 py-[3px] text-base"
                  >
                    {colors.map((color) => (
                      <option key={color.value} value={color.value}>
                        {color.name}
                      </option>
                    ))}
                  </select>

                  <div
                    className="h-6 w-6 rounded-full border-2 border-white"
                    style={{
                      backgroundColor: selectedColor,
                    }}
                  ></div>
                </div>
              </div>

              <div className="flex flex-col">
                <label htmlFor="color">Категория</label>

                <div className="flex items-center gap-3">
                  <select
                    id="color"
                    value={selectedColor}
                    onChange={handleChange}
                    className="rounded-md text-black px-2 py-[3px] text-base"
                  >
                    {colors.map((color) => (
                      <option key={color.value} value={color.value}>
                        {color.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <button className="mt-3 px-3 py-1 rounded-md bg-green-400 text-sm">
              Создать товар
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
