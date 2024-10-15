"use client";

import { modalNav } from "@/constans";
import { useModalStore } from "@/stores/useModalStore";
import React from "react";
import { CgProfile } from "react-icons/cg";
import { FiMenu } from "react-icons/fi";

type Props = {};

export default function Header({}: Props) {
  const { openModal } = useModalStore();

  return (
    <div className="py-2 bg-black w-full">
      <div className="container px-3">
        <div className="flex justify-between items-center">
          <div onClick={() => openModal(modalNav)}>
            <FiMenu className="h-6 w-6" />
          </div>

          <h1
            id="headerTitle"
            className="text-xl text-white font-bold leading-5"
          >
            MAN'S
          </h1>
          <CgProfile className="h-5 w-5" />
          {/* <div className="flex items-center text-[#969696] text-base">
            <button>Log in</button>
            <span>/</span>
            <button>Sign up</button>
          </div> */}
        </div>
      </div>
    </div>
  );
}
