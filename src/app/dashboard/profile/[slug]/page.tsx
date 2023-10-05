import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import BackBtn from "@/components/ui/BackBtn";
import { getServerUser } from "@/hooks/useServerUser";
import { formatDateString } from "@/lib/utils";
import { getServerSession } from "next-auth";
import Image from "next/image";

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

const FewDetailProfilePage = async ({
  params,
}: {
  params: { slug: string };
}) => {
  //   const session = await getServerSession(authOptions);

  const user = await getServerUser(params?.slug);

  // const currentUser = user[0];
  //
  const profileUser = user?.[0];

  const currentDateString = formatDateString(profileUser?.createdAt);

  return (
    <div className="w-full px-8 py-14 md:py-24 md:px-[16rem] lg:px-[26rem] bg-light-purple-100 h-screen flex flex-col gap-16">
      <BackBtn />

      <section
        className={` bg-clr-white text-dark-grayish-400 flex flex-col w-full py-16 gap-16 items-center rounded-lg  `}
      >
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-heading3 md:text-heading1">
            {profileUser?.name}
          </h1>

          <p className="text-[1.3rem] md:text-[1.4rem] font-normal">
            @{profileUser?.username}
          </p>
        </div>
        <Image
          src={profileUser?.avatar || "/assets/default-user.jpg"}
          alt="profile photo"
          width={100}
          height={100}
          className="rounded-full aspect-[1] object-center	object-cover"
        />

        <p>
          Member Since:{" "}
          <span className="font-semibold " suppressHydrationWarning>
            {currentDateString}
          </span>
        </p>
        {/* <div>
          <h1 className="text-heading3 md:text-heading1 text-start">
            {" "}
            Activity
          </h1>
          <p className="text-[1.3rem] md:text-[1.4rem] font-normal">
            Total Comments: <span className="text-heading4">20</span>
          </p>
        </div> */}
      </section>
    </div>
  );
};

export default FewDetailProfilePage;
