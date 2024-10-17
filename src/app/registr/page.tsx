"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/navigation";

//
// ------------------------------------ форму сделать в отдельном компоненте
//

export default function Registr() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    secondPassword: "",
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
        "http://localhost:8080/api/auth/registration",
        formData
      );

      if (response.status !== 200) {
        const data = await response.data;
        setError(data.message || "Ошибка регистрации");
      } else {
        const data = await response.data;
        localStorage.setItem("accessToken", data.accessToken);
        decodeToken(data.accessToken);
        console.log("Регистрация прошла успешно", data);
      }

      router.push("/auth");
    } catch (error) {
      const axiosError = error as AxiosError;

      console.error("Ошибка при регистрации", error);
      if (axiosError.response && axiosError.response.status === 500) {
        setError("Ошибка валидации");
      } else {
        setError("Ошибка при регистрации");
      }
    }
  };

  return (
    <div>
      <h1>reg</h1>
      {error && <p className="text-red-700">{error}</p>}

      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center text-black"
      >
        <input
          type="text"
          placeholder="Имя"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Фамилия"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Логин"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Пароль"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Повторить пароль"
          name="secondPassword"
          value={formData.secondPassword}
          onChange={handleChange}
        />

        <button className="bg-red-500 py-2 px-5 rounded-md mt-3" type="submit">
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
}
