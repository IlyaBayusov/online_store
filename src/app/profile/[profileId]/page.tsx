import FormDetailedInfoProfile from "@/components/Forms/FormDetailedInfoProfile/FormDetailedInfoProfile";
import { IGetUserInfoInProfile } from "@/interfaces";
import { notFound } from "next/navigation";
import React from "react";
import { HiOutlinePencilSquare } from "react-icons/hi2";

export default async function ProfileId({
  params,
}: {
  params: { profileId: string };
}) {
  const { profileId } = params;

  if (!profileId) {
    console.error("Ошибка получения id юзера");
    return notFound();
  }

  const response = await fetch(
    `http://localhost:8080/api/v1/users/${profileId}`
  );

  if (!response.ok) {
    console.error("Ошибка получения данных о пользователе");
    return notFound();
  }

  const data: IGetUserInfoInProfile = await response.json();

  const showName = () => {
    if (data.firstName && data.lastName) {
      return `${data.firstName} ${data.lastName} (${data.username})`;
    } else {
      return `${data.username}`;
    }
  };

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
              <p>{showName()}</p>
              <p>{data.email}</p>
            </div>
          </div>
        </div>

        <div className="w-full pb-5 border-b border-white">
          <div className="flex justify-center mt-3 mb-5">
            <h2 id="subTitleLine" className="relative uppercase font-medium">
              Подробная информация
            </h2>
          </div>

          <FormDetailedInfoProfile profileData={data} />
        </div>

        <div className="w-full mt-2">
          <form className="w-full text-base">
            <div className="flex flex-col">
              <label htmlFor="email" className="w-full">
                <p>Почта</p>

                <div className="w-full flex justify-between items-center">
                  <input
                    disabled={true}
                    id="email"
                    type="email"
                    placeholder={data.email}
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
        </div>
      </div>
    </div>
  );
}
