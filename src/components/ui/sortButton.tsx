"use client";
import Image from "next/image";
import { useState } from "react";

const SortButton = ({ children, size, borderR, border }: any) => {
  const [btnValue, setBtnValue] = useState();
  return (
    <button
      className={`text-light-gray-200 text-sortButtonText flex item-center justify-between bg-clr-white w-[42.1rem] h-[4.7] px-9 py-5  ${borderR} ${border} sortButtonBorder`}
      value={btnValue}
    >
      {children}
    </button>
  );
};

export default SortButton;
