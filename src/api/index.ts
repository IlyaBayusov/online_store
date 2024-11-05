import { api } from "@/axios";
import { IDecodedToken, IOrderPost, IProductInCart } from "@/interfaces";
import { decodeToken } from "@/utils";

export const getProductsCart = async () => {
  try {
    const decodedToken: IDecodedToken = decodeToken();

    if (!decodedToken) return;

    const response = await api.get(`/v1/cart/${decodedToken.id}`);
    const data: IProductInCart[] = await response.data;

    return data;
  } catch (error) {
    console.error("Ошибка получения товаров из корзины: ", error);
  }
};

export const postByProducts = async (order: IOrderPost) => {
  try {
    const response = await api.post(`/v1/orders`, order);

    return response;
  } catch (error) {
    console.error("Ошибка оформления заказа: ", error);
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
