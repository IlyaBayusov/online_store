"use client";

import { putUserEmailInProfile } from "@/api";
import EditBtnInForm from "@/components/ProfilePage/EditBtnInForm/EditBtnInForm";
import InputInForm from "@/components/ProfilePage/InputInForm/InputInForm";
import { IGetUserInfoInProfile } from "@/interfaces";
import { useProfileInfoStore } from "@/stores/useProfileInfoStore";
import axios, { AxiosError } from "axios";
import React, { useEffect, useState } from "react";

type Props = { profileData: IGetUserInfoInProfile };

export default function FormEmailPassProfile({ profileData }: Props) {
  const newProfileData = useProfileInfoStore((state) => state.newProfileData);
  const setNewProfileData = useProfileInfoStore(
    (state) => state.setNewProfileData
  );

  const [isActiveEmail, setIsActiveEmail] = useState<boolean>(false);
  const [isActivePass, setIsActivePass] = useState<boolean>(false);

  const [isActiveCodeBlock, setIsActiveCodeBlock] = useState<boolean>(false);

  const [email, setEmail] = useState<string>("");
  const [code, setCode] = useState<string>("");

  const [errorMessageEmail, setErrorMessageEmail] = useState<string>("");
  const [sendCodeEmail, setSendCodeEmail] = useState<string>("");
  const [errorMessageEmailCode, setErrorMessageEmailCode] =
    useState<string>("");

  const [errorMessagePass, setErrorMessagePass] = useState<string>("");

  useEffect(() => {
    if (newProfileData.email) {
      setEmail(newProfileData.email);
    }
  }, [newProfileData.email]);

  const fetchEmail = async () => {
    setErrorMessageEmail("");

    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const response = await axios.post(
        "http://localhost:8080/api/v1/users/email/check",
        {
          field: email,
        }
      );
      const data: { code: number; message: string } = await response.data;

      if (data.code === 200) {
        setSendCodeEmail("Код отправлен");
        setIsActiveCodeBlock(true);
        setErrorMessageEmail("");

        try {
          await axios.get(`http://localhost:8080/api/v1/mail?email=${email}`);
        } catch (error) {
          setSendCodeEmail("");
          setErrorMessageEmail("Ошибка отправки, попробуйте снова");
          console.log("Ошибка отправки запроса на подтверждение кода", error);
        }
      }
    } catch (error) {
      const err = error as AxiosError;

      if (err.status === 409) {
        setErrorMessageEmail("Такой email уже сушествует");
      } else {
        console.error("Ошибка проверки email", error);
      }
    }
  };

  const onSendEmail = async () => {
    if (!email.length) {
      setErrorMessageEmail("Введите почту");
      return;
    }

    await fetchEmail();
  };

  const onSendEmailCode = async () => {
    if (!code.length) {
      setErrorMessageEmailCode("Введите код");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/mail/verification",
        { email, code }
      );
      const data: { code: number; message: string } = await response.data;

      switch (data.message) {
        case "SUCCESS":
          const response = await putUserEmailInProfile({
            newEmail: email,
            code,
          });
          if (response?.status === 204) {
            setSendCodeEmail("Почта изменена");
            setIsActiveCodeBlock(false);
            setErrorMessageEmail("");

            setNewProfileData({ ...newProfileData, email });

            setIsActiveEmail(false);
            return;
          }
          break;
        case "EXPIRED":
          setErrorMessageEmailCode("Код истек, отправьте код на почту");
          break;
        case "INVALID":
          setErrorMessageEmailCode("Неверный код, проверьте его");
          break;
      }
    } catch (error) {
      console.log("Ошибка отправки запроса с кодом", error);
    }
  };

  const onSubmitPass = async () => {};

  return (
    <div className="w-full text-base">
      <div className="flex flex-col justify-start items-center gap-3">
        <label htmlFor="email" className="relative w-full">
          <p>Почта</p>

          <div className="w-full flex justify-between items-center">
            <div className="w-full flex justify-between items-center max-w-72">
              <InputInForm
                disabled={!isActiveEmail}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                type="email"
                placeholder={profileData.email}
              />
            </div>

            {!isActiveEmail ? (
              <EditBtnInForm onClick={() => setIsActiveEmail(true)}>
                Изменить
              </EditBtnInForm>
            ) : (
              <EditBtnInForm onClick={onSendEmail}>Отправить код</EditBtnInForm>
            )}
          </div>
          {sendCodeEmail ? (
            <span className="absolute -bottom-4 left-0 z-10 text-nowrap text-green-500 text-xs">
              {sendCodeEmail}
            </span>
          ) : (
            <span className="absolute -bottom-4 left-0 z-10 text-nowrap text-red-600 text-xs">
              {errorMessageEmail}
            </span>
          )}
        </label>

        {isActiveCodeBlock && (
          <label htmlFor="email" className="relative w-full">
            <p>Код подтверждения</p>

            <div className="w-full flex justify-between items-center">
              <div className="w-full flex justify-between items-center max-w-72">
                <InputInForm
                  disabled={!isActiveCodeBlock}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  id="code"
                  type="number"
                  placeholder="Введите код"
                />
              </div>

              <EditBtnInForm onClick={onSendEmailCode}>Готово</EditBtnInForm>
            </div>
            <span className="absolute -bottom-4 left-0 z-10 text-nowrap text-red-600 text-xs">
              {errorMessageEmailCode}
            </span>
          </label>
        )}
      </div>

      <div className="mt-3 flex flex-col">
        <label htmlFor="password" className="relative w-full">
          <p>Пароль</p>

          <div className="w-full flex justify-between items-center">
            <div className="w-full flex justify-between items-center max-w-72">
              <InputInForm
                disabled={!isActivePass}
                id="password"
                type="password"
                placeholder="********"
                onClick={onSubmitPass}
              />
            </div>

            <EditBtnInForm>Изменить</EditBtnInForm>
          </div>
          <span className="absolute -bottom-4 left-0 z-10 text-nowrap text-red-600 text-xs">
            {errorMessagePass}
          </span>
        </label>
      </div>
    </div>
  );
}
