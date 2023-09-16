import AddFeedbackForm from "@/components/form/AddFeedbackForm";
import BackBtn from "@/components/ui/BackBtn";
import Button from "@/components/ui/button";
import useUser from "@/hooks/useUser";
import Image from "next/image";
import useUserSession from "@/hooks/useUserSession";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create New Feedback",
  description: "Creating the product feedback",
};

const CreateFeedback = () => {
  // const currentUser = user[0];

  return (
    <div className="bg-ghost-white-100 px-[2.4rem] py-[3.4rem] min-h-screen flex flex-col gap-20 md:px-[11.4rem] md:py-[5.6rem] lg:px-[25rem] lg:py-[11rem] xl:px-[45rem] xl:py-[18rem]">
      <BackBtn />
      <AddFeedbackForm />
    </div>
  );
};

export default CreateFeedback;
