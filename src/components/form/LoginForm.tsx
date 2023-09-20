"use client";

import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Button from "../ui/button";
import Image from "next/image";
import MiniSpinner from "../ui/MiniSpinner";

const LoginForm = () => {
  const [username, setUserName] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const session = useSession();
  const router = useRouter();

  // useEffect(() => {
  //   if (session.status === "authenticated") {
  //     router.push("/dashboard");
  //   }
  // }, [session.status, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const res = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError("Invalid Credentials");
        return;
      }
      router.replace("dashboard");
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="py-24 px-48 flex items-center justify-around h-screen">
      <div className="flex flex-col gap-20">
        <h1 className="heading1">Please sign in to leave a feedback</h1>

        <form onSubmit={handleSubmit}>
          <label
            htmlFor="username"
            className="text-dark-grayish-400  text-[1.6rem] font-normal opacity-75 block"
          >
            Enter your username
          </label>
          <input
            id="username"
            placeholder="Username..."
            type="text"
            className="min-w-[25.5rem] min-h-[4.8rem] rounded-lg bg-ghost-white-100 text-dark-grayish-400 text-[1.5rem] 
              font-normal  py-[1.3rem] px-[2.4rem] border active:border-solid	active:border-dark-blue"
            onChange={(e) => setUserName(e.target.value)}
          />

          <label
            htmlFor="password"
            className="text-dark-grayish-400  text-[1.6rem] font-normal opacity-75 block mt-8"
          >
            Enter your password
          </label>
          <input
            id="password"
            placeholder="Password..."
            type="password"
            className="min-w-[25.5rem] min-h-[4.8rem] rounded-lg bg-ghost-white-100 text-dark-grayish-400 text-[1.5rem]
               font-normal py-[1.3rem] px-[2.4rem] border active:border-solid	active:border-dark-blue"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className=" bg-dark-grayish-400 py-4 px-4 font-bold  w-[25.5rem] text-ghost-white-100 text-[1.5rem] block mt-16 rounded-2xl"
            disabled={isLoading}
          >
            {isLoading ? <MiniSpinner /> : " Login"}
          </button>
        </form>
        <p className="text-dark-grayish-400  text-[1.6rem] font-normal ">
          Don&apos;t have an account yet?{" "}
          <Link className="text-dark-blue font-semibold" href="./register">
            sign-up
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
    </div>
  );
};

export default LoginForm;
