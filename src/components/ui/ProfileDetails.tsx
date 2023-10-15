"use client";

import { startTransition, useState } from "react";
import MiniSpinner from "./MiniSpinner";
import { usePathname, useRouter } from "next/navigation";

interface Props {
  currentUser: any;
  classList: string;
}

const ProfileDetails = ({ currentUser, classList }: Props) => {
  const [fullName, setFullName] = useState<string>(currentUser.name);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleNameChane = async (e: React.FormEvent<HTMLButtonElement>) => {
    try {
      e.preventDefault();

      setIsUploading(true);
      const res = await fetch(`/api/users/${currentUser.username}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: fullName,
          path: pathname,
        }),
      });
      if (res.ok) {
        startTransition(() => router.refresh());
      }
      setIsUploading(false);
    } catch (err: Error | any) {
      console.log(`${err.code}: Error update creation`);
    } finally {
      setIsUploading(false);
    }
  };
  return (
    <section
      //
      className={` bg-clr-white text-dark-grayish-400  flex-col  md:gap-10 lg:gap-16 items-center rounded-lg md:flex ${classList}`}
    >
      <div className="bg-ghost-white-100 w-full px-8 pt-6 md:px-16 md:pt-16 shadow-gray-200	shadow-md flex flex-col justify-between gap-10 ">
        <h1 className="text-heading3 md:text-heading1">Edit Profile</h1>

        <ul className="">
          <li className="text-heading5 md:text-heading4 cursor-pointer underline underline-offset-8 decoration-light-purple-500 decoration-2	 p-1">
            User Info
          </li>
        </ul>
      </div>
      <form className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-16 p-16 place-items-center">
        <div>
          <label
            htmlFor="fullName"
            className="text-dark-grayish-400 text-[1.4rem] md:text-[1.6rem] font-normal opacity-75 block"
          >
            Full Name
          </label>
          <input
            id="fullName"
            defaultValue={fullName}
            type="text"
            className="signupform-input"
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>

        <div>
          <label
            htmlFor="username"
            className="text-dark-grayish-400  text-[1.4rem] md:text-[1.6rem]  font-normal opacity-75 block"
          >
            Username
          </label>
          <input
            id="username"
            defaultValue={currentUser?.username}
            type="text"
            className="signupform-input"
            disabled
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="text-dark-grayish-400  text-[1.4rem] md:text-[1.6rem]  font-normal opacity-75 block "
          >
            Email Address
          </label>
          <input
            id="email"
            defaultValue={currentUser?.email}
            type="email"
            className="signupform-input"
            disabled
          />
        </div>
        <button
          className=" bg-light-purple-500  py-4 rounded-2xl md:px-4 font-bold  min-w-[25.5rem] text-ghost-white-100 text-[1.5rem] block lg:place-self-end"
          disabled={isUploading}
          onClick={(e) => handleNameChane(e)}
        >
          {isUploading ? <MiniSpinner /> : " Update Info"}
        </button>
      </form>
    </section>
  );
};

export default ProfileDetails;
