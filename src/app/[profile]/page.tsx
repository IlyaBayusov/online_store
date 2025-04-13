import DetailedInfo from "@/components/ProfilePage/DetailedInfo/DetailedInfo";
import EditBtnInForm from "@/components/ProfilePage/EditBtnInForm/EditBtnInForm";
import React from "react";
import { HiOutlinePencilSquare } from "react-icons/hi2";

export default async function Profile({
  params,
}: {
  params: { profile: string };
}) {
  const { profile } = params;

  console.log(profile);

  return (
    <div className="container px-3 pt-3">
      <div className="w-full flex flex-col items-center gap-3">
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
              <p>Name</p>
              <p>Email@mail.ru</p>
            </div>
          </div>
        </div>

        <DetailedInfo />

        <div className="w-full mt-2">
          <form className="w-full text-base">
            <div className="flex flex-col">
              <label htmlFor="email" className="w-full">
                <p>Почта</p>

                <div className="w-full flex justify-between items-center">
                  <input id="email" type="email" />
                  <EditBtnInForm />
                </div>
              </label>
            </div>

            <div className="flex flex-col">
              <label htmlFor="password" className="w-full">
                <p>Пароль</p>

                <div className="w-full flex justify-between items-center">
                  <input id="password" type="password" />
                  <EditBtnInForm />
                </div>
              </label>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
