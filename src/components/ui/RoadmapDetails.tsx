"use client";

import { useState } from "react";
import RoadmapCard from "./RoadmapCard";

const RoadmapDetails = ({
  allLiveFeedbacks,
  allInProgressFeedbacks,
  allPlannedFeedbacks,
  totalInProgressCount,
  totalPlannedCount,
  totalLiveCount,
}: any) => {
  const [activeTab, setActiveTab] = useState<number>(0);

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
            Planned <span>({totalPlannedCount})</span>
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
            <span>({totalInProgressCount})</span>
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
            Live <span> ({totalLiveCount})</span>
          </li>
        </ul>
      </div>
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
              Planned ({totalPlannedCount})
            </h1>
            <p className="text-[1.3rem] text-light-gray-200 mt-1.5 md:text-[1.4rem] lg:text-sortButtonText">
              Ideas prioritized for research
            </p>
          </div>
          {allPlannedFeedbacks.map((feedback: any) => (
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
              thread={feedback.thread}
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
              In-Progress ({totalInProgressCount})
            </h1>
            <p className="text-[1.3rem] text-light-gray-200 mt-1.5 md:text-[1.4rem] lg:text-sortButtonText">
              Features currently being developed
            </p>
          </div>
          {allInProgressFeedbacks.map((feedback: any) => (
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
              thread={feedback.thread}
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
              Live ({totalLiveCount})
            </h1>
            <p className="text-[1.3rem] text-light-gray-200 mt-1.5 md:text-[1.4rem] lg:text-sortButtonText">
              Released features
            </p>
          </div>

          {allLiveFeedbacks.map((feedback: any) => (
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
              thread={feedback.thread}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default RoadmapDetails;
