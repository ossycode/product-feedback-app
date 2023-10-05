"use client";

import useUser from "@/hooks/useUser";
import Image from "next/image";
import Link from "next/link";
import MiniSpinner from "./MiniSpinner";

const Avatar = () => {
  const { data, isLoading } = useUser();

  if (isLoading) {
    return (
      <div className="self-center rounded-full  ">
        <MiniSpinner />
      </div>
    );
  }
  const user = data[0];

  return (
    <Link href={`/dashboard/users/${user?.username}`} className="self-center ">
      <Image
        src={user?.avatar || "/assets/default-user.jpg"}
        alt="profile image"
        width={50}
        height={50}
        className="rounded-full object-cover "
      />
    </Link>
  );
};

export default Avatar;
