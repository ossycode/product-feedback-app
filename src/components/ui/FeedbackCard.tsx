"use client";

import Image from "next/image";
import Button from "./button";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useParams, usePathname } from "next/navigation";

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
  const params = useParams();
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

  // flex flex-col items-start

  if (id === undefined) return;

  return (
    <div className=" sm:min-w-[32.7rem] sm:min-h-[20rem] bg-clr-white rounded-2xl p-[2.4rem] grid grid-cols-2 gap-x-[15rem] gap-y-[2.8rem] md:grid-flow-row md:grid-cols-7  md:gap-0  md:min-h-[15.1rem] ">
      <Link
        className="flex flex-col items-start gap-3 col-span-2 md:col-start-2 md:col-end-7"
        href={`dashboard/feedback/${id}`}
      >
        <h1 className="text-dark-grayish-400 tracking-[-0.0181rem] font-bold text-[1.3rem] md:text-heading3">
          {title}
        </h1>
        <p className="text-[1.3rem] text-light-gray-200 md:text-body1">
          {description}
        </p>
        <Button btnProps="bg-light-purple-100 text-dark-blue p-2 text-[1.3rem] font-semibold pl-4">
          {category}
        </Button>
      </Link>

      {/* <div className="flex items-center justify-between w-full">
        <Button btnProps="flex items-center gap-2 bg-light-purple-100  text-[1.3rem] font-bold text-[1.3rem] py-[0.6rem] px-[1.6rem]">
          <Image
            src={"/assets/shared/icon-arrow-up.svg"}
            alt="up arrow"
            width={10}
            height={10}
          />
          <span>112</span>
        </Button>
        <Button btnProps="flex items-center gap-2 bg-transparent  text-[1.3rem] font-bold text-[1.3rem] py-[0.6rem] px-[1.6rem]">
          <Image
            src={"/assets/shared/icon-comments.svg"}
            alt="up arrow"
            width={15}
            height={15}
          />
          <span>2</span>
        </Button>
      </div> */}
      <button
        className="flex items-center gap-2 md:gap-4 bg-light-purple-100 font-bold text-[1.3rem] py-[0.6rem] px-[1.6rem] w-max md:order-first md:flex-col md:justify-center md:h-max md:w-[4rem] md:h-5.3rem] lg:py-[1rem] rounded-2xl "
        onClick={() => {
          setTotalVotes((totalVotes) => totalVotes + 1);
        }}
      >
        <Image
          src={"/assets/shared/icon-arrow-up.svg"}
          alt="up arrow"
          width={10}
          height={10}
        />
        <span>{totalVotes}</span>
      </button>
      <Button btnProps="flex items-center gap-6 bg-transparent  text-[1.3rem] font-bold text-[1.3rem] md:text-[1.6rem] py-[0.6rem] px-[1.6rem] md:order-last justify-end">
        <Image
          src={"/assets/shared/icon-comments.svg"}
          alt="up arrow"
          width={15}
          height={15}
        />
        <span>{totalComments}</span>
      </Button>
    </div>
  );
};

export default FeedbackCard;
