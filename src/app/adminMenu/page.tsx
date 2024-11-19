"use client";

import { getProductAdmin, postProductAdmin } from "@/api";
import HeaderAdmin from "@/components/AdminPage/HeaderAdmin/HeaderAdmin";
import ProductsAdmin from "@/components/AdminPage/ProductsAdmin/ProductsAdmin";
// import { IProductInfo } from "@/interfaces";
import React, { ChangeEvent, useEffect, useState } from "react";

export default function AdminMenu() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  // const [newProduct, setNewProduct] = useState<IProductInfo[]>([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const data = await getProductAdmin();

      if (data) {
        setProducts(data);
        console.log(data);
      }
    };
    getProducts();
  }, []);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(Array.from(e.target.files));
    }
  };

  console.log(selectedFiles);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFiles || selectedFiles.length === 0) {
      console.log("Please select at least one file.");
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

    const response = await postProductAdmin(formData);

    console.log(response);
  };

  return (
    <>
      <HeaderAdmin />

      <div className="container ">
        {products && <ProductsAdmin products={products} />}

        <form onSubmit={handleSubmit} className="mt-52">
          <input type="file" multiple onChange={handleFileChange} />

          <button type="submit">Отправить</button>
        </form>
      </div>
    </>
  );
}
