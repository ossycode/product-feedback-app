"use client";

import SortByDiv from "../ui/SortByDiv";
import SuggestionsList from "../ui/SuggestionsList";

const Main = ({
  allSugestionFeedbacks,
  totalSuggestionCount,
}: {
  allSugestionFeedbacks: any[];
  totalSuggestionCount: number;
}) => {
  return (
    <main className=" ">
      <SortByDiv totalSuggestion={totalSuggestionCount} />

      <SuggestionsList allSugestionFeedbacks={allSugestionFeedbacks} />
    </main>
  );
};

export default Main;
