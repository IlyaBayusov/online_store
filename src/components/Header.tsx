import { useModalStore } from "@/stores/useModalStore";
import React from "react";
import { CgProfile } from "react-icons/cg";
import { FiMenu } from "react-icons/fi";

type Props = {};

export default function Header({}: Props) {
  const { isOpen, openModal, closeModal } = useModalStore();

  const handleModal = () => {
    if (isOpen) closeModal();
    else openModal();
  };

  return (
    <div className="py-1 bg-black w-full">
      <div className="container px-2">
        <div className="flex justify-between items-center">
          <div onClick={handleModal}>
            <FiMenu size={"1.3rem"} />
          </div>

          <h1 className="text-lg text-white font-bold">MAN'S</h1>
          <CgProfile size={"1.2rem"} />
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
