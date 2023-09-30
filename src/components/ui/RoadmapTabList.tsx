import React from "react";
import RoadmapCard from "./RoadmapCard";

interface Props {
  title: string;
  totalFeedback: number;
  description: string;
  svgColor: string;
  borderToColor: string;
}

const RoadmapTabList = ({ title, description, totalFeedback }: Props) => {
  return (
    <div>
      <h1 className="text-heading3 text-dark-grayish-400">
        {title} ({totalFeedback})
      </h1>
      <p className="text-[1.3rem] text-light-gray-200 mt-1.5">{description}</p>
    </div>
  );
};

export default RoadmapTabList;
