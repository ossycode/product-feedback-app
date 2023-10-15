"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { EditFeedback } from "@/lib/actions/feedback.actions";

interface Props {
  id: string;
  title: string;
  description: string;
  category: string;
  upvotes: number;
  totalComments: number;
}

const FeedbackCard = ({
  id,
  title,
  description,
  category,
  upvotes,
  totalComments,
}: Props) => {
  const [totalVotes, setTotalVotes] = useState<number>(upvotes);
  const pathname = usePathname();

  useEffect(() => {
    async function handleUpvotes() {
      try {
        await EditFeedback({
          path: pathname,
          feedbackId: id,
          upvotes: totalVotes,
        });
      } catch (err: Error | any) {
        console.log(`${err.code}: ${err}`);
      }
    }
    handleUpvotes();
  }, [id, pathname, totalVotes]);

  return (
    <div className=" sm:min-w-[32.7rem] sm:min-h-[20rem] bg-clr-white rounded-2xl p-[2.4rem] grid grid-cols-2 gap-x-[15rem] gap-y-[2.8rem] md:flex   md:gap-0  md:min-h-[15.1rem] md:justify-between ">
      <div className="flex flex-col items-start col-span-2 md:col-start-2 md:col-end-7 md:w-[70%]  ">
        <Link
          className="text-dark-grayish-400 tracking-[-0.0181rem] font-bold text-[1.3rem] md:text-heading3 hover:text-dark-blue"
          href={`/dashboard/feedback/${id}`}
        >
          {title}
        </Link>
        <p className="text-[1.3rem] text-light-gray-200 md:text-body1 mt-[0.4rem] w-full">
          {description}
        </p>
        <p className="bg-light-purple-100 text-dark-blue p-2 text-[1.3rem] font-semibold pl-4 rounded-2xl mt-[1.2rem] ">
          {category}
        </p>
      </div>

      <button
        className="flex items-center gap-4 md:gap-4 bg-light-purple-100 font-bold text-[1.3rem] py-[0.6rem] px-[1.6rem] w-max md:order-first md:flex-col md:justify-center md:h-max md:w-[4rem] md:min-h-[5.3rem] md:py-[1rem] rounded-2xl hover:bg-[#CFD7FF]"
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
        <span>{totalVotes}</span>
      </button>
      <div className="flex items-center gap-5 bg-transparent font-bold text-[1.3rem] md:text-[1.6rem] py-[0.6rem] px-[1.6rem] md:order-last justify-end">
        <Image
          src={"/assets/shared/icon-comments.svg"}
          alt="up arrow"
          width={15}
          height={15}
        />
        <span>{totalComments}</span>
      </div>
    </div>
  );
};

export default FeedbackCard;
