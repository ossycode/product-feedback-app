"use client";

import React, { useEffect, useState } from "react";
import AddReplyForm from "../form/AddReplyForm";
import Image from "next/image";
import Link from "next/link";
import Comment from "./Comment";
import ReplyCard from "./ReplyCard";
import useComment from "@/hooks/useComment";

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

  return (
    <div className="flex  w-full flex-1 gap-[3.2rem] py-12 ">
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
      <div className="flex flex-col gap-[1.6rem] w-full">
        <div className="flex items-center  justify-between w-full">
          <p className="text-heading5 md:text-heading4 text-dark-grayish-400 ">
            {name}
            <span className="block font-normal text-light-gray-200 md:text-[1.4rem]">
              @{username}
            </span>
          </p>

          <button
            className="text-dark-blue border-none font-semibold text-[1.3rem] hover:underline hover:underline-offset-2 hover:decoration-1"
            onClick={() => setOpenReply((openReply) => !openReply)}
          >
            Reply
          </button>
        </div>
        <p className="  text-light-gray-200 text-[1.3rem] md:text-[1.5rem]">
          {content}
        </p>
        {openReply && (
          <AddReplyForm commentAuthor={username} commentId={commentId} />
        )}

        {data?.replies.length > 0 &&
          data?.replies.map((element: any) => (
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
  );
};

export default CommentCard;
