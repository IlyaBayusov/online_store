import React from "react";
import * as Tabs from "@radix-ui/react-tabs";
import Image from "next/image";
import img_tableSizesCloth from "../../../public/img_tableSizesCloth.jpg";
import img_tableSizesShoes from "../../../public/img_tableSizesShoes.jpg";
import { IPostAvailability } from "@/interfaces";
import { getColorAvailability, getSwithcColorAvailability } from "@/utils";

type Props = {
  category: string;
  description: string;
  avails: IPostAvailability[];
};

export default function ProductTabs({ category, description, avails }: Props) {
  const showElemAvails = () => {
    if (!avails)
      return (
        <span className="mt-3 text-base leading-none text-[#B3B3B3]">
          Список пуст
        </span>
      );

    return (
      <div className="w-full overflow-x-auto">
        <table className="w-[130vw] table-fixed text-base border border-white border-collapse">
          <thead className="text-left">
            <th className="border border-white px-3 py-1">Адрес</th>
            <th className="border border-white px-3 py-1">Время работы</th>
            <th className="border border-white px-3 py-1">Наличие</th>
          </thead>

          <tbody>
            {avails.map((avail, index) => (
              <tr className="border-collapse" key={index}>
                <td className="border border-white px-3 py-1">
                  {avail.location}
                </td>
                <td className="border border-white px-3 py-1">{`${avail.openTime} - ${avail.closedTime}`}</td>
                <td className="border border-white px-3 py-1">
                  <div className="flex items-center flex-nowrap gap-2">
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{
                        backgroundColor: `${getSwithcColorAvailability(avail)}`,
                      }}
                    ></div>

                    <p className="">{avail.status}</p>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <Tabs.Root className="flex flex-col w-full mt-3" defaultValue="description">
      <Tabs.List className="w-full overflow-x-auto hide-scrollbar-x flex justify-start items-center gap-4">
        <Tabs.Trigger
          className="text-nowrap uppercase pb-0.5 border-b-2 border-white data-[state=active]:text-[#FF9595] data-[state=active]:border-[#FF9595]"
          value="description"
        >
          Описание
        </Tabs.Trigger>
        <Tabs.Trigger
          className="text-nowrap uppercase pb-0.5 border-b-2 border-white data-[state=active]:text-[#FF9595] data-[state=active]:border-[#FF9595]"
          value="tableSizes"
        >
          Таблица размеров
        </Tabs.Trigger>
        <Tabs.Trigger
          className="text-nowrap uppercase pb-0.5 border-b-2 border-white data-[state=active]:text-[#FF9595] data-[state=active]:border-[#FF9595]"
          value="availability"
        >
          Наличие
        </Tabs.Trigger>
        <Tabs.Trigger
          className="text-nowrap uppercase pb-0.5 border-b-2 border-white data-[state=active]:text-[#FF9595] data-[state=active]:border-[#FF9595]"
          value="care"
        >
          Уход
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content className="mt-3" value="description">
        <p className="whitespace-pre-line text-base">{description}</p>
      </Tabs.Content>
      <Tabs.Content className="mt-3" value="tableSizes">
        <Image
          src={
            category.toLowerCase() === "одежда"
              ? img_tableSizesCloth
              : img_tableSizesShoes
          }
          alt="Таблица размеров"
        />
      </Tabs.Content>
      <Tabs.Content className="w-full mt-3" value="availability">
        {showElemAvails()}
      </Tabs.Content>
      <Tabs.Content className="mt-1" value="care">
        <div className="text-base">
          <p className="mt-2">Главное правило ухода - не занашивать изделие</p>
          <p className="mt-2">
            <span className="italic">Одежда.</span> Стирать не менее 1 раза
            каждые 3-5 дней при регулярной носке
          </p>
          <p className="mt-2">
            <span className="italic">Обувь.</span> Давать отдыхать не менее 1
            суток каждые 5 дней при регулярной носке
          </p>
          <p className="mt-2">
            <span className="italic">Костюм и пальто.</span> Химчистка
            желательна каждые полгода при регулярной носке
          </p>
          <p className="mt-2">
            ! Изделия с принтами и из чистых натуральных тканей НЕ стирать на
            отжиме больше, чем 600-800 оборотов в минуту
          </p>
          <p className="mt-2">
            ! Изделия с ручными вышивками и нашивками НЕ стирать с изделиями с
            металлическими замками и другими элементами, которые могут повредить
          </p>
        </div>
      </Tabs.Content>
    </Tabs.Root>
  );
}
