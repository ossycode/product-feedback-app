"use client";

import SortByDiv from "../ui/SortByDiv";
import { useCurrentNavbarCategory } from "@/context/CategoryContext";
import SuggestionsList from "../ui/SuggestionsList";

const Main = ({
  allSugestionFeedbacks,
  totalSuggestionCount,
}: {
  allSugestionFeedbacks: any[];
  totalSuggestionCount: number;
}) => {
  const { category } = useCurrentNavbarCategory();

  let derivedTotalSuggestionCount;

  if (category === "All") {
    derivedTotalSuggestionCount = totalSuggestionCount;
  } else {
    derivedTotalSuggestionCount = allSugestionFeedbacks.filter(
      (feedback: any) =>
        feedback.status === "Suggestion" && feedback.category === category
    ).length;
  }

  return (
    <main className=" ">
      <SortByDiv totalSuggestion={derivedTotalSuggestionCount} />

      <SuggestionsList allSugestionFeedbacks={allSugestionFeedbacks} />
    </main>
  );
};

export default Main;
