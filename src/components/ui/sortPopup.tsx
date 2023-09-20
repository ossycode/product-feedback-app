"use client";

import { useCurrentCategory } from "@/context/CategoryContext";
// import { useCategory } from "@/context/CategoryContext";
import Image from "next/image";
import { useEffect, useState, useRef, useMemo } from "react";

interface Items {
  id: number;
  title: string;
  selected: boolean;
  key: string;
}
type Props = {
  ArrayData: Items[];
  popupProps: string;
  titleProps: string;
  sortbyProps: string;
  titleDivProps: string;
  imageSize: number;
  defaultValue: string | null;
  handleSelected: (cat: string) => void;
};

const SortPopup = ({
  ArrayData,
  popupProps,
  titleProps,
  titleDivProps,
  sortbyProps,
  imageSize,
  handleSelected,
  defaultValue = null,
}: Props) => {
  const [title, setTitle] = useState<string>();
  const [listData, setListData] = useState<Array<Items>>();
  const [isListOpen, setIsListOpen] = useState<boolean>(false);

  // const { setCurentCategory } = useCurrentCategory();

  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    handleDefaultValue();
  }, []);

  useEffect(() => {
    handleSelected(title!);
  }, [title, handleSelected]);

  useEffect(() => {
    window.addEventListener("click", (e) => {
      if (isListOpen === true) {
        if (ref.current?.closest("div")) {
          setIsListOpen(false);
        }
      }
    });
  });

  function handleDefaultValue() {
    const temp = [...ArrayData];
    temp.forEach((element) => {
      element.selected = false;
      if (element.title === defaultValue) {
        element.selected = true;
        setTitle(element.title);
      }
    });

    setListData(temp);
  }

  // function getTitle(): string {
  //   let title: string = "";
  //   listData.forEach((element) => {
  //     if (element.selected === true) title = element.title;
  //   });
  //   return title;
  // }

  function handleListOpen(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    e.stopPropagation();
    setIsListOpen(() => !isListOpen);
  }

  function handleSelect(item: Items) {
    const { title, id } = item;
    setTitle(title);
    const temp = [...ArrayData];
    temp.forEach((element) => (element.selected = false));
    temp[id].selected = true;
    setListData(temp);
  }
  return (
    <div className={` rounded-2xl popup-wrapper ${popupProps}`} ref={ref}>
      <div className={`w-full text-inherit rounded-lg ${titleDivProps}`}>
        <button
          onClick={handleListOpen}
          className={`flex w-full hover:border-xl items-center text-[1.5rem] ${titleProps}`}
        >
          <span className={`text-center block ${sortbyProps}`}>Sort by :</span>

          <span className=" flex items-center shrink-0 ">{title}</span>
          {isListOpen ? (
            <Image
              src="/assets/shared/icon-arrow-up.svg"
              alt="arrow up"
              width={imageSize}
              height={imageSize}
              className="aspect-auto w-auto h-auto"
            />
          ) : (
            <Image
              src="/assets/shared/icon-arrow-down.svg"
              alt="arrow down"
              width={imageSize}
              height={imageSize}
              className="aspect-auto w-auto h-auto"
            />
          )}
        </button>
      </div>
      {isListOpen && (
        <div role="list" className="rounded-2xl relative ">
          <div className="absolute rounded-2xl divide-y divide-rgba(58, 67, 116, 0.15) inset-y-0 right-0 w-full box-shadow top-1">
            {listData!.map((item) => (
              <button
                key={item.id}
                onClick={() => handleSelect(item)}
                className="text-light-gray-200  flex item-center justify-between bg-ghost-white-100 px-10 py-5  md:text-[1.6rem] font-normal w-full first-of-type:rounded-t-2xl last-of-type:rounded-b-2xl hover:text-light-purple-500 gap-4"
              >
                {item.title}
                {item.selected && (
                  <Image
                    src="/assets/shared/icon-check.svg"
                    alt="check mark"
                    width={10}
                    height={10}
                    className="mt-2 aspect-auto w-auto h-auto"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SortPopup;
