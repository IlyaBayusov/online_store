import { decodeToken } from "@/utils";
import axios from "axios";

// Типизация для refreshSubscribers
type RefreshSubscriber = (accessToken: string) => void;

export const api = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

let isRefreshing = false;
let refreshSubscribers: RefreshSubscriber[] = [];

const subscribeTokenRefresh = (callback: RefreshSubscriber) => {
  refreshSubscribers.push(callback);
};

const onRefreshed = (accessToken: string) => {
  refreshSubscribers.forEach((callback) => callback(accessToken));
  refreshSubscribers = [];
};

api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const statusCode = error.response ? error.response.status : null;

    // console.log("Ошибка: статус = ", statusCode, "ошибка: ", error);

    if (error.response.data.message && error.response.data.code) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      console.log("Ошибка при обновлении токена, перенаправляем на /auth");
      window.location.replace("/auth");
    }

    if (statusCode === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const refreshToken = localStorage.getItem("refreshToken");

          if (!refreshToken) {
            console.log("Refresh token не найден, перенаправляем на /auth");
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            window.location.replace("/auth");
            return Promise.reject(new Error("No refresh token"));
          }
          const response = await api.post("/auth/refresh", { refreshToken });

          const data = response.data;

          console.log("Ответ от обновления токена: ", response.data);

          localStorage.setItem("accessToken", data.accessToken);
          localStorage.setItem("refreshToken", data.refreshToken);

          onRefreshed(data.accessToken);

          originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
          return api(originalRequest);
        } catch (refreshError) {
          console.error("Ошибка при обновлении токена:", refreshError);

          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      } else {
        return new Promise((resolve) => {
          subscribeTokenRefresh((accessToken: string) => {
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            resolve(api(originalRequest));
          });
        });
      }
    }

    return Promise.reject(error);
  }
);

export const getSendCodeOnEmail = async (email: string) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/v1/mail?email=${email}`
    );

    return response;
  } catch (error) {
    console.log("Ошибка отправки запроса на подтверждение кода", error);
  }
};

export const postAvailability = async (productId: number, size: string) => {
  try {
    const response = await axios.post(
      `http://localhost:8080/api/v1/cities/availability`,
      {
        productId,
        size,
      },
      {
        withCredentials: true,
      }
    );
    const data = await response.data;

    return data;
  } catch (error) {
    console.error("Ошибка получения по id города инфы о наличии", error);
  }
};

export const getSubCategoryId = async (subCategoryId: string) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/v1/subcategories/${Number(subCategoryId)}`
    );

    return response;
  } catch (error) {
    console.log("Ошибка отправки запроса на проверку категории", error);
  }
};

export const fetchProducts = async (productId: string) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/v1/products/${productId}`
    );

    const data = await response.data;

    return data;
  } catch (error) {
    console.error("Ошибка получения продукта: ", error?.status);
  }
};

export const postPromo = async (promoCode: string) => {
  if (!decodeToken()?.id) return;

  try {
    const response = await axios.post(
      `http://localhost:8080/api/v1/promocodes/use`,
      {
        userId: decodeToken()?.id,
        promoCode,
      }
    );

    const data = await response.data;

    return data;
  } catch (error) {
    console.error("Ошибка получения скидки по промокоду: ", error);

    return error?.response?.data;
  }
};

export const getNewArrivals = async () => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/v1/products/search?size=10&sortField=id,desc`
    );

    const data = await response.data;

    return data;
  } catch (error) {
    console.error("Ошибка получения новых поступлений: ", error);
  }
};
