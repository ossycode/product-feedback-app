import useUser from "@/hooks/useUser";
import Image from "next/image";
import Link from "next/link";

const Avatar = ({ user }: any) => {
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
