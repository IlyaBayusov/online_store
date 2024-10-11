"use client";

import { useModalStore } from "@/stores/useModalStore";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoClose } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import img_test_shoes1 from "../../../public/testImg/img_test_shoes1.png";

type Props = {};

export default function ModalNav({}: Props) {
  const { isOpen, closeModal } = useModalStore();

  return (
    <div
      className={
        `fixed top-0 -left-full z-[1000] w-full h-full transition-transform duration-700 overflow-y-hidden ` +
        (isOpen ? "translate-x-full" : "")
      }
    >
      <div className={"container absolute top-0 left-0 z-10 h-full"}>
        <div className="flex flex-col h-full w-full bg-[#121212] p-3">
          <div className="flex justify-end">
            <div onClick={() => closeModal()}>
              <IoClose
                className="text-[#B3B3B3] w-5 h-5"
                viewBox="75 75 350 350"
              />
            </div>
          </div>

          <div className="flex flex-col mt-3 overflow-y-auto">
            <input
              type="text"
              placeholder="Поиск"
              className="py-2 px-4 bg-[#3A3A3A] text-white rounded-md"
            />

            <nav className="mt-6">
              <ul className="flex flex-col gap-3">
                <li className="bg-[#3A3A3A] rounded-md px-2 py-4">
                  <Link href="#" className="flex justify-between items-center">
                    <p className="uppercase">Новинки</p>
                    <Image
                      src={img_test_shoes1}
                      alt="Новинки"
                      className="max-w-10 max-h-10"
                    />
                  </Link>
                </li>
                <li className="bg-[#3A3A3A] rounded-md px-2 py-4">
                  <Link href="#" className="flex justify-between items-center">
                    <p className="uppercase">Новинки</p>
                    <Image
                      src={img_test_shoes1}
                      alt="Одежда"
                      className="max-w-10 max-h-10"
                    />
                  </Link>
                </li>
                <li className="bg-[#3A3A3A] rounded-md px-2 py-4">
                  <Link href="#" className="flex justify-between items-center">
                    <p className="uppercase">Новинки</p>
                    <Image
                      src={img_test_shoes1}
                      alt="Обувь"
                      className="max-w-10 max-h-10"
                    />
                  </Link>
                </li>
                <li className="bg-[#3A3A3A] rounded-md px-2 py-4">
                  <Link href="#" className="flex justify-between items-center">
                    <p className="uppercase">Новинки</p>
                    <Image
                      src={img_test_shoes1}
                      alt="Аксессуары"
                      className="max-w-10 max-h-10"
                    />
                  </Link>
                </li>
              </ul>
            </nav>

            <div className="mt-3">
              <Link href="#" className="flex items-center my-3 text-[#B3B3B3]">
                <FaPhoneAlt className="mr-3" />
                <p>+375 (44) 123 11 11</p>
              </Link>
              <Link href="#" className="flex items-center my-3 text-[#B3B3B3]">
                <FaPhoneAlt className="mr-3" />
                <p>+375 (44) 123 11 11</p>
              </Link>
              <Link href="#" className="flex items-center my-3 text-[#B3B3B3]">
                <FaPhoneAlt className="mr-3" />
                <p>+375 (44) 123 11 11</p>
              </Link>
              <Link href="#" className="flex items-center my-3 text-[#B3B3B3]">
                <FaPhoneAlt className="mr-3" />
                <p>+375 (44) 123 11 11</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
