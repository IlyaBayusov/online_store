import { api } from "@/axios";
import { IDecodedToken, IProductInCart } from "@/interfaces";
import { decodeToken } from "@/utils";

export const getProductsCart = async () => {
  try {
    const decodedToken: IDecodedToken = decodeToken();

    const response = await api.get(`/v1/cart/${decodedToken.id}`);
    const data: IProductInCart[] = await response.data;

    return data;
  } catch (error) {
    console.error("Ошибка получения товаров из корзины: ", error);
  }
};
