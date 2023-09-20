"use client";

import { useSession } from "next-auth/react";

const useUserSession = () => {
  const { data: session } = useSession();

  const user = session?.user;

  if (!user) return;

  return user;
};

export default useUserSession;
