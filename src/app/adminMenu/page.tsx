"use client";

import { postProductAdmin } from "@/api";
import HeaderAdmin from "@/components/AdminPage/HeaderAdmin/HeaderAdmin";
import ProductsAdmin from "@/components/AdminPage/ProductsAdmin/ProductsAdmin";
import { IProductInfo } from "@/interfaces";
import React, { ChangeEvent, useState } from "react";

export default function AdminMenu() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [newProduct, setNewProduct] = useState<IProductInfo[]>([]);

  let newProductData: IProductInfo[] = [
    {
      categoryName: "test",
      groupId: 200,
      id: 200,
      name: "test",
      color: "test",
      description: "test",
      price: 123,
      sizes: ["12", "13"],
      quantities: [2, 3],
      images: [],
    },
  ];

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(Array.from(e.target.files));
    }
  };

  console.log(selectedFiles);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFiles || selectedFiles.length === 0) {
      alert("Please select at least one file.");
      return;
    }

    const formData = new FormData();

    // Добавляем описание продукта
    const productData = {
      groupId: null,
      name: "string",
      categoryName: "string",
      color: "string",
      description: "string",
      price: 1,
      sizes: ["string"],
      quantities: [0],
    };
    formData.append("product", JSON.stringify(productData));

    // Добавляем файлы
    selectedFiles.forEach((file) => {
      formData.append("files", file); // ключ "files" соответствует вашему API
    });

    const response = await postProductAdmin(formData);

    console.log(response);
  };

  return (
    <>
      <HeaderAdmin />

      <div className="container px-3">
        <ProductsAdmin />

        <form onSubmit={handleSubmit}>
          <input type="file" multiple onChange={handleFileChange} />

          <button type="submit">Отправить</button>
        </form>
      </div>
    </>
  );
}
