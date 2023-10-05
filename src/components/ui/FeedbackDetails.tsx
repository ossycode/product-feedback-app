"use client";

import Link from "next/link";
import BackBtn from "./BackBtn";
import Spinner from "./Spinner";
import useFeedback from "@/hooks/useFeedback";
import useAuthor from "@/hooks/useAuthor";
import { calculateTotalComment } from "@/lib/utils";
import FeedbackCard from "./FeedbackCard";
import CommentCard from "./CommentCard";

interface Props {
  _id: string;
  content: string;
  author: {
    username: string;
    name: string;
    avatar: string;
  };
}

const FeedbackDetails = ({ feedback, params }: any) => {
  const isAuthor = useAuthor(feedback._id);

  const totalComments: number = calculateTotalComment(feedback?.comments);
  return (
    <>
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
        id={feedback._id}
        title={feedback.title}
        description={feedback.description}
        category={feedback.category}
        upvotes={feedback.upvotes}
        totalComments={totalComments}
      />
      <div className="bg-clr-white p-[2.4rem] md:px-[3.2rem] flex flex-col items-start rounded-xl">
        <h1 className="text-heading3 text-dark-grayish-400 ">
          {" "}
          {totalComments} {totalComments > 1 ? "Comments" : "Comment"}
        </h1>
        {totalComments > 0 && (
          <div className=" divide-y-[0.1rem] divide-comment-divide md:flex flex-col  w-full">
            {feedback.comments.map((comment: Props) => (
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
      </div>
    </>
  );
};

export default FeedbackDetails;
