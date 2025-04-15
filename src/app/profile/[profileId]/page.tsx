import FormDetailedInfoProfile from "@/components/Forms/FormDetailedInfoProfile/FormDetailedInfoProfile";
import FormEmailPassProfile from "@/components/Forms/FormEmailPassProfile/FormEmailPassProfile";
import HeaderInfo from "@/components/ProfilePage/HeaderInfo/HeaderInfo";
import { IGetUserInfoInProfile } from "@/interfaces";
import { notFound } from "next/navigation";
import React from "react";

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
    `http://localhost:8080/api/v1/users/${profileId}`,
    { cache: "no-store" }
  );

  if (!response.ok) {
    console.error("Ошибка получения данных о пользователе");
    return notFound();
  }

  const data: IGetUserInfoInProfile = await response.json();
  console.log(data);

  return (
    <div className="container px-3 pt-3">
      <div className="w-full flex flex-col items-center gap-3">
        <HeaderInfo data={data} />

        <div className="w-full pb-5 border-b border-white">
          <div className="flex justify-center mt-3 mb-5">
            <h2 id="subTitleLine" className="relative uppercase font-medium">
              Подробная информация
            </h2>
          </div>

          <FormDetailedInfoProfile profileData={data} />
        </div>

        <div className="w-full mt-2">
          <FormEmailPassProfile profileData={data} />
        </div>
      </div>
    </div>
  );
}
