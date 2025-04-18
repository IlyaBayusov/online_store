"use client";

import { getSendCodeOnEmail } from "@/axios";
import EditBtnInForm from "@/components/ProfilePage/EditBtnInForm/EditBtnInForm";
import InputInForm from "@/components/ProfilePage/InputInForm/InputInForm";
import { IGetUserInfoInProfile } from "@/interfaces";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

type Props = { profileData: IGetUserInfoInProfile };

interface FormNewPass {
  newPassword: string;
  secondNewPassword: string;
  code: string;
}

export default function FormNewPassProfile({ profileData }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormNewPass>();

  const [isActivePass, setIsActivePass] = useState<boolean>(false);

  const [isActiveCodeBlock, setIsActiveCodeBlock] = useState<boolean>(false);

  const [isSendCode, setIsSendCode] = useState<boolean>(false);
  const [errorMessageSendCode, setErrorMessageSendCode] = useState<string>("");
  const [errorMessageEmailCode, setErrorMessageEmailCode] =
    useState<string>("");

  const onGetCode = async () => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars

      setIsActiveCodeBlock(true);
      setIsSendCode(true);

      const responseSendCode = await getSendCodeOnEmail(profileData.email);
      console.log(responseSendCode);

      if (responseSendCode) {
        setErrorMessageSendCode(
          "Ошибка отправки. Отключите VPN и попробуйте снова"
        );
        setIsActiveCodeBlock(false);
        setIsSendCode(false);
      }
    } catch (error) {
      console.error("Ошибка отправки код на email", error);
    }
  };

  console.log(123123);

  // const onSendEmail = async () => {
  //   if (!email.length) {
  //     setErrorMessageEmail("Введите почту");
  //     return;
  //   }

  //   await fetchEmail();
  // };

  // const onSendEmailCode = async () => {
  //   if (!code.length) {
  //     setErrorMessageEmailCode("Введите код");
  //     return;
  //   }

  //   try {
  //     const response = await axios.post(
  //       "http://localhost:8080/api/v1/mail/verification",
  //       { email, code }
  //     );
  //     const data: { code: number; message: string } = await response.data;

  //     switch (data.message) {
  //       case "SUCCESS":
  //         //
  //         break;
  //       case "EXPIRED":
  //         setErrorMessageEmailCode("Код истек, отправьте код на почту");
  //         break;
  //       case "INVALID":
  //         setErrorMessageEmailCode("Неверный код, проверьте его");
  //         break;
  //     }
  //   } catch (error) {
  //     console.log("Ошибка отправки запроса с кодом", error);
  //   }
  // };

  const handleClickChangeBtn = () => {};

  const onSubmit = async () => {};

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-3 flex flex-col justify-start items-center gap-3"
    >
      <label htmlFor="password" className="relative w-full">
        <p>{isActivePass ? "Новый пароль" : "Пароль"}</p>

        <div className="w-full flex justify-between items-center">
          <div className="w-full flex justify-between items-center max-w-60">
            <InputInForm
              disabled={!isActivePass}
              id="password"
              type="password"
              placeholder="********"
              {...register("newPassword", {
                required: "Поле обязательно для заполнения",
                minLength: {
                  value: 6,
                  message: "Минимум 6 символов",
                },
                maxLength: {
                  value: 50,
                  message: "Максимум 50 символов",
                },
              })}
            />
          </div>

          {isActivePass || (
            <EditBtnInForm onClick={() => setIsActivePass(true)}>
              Изменить
            </EditBtnInForm>
          )}
        </div>
        {/* <span className="absolute -bottom-4 left-0 z-10 text-nowrap text-red-600 text-xs">
          {errorMessagePass}
        </span> */}
      </label>

      {isActivePass && (
        <>
          <label htmlFor="secondPassword" className="relative w-full">
            <p>Подтвердите пароль</p>

            <div className="w-full flex justify-between items-center">
              <div className="w-full flex justify-between items-center max-w-60">
                <InputInForm
                  disabled={!isActivePass}
                  id="secondPassword"
                  type="password"
                  placeholder="********"
                  {...register("secondNewPassword", {
                    required: "Поле обязательно для заполнения",
                    minLength: {
                      value: 6,
                      message: "Минимум 6 символов",
                    },
                    maxLength: {
                      value: 50,
                      message: "Максимум 50 символов",
                    },
                  })}
                />
              </div>
            </div>
            {/* <span className="absolute -bottom-4 left-0 z-10 text-nowrap text-red-600 text-xs">
              {errorMessagePass}
            </span> */}
          </label>

          <label htmlFor="email" className="relative w-full">
            <p>Код подтверждения</p>

            <div className="w-full flex justify-between items-center">
              <div className="w-full flex justify-between items-center max-w-60">
                <InputInForm
                  disabled={!isActiveCodeBlock}
                  id="code"
                  type="number"
                  placeholder="Введите код"
                  {...register("code", {
                    required: "Поле обязательно для заполнения",
                    minLength: {
                      value: 6,
                      message: "Минимум 6 символов",
                    },
                    maxLength: {
                      value: 6,
                      message: "Максимум 6 символов",
                    },
                  })}
                />
              </div>

              {<EditBtnInForm onClick={onGetCode}>Отправить код</EditBtnInForm>}
            </div>
            <span className="absolute -bottom-4 left-0 z-10 text-nowrap text-red-600 text-xs">
              {errorMessageSendCode}
            </span>
          </label>
        </>
      )}
    </form>
  );
}
