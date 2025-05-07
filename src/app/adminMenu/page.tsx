"use client";

import UsersAdmin from "@/components/AdminPage/pages/UsersAdmin";
import ProductsAdmin from "@/components/AdminPage/pages/ProductsAdmin";
import { decodeToken } from "@/utils";
import React, { useEffect, useState } from "react";
import Loader from "@/components/Loader/Loader";

export default function AdminMenu() {
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const decoded = decodeToken();
    if (decoded?.roles) {
      setRole(decoded.roles);
    }
    setLoading(false);
  }, []);

  if (loading) return <Loader />;

  if (role === "ADMIN") {
    return <UsersAdmin />;
  }

  if (role === "MANAGER") {
    return <ProductsAdmin />;
  }

  return <div className="text-center mt-5">Недостаточно прав</div>;
}
