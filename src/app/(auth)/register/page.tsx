"use client";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/button";
import { createUser } from "@/lib/actions/user.actions";
import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";

const Page = () => {
  const { handleSubmit, register } = useForm();
  const [file, setFile] = useState<File>();

  async function onSubmit({ name, username, password }: any) {
    console.log(file);
    console.log(JSON.stringify(file));

    await createUser({
      name,
      username,
      password,
      avatar: file?.toString(),
    });
  }
  return (
    <div className="py-24 px-48 flex items-center justify-around h-screen">
      <div className="flex flex-col gap-20">
        <h1 className="heading1">Please sign up to leave a feedback</h1>

        <form
          className="flex flex-col gap-10"
          onSubmit={handleSubmit(onSubmit)}
        >
          <label htmlFor="name">
            <input
              id="name"
              placeholder="Full name..."
              type="text"
              className="min-w-[25.5rem] min-h-[4.8rem] rounded-lg bg-ghost-white-100 text-dark-grayish-400 text-[1.5rem] 
            font-normal  py-[1.3rem] px-[2.4rem] border active:border-solid	active:border-dark-blue"
              {...register("name")}
            />
          </label>

          <label htmlFor="username">
            <input
              id="username"
              placeholder="Username..."
              type="text"
              className="min-w-[25.5rem] min-h-[4.8rem] rounded-lg bg-ghost-white-100 text-dark-grayish-400 text-[1.5rem] 
            font-normal  py-[1.3rem] px-[2.4rem] border active:border-solid	active:border-dark-blue"
              {...register("username")}
            />
          </label>

          <label htmlFor="password">
            <input
              id="password"
              placeholder="Password..."
              type="password"
              className="min-w-[25.5rem] min-h-[4.8rem] rounded-lg bg-ghost-white-100 text-dark-grayish-400 text-[1.5rem]
             font-normal py-[1.3rem] px-[2.4rem] border active:border-solid	active:border-dark-blue"
              {...register("password")}
            />
          </label>

          <label htmlFor="confirmPassword">
            <input
              id="confirmPassword"
              placeholder="Confirm password.."
              type="password"
              className="min-w-[25.5rem] min-h-[4.8rem] rounded-lg bg-ghost-white-100 text-dark-grayish-400 text-[1.5rem]
             font-normal py-[1.3rem] px-[2.4rem] border active:border-solid	active:border-dark-blue"
              {...register("confirmPassword")}
            />
          </label>

          <label htmlFor="image">
            <input
              type="file"
              id="image"
              accept="image/*"
              className="min-w-[25.5rem] min-h-[4.8rem] rounded-lg bg-ghost-white-100 text-dark-grayish-400 text-[1.5rem]
             font-normal py-[1.3rem] px-[2.4rem] border active:border-solid	active:border-dark-blue block"
              {...register("avatar")}
              onChange={(e) => setFile(e.target.files?.[0])}
            />
          </label>

          <Button btnProps=" bg-dark-grayish-400 py-4 px-4 font-bold  w-[25.5rem] text-ghost-white-100 text-[1.5rem] block mt-16">
            Sign up
          </Button>
        </form>
        <p className="text-dark-grayish-400  text-[1.6rem] font-normal ">
          Have an account?{" "}
          <Link className="text-dark-blue font-semibold" href="./login">
            sign-in
          </Link>
        </p>
      </div>

      <div className="flex items-center justify-center h-full ">
        <Image
          src="/assets/suggestions/illustration-empty.svg"
          alt="empty illustration"
          width={200}
          height={200}
        />
      </div>

      <div>
        {/* <Image src={file} alt="test" width={200} height={200} /> */}
      </div>
    </div>
  );
};

export default Page;
