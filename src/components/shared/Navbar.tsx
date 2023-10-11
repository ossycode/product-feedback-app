import React from "react";
import Categories from "../ui/Categories";
import Roadmap from "../ui/Roadmap";
import Avatar from "../ui/Avatar";
import LogoutBtn from "../ui/LogoutBtn";
import { fetchFeedbacks } from "@/lib/actions/feedback.actions";
import { GetSingleUserByUsername } from "@/lib/actions/user.actions";

export async function Navbar() {
  const { totalInProgressCount, totalPlannedCount, totalLiveCount } =
    await JSON.parse(JSON.stringify(await fetchFeedbacks({})));

  const user = await JSON.parse(
    JSON.stringify(await GetSingleUserByUsername())
  );

  // console.log(user);

  return (
    <nav className="hidden md:flex items-center justify-between gap-4 pt-[5.6rem] pb-[4rem] px-[3.9rem] bg-ghost-white-100 lg:flex-col lg:col-start-1 lg:col-end-3 lg:pb-0 lg:pt-6 lg:gap-10 lg:justify-normal lg:px-4">
      <div className="mobileHeader min-w-[22.3rem] min-h-[17.8rem] rounded-2xl p-[2.3rem]  flex flex-col justify-between lg:w-[25.5rem] lg:h-[17rem]">
        <div>
          <h1 className="text-clr-white tracking-[-0.0187rem] text-heading2">
            Frontend Mentor
          </h1>
          <h2 className="text-clr-white text-[1.5rem] font-medium	opacity-75	">
            Feedback Board
          </h2>
        </div>

        <div className="flex item-center justify-between">
          <Avatar user={user} />
          <LogoutBtn />
        </div>
      </div>
      <Categories />

      <Roadmap
        totalInProgressCount={totalInProgressCount}
        totalPlannedCount={totalPlannedCount}
        totalLiveCount={totalLiveCount}
      />
    </nav>
  );
}

export default Navbar;
