"use client";

import { useEffect } from "react";
import useSWR, { preload } from "swr";

const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json());

function useUser(email: string) {
  useEffect(() => {
    preload(`/api/users?email=${email}`, fetcher);
  }, [email]);

  const { data, mutate, error, isLoading } = useSWR(
    `/api/users?email=${email}`,
    fetcher
  );

  return { user: data, isLoading, mutate, isError: error };
}

export default useUser;
