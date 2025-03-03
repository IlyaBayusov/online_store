import axios from "axios";

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
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest: any = error.config;

    // Проверка на отсутствие ответа (ошибка сети)
    if (!error.response) {
      console.error("Ошибка сети или сервер недоступен:", error);
      return Promise.reject(error);
    }

    const statusCode = error.response.status;

    console.log("Ошибка 401: статус =", statusCode, error);

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

          console.log("Ответ от обновления токена:", data);

          localStorage.setItem("accessToken", data.accessToken);
          localStorage.setItem("refreshToken", data.refreshToken);

          onRefreshed(data.accessToken);

          originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
          return api(originalRequest);
        } catch (refreshError) {
          console.error("Ошибка при обновлении токена:", refreshError);

          if (refreshError.response?.status === 403) {
            console.log("Refresh-токен истек, разлогиниваем пользователя");
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            window.location.replace("/auth");
          }

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
