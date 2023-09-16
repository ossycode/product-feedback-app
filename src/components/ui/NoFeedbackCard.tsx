import Image from "next/image";
import React from "react";
import Button from "./button";
import Link from "next/link";

const NoFeedbackCard = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-6 sm:min-w-[32.7rem] sm:min-h-[46rem] bg-clr-white rounded-2xl p-[2.4rem] py-[7.6rem] px-[2-4rem] h-full ">
      <Image
        src={"assets/suggestions/illustration-empty.svg"}
        alt="empty illustration"
        width={150}
        height={150}
        className="object-contain mb-20"
      />
      <h1 className="text-heading3 text-dark-grayish-400 text-center lg:text-heading1">
        There is no feedback yet.
      </h1>
      <p className="text-light-gray-200 text-[1.3rem] text-center lg:text-body1">
        Got a suggestion? Found a bug that needs to be squashed? <br /> We love
        hearing about new ideas to improve our app.
      </p>
      <Link
        className=" bg-light-purple-500 py-4 px-4 font-bold  w-max text-light-purple-100 text-[1.3rem] mt-6 lg:px-8 lg:text-[1.4rem] rounded-2xl"
        href={"/dashboard/feedback/new"}
      >
        + Add Feedback
      </Link>
    </div>
  );
};

export default NoFeedbackCard;
