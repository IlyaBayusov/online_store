"use client";

import { IGetUserInfoInProfile } from "@/interfaces";
import { useProfileInfoStore } from "@/stores/useProfileInfoStore";
import React from "react";
import { HiOutlinePencilSquare } from "react-icons/hi2";

type Props = { data: IGetUserInfoInProfile };

export default function HeaderInfo({ data }: Props) {
  const newProfileData = useProfileInfoStore((state) => state.newProfileData);

  const showName = (profileData: IGetUserInfoInProfile) => {
    if (profileData.firstName && profileData.lastName) {
      return `${profileData.firstName} ${profileData.lastName} (${profileData.username})`;
    } else {
      return `${profileData.username}`;
    }
  };

  console.log(newProfileData, data);

  return (
    <div className="w-full">
      <div className="flex flex-nowrap items-center gap-3">
        <div className="relative w-16 h-16 overflow-hidden">
          {/* <Image src="" alt="" className="w-16 h-16 rounded-full" /> */}
          <div className="w-16 h-16 rounded-full bg-red-500"></div>

          <div className="absolute top-0 left-0 z-10 w-full h-full rounded-full bg-black bg-opacity-60">
            <div className="relative w-full h-full">
              <HiOutlinePencilSquare className="w-6 h-6 absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2" />
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-start gap-1 text-base">
          <p>
            {showName(
              Object.keys(newProfileData).length ? newProfileData : data
            )}
          </p>
          <p>{newProfileData.email || data.email}</p>
        </div>
      </div>
    </div>
  );
}
