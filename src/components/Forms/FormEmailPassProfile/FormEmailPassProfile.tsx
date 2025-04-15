"use client";

import EditBtnInForm from "@/components/ProfilePage/EditBtnInForm/EditBtnInForm";
import InputInForm from "@/components/ProfilePage/InputInForm/InputInForm";
import { IGetUserInfoInProfile } from "@/interfaces";
import React, { useState } from "react";

type Props = { profileData: IGetUserInfoInProfile };

export default function FormEmailPassProfile({ profileData }: Props) {
  const [isActiveMail, setIsActiveMail] = useState(false);
  const [isActivePass, setIsActivePass] = useState(false);

  return (
    <div className="w-full text-base">
      <div className="flex flex-col">
        <label htmlFor="email" className="w-full">
          <p>Почта</p>

          <div className="w-full flex justify-between items-center">
            <div className="w-full flex justify-between items-center max-w-72">
              <InputInForm
                disabled={!isActiveMail}
                id="email"
                type="email"
                placeholder={profileData.email}
              />
            </div>

            <EditBtnInForm />
          </div>
        </label>
      </div>

      <div className="mt-3 flex flex-col">
        <label htmlFor="password" className="w-full">
          <p>Пароль</p>

          <div className="w-full flex justify-between items-center">
            <div className="w-full flex justify-between items-center max-w-72">
              <InputInForm
                disabled={!isActivePass}
                id="password"
                type="password"
                placeholder="********"
              />
            </div>

            <EditBtnInForm />
          </div>
        </label>
      </div>
    </div>
  );
}
