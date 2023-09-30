"use client";

import useAllFeedbacks from "@/hooks/useAllFeedbacks";
import FeedbackCard from "./FeedbackCard";
import NoFeedbackCard from "./NoFeedbackCard";
import { useCurrentNavbarCategory } from "@/context/CategoryContext";
import Spinner from "./Spinner";
import { calculateTotalComment } from "@/lib/utils";

const SuggestionsList = () => {
  const { category } = useCurrentNavbarCategory();

  const { data, isLoading } = useAllFeedbacks();

  if (isLoading) return <Spinner />;

  const { allFeedbacks } = data;

  // let category1 = "All";

  // if (isLoading) return
  // const [currentSelectedCategory, setCurrentSelectedCategory] =
  //   useState<string>("All");

  // const getSelectedCategory = (currentCat: string): void => {
  //   setCurrentSelectedCategory(currentCat);
  // };

  // let totalSuggestionCount;

  let suggestedFeedback = [];

  if (category === "All") {
    suggestedFeedback = allFeedbacks.filter(
      (feedback: any) => feedback.status === "Suggestion"
    );
  }
  if (category === "UI") {
    suggestedFeedback = allFeedbacks.filter(
      (feedback: any) =>
        feedback.status === "Suggestion" && feedback.category === "UI"
    );
  }
  if (category === "UX") {
    suggestedFeedback = allFeedbacks.filter(
      (feedback: any) =>
        feedback.status === "Suggestion" && feedback.category === "UX"
    );
  }
  if (category === "Enhancement") {
    suggestedFeedback = allFeedbacks.filter(
      (feedback: any) =>
        feedback.status === "Suggestion" && feedback.category === "Enhancement"
    );
  }

  if (category === "Bug") {
    suggestedFeedback = allFeedbacks.filter(
      (feedback: any) =>
        feedback.status === "Suggestion" && feedback.category === "Bug"
    );
  }
  if (category === "Feature") {
    suggestedFeedback = allFeedbacks.filter(
      (feedback: any) =>
        feedback.status === "Suggestion" && feedback.category === "Feature"
    );
  }

  if (suggestedFeedback?.length === 0) {
    return (
      <div className="bg-ghost-white-100 h-full mt-1 pt-8 pb-36 px-4 md:px-0">
        <NoFeedbackCard />
      </div>
    );
  }

  return (
    <div className="main-body flex flex-col gap-[1.6rem] overflow-scroll sm:px-[2.4rem] px-4 pt-[2.4rem] md:px-0  ">
      {suggestedFeedback.map((feedback: any) => (
        <FeedbackCard
          key={feedback._id}
          id={feedback._id}
          title={feedback.title}
          description={feedback.description}
          category={feedback.category}
          upvotes={feedback.upvotes}
          totalComments={calculateTotalComment(feedback.comments)}
        />
      ))}
    </div>
  );
};

export default SuggestionsList;
