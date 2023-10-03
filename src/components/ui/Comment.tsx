import Image from "next/image";
import React, { useState } from "react";
import AddReplyForm from "../form/AddReplyForm";
import Link from "next/link";

interface Props {
  content: string;
  username: string;
  name: string;
  userImage: string;
  commentId: string;
  replyingTo: string;
}

const Comment = ({
  content,
  username,
  name,
  userImage,
  commentId,
  replyingTo,
}: Props) => {
  const [openReply, setOpenReply] = useState<boolean>(false);

  return (
    <div className="flex flex-col gap-[1.6rem] w-full md:gap-[1.2rem]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6 md:gap-12">
          <Link href={""} className="relative h-16 w-16">
            <Image
              src={userImage}
              alt="user prorfile"
              width={40}
              height={40}
              className="cursor-pointer rounded-full"
            />
          </Link>
          <p className="text-heading5 text-dark-grayish-400 ">
            {name}
            <span className="block font-normal text-light-gray-200">
              @{username}
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
      <p className="text-light-gray-200 text-[1.3rem] md:text-[1.5rem] md:pl-[6.8rem]">
        <span className="text-light-purple-500 font-bold">@{replyingTo}</span>
        {""} {content}
      </p>
      <div className="md:pl-[6.6rem]">
        {openReply && (
          <AddReplyForm commentId={commentId} commentAuthor={username} />
        )}
      </div>
    </div>
  );
};

export default Comment;
