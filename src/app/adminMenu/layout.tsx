import React from "react";
import HeaderAdmin from "@/components/AdminPage/HeaderAdmin/HeaderAdmin";

const AdminMenuLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <HeaderAdmin />
      <main className="container">{children}</main>
    </>
  );
};

export default AdminMenuLayout;
