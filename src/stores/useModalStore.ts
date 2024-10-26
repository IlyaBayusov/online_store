import { StaticImageData } from "next/image";
import { create } from "zustand";

export interface IModalStore {
  modals: { [key: string]: boolean };
  modalsProps: {
    [key: string]: INextCategoryProps[] | ICartDeleteProductProps;
  };

  openModal: (modalName: string) => void;
  closeModal: (modalName: string) => void;
  addModalProps: (
    modalName: string,
    modProps: INextCategoryProps[] | ICartDeleteProductProps
  ) => void;
}

export interface INextCategoryProps {
  id: number;
  name: string;
  img: StaticImageData;
  urlName: string;
}

export interface ICartDeleteProductProps {
  cartItemId: number;
  isDeleted: boolean;
}

export const useModalStore = create<IModalStore>((set) => ({
  modals: {},
  modalsProps: {},

  openModal: (modalName: string) =>
    set((state) => ({ modals: { ...state.modals, [modalName]: true } })),
  closeModal: (modalName: string) =>
    set((state) => ({ modals: { ...state.modals, [modalName]: false } })),
  addModalProps: (
    modalName: string,
    modProps: INextCategoryProps[] | ICartDeleteProductProps
  ) =>
    set((state) => ({
      modalsProps: { ...state.modalsProps, [modalName]: modProps },
    })),
}));
