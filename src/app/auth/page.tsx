"use client";

import axios, { AxiosError, AxiosResponse } from "axios";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/router";
import React, { ChangeEvent, FormEvent, useState } from "react";

export default function Auth() {
  // const [formData, setFormData] = useState({
  //   username: "",
  //   password: "",
  // });
  // const [error, setError] = useState("");
  // const router = useRouter();

  // const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setFormData({
  //     ...formData,
  //     [name]: value,
  //   });
  // };

  // const decodeToken = (accessToken: string) => {
  //   try {
  //     const decoded = jwtDecode(accessToken);
  //     console.log("Decoded token:", decoded);
  //     return decoded;
  //   } catch (error) {
  //     console.error("Invalid token:", error);
  //     return null;
  //   }
  // };

  // const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   setError("");

  //   try {
  //     const response: AxiosResponse = await axios.post(
  //       "http://localhost:8080/api/auth/login",
  //       formData
  //     );

  //     if (response.status !== 200) {
  //       const data = await response.data;
  //       setError(data.message || "Ошибка авторизации");
  //     } else {
  //       const data = await response.data;
  //       localStorage.setItem("accessToken", data.accessToken);
  //       decodeToken(data.accessToken);
  //       console.log("Авторизация прошла успешно", data);
  //     }

  //     router.push("/");
  //   } catch (error) {
  //     const axiosError = error as AxiosError;

  //     console.error("Ошибка при авторизации", error);
  //     if (axiosError.response && axiosError.response.status === 500) {
  //       setError("Ошибка валидации");
  //     } else {
  //       setError("Ошибка при регистрации");
  //     }
  //   }
  // };

  return (
    <div>
      <h1>reg</h1>
      {/* {error && <p className="text-red-700">{error}</p>}

      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center text-black"
      >
        <input
          type="text"
          placeholder="Логин"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Пароль"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />

        <button className="bg-red-500 py-2 px-5 rounded-md mt-3" type="submit">
          Войти
        </button>
      </form> */}
    </div>
  );
}
