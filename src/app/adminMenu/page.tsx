"use client";

import HeaderAdmin from "@/components/HeaderAdmin/HeaderAdmin";
import ProductsAdmin from "@/components/ProductsAdmin/ProductsAdmin";
import React from "react";

export default function AdminMenu() {
  return (
    <>
      <HeaderAdmin />

      <div className="container px-3">
        <ProductsAdmin />
      </div>
    </>
  );
}
