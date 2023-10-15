import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import ButtonReply from "./ButtonReply";
import useUserSession from "@/hooks/useUserSession";

interface Props {
  content: string;
  username: string;
  name: string;
  userImage: string;
  replyingTo: string;
  toggleForm: () => void;
}

const Comment = ({
  content,
  username,
  name,
  userImage,
  replyingTo,
  toggleForm,
}: Props) => {
  const currentUser = useUserSession();

  const isSameUser = currentUser?.username === username;

  return (
    <div className="flex flex-col gap-[1.6rem] w-full md:gap-[1.2rem] ">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6 md:gap-12">
          <Link
            href={
              isSameUser
                ? `/dashboard/users/${username}`
                : `/dashboard/profile/${username}`
            }
            className="relative h-16 w-16"
          >
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
        <ButtonReply toggleForm={toggleForm} />
      </div>
      <p className="text-light-gray-200 text-[1.3rem] md:text-[1.5rem] md:pl-[6.8rem]">
        <Link
          className="text-light-purple-500 font-bold"
          href={`/dashboard/profile/${replyingTo}`}
        >
          @{replyingTo}
        </Link>
        {""} {content}
      </p>
    </div>
  );
};

export default Comment;
