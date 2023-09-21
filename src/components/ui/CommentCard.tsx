"use client";

import React, { useState } from "react";
import AddReplyForm from "../form/AddReplyForm";
import Image from "next/image";
import Link from "next/link";
import Comment from "./Comment";
import ReplyCard from "./ReplyCard";

interface Props {
  showReplies: boolean;
  content: string;
  username: string;
  name: string;
  userImage: string;
}

const CommentCard = ({
  showReplies,
  content,
  username,
  name,
  userImage,
}: Props) => {
  const [openReply, setOpenReply] = useState<boolean>(false);

  return (
    <div>
      <div className="hidden md:flex w-full flex-1 gap-4 py-12 ">
        <div className="flex flex-col items-center">
          <Link href={""} className="relative h-16 w-16">
            <Image
              src={userImage}
              alt="user prorfile"
              width={40}
              height={40}
              className="cursor-pointer rounded-full"
            />
          </Link>
          <div
            className={`  mt-9 w-0.5 max-h-[70%] grow rounded-2xl bg-comment-divide ${
              !showReplies && "hidden"
            }`}
          />
        </div>
        <div className="flex flex-col gap-[1.6rem]">
          <div className="flex items-center justify-between">
            <p className="text-heading5 md:text-heading4 text-dark-grayish-400 ">
              {name}
              <span className="block font-normal text-light-gray-200 md:text-[1.4rem]">
                {username}
              </span>
            </p>
            <button
              className="text-dark-blue border-none font-semibold text-[1.3rem]"
              onClick={() => setOpenReply((openReply) => !openReply)}
            >
              Reply
            </button>
          </div>
          <p className="  text-light-gray-200 text-[1.3rem] md:text-[1.5rem]">
            {content}
          </p>
          {openReply && <AddReplyForm />}
          {/* <ReplyCard /> */}
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
