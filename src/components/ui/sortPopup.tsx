"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";

interface Items {
  id: number;
  title: string;
  selected: boolean;
  key: string;
}
type Props = {
  ArrayData: Items[];
  popupProps: any;
  hoverProps: any;
  imageSize: number;
};

const SortPopup = (props: Props) => {
  const [listData, setListData] = useState<Array<Items>>(props.ArrayData);
  const [isListOpen, setIsListOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(getTitle());

  const ref = useRef<HTMLDivElement | null>(null);

  function getTitle(): string {
    let title: string = "";
    listData.forEach((element) => {
      if (element.selected === true) title = element.title;
    });
    return title;
  }

  useEffect(() => {
    window.addEventListener("click", (e) => {
      if (isListOpen === true) {
        if (ref.current?.closest("div")) {
          setIsListOpen(false);
        }
      }
    });
  });

  function handleListOpen(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    e.stopPropagation();
    setIsListOpen(() => !isListOpen);
  }

  function handleSelect(item: Items) {
    const { title, id } = item;

    setTitle(title);
    const temp = [...props.ArrayData];

    temp.forEach((element) => (element.selected = false));
    temp[id].selected = true;
    setListData(temp);
  }
  return (
    <div className={` rounded-2xl popup-wrapper ${props.popupProps}`} ref={ref}>
      <div className="w-full text-inherit rounded-lg ">
        <button
          onClick={handleListOpen}
          className={`flex w-full px-9 py-5 hover:border-xl ${props.hoverProps}`}
        >
          <span>Sort by : </span>&nbsp;
          <span className="font-bold flex items-center justify-between gap-2 ">
            {" "}
            {title}
            {isListOpen ? (
              <Image
                src="/assets/shared/icon-arrow-up.svg"
                alt="arrow up"
                width={props.imageSize}
                height={props.imageSize}
              />
            ) : (
              <Image
                src="/assets/shared/icon-arrow-down.svg"
                alt="arrow down"
                width={props.imageSize}
                height={props.imageSize}
              />
            )}
          </span>
        </button>
      </div>
      {isListOpen && (
        <div
          role="list"
          className="shadow-[0px 10px 40px -7px rgba(55, 63, 104, 0.35)] rounded-2xl divide-y divide-rgba(58, 67, 116, 0.15) relative "
        >
          <div className="absolute shadow-[0px 10px 40px -7px rgba(55, 63, 104, 0.35)] rounded-2xl divide-y divide-rgba(58, 67, 116, 0.15) inset-y-0 right-0 ">
            {listData.map((item) => (
              <button
                key={item.id}
                onClick={() => handleSelect(item)}
                className={`text-light-gray-200  flex item-center justify-between bg-clr-white px-6 py-5  sortButtonBorder w-full first-of-type:rounded-t-2xl last-of-type:rounded-b-2xl hover:text-light-purple-500 gap-4 `}
                value={item.title}
              >
                {item.title}
                {item.selected && (
                  <Image
                    src="/assets/shared/icon-check.svg"
                    alt="check mark"
                    width={props.imageSize}
                    height={props.imageSize}
                    className="mt-2"
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
