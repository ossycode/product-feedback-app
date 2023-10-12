"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import FormRow from "../ui/FormRow";
import { UserValidation } from "@/lib/validations/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import "@uploadthing/react/styles.css";
import { useUploadThing } from "@/lib/uploadthing";
import toast from "react-hot-toast";
import MiniSpinner from "../ui/MiniSpinner";

const RegisterForm = () => {
  type UserValidationSchemaType = z.infer<typeof UserValidation>;

  const router = useRouter();
  const [error, setError] = useState<string>();
  const [imageFile, setImageFile] = useState<File>();
  const { startUpload } = useUploadThing("profileImage");
  // const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isValidating },
  } = useForm<UserValidationSchemaType>({
    resolver: zodResolver(UserValidation),
  });

  const onHandleSubmit: SubmitHandler<UserValidationSchemaType> = async (
    data
  ) => {
    try {
      const existuserResponse = await fetch("/api/auth/userExists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          username: data.username.toLowerCase(),
        }),
      });

      const { user } = await existuserResponse.json();

      if (user) {
        setError("User already exist");
        toast.error("User already exist");
        // console.log("User already exist");

        return;
      }

      const imgResponse = await startUpload([imageFile!]);

      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.fullName,
          email: data.email,
          password: data.password,
          username: data.username.toLowerCase(),
          avatar: imgResponse?.[0].url,
        }),
      });
      if (res.ok) {
        toast.success("Account has been created!");
        router.push("/login?success=Account has been created");
      } else {
        console.log("User registration failed");
      }
    } catch (err: Error | any) {
      console.log(`${err.code}: Error during registration`);
    }
  };

  return (
    <div className="py-24  px-8 sm:px-16  flex items-center justify-around min-h-screen ">
      <section className="flex flex-col gap-20">
        <h1 className="heading1">Please sign up to leave a feedback</h1>

        <form
          className="flex flex-col gap-10"
          onSubmit={handleSubmit(onHandleSubmit)}
        >
          <FormRow label="Full Name" error={errors.fullName?.message}>
            <input
              id="name"
              placeholder="Full name..."
              type="text"
              className={`signupform-input w-full ${
                errors.fullName?.message && "border-red-600"
              }`}
              {...register("fullName")}
            />
          </FormRow>
          <FormRow label="Username" error={errors.username?.message}>
            <input
              id="username"
              placeholder="Username..."
              type="text"
              className={`signupform-input w-full  ${
                errors.username?.message && "border-red-600"
              } `}
              {...register("username")}
            />
          </FormRow>

          <FormRow label="Email" error={errors.email?.message}>
            <input
              id="email"
              placeholder="Email..."
              type="email"
              className={`signupform-input w-full   ${
                errors.email?.message && "border-red-600"
              } `}
              {...register("email")}
            />
          </FormRow>

          <FormRow label="Password" error={errors.password?.message}>
            <input
              id="password"
              placeholder="Password..."
              type="password"
              className={`signupform-input w-full  ${
                errors.password?.message && "border-red-600"
              } `}
              {...register("password")}
            />
          </FormRow>

          <FormRow
            label="Confirm password"
            error={errors.confirmPassword?.message}
          >
            <input
              id="confirmPassword"
              placeholder="Confirm password.."
              type="password"
              className={`signupform-input w-full   ${
                errors.confirmPassword?.message && "border-red-600"
              } `}
              {...register("confirmPassword")}
            />
          </FormRow>

          <FormRow label="Profile picture" error={""}>
            <input
              id="avatar"
              type="file"
              accept="image/*"
              className={`signupform-input w-full  `}
              onChange={(e) => setImageFile(e.target?.files?.[0])}
              // {...register("avatar")}
            />
          </FormRow>

          {/* w-[25.5rem] */}
          <button
            className=" bg-dark-grayish-400 py-4 px-4 font-bold  text-ghost-white-100 text-[1.5rem] block rounded-2xl md:w-full mt-8"
            disabled={isSubmitting || isValidating}
          >
            {isSubmitting || isValidating ? <MiniSpinner /> : "Sign up"}
          </button>
        </form>
        <p className="text-dark-grayish-400  text-[1.6rem] font-normal mt-[-2rem] ">
          Have an account?{" "}
          <Link
            className="text-dark-blue font-semibold"
            href="./login"
            aria-disabled={isSubmitting}
          >
            Sign-in
          </Link>
        </p>
      </section>

      <div className="max-md:hidden items-center justify-center h-full">
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
export default RegisterForm;
