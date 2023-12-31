import BackBtn from "@/components/ui/BackBtn";
import RoadmapDetails from "@/components/ui/RoadmapDetails";
import { fetchFeedbacks } from "@/lib/actions/feedback.actions";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Roadmap - Product Feedback App ",
  description: "Product feedback app",
};

const RoadmapPage = async () => {
  const {
    allLiveFeedbacks,
    allInProgressFeedbacks,
    allPlannedFeedbacks,
    totalInProgressCount,
    totalPlannedCount,
    totalLiveCount,
  } = await JSON.parse(JSON.stringify(await fetchFeedbacks({})));

  return (
    <div className="bg-ghost-white-100 w-full min-h-screen md:py-[5.6rem] md:px-16 md:flex md:flex-col md:gap-[3.2rem] lg:gap-[4.8rem]  lg:px-28 xl:py-[7.8rem] xl:px-[16.5rem]">
      <div className="bg-[#373F68] w-full py-8 sm:py-12 px-9 flex items-center justify-between md:rounded-2xl ">
        <div className="flex flex-col text-clr-white items-start justify-center">
          <BackBtn btnColor="text-clr-white" arrowColor="#CDD2EE" />
          <h1 className="text-heading3 md:text-heading1">Roadmap</h1>
        </div>
        <Link
          className=" bg-light-purple-500 py-4 px-6 font-bold  w-max text-light-purple-100 text-[1.3rem] mt-6 md:px-8 md:py-5 md:text-[1.4rem] rounded-2xl lg:px-9 "
          href={"/dashboard/feedback/new"}
        >
          + Add Feedback
        </Link>
      </div>

      <RoadmapDetails
        allLiveFeedbacks={allLiveFeedbacks}
        allInProgressFeedbacks={allInProgressFeedbacks}
        allPlannedFeedbacks={allPlannedFeedbacks}
        totalInProgressCount={totalInProgressCount}
        totalPlannedCount={totalPlannedCount}
        totalLiveCount={totalLiveCount}
      />
    </div>
  );
};

export default RoadmapPage;
