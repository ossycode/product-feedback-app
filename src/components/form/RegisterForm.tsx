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

const RegisterForm = () => {
  type UserValidationSchemaType = z.infer<typeof UserValidation>;

  const router = useRouter();
  const [error, setError] = useState<string>();
  const [imageFile, setImageFile] = useState<File>();
  const { startUpload } = useUploadThing("profileImage");

  const {
    handleSubmit,
    register,
    formState: { errors },
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
        body: JSON.stringify({ email: data.email, username: data.username }),
      });

      const { user } = await existuserResponse.json();

      if (user) {
        setError("User already exist");
        console.log("User already exist");

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
          username: data.username,
          avatar: imgResponse?.[0].url,
        }),
      });
      if (res.ok) {
        router.push("/login?success=Account has been created");
      } else {
        console.log("User registration failed");
      }
    } catch (err: Error | any) {
      console.log(`${err.code}: Error during registration`);
    }
  };

  return (
    <div className="py-24 px-48 flex items-center justify-around min-h-screen ">
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
              className={`signupform-input ${
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
              className={`signupform-input ${
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
              className={`signupform-input ${
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
              className={`signupform-input ${
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
              className={`signupform-input ${
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
              className={`signupform-input`}
              onChange={(e) => setImageFile(e.target?.files?.[0])}
              // {...register("avatar")}
            />
          </FormRow>

          <button className=" bg-dark-grayish-400 py-4 px-4 font-bold  w-[25.5rem] text-ghost-white-100 text-[1.5rem] block">
            Sign up
          </button>
        </form>
        <p className="text-dark-grayish-400  text-[1.6rem] font-normal ">
          Have an account?{" "}
          <Link className="text-dark-blue font-semibold" href="./login">
            Sign-in
          </Link>
        </p>
      </section>

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
export default RegisterForm;
