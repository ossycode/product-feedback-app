"use client";

import { useSortBy } from "@/context/sortByContext";
import useSWR from "swr";

const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json());
// const fetcher = (url: string, sortProps = { upvotes: "asc" }) =>
//   fetch(url).then((res) => res.json());

function useAllFeedbacks() {
  const { sortBy } = useSortBy();
  const { data, error, isLoading, mutate } = useSWR(
    `/api/feedbacks?sort=${sortBy}`,
    fetcher
  );

  return { data, error, isLoading };
}

// ?sort=Least+Upvotes
export default useAllFeedbacks;
