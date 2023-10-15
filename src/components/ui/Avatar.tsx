"use client";

import useUser from "@/hooks/useUser";
import Image from "next/image";
import Link from "next/link";

const Avatar = ({ user }: any) => {
  const currentUser = user[0];

  return (
    <Link
      href={`/dashboard/users/${currentUser?.username}`}
      className="self-center "
    >
      <Image
        src={currentUser?.avatar || "/assets/default-user.jpg"}
        alt="profile image"
        width={50}
        height={50}
        className="rounded-full object-cover "
      />
    </Link>
  );
};

export default Avatar;
