"use client";

import { postProductAdmin } from "@/api";
import {
  colors,
  modalDeleteEditNewProduct,
  selectCategoryies,
  selectSiziesCloth,
} from "@/constans";
import { IUseInput, useInput } from "@/hooks/useInput";
import { IPostNewProduct } from "@/interfaces";
import { useFormNewProductStore } from "@/stores/useFormNewProduct";
import { useModalStore } from "@/stores/useModalStore";
import React, { ChangeEvent, FormEvent, useState } from "react";

interface IParams {
  minLength: number;
  maxLength: number;
}

interface ISizeAndQuantity {
  size: string;
  quantity: number;
}

export default function FormByModalNewProductAdmin() {
  const { data, updateData, updateIsValid } = useFormNewProductStore();
  const { openModal, addModalProps, modalsProps } = useModalStore();

  const [formData, setFormData] = useState<IPostNewProduct>(data);

  // const groupId = useInput("", { empty: true, minLength: 6, maxLength: 50 });
  const name = useInput("", { empty: true, minLength: 2, maxLength: 50 });
  const color = useInput("", { empty: true, minLength: 2, maxLength: 50 });
  const description = useInput("", {
    empty: true,
    minLength: 50,
    maxLength: 300,
  });
  const categoryName = useInput("", {
    empty: true,
    minLength: 2,
    maxLength: 50,
  });
  const price = useInput("", { empty: true, minLength: 2, maxLength: 50 });
  const size = useInput("", {
    empty: true,
  });
  const quantity = useInput("", { empty: true, minLength: 1, maxLength: 5 });

  const [sizeAndQuantity, setSizeAndQuantity] = useState<ISizeAndQuantity[]>(
    []
  );

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!selectedFiles || selectedFiles.length === 0) {
      console.log("Выберите файлы");
      return;
    }

    const fData = new FormData();

    setFormData((prev) => {
      const newFormData = {
        ...prev,
        sizes: sizeAndQuantity.map((item) => item.size),
        quantities: sizeAndQuantity.map((item) => item.quantity),
      };

      return newFormData;
    });

    fData.append("product", JSON.stringify(formData));

    selectedFiles.forEach((file) => {
      fData.append("files", file);
    });

    console.log(formData);
    console.log(fData.getAll("files"));

    const response = await postProductAdmin(fData); //response для обработки ошибки "товар с таким именем уже существует" и прочее

    console.log(response);
  };

  const handleChange = (
    e:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLTextAreaElement>
      | ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    updateData(formData);

    // const valid = validateForm();
    // if (valid) updateIsValid(true);
  };

  const errorsValidation = (inputName: IUseInput, params: IParams) => {
    if (inputName.dirty && (inputName.empty || inputName.minLength)) {
      return (
        <span className="text-red-600 text-xs">
          Мин.{" "}
          {params.minLength !== 2
            ? `${params.minLength} символа`
            : `${params.minLength} символов`}
        </span>
      );
    }
    if (inputName.dirty && inputName.maxLength) {
      return (
        <span className="text-red-600 text-xs">
          Макс. {params.maxLength} символов
        </span>
      );
    }
  };

  const validateForm = () => {
    let isValid = true;

    if (!name.inputValid) {
      isValid = false;
    }
    if (!color.inputValid) {
      isValid = false;
    }
    if (!description.inputValid) {
      isValid = false;
    }
    if (!price.inputValid) {
      isValid = false;
    }

    return isValid;
  };

  const addSizeAndQuantity = () => {
    if (!size.value || !quantity.value) {
      console.error("size или quantity не заданы");

      return;
    }

    const newSizeAndQuantity = [
      ...sizeAndQuantity,
      { size: size.value, quantity: +quantity.value },
    ];

    setSizeAndQuantity(newSizeAndQuantity);
  };

  const handleAddPropsModal = (index: number) => {
    addModalProps(modalDeleteEditNewProduct, {
      ...modalsProps[modalDeleteEditNewProduct],
      size: sizeAndQuantity[index].size,
      quantity: String(sizeAndQuantity[index].quantity),
    });

    console.log({
      size: sizeAndQuantity[index].size,
      quantity: String(sizeAndQuantity[index].quantity),
    });

    handleOpenModalDeleteEdit();
  };

  const handleOpenModalDeleteEdit = () => {
    openModal(modalDeleteEditNewProduct);
  };

  return (
    <div className="mt-3">
      <form onSubmit={handleSubmit} className="text-base flex flex-col gap-3">
        <div className="flex flex-col">
          <label>Название</label>
          <input
            type="text"
            placeholder="Название"
            name="name"
            className="px-2 py-1 rounded-md text-black"
            value={formData.name}
            onChange={(e) => {
              name.onChange(e);
              handleChange(e);
            }}
            onBlur={() => name.onBlur()}
          />
        </div>

        <div className="flex flex-col">
          <label>Описание</label>
          <textarea
            id="largeText"
            name="description"
            rows={5}
            cols={50}
            placeholder="Описание"
            className="p-2 rounded-md text-black"
            value={formData.description}
            onChange={(e) => {
              description.onChange(e);
              handleChange(e);
            }}
            onBlur={() => description.onBlur()}
          ></textarea>
        </div>

        <div className="flex justify-between items-start">
          <div className="flex flex-col">
            <label htmlFor="price">Цена</label>
            <input
              id="price"
              type="number"
              name="price"
              placeholder="Цена"
              maxLength={4}
              className="px-2 py-1 rounded-md max-w-20 text-black"
              value={formData.price}
              onChange={(e) => {
                price.onChange(e);
                handleChange(e);
              }}
              onBlur={() => price.onBlur()}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="color">Цвет</label>

            <div className="flex items-center gap-1">
              <select
                id="color"
                className="rounded-md text-black px-2 py-[3px] text-base max-h-10 overflow-auto"
                name="color"
                value={formData.color}
                onChange={(e) => {
                  color.onChange(e);
                  handleChange(e);
                }}
                onBlur={() => color.onBlur()}
              >
                <option value="">Выбрать</option>

                {colors.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.name}
                  </option>
                ))}
              </select>

              <div
                className="h-6 w-6 rounded-full border-2 border-white"
                style={{
                  backgroundColor: color.value,
                }}
              ></div>
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="category">Категория</label>

            <div className="flex items-center gap-3">
              <select
                id="category"
                className="rounded-md text-black px-2 py-[3px] text-base"
                name="categoryName"
                value={formData.categoryName}
                onChange={(e) => {
                  categoryName.onChange(e);
                  handleChange(e);
                }}
                onBlur={() => categoryName.onBlur()}
              >
                <option value="">Выбрать</option>

                {selectCategoryies.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-start gap-3">
            <div className="flex flex-col w-1/2">
              <label htmlFor="sizes">Размер</label>

              <select
                id="sizes"
                className="rounded-md text-black px-2 py-[3px] text-base"
                name="sizes"
                value={size.value}
                onChange={(e) => {
                  size.onChange(e);
                }}
                onBlur={() => size.onBlur()}
              >
                <option value="">Выбрать</option>

                {selectSiziesCloth.map((size) => (
                  <option key={size.name} value={size.name}>
                    {size.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col w-1/2">
              <label htmlFor="quantity">Количество</label>
              <input
                id="quantity"
                type="number"
                name="quantities"
                placeholder="Размер"
                maxLength={4}
                className="px-2 py-1 rounded-md text-black"
                value={quantity.value}
                onChange={(e) => {
                  quantity.onChange(e);
                }}
                onBlur={() => quantity.onBlur()}
              />
            </div>
          </div>

          <div className="flex justify-center">
            <button
              className="px-3 py-1 rounded-md bg-green-400 text-sm"
              onClick={addSizeAndQuantity}
            >
              Добавить размер | количество
            </button>
          </div>

          <div className="flex justify-start items-center gap-1 flex-wrap">
            {sizeAndQuantity.map((item, index) => (
              <button
                key={index}
                type="button"
                className="flex rounded-md max-w-20 bg-white text-black"
                onClick={() => handleAddPropsModal(index)}
              >
                <div className="text-center px-2 py-1 border-r">
                  {item.size}
                </div>
                <div className="text-center px-2 py-1 ">{item.quantity}</div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="files">Фотографии</label>
          <input id="files" type="file" multiple onChange={handleFileChange} />
        </div>

        <button
          type="submit"
          className="mt-3 px-3 py-1 rounded-md bg-green-400 text-sm"
        >
          Создать товар
        </button>
      </form>
    </div>
  );
}
