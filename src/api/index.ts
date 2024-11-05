import { api } from "@/axios";
import { IDecodedToken, IProductInCart } from "@/interfaces";
import { decodeToken } from "@/utils";

export const getProductsCart = async () => {
  try {
    const decodedToken: IDecodedToken | null = decodeToken();

    if (!decodedToken) return;

    const response = await api.get(`/v1/cart/${decodedToken.id}`);
    const data: IProductInCart[] = await response.data;

    return data;
  } catch (error) {
    console.error("Ошибка получения товаров из корзины: ", error);
  }
};

export const putProductCart = async (
  product: IProductInCart,
  updateQuantity: number
) => {
  try {
    const response = await api.put(`/v1/cart/${product.cartItemId}`, {
      ...product,
      quantity: updateQuantity,
    });
    console.log("Кол-во изменено: ", response);

    return response;
  } catch (error) {
    console.error("Ошибка изменения кол-ва товара в корзине: ", error);
  }
};
