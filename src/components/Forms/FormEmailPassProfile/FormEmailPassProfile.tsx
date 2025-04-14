import { IGetUserInfoInProfile } from "@/interfaces";
import React from "react";

type Props = { profileData: IGetUserInfoInProfile };

export default function FormEmailPassProfile({ profileData }: Props) {
  return (
    <form className="w-full text-base">
      <div className="flex flex-col">
        <label htmlFor="email" className="w-full">
          <p>Почта</p>

          <div className="w-full flex justify-between items-center">
            <input
              disabled={true}
              id="email"
              type="email"
              placeholder={profileData.email}
            />
            {/* <EditBtnInForm cb={} /> */}
          </div>
        </label>
      </div>

      <div className="flex flex-col">
        <label htmlFor="password" className="w-full">
          <p>Пароль</p>

          <div className="w-full flex justify-between items-center">
            <input
              disabled={true}
              id="password"
              type="password"
              placeholder="********"
            />
            {/* <EditBtnInForm type="submit" /> */}
          </div>
        </label>
      </div>
    </form>
  );
}
