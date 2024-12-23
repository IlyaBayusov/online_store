"use client";

import { getProductAdmin } from "@/api";
import ProductsAdmin from "@/components/AdminPage/ProductsAdmin/ProductsAdmin";
import React, { useEffect, useState } from "react";

export default function AdminMenu() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const data = await getProductAdmin();

      if (data) {
        setProducts(data);
      }
    };
    getProducts();
  }, []);

  return <>{products && <ProductsAdmin products={products} />}</>;
}
