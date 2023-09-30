import React from "react";
import Categories from "../ui/Categories";
import Roadmap from "../ui/Roadmap";
import Avatar from "../ui/Avatar";
import LogoutBtn from "../ui/LogoutBtn";

const Navbar = () => {
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
          <Avatar />
          <LogoutBtn />
        </div>
      </div>
      <Categories />

      <Roadmap />
    </nav>
  );
};

export default Navbar;
