"use client";

import { SessionProvider } from "next-auth/react";

function AuthProvider({ children }: any) {
  return <SessionProvider>{children}</SessionProvider>;
}

export default AuthProvider;
