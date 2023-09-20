"use client";

import { signOut } from "next-auth/react";

const LogoutBtn = () => {
  return (
    <button
      className="py-3 px-8 w-max bg-red-600 text-heading4 text-ghost-white-100 rounded-2xl self-center cursor-pointers"
      onClick={() => signOut()}
      type="submit"
    >
      Logout
    </button>
  );
};

export default LogoutBtn;
