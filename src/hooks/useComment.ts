"use client";

import useSWR from "swr";

const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json());

function useComment(id: string) {
  const { data, error, isLoading } = useSWR(`/api/comments/${id}`, fetcher);

  return { data, error, isLoading };
}

export default useComment;
