"use client";

import { filtersUpDown } from "@/constans";
import { IFiltersUpDown } from "@/interfaces";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useState } from "react";
import { HiMiniArrowsUpDown } from "react-icons/hi2";

type Props = {
  keyName: string;
};

export default function SortsDDM({ keyName }: Props) {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [filterObj, setFilterObj] = useState<IFiltersUpDown>(filtersUpDown[0]);

  return (
    <DropdownMenu.Root open={isActive} onOpenChange={setIsActive}>
      <DropdownMenu.Trigger asChild>
        <div className="py-1 flex justify-between items-center">
          <button
            className="flex items-center gap-1 py-0.5 text-sm h-full"
            aria-label="Customise options"
          >
            <HiMiniArrowsUpDown className="h-5 w-5 text-white" />

            <p>{filterObj.name}</p>
          </button>
        </div>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="relative left-0 top-0 z-[1000] min-w-[220px] rounded-md bg-[#121212] border border-white border-opacity-30 "
          sideOffset={5}
        >
          <div className="max-h-43 overflow-y-scroll hide-scrollbar-y">
            {filtersUpDown.map((item) => (
              <div key={item.id}>
                <DropdownMenu.Item
                  className="group text-sm px-3 cursor-pointer"
                  onClick={() => {
                    setFilterObj(item);
                  }}
                >
                  <p className="py-1 rounded-md">{item.name}</p>
                </DropdownMenu.Item>
              </div>
            ))}
          </div>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
