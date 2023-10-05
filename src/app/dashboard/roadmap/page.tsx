import BackBtn from "@/components/ui/BackBtn";
import RoadmapDetails from "@/components/ui/RoadmapDetails";
import Spinner from "@/components/ui/Spinner";
import { getFeedbacks } from "@/hooks/useFeedbacks";
import { Metadata } from "next";
import Link from "next/link";
import { use } from "react";

export const metadata: Metadata = {
  title: "Roadmap - Product Feedback App ",
  description: "Product feedback app",
};

const RoadmapPage = () => {
  const { allFeedbacks } = use(getFeedbacks());

  if (allFeedbacks === undefined) {
    return <Spinner />;
  }
  return (
    <div className="bg-ghost-white-100 w-full min-h-screen md:py-[5.6rem] md:px-16 md:flex md:flex-col md:gap-[3.2rem] lg:gap-[4.8rem]  lg:px-28 xl:py-[7.8rem] xl:px-[16.5rem]">
      <div className="bg-[#373F68] w-full py-10 sm:py-12 px-9 flex items-center justify-between md:rounded-2xl ">
        <div className="flex flex-col text-clr-white items-start justify-center">
          <BackBtn btnColor="text-clr-white" arrowColor="#CDD2EE" />
          <h1 className="text-heading3 lg:text-heading1">Roadmap</h1>
        </div>
        <Link
          className=" bg-light-purple-500 py-4 px-6 font-bold  w-max text-light-purple-100 text-[1.3rem] mt-6 md:px-8 md:py-5 md:text-[1.4rem] rounded-2xl lg:px-9 "
          href={"/dashboard/feedback/new"}
        >
          + Add Feedback
        </Link>
      </div>

      <RoadmapDetails allFeedbacks={allFeedbacks} />
    </div>
  );
};

export default RoadmapPage;
