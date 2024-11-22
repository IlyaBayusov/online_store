"use client";

import { postProductAdmin } from "@/api";
import {
  colors,
  modalNewProductAdmin,
  selectCategoryies,
  selectSiziesCloth,
} from "@/constans";
import { useModalStore } from "@/stores/useModalStore";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { IoClose } from "react-icons/io5";

export default function ModalNewProductAdmin() {
  const { modals, closeModal } = useModalStore();

  const [selectedColor, setSelectedColor] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleChangeColor = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedColor(e.target.value);
  };
  const handleChangeCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };
  const handleChangeSize = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSize(e.target.value);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(Array.from(e.target.files));
    }
  };

  console.log(selectedFiles);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!selectedFiles || selectedFiles.length === 0) {
      console.log("Выберите файлы");
      return;
    }

    const formData = new FormData();

    const productData = {
      groupId: null,
      name: "name",
      categoryName: "Chelsea",
      color: "red",
      description: "string",
      price: 120,
      sizes: ["12", "13"],
      quantities: [6, 12],
    };
    formData.append("product", JSON.stringify(productData));

    selectedFiles.forEach((file) => {
      formData.append("files", file);
    });

    const response = await postProductAdmin(formData); //response для обработки ошибки "товар с таким именем уже существует" и прочее

    console.log(response);
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
          <form
            onSubmit={handleSubmit}
            className="text-base flex flex-col gap-3"
          >
            <div className="flex flex-col">
              <label>Название</label>
              <input
                type="text"
                placeholder="Название"
                className="px-2 py-1 rounded-md text-black"
              />
            </div>

            <div className="flex flex-col">
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
                <label htmlFor="price">Цена</label>
                <input
                  id="price"
                  type="number"
                  placeholder="Цена"
                  maxLength={4}
                  className="px-2 py-1 rounded-md max-w-20 text-black"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="color">Цвет</label>

                <div className="flex items-center gap-1">
                  <select
                    id="color"
                    value={selectedColor}
                    onChange={handleChangeColor}
                    className="rounded-md text-black px-2 py-[3px] text-base max-h-10 overflow-auto"
                  >
                    <option value="">Выбрать</option>

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
                <label htmlFor="category">Категория</label>

                <div className="flex items-center gap-3">
                  <select
                    id="category"
                    value={selectedCategory}
                    onChange={handleChangeCategory}
                    className="rounded-md text-black px-2 py-[3px] text-base"
                  >
                    <option value="">Выбрать</option>

                    {selectCategoryies.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-start gap-3">
                <div className="flex flex-col w-1/2">
                  <label htmlFor="color">Размер</label>

                  <select
                    id="color"
                    value={selectedSize}
                    onChange={handleChangeSize}
                    className="rounded-md text-black px-2 py-[3px] text-base"
                  >
                    <option value="">Выбрать</option>

                    {selectSiziesCloth.map((size) => (
                      <option key={size.name} value={size.name}>
                        {size.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col w-1/2">
                  <label htmlFor="quantity">Количество</label>
                  <input
                    id="quantity"
                    type="number"
                    placeholder="Размер"
                    maxLength={4}
                    className="px-2 py-1 rounded-md text-black"
                  />
                </div>
              </div>

              <div className="flex justify-center">
                <button className="px-3 py-1 rounded-md bg-green-400 text-sm">
                  Добавить размер | количество
                </button>
              </div>

              <div className="flex justify-start items-center gap-1 flex-wrap">
                <button
                  type="button"
                  className="flex rounded-md max-w-20 bg-white text-black"
                >
                  <div className="text-center px-2 py-1 border-r">44</div>
                  <div className="text-center px-2 py-1 ">77</div>
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="files">Фотографии</label>
              <input
                id="files"
                type="file"
                multiple
                onChange={handleFileChange}
              />
            </div>

            <button
              type="submit"
              className="mt-3 px-3 py-1 rounded-md bg-green-400 text-sm"
            >
              Создать товар
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
