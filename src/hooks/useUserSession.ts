"use client";

import { useSession } from "next-auth/react";
import useUser from "./useUser";

const useUserSession = () => {
  const { data: session } = useSession();

  const email = session?.user?.email!;

  const { user, isLoading } = useUser(email);

  if (!user) return;
  const currentUser = user[0];

  return currentUser;
};

export default useUserSession;
