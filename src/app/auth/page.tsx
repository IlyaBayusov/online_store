"use client";

import axios, { AxiosError, AxiosResponse } from "axios";
import { jwtDecode } from "jwt-decode";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, FormEvent, useState } from "react";

export default function Auth() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const decodeToken = (accessToken: string) => {
    try {
      const decoded = jwtDecode(accessToken);
      console.log("Decoded token:", decoded);
      return decoded;
    } catch (error) {
      console.error("Invalid token:", error);
      return null;
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");

    try {
      const response: AxiosResponse = await axios.post(
        "http://localhost:8080/api/auth/login",
        formData
      );

      if (response.status !== 200) {
        const data = await response.data;
        setError(data.message || "Ошибка авторизации");
      } else {
        const data = await response.data;
        localStorage.setItem("accessToken", data.accessToken);
        decodeToken(data.accessToken);
        console.log("Авторизация прошла успешно", data);
      }

      router.push("/");
    } catch (error) {
      const axiosError = error as AxiosError;

      console.error("Ошибка при авторизации", error);
      if (axiosError.response && axiosError.response.status === 500) {
        setError("Ошибка валидации");
      } else {
        setError("Ошибка при регистрации");
      }
    }
  };

  return (
    <div className="container px-3 flex flex-col justify-center items-center">
      <h1 className="text-lg uppercase text-center mt-3">Авторизация</h1>
      {/* {error && <p className="text-red-700">{error}</p>} */}

      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full items-center mt-1 text-black"
      >
        <div className="flex flex-col justify-center text-base items-center w-full max-w-64">
          <label
            htmlFor=""
            className="text-start mt-2 text-white flex justify-start w-full"
          >
            Логин
          </label>
          <input
            type="text"
            placeholder="Логин"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="py-2 px-6 rounded-md mt-1 w-full max-w-72 text-white bg-transparent border border-[#6F00FF]"
          />
        </div>

        <div className="flex flex-col justify-center text-base items-center w-full max-w-64">
          <label
            htmlFor=""
            className="text-start mt-2 text-white flex justify-start w-full"
          >
            Пароль
          </label>
          <input
            type="password"
            placeholder="Пароль"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="py-2 px-6 rounded-md mt-1 w-full max-w-72 text-white bg-transparent border border-[#6F00FF]"
          />
        </div>

        <Link href={"/forgotPass"} className="text-gray-400 text-base mt-1">
          Забыли пароль?
        </Link>

        <button className="bg-white py-2 px-5 rounded-md mt-3" type="submit">
          Войти
        </button>
      </form>

      <Link href={"/registr"} className="text-gray-400 text-base mt-1">
        Зарегистрироваться
      </Link>
    </div>
  );
}
