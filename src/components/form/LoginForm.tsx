"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { startTransition, useEffect, useState } from "react";
import Image from "next/image";
import MiniSpinner from "../ui/MiniSpinner";

const LoginForm = () => {
  const [username, setUserName] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      if (username === undefined || password === undefined) {
        setError("Username and password are required");
        return;
      }

      const res = await signIn("credentials", {
        username: username.toLowerCase(),
        password,
        redirect: false,
      });

      if (res?.error) {
        setError("Invalid Credentials");
        return;
      }
      startTransition(() => router.push("/dashboard"));
      router.replace("/dashboard");
    } catch (error) {
      // console.log(error);
    } finally {
      setIsLoading(false);
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
            // className="min-w-[25.5rem] min-h-[4.8rem] rounded-lg bg-ghost-white-100 text-dark-grayish-400 text-[1.5rem]
            //   font-normal  py-[1.3rem] px-[2.4rem] border active:border-solid	active:border-dark-blue"
            className={`signupform-input ${
              error && "border-red-600"
            } max-md:w-full`}
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
            // className="min-w-[25.5rem] min-h-[4.8rem] rounded-lg bg-ghost-white-100 text-dark-grayish-400 text-[1.5rem]
            //    font-normal py-[1.3rem] px-[2.4rem] border active:border-solid	active:border-dark-blue"
            className={`signupform-input ${
              error && "border-red-600"
            } max-md:w-full`}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <span className="text-[#D73737] text-[1.4rem] block">{error}</span>
          )}

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

      <div className=" items-center justify-center h-full max-md:hidden md:flex  ">
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
