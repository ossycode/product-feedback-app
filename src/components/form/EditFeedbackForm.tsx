"use client";

import { useState, useCallback } from "react";
import MiniSpinner from "../ui/MiniSpinner";
import Image from "next/image";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import SortPopup from "../ui/sortPopup";
import { categories } from "@/constants";
import { RoadMapStatus } from "@/constants";
import {
  useRouter,
  usePathname,
  useSearchParams,
  useParams,
} from "next/navigation";
import toast from "react-hot-toast";
import useAuthor from "@/hooks/useAuthor";

interface Props {
  title: string;
  description: string;
  category: string;
  status: string;
}

const EditFeedbackForm = ({ title, description, category, status }: Props) => {
  const [currentCat, setCurrentCat] = useState<string>();
  const [roadmapStatus, setRoadmapStatus] = useState<string>();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();

  const getSelectedCategory = (currentCat: string): void => {
    setCurrentCat(currentCat);
  };

  function handleCancel(e: React.FormEvent<HTMLButtonElement>) {
    e.preventDefault();
    router.back();
  }

  const getSelectedRoadMapStatus = (roadmapStatus: string): void => {
    setRoadmapStatus(roadmapStatus);
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  if (!params.id) {
    console.log("No Feedback Id");
  }
  // const id = params.id.toString();

  // const isAuthor = useAuthor(id);

  const onHandleSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await fetch(`/api/feedbacks/${params.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: data.title,
          description: data.description,
          status: roadmapStatus,
          category: currentCat,
          path: pathname,
        }),
      });
      if (res.ok) {
        toast.success("Feedback created successfully");
        router.push(`/dashboard/feedback/${params.id}`);
      } else {
        toast.error("Something went wrong!");
        console.log("Feedback update failed");
      }
    } catch (err: Error | any) {
      console.log(`${err.code}: Error update creation`);
    } finally {
      // setIsLoading(false);
    }
  };

  return (
    <div className="bg-clr-white px-9 pb-16 md:px-16 text-dark-grayish-400 rounded-2xl ">
      <Image
        src={"/assets/shared/icon-edit-feedback.svg"}
        alt="edit"
        width={40}
        height={40}
        className="translate-y-[-2rem]	"
      />
      <h1 className="text-heading3 xl:text-heading1 mb-9 md:mb-16">
        Editing &apos;{title}&apos;
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
            defaultValue={title}
            className={`signupform-input 	mt-6  min-w-full  ${
              errors.title?.message && "border-red-600"
            }`}
            {...register("title")}
          />
          <span>
            {errors.title?.message && (
              <span className="text-[#D73737] text-[1.4rem]">
                {/* {errors.title.message} */}
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
            handleSelected={getSelectedCategory}
            defaultValue={category}
          />
          <label
            htmlFor="feedbackStatus"
            className="block text-heading5 xl:text-heading4"
          >
            Update Status
            <span className="block font-normal leading-normal	text-light-gray-200 mt-1">
              Change feature state
            </span>
            <SortPopup
              ArrayData={RoadMapStatus}
              popupProps="text 	"
              titleProps="font-normal justify-between text-[1.3rem]"
              imageSize={10}
              sortbyProps="hidden"
              titleDivProps="signupform-input mt-6  min-w-full "
              handleSelected={getSelectedRoadMapStatus}
              defaultValue={status}
            />
          </label>
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
            defaultValue={description}
            {...register("description")}
          />
          <span>
            {errors.description?.message && (
              <span className="text-[#D73737] text-[1.4rem]">
                {/* {errors.description.message} */}
              </span>
            )}
          </span>
        </label>

        <div className="flex items-center flex-row-reverse justify-between">
          <div className="flex flex-col gap-6 md:flex-row-reverse ">
            <button
              className="bg-light-purple-500 new-form-btn "
              disabled={isSubmitting}
            >
              {isSubmitting ? <MiniSpinner /> : "Add Feedback"}
            </button>
            <button
              className="bg-dark-grayish-400 new-form-btn  "
              onClick={(e) => handleCancel(e)}
              disabled={isSubmitting}
            >
              Cancel
            </button>
          </div>
          <button
            className="bg-light-orange-500 new-form-btn  "
            // onClick={(e) => handleCancel(e)}
            disabled={isSubmitting}
          >
            Delete
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditFeedbackForm;
