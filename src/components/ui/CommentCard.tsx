"use client";

import React, { useEffect, useRef, useState } from "react";
import AddReplyForm from "../form/AddReplyForm";
import Image from "next/image";
import Link from "next/link";
import Comment from "./Comment";

import Replies from "./Replies";
import ButtonReply from "./ButtonReply";
import useUserSession from "@/hooks/useUserSession";

interface Props {
  comment: any;
}

const CommentCard = ({ comment }: Props) => {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [replyTo, setReplyTo] = useState<string>();
  const formRef = useRef<HTMLFormElement | null>(null);
  const currentUser = useUserSession();

  const formDivRef = useRef<HTMLDivElement | null>(null);

  const isSameUser = currentUser?.username === comment.author.username;

  const toggleForm = (replingTo: string) => {
    setIsFormOpen((prevState) => !prevState);

    if (!isFormOpen && formDivRef.current) {
      setReplyTo(() => replingTo);
      formDivRef.current.scrollIntoView({ behavior: "smooth" });
      if (!isFormOpen && formRef.current) {
        formRef.current.focus();
      }
    }
  };

  return (
    <div className="grid grid-cols-5  py-8  md:grid-cols-9 	">
      <Link
        href={
          isSameUser
            ? `/dashboard/users/${comment.author.username}`
            : `/dashboard/profile/${comment.author.username}`
        }
        className="relative h-16 w-16 col-start-1 col-end-2"
      >
        <Image
          src={comment.author.avatar}
          alt="user prorfile"
          width={40}
          height={40}
          className="cursor-pointer rounded-full"
        />
      </Link>
      <p className="text-heading5 md:text-heading4 text-dark-grayish-400 col-start-2 col-span-3 md:col-span-7 place-self-start pl-[1.6rem] sm:pl-4 md:pl-0">
        {comment.author.name}
        <span className="block font-normal text-light-gray-200 md:text-[1.4rem]">
          @{comment.author.username}
        </span>
      </p>

      <ButtonReply
        toggleForm={toggleForm}
        commentUser={comment.author.username}
      />

      <p className="  text-light-gray-200 text-[1.3rem] md:text-[1.5rem] mt-[1.6rem] md:mt-[1.8rem] md:pl-[7.2rem] row-start-2	 col-span-full">
        {comment.content}
      </p>

      {comment?.replies.length > 0 && (
        <div className="rounded-2xl bg-comment-divide w-0.5 row-start-3 col-start-1 mt-[1.6rem] md:mt-[2rem] md:row-start-2 md:row-span-4 md:row-end-8 md:ml-8 h-[21.6rem] md:h-[27rem]  "></div>
      )}

      <Replies
        comment={comment}
        commentId={comment._id}
        toggleForm={toggleForm}
        isFormOpen={isFormOpen}
      />

      <div
        className={`mt-4 row-start-4  col-span-full md:col-start-2 md:mt-6 w-full md:row-auto ${
          comment?.replies.length > 0 ? "pl-[2.4rem] md:pl-[4.4rem]" : " pl-0 "
        }`}
        ref={formDivRef}
      >
        {isFormOpen && (
          <AddReplyForm
            commentId={comment._id}
            formRef={formRef}
            replyTo={replyTo}
          />
        )}
      </div>
    </div>
  );
};

export default CommentCard;
