"use client";
import AddCommentForm from "@/components/form/AddCommentForm";
import BackBtn from "@/components/ui/BackBtn";
import MobileCommentCard from "@/components/ui/MobileCommentCard";
import FeedbackCard from "@/components/ui/FeedbackCard";
import Link from "next/link";
import React, { useState } from "react";
import CommentCard from "@/components/ui/CommentCard";
import useSWR from "swr";
import Spinner from "@/components/ui/Spinner";
import useFeedback from "@/hooks/useFeedback";
import useUserSession from "@/hooks/useUserSession";
import useAuthor from "@/hooks/useAuthor";

const FeedbackDetails = ({ params }: { params: { id: string } }) => {
  const [showReplies, setShowReplies] = useState<boolean>(false);

  const { data, isLoading } = useFeedback(params.id);

  const isAuthor = useAuthor(params.id);

  const totalComents = data?.comments?.length;

  if (!params.id) return;

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="p-[2.4rem] bg-ghost-white-100 min-h-screen flex flex-col gap-[2.4rem] md:py-[5.6rem] md:px-[3.9rem]">
      <div className="flex items-center justify-between">
        <BackBtn />
        {isAuthor && (
          <Link
            href={`/dashboard/feedback/${params.id}/edit`}
            className="new-form-btn bg-dark-blue"
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
        totalComments={data.comments.length}
      />
      <div className="bg-clr-white p-[2.4rem] md:px-[3.2rem] flex flex-col items-start gap-8">
        <h1 className="text-heading3 text-dark-grayish-400 ">
          {" "}
          {totalComents} {totalComents > 1 ? "Comments" : "Comment"}
        </h1>
        <div className="hidden divide-y-[0.1rem] divide-comment-divide md:flex flex-col  items-center">
          {/* <CommentCard showReplies={false} />

          <CommentCard showReplies={true} /> */}
        </div>
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
