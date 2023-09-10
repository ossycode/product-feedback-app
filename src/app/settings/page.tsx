"use client";

import Button from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";

const Settings = () => {
  const [file, setFile] = useState<File>();

  return (
    <div className="w-full h-screen bg-light-purple-100 p-24 flex  items-center gap-24 justify-center">
      <section className="bg-clr-white text-dark-grayish-400 p-16 flex flex-col gap-10 items-center rounded-lg">
        <h1 className="text-heading1">Jamed Allan</h1>
        <p className="text-heading4 mt-[-2.45rem]">@james</p>
        <Image
          src="/assets/user-images/image-anne.jpg"
          alt="profile photo"
          width={100}
          height={100}
          className="rounded-full aspect-[1] object-center	object-cover"
        />

        <div className="relative cursor-pointer ">
          <Button btnProps="bg-light-orange-500 py-4 px-4 font-bold  w-[25.5rem] text-ghost-white-100 text-[1.5rem]  py-3.5 px-10 font-bold w-max text-ghost-white-100 text-[1.5rem] ">
            {file?.name ? file.name : "Change Picture"}
          </Button>
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
          Maximum upload size is <b>1 MB</b>
        </p>

        <p>
          Member Since: <span className="font-semibold">29 September 2022</span>
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
              value={"James"}
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
              value={"Allan"}
              type="text"
              className="min-w-[25.5rem] min-h-[4.8rem] rounded-lg bg-ghost-white-100 text-dark-grayish-400 text-[1.5rem] 
            font-normal  py-[1.3rem] px-[2.4rem] border active:border-solid	active:border-dark-blue"
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
              value={"password"}
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
              value={"password"}
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
              value={"example@example.com"}
              type="email"
              className="min-w-[25.5rem] min-h-[4.8rem] rounded-lg bg-ghost-white-100 text-dark-grayish-400 text-[1.5rem]
             font-normal py-[1.3rem] px-[2.4rem] border active:border-solid	active:border-dark-blue"
            />
          </div>
          <Button btnProps=" bg-light-orange-500  px-4 font-bold  w-[25.5rem] text-ghost-white-100 text-[1.5rem] block ">
            Update Info
          </Button>
        </form>
      </section>
    </div>
  );
};

export default Settings;
