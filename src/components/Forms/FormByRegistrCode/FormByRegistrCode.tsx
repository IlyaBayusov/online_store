"use client";

import { mainPage } from "@/constans";
import { useFormRegistrStore } from "@/stores/useFormRegistrStore";
import axios, { AxiosError, AxiosResponse } from "axios";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface IFormByRegistrCode {
  code: string;
}

type Props = {
  isSubmit: boolean;
  setSubmit: () => void;
};

export default function FormByRegistrCode({ isSubmit, setSubmit }: Props) {
  const [error, setError] = useState("");
  const [timerExpired, setTimerExpired] = useState<boolean>(false);
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isSubmit) {
      startTimer();
    }
    return () => stopTimer();
  }, [isSubmit]);

  const router = useRouter();

  const {
    formState: { errors, isValid },
    handleSubmit,
    register,
    reset,
    watch,
  } = useForm<IFormByRegistrCode>({ mode: "onBlur" });

  const { formData } = useFormRegistrStore();

  const code = watch("code");

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

  const onSubmit = async () => {
    if (!isSubmit || !formData) {
      setSubmit();
      return;
    }

    if (!isValid) {
      setError("Поле заполнено неверно.");
      return;
    }

    setError("");

    console.log({ email: formData.email, code });

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/mail/verification",
        { email: formData.email, code }
      );
      const data = await response.data;

      if (data) {
        startTimer();
      }

      switch (data.message) {
        case "SUCCESS":
          postRegistr();
          break;
        case "EXPIRED":
          //истек
          break;
        case "INVALID":
          return;
      }
    } catch (error) {
      handlePrev();
      console.log("Ошибка отправки запроса с кодом", error);
    }
  };

  const postRegistr = async () => {
    try {
      const response: AxiosResponse = await axios.post(
        "http://localhost:8080/api/auth/registration",
        formData
      );

      const data = await response.data;
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);

      decodeToken(data.accessToken);
      console.log("Регистрация прошла успешно", data);

      router.push(mainPage);
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("Ошибка при регистрации", error);
      if (axiosError.response && axiosError.response.status === 500) {
        setError("Ошибка валидации");
      } else {
        setError("Ошибка при регистрации");
      }
      setSubmit();
    }
  };

  const handlePrev = () => {
    reset();
    setSubmit();
  };

  const handleClickSend = async () => {
    try {
      await axios.get(
        `http://localhost:8080/api/v1/mail?email=${formData.email}`
      );
      startTimer();
    } catch (error) {
      handlePrev();
      console.log("Ошибка отправки запроса на подтверждение кода", error);
      return;
    }
  };

  const startTimer = () => {
    if (timerId) clearTimeout(timerId);

    const newTimerId = setTimeout(() => {
      setTimerExpired(true);
    }, 1000 * 5);

    setTimerId(newTimerId);
  };

  const stopTimer = () => {
    if (timerId) {
      clearTimeout(timerId);
    }
    setTimerExpired(false);
  };

  return (
    <div className="px-px flex flex-col justify-center items-center w-full max-w-72">
      <h1 className="text-lg font-bold uppercase text-center my-3">
        Подтверждение почты
      </h1>
      {error && <p className="text-red-600 text-xs">{error}</p>}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-5 w-full items-center text-black"
      >
        <div className="relative flex flex-col justify-center text-base items-center w-full">
          <input
            type="number"
            placeholder="Код"
            {...register("code", {
              required: "Поле обязательно для заполнения",
              minLength: {
                value: 6,
                message: "Введите 6-значный код",
              },
              maxLength: {
                value: 6,
                message: "Введите 6-значный код",
              },
            })}
            className="py-2 px-6 rounded-md mt-1 w-full max-w-72 text-white bg-transparent border border-[#6F00FF]"
          />

          {
            <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 z-10 text-nowrap text-red-600 text-xs mt-1">
              {errors?.code ? errors?.code?.message || "Ошибка!" : " "}
            </span>
          }
        </div>

        <button className="bg-white py-2 px-5 rounded-md mt-3" type="submit">
          Отправить
        </button>
      </form>

      <button
        disabled={!timerExpired}
        className={
          "text-base mt-1" + (timerExpired ? " text-white" : " text-gray-300")
        }
        onClick={handleClickSend}
      >
        Отправить повторно
      </button>

      <button className="text-base mt-1" onClick={handlePrev}>
        Назад
      </button>
    </div>
  );
}
