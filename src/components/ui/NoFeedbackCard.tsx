import Image from "next/image";
import React from "react";
import Button from "./button";

const NoFeedbackCard = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-6 min-w-[32.7rem] min-h-[46rem] bg-clr-white rounded-2xl p-[2.4rem] py-[7.6rem] px-[2-4rem]">
      <Image
        src={"assets/suggestions/illustration-empty.svg"}
        alt="empty illustration"
        width={100}
        height={100}
      />
      <h1 className="text-heading3 text-dark-grayish-400 text-center">
        There is no feedback yet.
      </h1>
      <p className="text-light-gray-200 text-[1.3rem] text-center">
        Got a suggestion? Found a bug that needs to be squashed? We love hearing
        about new ideas to improve our app.
      </p>
      <Button btnProps=" bg-light-purple-500 py-4 px-4 font-bold  w-max text-light-purple-100 text-[1.3rem] mt-6">
        + Add Feedback
      </Button>
    </div>
  );
};

export default NoFeedbackCard;
