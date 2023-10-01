"use client";

import { calculateTotalComment } from "@/lib/utils";
import FeedbackCard from "../ui/FeedbackCard";
import NoFeedbackCard from "../ui/NoFeedbackCard";
import { getFeedbacks } from "@/hooks/useFeedbacks";
import { use, useState } from "react";
import SortByDiv from "../ui/SortByDiv";
import { useCurrentNavbarCategory } from "@/context/CategoryContext";
import useAllFeedbacks from "@/hooks/useAllFeedbacks";
import SuggestionsList from "../ui/SuggestionsList";

interface Props {
  allFeedbacks: any[];
}

const Main = ({ allFeedbacks }: Props) => {
  const { category } = useCurrentNavbarCategory();

  let totalSuggestionCount;

  if (category === "All") {
    totalSuggestionCount = allFeedbacks.filter(
      (feedback: any) => feedback.status === "Suggestion"
    ).length;
  } else {
    totalSuggestionCount = allFeedbacks.filter(
      (feedback: any) =>
        feedback.status === "Suggestion" && feedback.category === category
    ).length;
  }

  return (
    <main className=" ">
      <SortByDiv totalSuggestion={totalSuggestionCount} />

      <SuggestionsList />
    </main>
  );
};

export default Main;
