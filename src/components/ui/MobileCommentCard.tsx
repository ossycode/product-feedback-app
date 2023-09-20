"use client";

import Image from "next/image";
import React, { useState } from "react";
import AddReplyForm from "../form/AddReplyForm";
import Comment from "./Comment";
import Link from "next/link";

const MobileCommentCard = () => {
  const [openReply, setOpenReply] = useState<boolean>(false);
  return (
    <div className="flex flex-col gap-[1.6rem] py-12 md:hidden ">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6 md:gap-[3.2rem]">
          <Link href={""} className="relative w-16 h-16">
            <Image
              src={"/assets/default-user.jpg"}
              alt="user prorfile"
              fill
              sizes="40"
              className=" cursor-pointer rounded-full"
            />
          </Link>
          <p className="text-heading5 md:text-heading4 text-dark-grayish-400 ">
            Elijah Moss
            <span className="block font-normal text-light-gray-200 md:text-[1.4rem]">
              @hexago.bestagon
            </span>
          </p>
        </div>
        <button
          className="text-dark-blue border-none font-semibold text-[1.3rem]"
          onClick={() => setOpenReply((openReply) => !openReply)}
        >
          Reply
        </button>
      </div>
      <p className=" text-light-gray-200 text-[1.3rem] md:text-[1.5rem]">
        Also, please allow styles to be applied based on system preferences. I
        would love to be able to browse Frontend Mentor in the evening after my
        device’s dark mode turns on without the bright background it currently
        has.
      </p>

      <div className="border-l border-comment-divide flex items-start pl-9">
        <Comment />
      </div>
      {openReply && <AddReplyForm />}
    </div>
  );
};

export default MobileCommentCard;
