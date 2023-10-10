import BackBtn from "@/components/ui/BackBtn";

import { getServerUser } from "@/hooks/useServerUser";

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
  const user = await getServerUser(params?.slug);

  const currentUser = user[0];

  //
  return (
    <div className="w-full px-8 py-14 md:p-24 xl:px-[20rem] bg-light-purple-100 ">
      <BackBtn />
      <UserPage currentUser={currentUser} />
    </div>
  );
};

export default UserProfile;
