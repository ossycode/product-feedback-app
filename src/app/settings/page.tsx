"use client";

import Image from "next/image";
import { useState } from "react";
import { useSession } from "next-auth/react";
import useUser from "@/hooks/useUser";
import { formatDateString } from "@/lib/utils";
import BackBtn from "@/components/ui/BackBtn";
import Spinner from "@/components/ui/Spinner";

const Settings = () => {
  const [file, setFile] = useState<File>();

  const { user, isLoading } = useUser();

  if (isLoading || user === undefined) {
    return <Spinner />;
  }
  const currentUser = user?.[0];
  const currentDateString = formatDateString(currentUser?.createdAt);

  return (
    <div className="w-full h-screen bg-light-purple-100 ">
      <div className="px-24 pt-24">
        <BackBtn />
      </div>
      <div className=" bg-light-purple-100 flex  p-24  items-center gap-24 justify-center">
        <section className="bg-clr-white text-dark-grayish-400 p-16 flex flex-col gap-10 items-center rounded-lg">
          <h1 className="text-heading1">{currentUser?.name}</h1>
          <p className="text-heading4 mt-[-2.45rem]">
            @{currentUser?.username}
          </p>
          <Image
            src={currentUser?.avatar || "/assets/default-user.jpg"}
            alt="profile photo"
            width={100}
            height={100}
            className="rounded-full aspect-[1] object-center	object-cover"
          />
          {/* w-[25.5rem]  */}
          <div className="relative cursor-pointer ">
            <button className="bg-[#D73737] py-4 px-4  md:py-3.5 md:px-10 font-bold w-max text-ghost-white-100 text-[1.5rem] ">
              {file?.name ? file.name : "Change Picture"}
            </button>
            <input
              type="file"
              name="file"
              accept="images/*"
              className="absolute left-0 opacity-0"
              onChange={(e) => setFile(e.target.files?.[0])}
            />
          </div>

          <p className="bg-light-purple-100 rounded-lg p-6 shadow-inner text-center">
            Upload a new avatar
            <br />
            Maximum upload size is <b>4 MB</b>
          </p>

          <p>
            Member Since:{" "}
            <span className="font-semibold">{currentDateString}</span>
          </p>
        </section>
        <section className="bg-clr-white text-dark-grayish-400 flex flex-col gap-10 items-center rounded-lg">
          <div className="bg-ghost-white-100 w-full px-16 pt-16 shadow-gray-200	shadow-md flex flex-col justify-between gap-10">
            <h1 className="text-heading1">Edit Profile</h1>

            <ul className="">
              <li className="text-heading4 cursor-pointer underline underline-offset-8 decoration-dark-blue decoration-2	 p-1">
                User Info
              </li>
            </ul>
          </div>
          <form className="grid grid-cols-2 gap-16 p-16 ">
            <div>
              <label
                htmlFor="fullName"
                className="text-dark-grayish-400  text-[1.6rem] font-normal opacity-75 block"
              >
                Full Name
              </label>
              <input
                id="fullName"
                defaultValue={currentUser?.name}
                type="text"
                className="min-w-[25.5rem] min-h-[4.8rem] rounded-lg bg-ghost-white-100 text-dark-grayish-400 text-[1.5rem] 
            font-normal  py-[1.3rem] px-[2.4rem] border active:border-solid	active:border-dark-blue"
              />
            </div>

            <div>
              <label
                htmlFor="username"
                className="text-dark-grayish-400  text-[1.6rem] font-normal opacity-75 block"
              >
                Username
              </label>
              <input
                id="username"
                defaultValue={currentUser?.username}
                type="text"
                className="min-w-[25.5rem] min-h-[4.8rem] rounded-lg bg-ghost-white-100 text-dark-grayish-400 text-[1.5rem] 
            font-normal  py-[1.3rem] px-[2.4rem] border active:border-solid	active:border-dark-blue"
                disabled
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="text-dark-grayish-400  text-[1.6rem] font-normal opacity-75 block "
              >
                Password
              </label>
              <input
                id="password"
                defaultValue={currentUser?.password}
                type="password"
                className="min-w-[25.5rem] min-h-[4.8rem] rounded-lg bg-ghost-white-100 text-dark-grayish-400 text-[1.5rem]
             font-normal py-[1.3rem] px-[2.4rem] border active:border-solid	active:border-dark-blue"
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="text-dark-grayish-400  text-[1.6rem] font-normal opacity-75 block "
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                defaultValue={currentUser?.password}
                type="password"
                className="min-w-[25.5rem] min-h-[4.8rem] rounded-lg bg-ghost-white-100 text-dark-grayish-400 text-[1.5rem]
             font-normal py-[1.3rem] px-[2.4rem] border active:border-solid	active:border-dark-blue"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="text-dark-grayish-400  text-[1.6rem] font-normal opacity-75 block "
              >
                Email Address
              </label>
              <input
                id="email"
                defaultValue={currentUser?.email}
                type="email"
                className="min-w-[25.5rem] min-h-[4.8rem] rounded-lg bg-ghost-white-100 text-dark-grayish-400 text-[1.5rem]
             font-normal py-[1.3rem] px-[2.4rem] border active:border-solid	active:border-dark-blue"
                disabled
              />
            </div>
            <button className=" bg-[#D73737] px-4 font-bold  w-[25.5rem] text-ghost-white-100 text-[1.5rem] block ">
              Update Info
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Settings;
