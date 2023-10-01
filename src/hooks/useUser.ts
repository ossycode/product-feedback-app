"use client";

import { useEffect } from "react";
import useSWR, { preload } from "swr";
import useUserSession from "./useUserSession";

const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json());

function useUser() {
  const user = useUserSession();

  const username = user?.username;

  useEffect(() => {
    preload(`/api/users?username=${username}`, fetcher);
  }, [username]);

  const { data, isLoading } = useSWR(
    `/api/users?username=${username}`,
    fetcher
  );

  return { user: data, isLoading };
}

export default useUser;
