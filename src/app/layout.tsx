// import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/Footer";
import ModalNav from "@/components/Modals/ModalNav";
import ModalNavCategory from "@/components/Modals/ModalNavCategory";
import ModalCartDeleteProduct from "@/components/Modals/ModalCartDeleteProduct";
import ModalSuccessOrder from "@/components/Modals/ModalSuccessOrder";
import ModalNewProductAdmin from "@/components/Modals/ModalNewProductAdmin";
import ModalDeleteEditNewProduct from "@/components/Modals/ModalDeleteEditNewProduct";
import PageWrapper from "@/components/PageWrapper";
import ModalFilters from "@/components/Modals/ModalFilters";
import { Metadata } from "next";

// const oswald = Oswald({
//   subsets: ["latin"],
//   weight: ["200", "300", "400", "500", "600", "700"],
//   display: "swap", // Оптимизация отображения шрифта
// });

export const metadata: Metadata = {
  title: "Главная",
  description: "Главная страница",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="hide-scrollbar-y">
      <body className="hide-scrollbar-y">
        <div className="relative wrapper flex flex-col">
          <PageWrapper>
            <main className="flex-grow">{children}</main>
          </PageWrapper>

          <ModalNav />
          <ModalNavCategory />
          <ModalCartDeleteProduct />
          <ModalSuccessOrder />
          <ModalNewProductAdmin />
          <ModalDeleteEditNewProduct />
          <ModalFilters />

          <Footer />
        </div>
      </body>
    </html>
  );
}
