import { categoriesList, statusAvailStock } from "@/constans";
import { IDecodedToken, IPostAvailability } from "@/interfaces";
import { jwtDecode } from "jwt-decode";
import { notFound } from "next/navigation";

export const decodeToken = () => {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    return;
  }

  const decoded: IDecodedToken = jwtDecode(token);

  return decoded;
};

export function getCodeColor(color: string) {
  switch (color.toLowerCase()) {
    case "белый":
      return "#f0f0f0";
    case "черный":
      return "#333333";
    case "коричневый":
      return "#a0522d";
    case "бежевый":
      return "#e0d4b0";
    case "серый":
      return "#a9a9a9";
    case "темно-синий":
      return "#191970";
    case "зеленый":
      return "#6b8e23";
    case "синий":
      return "#4682b4";
    case "голубой":
      return "#87cefa";
    case "бордовый":
      return "#800020";
    case "черно-серый":
      return "#555555";
    default:
      return "#cccccc";
  }
}

export function getStatusRu(status: string) {
  switch (status.toLowerCase()) {
    case "created":
      return "В обработке";
    case "en_route":
      return "В пути";
    case "completed":
      return "Доставлен";
    case "canceled":
      return "Отменён";
    default:
      return "В обработке";
  }
}

export function getCategoryRu(category: string) {
  const categoryRu = categoriesList.find((item) => {
    if (item.url_name.toLocaleLowerCase() === category.toLowerCase())
      return item;
  });

  if (!categoryRu) return notFound();

  return categoryRu;
}

export function getColorAvailability(arrAvail: IPostAvailability[]) {
  // надо сделать до отрисовки
  if (!arrAvail.length) return "#d1d5db";

  const stockIndex = arrAvail.findIndex(
    (status) => status.status === statusAvailStock
  );

  if (stockIndex !== -1) {
    return "#22c55e";
  } else {
    switch (arrAvail[0].status) {
      case "В началии":
        return "#22c55e";
      case "Не в началии":
        return "#dc2626";
      default:
        return "#d1d5db";
    }
  }
}
