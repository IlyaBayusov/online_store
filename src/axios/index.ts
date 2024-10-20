import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

let isRefreshing = false;
let refreshSubscribers = [];

const subscribeTokenRefresh = (callback) => {
  refreshSubscribers.push(callback);
};

const onRefreshed = (accessToken) => {
  refreshSubscribers.map((callback) => callback(accessToken));
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
    console.log("ответ пришел: ", response);

    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const statusCode = error.response ? error.response.status : null;

    console.log("заход в ошибку при 401: ", statusCode, error);

    if (statusCode === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;
        try {
          console.log("начало");

          const response = await api.post("/auth/refresh");
          console.log(
            "конец ушел запрос на обновление токена: ",
            response,
            response.data
          );

          const accessToken = response.data["accessToken"];

          localStorage.setItem("accessToken", accessToken);

          onRefreshed(accessToken);
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return api(originalRequest);
        } catch (refreshError) {
          console.error("Refresh token не пришел:", refreshError);
          localStorage.removeItem("accessToken");

          console.log(
            "Ошибка обновления refreshToken, перенаправление на auth"
          );
          window.location.href = "/";
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      } else {
        return new Promise((resolve) => {
          subscribeTokenRefresh((accessToken) => {
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            resolve(api(originalRequest));
          });
        });
      }
    }
    return Promise.reject(error);
  }
);
