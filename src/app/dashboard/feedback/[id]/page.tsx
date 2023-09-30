"use client";
import AddCommentForm from "@/components/form/AddCommentForm";
import BackBtn from "@/components/ui/BackBtn";
import MobileCommentCard from "@/components/ui/MobileCommentCard";
import FeedbackCard from "@/components/ui/FeedbackCard";
import Link from "next/link";
import React, { useState } from "react";
import CommentCard from "@/components/ui/CommentCard";
import Spinner from "@/components/ui/Spinner";
import useFeedback from "@/hooks/useFeedback";
import useAuthor from "@/hooks/useAuthor";
import { calculateTotalComment } from "@/lib/utils";

interface Props {
  _id: string;
  content: string;
  author: {
    username: string;
    name: string;
    avatar: string;
  };
}

const FeedbackDetails = ({ params }: { params: { id: string } }) => {
  const { data, isLoading } = useFeedback(params.id);

  const isAuthor = useAuthor(params.id);

  if (!params.id) return;

  if (isLoading && data === undefined) {
    return <Spinner />;
  }

  const totalComments: number = calculateTotalComment(data?.comments);

  return (
    <div className="p-[2.4rem] bg-ghost-white-100 min-h-screen flex flex-col gap-[2.4rem] md:py-[5.6rem] md:px-[3.9rem] lg:px-[18rem]  xl:px-[35.5rem] xl:py-[8rem]">
      <div className="flex items-center justify-between">
        <BackBtn />
        {isAuthor && (
          <Link
            href={`/dashboard/feedback/${params.id}/edit`}
            className="new-form-btn bg-dark-blue hover:bg-[#7C91F9]"
          >
            Edit Feedback
          </Link>
        )}
      </div>
      <FeedbackCard
        id={data._id}
        title={data.title}
        description={data.description}
        category={data.category}
        upvotes={data.upvotes}
        totalComments={totalComments}
      />
      <div className="bg-clr-white p-[2.4rem] md:px-[3.2rem] flex flex-col items-start gap-8">
        <h1 className="text-heading3 text-dark-grayish-400 ">
          {" "}
          {totalComments} {totalComments > 1 ? "Comments" : "Comment"}
        </h1>
        {totalComments > 0 && (
          <div className="hidden divide-y-[0.1rem] divide-comment-divide md:flex flex-col  w-full">
            {data.comments.map((comment: Props) => (
              <CommentCard
                key={comment._id}
                content={comment.content}
                username={comment.author.username}
                name={comment.author.name}
                userImage={comment.author.avatar}
                commentId={comment._id}
              />
            ))}
          </div>
        )}
        <div className="md:hidden divide-y-[0.1rem] divide-comment-divide flex flex-col  items-center">
          {/* <MobileCommentCard />
          <MobileCommentCard /> */}
        </div>
      </div>

      <AddCommentForm />
    </div>
  );
};

export default FeedbackDetails;
