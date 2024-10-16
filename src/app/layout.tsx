import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Nav from "@/components/Nav";
import { Oswald } from "next/font/google";
import Footer from "@/components/Footer";
import ModalNav from "@/components/Modals/ModalNav";
import ModalNavCategory from "@/components/Modals/ModalNavCategory";

// const oswald = Oswald({
//   subsets: ["latin"],
//   weight: ["200", "300", "400", "500", "600", "700"],
//   display: "swap", // Оптимизация отображения шрифта
// });

export const metadata: Metadata = {
  title: "Main",
  description: "Main page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>
        <div className="wrapper">
          <Header />
          {/* <Nav /> */}

          <main>{children}</main>

          <ModalNav />
          <ModalNavCategory />

          <Footer />
        </div>
      </body>
    </html>
  );
}
