"use client";

import useUser from "@/hooks/useUser";
import Image from "next/image";
import Link from "next/link";
import MiniSpinner from "./MiniSpinner";

const Avatar = ({ user }: any) => {
  // const { data, isLoading } = useUser();

  // if (isLoading) {
  //   return (
  //     <div className="self-center rounded-full  ">
  //       <MiniSpinner />
  //     </div>
  //   );
  // }
  const currentUser = user[0];
  // console.log(user);

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
