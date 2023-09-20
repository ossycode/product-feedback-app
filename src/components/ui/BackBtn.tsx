"use client";

import Button from "./button";
import Image from "next/image";
import { useRouter } from "next/navigation";

const BackBtn = () => {
  const router = useRouter();

  return (
    <button
      className="flex items-center gap-6 rounded-2xl w-max"
      onClick={() => router.back()}
    >
      <Image
        src={"/assets/shared/icon-arrow-left.svg"}
        alt="arrow back"
        width={8}
        height={8}
        className="aspect-auto w-auto h-auto"
      />
      <span className="text-[1.3rem] xl:text-heading4 font-bold text-light-gray-200">
        Go Back
      </span>
    </button>
  );
};

export default BackBtn;
