"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";

interface PageWrapperProps {
  children: React.ReactNode;
}

export default function PageWrapper({ children }: PageWrapperProps) {
  const path = usePathname();
  const noHeaderPages = ["/adminMenu", "/adminMenu/orders"];
  const showHeader = !noHeaderPages.includes(path);

  return (
    <>
      {showHeader && <Header />}
      {children}
    </>
  );
}
