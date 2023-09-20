"use client";

import { useEffect } from "react";
import useSWR, { preload } from "swr";
import useUserSession from "./useUserSession";

const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json());

function useUser() {
  const user = useUserSession();

  const email = user?.email;

  // useEffect(() => {
  //   preload(`/api/users?email=${email}`, fetcher);
  // }, [email]);

  const { data, isLoading } = useSWR(`/api/users?email=${email}`, fetcher);

  return { user: data, isLoading };
}

export default useUser;
