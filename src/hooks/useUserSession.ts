"use client";

import { useSession } from "next-auth/react";

const useUserSession = () => {
  const { data: session } = useSession();

  if (session === null) return;

  const user = session?.user;

  if (!user) return;

  return user;
};

export default useUserSession;
