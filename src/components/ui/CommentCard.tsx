"use client";

import React, { useEffect, useRef, useState } from "react";
import AddReplyForm from "../form/AddReplyForm";
import Image from "next/image";
import Link from "next/link";
import Comment from "./Comment";
import useComment from "@/hooks/useComment";
import Replies from "./Replies";
import ButtonReply from "./ButtonReply";
import useUserSession from "@/hooks/useUserSession";

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
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  // const [showReplies, setShowReplies] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement | null>(null);
  const currentUser = useUserSession();

  const formDivRef = useRef<HTMLDivElement | null>(null);
  const { data, isLoading } = useComment(commentId);

  // useEffect(() => {
  //   if (data?.replies.length > 0) {
  //     setShowReplies(true);
  //   } else {
  //     setShowReplies(false);
  //   }
  // }, [data?.replies.length]);

  const isSameUser = currentUser?.username === username;

  const toggleForm = () => {
    setIsFormOpen((prevState) => !prevState);

    if (!isFormOpen && formDivRef.current) {
      formDivRef.current.scrollIntoView({ behavior: "smooth" });
      if (!isFormOpen && formRef.current) {
        formRef.current.focus();
      }
      //
      // formRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // gap-[3.2rem]

  // flex  w-full flex-col  py-12 md:relative
  return (
    <div className="grid grid-cols-5  py-8  md:grid-cols-9 	">
      <Link
        href={
          isSameUser
            ? `/dashboard/users/${username}`
            : `/dashboard/profile/${username}`
        }
        className="relative h-16 w-16 col-start-1 col-end-2"
      >
        <Image
          src={userImage}
          alt="user prorfile"
          width={40}
          height={40}
          className="cursor-pointer rounded-full"
        />
      </Link>
      <p className="text-heading5 md:text-heading4 text-dark-grayish-400 col-start-2 col-span-3 md:col-span-7 place-self-start pl-[1.6rem] sm:pl-4 md:pl-0">
        {name}
        <span className="block font-normal text-light-gray-200 md:text-[1.4rem]">
          @{username}
        </span>
      </p>
      {/* <button
        className="text-dark-blue border-none font-semibold text-[1.3rem] hover:underline hover:underline-offset-2 hover:decoration-1"
        onClick={() => setOpenReply((openReply) => !openReply)}
      >
        Reply
      </button> */}

      <ButtonReply toggleForm={toggleForm} />

      <p className="  text-light-gray-200 text-[1.3rem] md:text-[1.5rem] mt-[1.6rem] md:mt-[1.8rem] md:pl-[7.2rem] row-start-2	 col-span-full">
        {content}
      </p>

      {/* h-[21.6rem] md:h-[27rem]  */}
      {data?.replies.length > 0 && (
        <div className="rounded-2xl bg-comment-divide w-0.5 row-start-3 col-start-1 mt-[1.6rem] md:mt-[2rem] md:row-start-2 md:row-span-4 md:row-end-8 md:ml-8 h-[21.6rem] md:h-[27rem]  "></div>
      )}

      <Replies
        data={data}
        commentId={commentId}
        toggleForm={toggleForm}
        isFormOpen={isFormOpen}
      />

      <div
        className={`mt-4 row-start-4  col-span-full md:col-start-2 md:mt-6 w-full md:row-auto ${
          data?.replies.length > 0 ? "pl-[2.4rem] md:pl-[4.4rem]" : " pl-0 "
        }`}
        ref={formDivRef}
      >
        {isFormOpen && (
          <AddReplyForm
            commentAuthor={username}
            commentId={commentId}
            formRef={formRef}
          />
        )}
      </div>
    </div>
  );
};

export default CommentCard;

{
  /* <div className="grid grid-cols-5">
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
  /> */
}
{
  /* <div
      className={`  mt-9 w-0.5 h-[27rem] grow rounded-2xl bg-comment-divide
      hidden md:flex
    `}
    /> */
}
//   </div>
//   <button
//     className="text-dark-blue border-none font-semibold text-[1.3rem] hover:underline hover:underline-offset-2 hover:decoration-1"
//     onClick={() => setOpenReply((openReply) => !openReply)}
//   >
//     Reply
//   </button>
// </div>
// <p className="  text-light-gray-200 text-[1.3rem] md:text-[1.5rem] mt-[1.6rem] md:pl-[7.2rem]">
//   {content}
// </p>

// <div className="mt-[1.6rem] md:pl-[7.2rem]  ">
//   {openReply && (
//     <AddReplyForm commentAuthor={username} commentId={commentId} />
//   )}
// </div>

// <Replies data={data} commentId={commentId} />
// </div> */}
