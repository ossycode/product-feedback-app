"use client";

import useCustomRouter from "@/hooks/useCustomRouter";
import FeedbackCard from "./FeedbackCard";
import NoFeedbackCard from "./NoFeedbackCard";
import { useCurrentNavbarCategory } from "@/context/CategoryContext";
import { useEffect } from "react";

interface Props {
  allSugestionFeedbacks: {
    author: string;
    category: string;
    comments: [];
    createdAt: string;
    description: string;
    status: string;
    thread: [];
    title: string;
    updatedAt: string;
    upvotes: number;
    _id: string;
  }[];
}

const SuggestionsList = ({ allSugestionFeedbacks }: Props) => {
  const { category } = useCurrentNavbarCategory();
  const { pushQuery } = useCustomRouter();

  useEffect(() => {
    pushQuery({ cat: category.toLowerCase() });
  }, [category, pushQuery]);

  if (allSugestionFeedbacks?.length === 0) {
    return (
      <div className="bg-ghost-white-100 h-full mt-1 pt-8 pb-36 px-4 md:px-0">
        <NoFeedbackCard />
      </div>
    );
  }

  return (
    <>
      <div className="main-body flex flex-col gap-[1.6rem] overflow-scroll sm:px-[2.4rem] px-4 pt-[2.4rem] md:px-0  ">
        {allSugestionFeedbacks.map(
          (feedback: {
            category: string;
            description: string;
            status: string;
            thread: [];
            title: string;
            upvotes: number;
            _id: string;
          }) => (
            <FeedbackCard
              key={feedback._id}
              id={feedback._id}
              title={feedback.title}
              description={feedback.description}
              category={feedback.category}
              upvotes={feedback.upvotes}
              totalComments={feedback.thread.length}
            />
          )
        )}
      </div>
    </>
  );
};

export default SuggestionsList;
