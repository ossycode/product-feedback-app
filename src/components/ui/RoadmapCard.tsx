"use client";

import { calculateTotalComment } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Props {
  svgColor: string;
  borderToColor: string;
  category: string;
  title: string;
  description: string;
  status: string;
  upvotes: number;
  comments: any[];
  id: number;
}
const RoadmapCard = ({
  svgColor,
  borderToColor,
  category,
  title,
  description,
  status,
  upvotes,
  comments,
  id,
}: Props) => {
  const totalComments = calculateTotalComment(comments);
  const [totalVotes, setTotalVotes] = useState<number>(upvotes);
  const pathname = usePathname();

  useEffect(() => {
    async function handleUpvotes() {
      try {
        await fetch(`/api/feedbacks/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            upvotes: totalVotes,
            path: pathname,
          }),
        });
      } catch (err: Error | any) {
        console.log(`${err.code}: ${err}`);
      }
    }
    handleUpvotes();
  }, [id, pathname, upvotes, totalVotes]);
  return (
    // sm:min-w-[32.7rem]
    <div
      className={`min-w-[29rem] w-full md:min-w-[22.3rem] lg:min-w-[28rem] xl:min-w-[35rem] md:h-[25.1rem] lg:h-[27.2rem]   sm:h-[23.3rem] bg-clr-white  p-[2.4rem]  border-t-[0.6rem] border-top flex flex-col gap-[1.7rem]  ${borderToColor}`}
    >
      <ul role="list" className=" flex items-center gap-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="8"
          height="8"
          viewBox="0 0 8 8"
          fill="none"
        >
          <circle cx="4" cy="4" r="4" fill={`${svgColor}`} />
        </svg>
        <li className="text-[1.3rem] text-light-gray-200 lg:text-sortButtonText ">
          {status}
        </li>
      </ul>

      <Link
        className="flex flex-col items-start "
        href={`/dashboard/feedback/${id}`}
      >
        <h1 className="text-dark-grayish-400 tracking-[-0.0181rem] font-bold text-[1.3rem] md:text-heading5 lg:text-heading3 hover:text-dark-blue">
          {title}
        </h1>
        <p className="text-[1.3rem] text-light-gray-200 mt-[0.4rem] md:mt-4 lg:text-sortButtonText">
          {description}
        </p>
        <p className="bg-light-purple-100 text-dark-blue py-2 px-4 text-[1.3rem] font-semibold rounded-2xl mt-[1.2rem] md:mt-9 leading-none">
          {category}
        </p>
      </Link>

      <div className="flex items-end justify-between">
        <button
          className="flex items-center justify-center gap-4 bg-light-purple-100 py-[0.6rem] px-[1.6rem] w-max  rounded-2xl hover:bg-[#CFD7FF] "
          onClick={() => {
            setTotalVotes((totalVotes) => totalVotes + 1);
          }}
        >
          <Image
            src={"/assets/shared/icon-arrow-up.svg"}
            alt="up arrow"
            width={20}
            height={20}
            className="w-auto h-auto"
          />
          <span className="text-dark-grayish-400 font-bold text-[1.3rem] leading-[-0.0181rem] ">
            {totalVotes}
          </span>
        </button>
        <div className="flex items-center gap-5 bg-transparent py-[0.6rem] px-[1.6rem] w-full  justify-end">
          <Image
            src={"/assets/shared/icon-comments.svg"}
            alt="up arrow"
            width={18}
            height={18}
            className="w-auto h-auto"
          />
          <span className="text-dark-grayish-400 font-bold text-[1.3rem] leading-[-0.0181rem]">
            {totalComments}
          </span>
        </div>
      </div>
    </div>
  );
};

export default RoadmapCard;
