import React from "react";
import Button from "./button";
import { categoriesList } from "@/constants";

const Categories = () => {
  return (
    <div className="bg-clr-white min-w-[22.3rem] min-h-[17.8rem] rounded-2xl grid grid-cols-3  p-[2.3rem] gap-y-[1.3rem] gap-x-[0.5rem] lg:w-[25.5rem] lg:h-[17rem]">
      {categoriesList.map((category) => (
        <button
          key={category.id}
          className={`rounded-2xl w-min h-min px-[1.6rem] py-[0.5rem] text-[1.3rem] font-semibold	 ${
            category.title === "Enhancement" ? "col-span-2  mr-8" : ""
          } ${
            category.selected
              ? "bg-dark-blue text-clr-white"
              : "bg-light-purple-100 text-dark-blue"
          }`}
        >
          {category.title}
        </button>
      ))}
    </div>
  );
};

export default Categories;