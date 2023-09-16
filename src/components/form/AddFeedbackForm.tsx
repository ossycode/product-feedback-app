"use client";

import Image from "next/image";
import Categories from "../ui/Categories";
import FormRow from "../ui/FormRow";
import Button from "../ui/button";
import SortPopup from "../ui/sortPopup";
import { categories } from "@/constants";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { FeedbackValidation } from "@/lib/validations/feedback";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";
import { useCurrentCategory } from "@/context/CategoryContext";
import { Status } from "@/lib/enum";
import useUserSession from "@/hooks/useUserSession";
import toast from "react-hot-toast";
import MiniSpinner from "../ui/MiniSpinner";

const AddFeedbackForm = () => {
  type FeedbackValidationSchemaType = z.infer<typeof FeedbackValidation>;
  // const [category, setCategory] = useState<string>();
  const router = useRouter();
  const { category } = useCurrentCategory();
  const currentUser = useUserSession();
  const pathname = usePathname();

  const {
    handleSubmit,
    register,
    formState: { errors, isLoading },
  } = useForm<FeedbackValidationSchemaType>({
    resolver: zodResolver(FeedbackValidation),
    defaultValues: {
      title: "",
      // accountId: userId,
      description: "",
    },
  });

  function handleCancel(e: React.FormEvent<HTMLButtonElement>) {
    e.preventDefault();
    router.back();
  }

  const onHandleSubmit: SubmitHandler<FeedbackValidationSchemaType> = async (
    data
  ) => {
    try {
      const res = await fetch("/api/feedbacks/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: data.title,
          description: data.description,
          upvotes: 0,
          category: category,
          status: Status.Suggestion,
          path: pathname,
          author: currentUser._id,
        }),
      });
      if (res.ok) {
        toast.success("Feedback created successfully");
        router.push("/dashboard");
      } else {
        toast.error("Something went wrong!");
        console.log("Feedback creation failed");
      }
    } catch (err: Error | any) {
      console.log(`${err.code}: Error Feedback creation`);
    }
  };

  return (
    <div className="bg-clr-white px-9 pb-16 md:px-16 text-dark-grayish-400 rounded-2xl ">
      <Image
        src={"/assets/shared/icon-new-feedback.svg"}
        alt="edit"
        width={40}
        height={40}
        className="translate-y-[-2rem]	"
      />
      <h1 className="text-heading3 xl:text-heading1 mb-9 md:mb-16">
        Create New Feedback
      </h1>
      <form
        className="flex flex-col gap-10"
        onSubmit={handleSubmit(onHandleSubmit)}
      >
        <label
          htmlFor="feedbackTitle"
          className="block text-heading5 xl:text-heading4 "
        >
          Feedback Title
          <span className="block font-normal leading-normal text-light-gray-200 mt-1">
            Add a shot, descriptive headline
          </span>
          <input
            id="feedbackTitle"
            type="text"
            className={`signupform-input 	mt-6  min-w-full  ${
              errors.title?.message && "border-red-600"
            }`}
            {...register("title")}
          />
          <span>
            {errors.title?.message && (
              <span className="text-[#D73737] text-[1.4rem]">
                {errors.title.message}
              </span>
            )}
          </span>
        </label>

        <label
          htmlFor="feedbackCategory"
          className="block text-heading5 xl:text-heading4"
        >
          Category
          <span className="block font-normal leading-normal	text-light-gray-200 mt-1">
            Choose a category for your feedback
          </span>
          <SortPopup
            ArrayData={categories}
            popupProps="text 	"
            titleProps="font-normal justify-between text-[1.3rem]"
            imageSize={10}
            sortbyProps="hidden"
            titleDivProps="signupform-input mt-6  min-w-full "
          />
        </label>

        <label
          htmlFor="feedbackdetails"
          className="block text-heading5 xl:text-heading4"
        >
          Feedback Detail
          <span className="block font-normal leading-normal text-light-gray-200 mt-1	">
            Include any specific comments on what should be improved, added, etc
          </span>
          <textarea
            id="feedbackdetails"
            className={`signupform-input	mt-6 min-w-full min-h-[12rem] ${
              errors.description?.message && "border border-red-600"
            }`}
            {...register("description")}
          />
          <span>
            {errors.description?.message && (
              <span className="text-[#D73737] text-[1.4rem]">
                {errors.description.message}
              </span>
            )}
          </span>
        </label>

        <div className="flex flex-col gap-6 mt-9 md:flex-row-reverse ">
          <button
            className="bg-light-purple-500 new-form-btn "
            disabled={isLoading}
          >
            Add Feedback
          </button>
          <button
            className="bg-dark-grayish-400 new-form-btn  "
            onClick={(e) => handleCancel(e)}
            disabled={isLoading}
          >
            {isLoading ? <MiniSpinner /> : "Cancel"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddFeedbackForm;
