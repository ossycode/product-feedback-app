"use client";

import useUser from "@/hooks/useUser";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

const Avatar = () => {
  const { data: session } = useSession();

  const email = session?.user?.email!;

  const { user, isLoading } = useUser(email);

  const currentUser = user?.[0];

  return (
    <Link href={"/settings"} className="self-center ">
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
