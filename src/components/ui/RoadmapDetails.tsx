"use client";

import { useState } from "react";
import RoadmapCard from "./RoadmapCard";
import useAllFeedbacks from "@/hooks/useAllFeedbacks";
import Spinner from "./Spinner";

const RoadmapDetails = () => {
  const { data, isLoading, mutate } = useAllFeedbacks();
  const [activeTab, setActiveTab] = useState<number>(0);

  if (isLoading) {
    return <Spinner />;
  }

  const { allFeedbacks } = data;
  console.log(allFeedbacks);

  const plannedFeedbacks = allFeedbacks.filter(
    (feedback: any) => feedback.status === "Planned"
  );
  const liveFeedbacks = allFeedbacks.filter(
    (feedback: any) => feedback.status === "Live"
  );
  const inProgressFeedbacks = allFeedbacks.filter(
    (feedback: any) => feedback.status === "In-Progress"
  );

  return (
    <>
      <div className="md:hidden">
        <ul className="flex items-center justify-between  px-14 text-roadmap-list border-b-2 border-comment-divide text-heading5 min-h-[5.9rem]">
          <li
            className={`border-b-4 min-h-[5.9rem] flex items-center gap-1  ${
              activeTab === 0
                ? "text-dark-grayish-400  border-light-orange-500"
                : "border-transparent"
            }`}
            onClick={() => setActiveTab(0)}
          >
            Planned <span>({plannedFeedbacks.length})</span>
          </li>
          <li
            className={` border-b-4 min-h-[5.9rem] flex items-center gap-1 
              ${
                activeTab === 1
                  ? "text-dark-grayish-400 border-light-purple-500"
                  : "border-transparent"
              }`}
            onClick={() => setActiveTab(1)}
          >
            In-Progress
            <span>({inProgressFeedbacks.length})</span>
          </li>
          <li
            className={`border-b-4 min-h-[5.9rem] flex items-center gap-1 
              ${
                activeTab === 2
                  ? "text-dark-grayish-400 border-light-blue-500"
                  : "border-transparent"
              }
            `}
            onClick={() => setActiveTab(2)}
          >
            Live <span> ({liveFeedbacks.length})</span>
          </li>
        </ul>
      </div>
      {/* md:flex gap-4 lg:gap-8 xl:gap-12 */}
      <div className="md:grid md:grid-cols-3 gap-x-4 lg:gap-x-8 xl:gap-x-12 ">
        <div
          //
          className={` flex-col gap-10 md:flex md:py-0 md:px-0 md:items-start md:justify-normal lg:gap-[3.2rem]
          ${
            activeTab === 0
              ? "flex py-10 px-9 items-center justify-center"
              : "hidden"
          }`}
        >
          <div className="w-full">
            <h1 className="text-heading3 text-dark-grayish-400 md:text-heading4 lg:text-heading3">
              Planned ({plannedFeedbacks.length})
            </h1>
            <p className="text-[1.3rem] text-light-gray-200 mt-1.5 md:text-[1.4rem] lg:text-sortButtonText">
              Ideas prioritized for research
            </p>
          </div>
          {plannedFeedbacks.map((feedback: any) => (
            <RoadmapCard
              key={feedback._id}
              id={feedback._id}
              svgColor="#F49F85"
              borderToColor="border-light-orange-500"
              category={feedback.category}
              title={feedback.title}
              description={feedback.description}
              status={feedback.status}
              upvotes={feedback.upvotes}
              comments={feedback.comments}
            />
          ))}
        </div>

        <div
          //
          className={`flex-col gap-10 md:flex md:py-0 md:px-0 md:items-start md:justify-normal lg:gap-[3.2rem] ${
            activeTab === 1
              ? "flex py-10 px-9 items-center justify-center"
              : "hidden"
          }`}
        >
          <div className="w-full">
            <h1 className="text-heading3 text-dark-grayish-400 md:text-heading4 lg:text-heading3">
              In-Progress ({inProgressFeedbacks.length})
            </h1>
            <p className="text-[1.3rem] text-light-gray-200 mt-1.5 md:text-[1.4rem] lg:text-sortButtonText">
              Features currently being developed
            </p>
          </div>
          {inProgressFeedbacks.map((feedback: any) => (
            <RoadmapCard
              id={feedback._id}
              key={feedback._id}
              svgColor="#AD1FEA"
              borderToColor="border-light-purple-500"
              category={feedback.category}
              title={feedback.title}
              description={feedback.description}
              status={feedback.status}
              upvotes={feedback.upvotes}
              comments={feedback.comments}
            />
          ))}
        </div>

        <div
          // g
          className={`flex-col gap-10 md:flex md:py-0 md:px-0 md:items-start md:justify-normal  lg:gap-[3.2rem]  ${
            activeTab === 2
              ? "flex py-10 px-9 items-center justify-center"
              : "hidden"
          }  `}
        >
          <div className="w-full">
            <h1 className="text-heading3 text-dark-grayish-400 md:text-heading4 lg:text-heading3">
              Live ({liveFeedbacks.length})
            </h1>
            <p className="text-[1.3rem] text-light-gray-200 mt-1.5 md:text-[1.4rem] lg:text-sortButtonText">
              Released features
            </p>
          </div>

          {liveFeedbacks.map((feedback: any) => (
            <RoadmapCard
              key={feedback._id}
              id={feedback._id}
              svgColor="#62BCFA"
              borderToColor="border-light-blue-500"
              category={feedback.category}
              title={feedback.title}
              description={feedback.description}
              status={feedback.status}
              upvotes={feedback.upvotes}
              comments={feedback.comments}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default RoadmapDetails;
