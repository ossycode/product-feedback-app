"use client";

import { signOut, useSession } from "next-auth/react";
import MiniSpinner from "./MiniSpinner";

const LogoutBtn = () => {
  const { status } = useSession();

  const isLoading = status === "loading";

  return (
    <button
      className="py-3 px-8 w-max bg-red-600 text-heading4 text-ghost-white-100 rounded-2xl self-center cursor-pointers"
      onClick={() => signOut()}
      type="submit"
      disabled={isLoading}
    >
      {isLoading ? <MiniSpinner /> : "Logout"}
    </button>
  );
};

export default LogoutBtn;
