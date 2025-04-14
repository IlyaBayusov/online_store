"use client";

import EditBtnInForm from "@/components/ProfilePage/EditBtnInForm/EditBtnInForm";
import InputInForm from "@/components/ProfilePage/InputInForm/InputInForm";
import { IFormDataProfileUserInfo, IGetUserInfoInProfile } from "@/interfaces";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

type Props = { profileData: IGetUserInfoInProfile };

export default function FormDetailedInfoProfile({ profileData }: Props) {
  const {
    formState: { errors, isValid },
    handleSubmit,
    register,
  } = useForm<IFormDataProfileUserInfo>({ mode: "onBlur" });

  const [isActive, setIsActive] = useState(false);

  const onSubmit = async (data: IFormDataProfileUserInfo) => {};

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col items-center gap-3 text-base"
    >
      <div className="w-full flex flex-nowrap justify-center items-center">
        <label htmlFor="firstname" className="w-full max-w-72">
          <p>Имя</p>

          <InputInForm
            {...register("firstName", {
              required: "Поле обязательно для заполнения",
              minLength: {
                value: 2,
                message: "Минимум 2 символа",
              },
              maxLength: {
                value: 30,
                message: "Максимум 30 символов",
              },
            })}
            placeholder={profileData.firstName}
          />
        </label>
      </div>

      <div className="w-full flex flex-nowrap justify-center items-center">
        <label htmlFor="lastName" className="w-full max-w-72">
          <p>Фамилия</p>

          <InputInForm
            {...register("lastName", {
              required: "Поле обязательно для заполнения",
              minLength: {
                value: 2,
                message: "Минимум 2 символа",
              },
              maxLength: {
                value: 30,
                message: "Максимум 30 символов",
              },
            })}
            placeholder={profileData.lastName}
          />
        </label>
      </div>

      <div className="w-full flex flex-nowrap justify-center items-center">
        <label htmlFor="username" className="w-full max-w-72">
          <p>Логин</p>

          <InputInForm
            {...register("username", {
              required: "Поле обязательно для заполнения",
              minLength: {
                value: 2,
                message: "Минимум 2 символа",
              },
              maxLength: {
                value: 30,
                message: "Максимум 30 символов",
              },
            })}
            placeholder={profileData.username}
          />
        </label>
      </div>

      <EditBtnInForm cb={() => setIsActive} />
    </form>
  );
}
