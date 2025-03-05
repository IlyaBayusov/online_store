import { api } from "@/axios";
import { sizePage } from "@/constans";
import {
  IDecodedToken,
  IGetFav,
  IOrderPost,
  IOrdersGet,
  IPostFav,
  IProductInCart,
} from "@/interfaces";
import { decodeToken } from "@/utils";

export const getProductsCart = async () => {
  try {
    const decodedToken: IDecodedToken | undefined = decodeToken();

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
      quantity: updateQuantity,
    });

    return response;
  } catch (error) {
    console.error("Ошибка изменения кол-ва товара в корзине: ", error);
  }
};

export const postCount = async (productId: number, size: string) => {
  try {
    const response = await api.post(`/v1/products/count`, { productId, size });
    const data: { productCount: number } = await response.data;

    return data;
  } catch (error) {
    console.error("Ошибка получения количества товара: ", error);
  }
};

export const getOrders = async () => {
  try {
    const decodedToken: IDecodedToken = decodeToken();

    if (!decodedToken) return;

    const response = await api.get(`/v1/orders/${decodedToken.id}`);
    const data: IOrdersGet[] = await response.data;

    return data;
  } catch (error) {
    console.error("Ошибка получения товаров из корзины: ", error);
  }
};

export const postFav = async (fav: IPostFav) => {
  try {
    const response = await api.post(`/v1/favorites`, fav);

    return response;
  } catch (error) {
    console.error("Ошибка добавления в избранные: ", error);
  }
};

export const getFav = async () => {
  try {
    const decodedToken: IDecodedToken = decodeToken();

    if (!decodedToken) return;

    const response = await api.get(`/v1/favorites/${decodedToken.id}`);
    const data: IGetFav[] = await response.data;

    return data;
  } catch (error) {
    console.error("Ошибка получения избранных: ", error);
  }
};

export const postProductAdmin = async (product: FormData) => {
  try {
    const response = await api.post(`/v1/products`, product, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response;
  } catch (error) {
    console.error("Ошибка добавления товара в админке: ", error);
  }
};

export const getProductAdmin = async () => {
  try {
    const response = await api.get(`/v1/products/admin`);
    const data = await response.data.products;

    return data;
  } catch (error) {
    console.error("Ошибка получения товара в админке: ", error);
  }
};

export const getProductCount = async (productId: number, size: string) => {
  try {
    const response = await api.post(`/v1/products/count`, {
      productId,
      size,
    });
    const data = await response.data.productCount;

    return data;
  } catch (error) {
    console.error("Ошибка получения кол-во товара: ", error);
  }
};

export const postEnableProductAdmin = async (
  productId: number,
  enable: boolean
) => {
  try {
    const response = await api.post(`/v1/products/enable/${productId}`, {
      enable,
    });

    return response;
  } catch (error) {
    console.error("Ошибка вкл./выкл. товара: ", error);
  }
};

export const getUsersAdmin = async () => {
  try {
    const response = await api.get(`/v1/users`);
    const data = await response.data;

    return data;
  } catch (error) {
    console.error("Ошибка получения пользователей в админке: ", error);
  }
};

export const putUserRoleAdmin = async (userId: number, role: string) => {
  try {
    const response = await api.put(`/v1/users/role/${userId}`, {
      role,
    });
    const data = await response.data;

    return data;
  } catch (error) {
    console.error("Ошибка изменения роли пользователя: ", error);
  }
};

export const getOrdersAdmin = async () => {
  try {
    const response = await api.get(`/v1/orders?size=10`);
    const data = await response.data;

    return data;
  } catch (error) {
    console.error("Ошибка получения товаров из корзины: ", error);
  }
};

export const getCities = async () => {
  try {
    const response = await api.get(`/v1/cities`);
    const data = await response.data;

    return data;
  } catch (error) {
    console.error("Ошибка получения городов: ", error);
  }
};

export const getSupCategories = async () => {
  try {
    const response = await api.get(`/v1/categories`);
    const data = await response.data;

    return data;
  } catch (error) {
    console.error("Ошибка получения категорий: ", error);
  }
};

export const getSubCategories = async () => {
  try {
    const response = await api.get(`/v1/subcategories`);
    const data = await response.data;

    return data;
  } catch (error) {
    console.error("Ошибка получения категорий: ", error);
  }
};

export const getProductsSearchWithParams = async (
  page: number = 0,
  size: number = sizePage,
  sortField: string = "id,asc",
  searchParam: string,
  sizes: string[] = [],
  colors: string[] = [],
  minPrice: number | null = null,
  maxPrice: number | null = null,
  brands: string[] = []
) => {
  try {
    const response = await api.get(`/v1/products/search`, {
      params: {
        ...(page !== undefined && { page }),
        ...(size !== undefined && { size }),
        ...(sortField !== undefined && { sortField }),
        ...(searchParam !== undefined && { searchParam }),
        ...(sizes !== undefined && { sizes }),
        ...(colors !== undefined && { colors }),
        ...(minPrice !== undefined && { minPrice }),
        ...(maxPrice !== undefined && { maxPrice }),
        ...(brands !== undefined && { brands }),
      },
    });

    const data = await response.data;

    return data;
  } catch (error) {
    console.error("Ошибка получения товаров по поиску: ", error);
  }
};

export const getFiltersByCategory = async (categoryId: number) => {
  try {
    const response = await api.get(`/v1/filters/${categoryId}`);
    const data = await response.data;

    return data;
  } catch (error) {
    console.error("Ошибка получения фильтров по категории: ", error);
  }
};
