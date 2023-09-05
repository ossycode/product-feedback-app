import Link from "next/link";
import React from "react";

const Roadmap = () => {
  return (
    <div className="bg-clr-white min-w-[22.3rem] min-h-[17.8rem] rounded-2xl p-[2.3rem]">
      <div className="flex items-center justify-between">
        <h1 className="text-heading3 text-dark-grayish-400">Roadmap</h1>
        <Link href="#" className="text-dark-blue text-body3 underline ">
          View
        </Link>
      </div>

      <ul className="mt-[2.4rem] flex flex-col gap-2 list-disc pl-5 space-x-1  ">
        <li className="text-light-gray-200 marker:text-light-orange-500">
          <span className="text-sortButtonText">Planned</span>
          <span className="float-right font-bold">2</span>
        </li>
        <li className="text-light-gray-200 marker:text-light-purple-500">
          <span className="text-sortButtonText">In-Progress</span>
          <span className="float-right font-bold">3</span>
        </li>
        <li className="text-light-gray-200 marker:text-light-blue-500">
          <span className="text-sortButtonText ">Live</span>
          <span className="float-right font-bold">1</span>
        </li>
      </ul>
    </div>
  );
};

export default Roadmap;
