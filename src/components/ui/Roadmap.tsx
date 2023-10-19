import Link from "next/link";

const Roadmap = ({
  totalInProgressCount,
  totalPlannedCount,
  totalLiveCount,
}: {
  totalInProgressCount: number;
  totalPlannedCount: number;
  totalLiveCount: number;
}) => {
  return (
    <div className="bg-clr-white min-w-[22.3rem] min-h-[17.8rem] p-4 rounded-2xl lg:w-[25.5rem] lg:h-[17rem] ">
      <div className="flex items-center justify-between lg:px-6">
        <h1 className="text-heading3  text-dark-grayish-400">Roadmap</h1>
        <Link
          href={"/dashboard/roadmap"}
          className="text-dark-blue text-body3 underline "
        >
          View
        </Link>
      </div>

      <ul className="mt-[2.4rem] flex flex-col gap-2 list-disc  pl-5  lg:px-8 ">
        <li className="text-light-gray-200 marker:text-light-orange-500 md:marker:text-[1.5rem] ">
          <span className="text-sortButtonText ">Planned</span>
          <span className="roadmapNub">{totalPlannedCount}</span>
        </li>
        <li className="text-light-gray-200 marker:text-light-purple-500 md:marker:text-[1.5rem]">
          <span className="text-sortButtonText">In-Progress</span>
          <span className="roadmapNub">{totalInProgressCount}</span>
        </li>
        <li className="text-light-gray-200 marker:text-light-blue-500 md:marker:text-[1.5rem]">
          <span className="text-sortButtonText ">Live</span>

          <span className="roadmapNub">{totalLiveCount}</span>
        </li>
      </ul>
    </div>
  );
};

export default Roadmap;
