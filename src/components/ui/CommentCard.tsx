"use client";

import React, { useEffect, useState } from "react";
import AddReplyForm from "../form/AddReplyForm";
import Image from "next/image";
import Link from "next/link";
import Comment from "./Comment";
import useComment from "@/hooks/useComment";
import Replies from "./Replies";

interface Props {
  content: string;
  username: string;
  name: string;
  userImage: string;
  commentId: string;
}

const CommentCard = ({
  content,
  username,
  name,
  userImage,
  commentId,
}: Props) => {
  const [openReply, setOpenReply] = useState<boolean>(false);
  const [showReplies, setShowReplies] = useState<boolean>(false);

  const { data, isLoading } = useComment(commentId);

  useEffect(() => {
    if (data?.replies.length > 0) {
      setShowReplies(true);
    } else {
      setShowReplies(false);
    }
  }, [data?.replies.length]);

  // gap-[3.2rem]
  return (
    <div className="flex  w-full flex-col  py-12 ">
      <div className="flex items-center  justify-between w-full">
        <div className="flex gap-[1.9rem] items-center md:gap-[3.2rem]">
          <Link href={""} className="relative h-16 w-16">
            <Image
              src={userImage}
              alt="user prorfile"
              width={40}
              height={40}
              className="cursor-pointer rounded-full"
            />
          </Link>

          <p className="text-heading5 md:text-heading4 text-dark-grayish-400 ">
            {name}
            <span className="block font-normal text-light-gray-200 md:text-[1.4rem]">
              @{username}
            </span>
          </p>

          {/* <div
          className={`  mt-9 w-0.5 max-h-[70%] grow rounded-2xl bg-comment-divide ${
            !showReplies && "hidden"
          }`}
        /> */}
          {/* <div
          className={`  mt-9 w-0.5 max-h-[70%] grow rounded-2xl bg-comment-divide
            hidden
          `}
        /> */}
        </div>
        <button
          className="text-dark-blue border-none font-semibold text-[1.3rem] hover:underline hover:underline-offset-2 hover:decoration-1"
          onClick={() => setOpenReply((openReply) => !openReply)}
        >
          Reply
        </button>
      </div>
      <p className="  text-light-gray-200 text-[1.3rem] md:text-[1.5rem] mt-[1.6rem] md:pl-[7.2rem]">
        {content}
      </p>

      <div className="mt-[1.6rem] md:pl-[7.2rem]">
        {openReply && (
          <AddReplyForm commentAuthor={username} commentId={commentId} />
        )}
      </div>

      {/* {data?.replies.length > 0 && (
        <div className="flex items-start gap-9  w-full mt-[1.6rem]">
          <div className="rounded-2xl bg-comment-divide w-0.5 h-[21.6rem]"></div>

          <div className="flex items-start flex-col gap-[2.6rem] grow">
            {data?.replies.map((element: any) => (
              <Comment
                key={element._id}
                content={element.content}
                username={element.author.username}
                name={element.author.name}
                userImage={element.author.avatar}
                commentId={commentId}
                replyingTo={element.replyingTo}
              />
            ))}
          </div>
        </div>
      )} */}
      <Replies data={data} commentId={commentId} />
    </div>
  );
};
{
}
export default CommentCard;
