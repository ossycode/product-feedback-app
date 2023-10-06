import Image from "next/image";
import BackBtn from "@/components/ui/BackBtn";
import Spinner from "@/components/ui/Spinner";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { notFound } from "next/navigation";
import { getServerUser } from "@/hooks/useServerUser";
import ProfileAvatar from "@/components/ui/ProfileAvatar";
import ProfileDetails from "@/components/ui/ProfileDetails";
import UserPage from "@/components/ui/UserPage";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const user = await getServerUser(params?.slug);
  const profileUser = user?.[0];

  return {
    title: `${profileUser.name} | User Profile`,
    description: `${profileUser.name} | User Profile`,
  };
}

const UserProfile = async ({ params }: { params: { slug: string } }) => {
  // const session = await getServerSession(authOptions);

  console.log(params?.slug);

  const user = await getServerUser(params?.slug);

  // // const user = await getServerUser(session?.user.username!);

  const currentUser = user[0];

  // const currentUser = [];
  //
  return (
    <div className="w-full px-8 py-14 md:p-24 xl:px-[20rem] bg-light-purple-100 ">
      <BackBtn />
      {/* <div className=" bg-light-purple-100 flex flex-col  p-24  items-center gap-24 justify-center">
   
        <ProfileAvatar currentUser={currentUser} />
        <ProfileDetails currentUser={currentUser} />
      </div> */}
      <UserPage currentUser={currentUser} />
    </div>
  );
};

export default UserProfile;
