"use client";

import { categoriesList } from "@/constants";
import { useCurrentNavbarCategory } from "@/context/CategoryContext";
import useCustomRouter from "@/hooks/useCustomRouter";
import { useEffect, useState } from "react";

interface Items {
  id: number;
  title: string;
  selected: boolean;
  // key: string;
}

type Props = {
  handleSelected: (cat: string) => void;
};

// { handleSelected }: Props
const Categories = () => {
  const [listData, setListData] = useState<Array<Items>>(categoriesList);
  const [selected, setSelected] = useState<string>("All");

  const { setCategory } = useCurrentNavbarCategory();

  // setCurentCategory(selected);
  useEffect(() => {
    setCategory(selected);
    // pushQuery({ cat: selected.toLowerCase() });
  }, [selected, setCategory]);

  function handleSelect(item: Items) {
    const { id } = item;
    const temp = [...categoriesList];
    temp.forEach((element) => (element.selected = false));
    temp[id].selected = true;
    setSelected(temp[id].title);
    setListData(temp);
  }

  return (
    <div className="bg-clr-white min-w-[22.3rem] min-h-[17.8rem] rounded-2xl grid grid-cols-3  p-[2.3rem] gap-y-[1.3rem] gap-x-[0.5rem] lg:w-[25.5rem] lg:h-[17rem]">
      {listData.map((category) => (
        <button
          key={category.id}
          className={`rounded-2xl w-min h-min px-[1.6rem] py-[0.5rem] text-[1.3rem] font-semibold	 ${
            category.title === "Enhancement" ? "col-span-2  mr-8" : ""
          } ${
            category.selected
              ? "bg-dark-blue text-clr-white"
              : "bg-light-purple-100 text-dark-blue"
          }`}
          onClick={() => handleSelect(category)}
        >
          {category.title}
        </button>
      ))}
    </div>
  );
};

export default Categories;
