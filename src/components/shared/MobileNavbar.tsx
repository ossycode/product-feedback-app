"use client";

import { useToggleNav } from "@/context/ToggleNavContext";
import Categories from "../ui/Categories";
import Roadmap from "../ui/Roadmap";
import Avatar from "../ui/Avatar";
import LogoutBtn from "../ui/LogoutBtn";
import { useEffect, useRef } from "react";

interface Props {
  totalInProgressCount: number;
  totalPlannedCount: number;
  totalLiveCount: number;
  user: any[];
}

const MobileNavbar = ({
  totalInProgressCount,
  totalPlannedCount,
  totalLiveCount,
  user,
}: Props) => {
  const { isNavOpen, toggleNavbar } = useToggleNav();
  const ref = useRef<HTMLDivElement | null>(null);

  return (
    <>
      {isNavOpen && (
        <nav
          className={`${
            isNavOpen ? "min-h-screen animate-nav-up" : "animate-nav-down"
          } w-full absolute top-0 bottom-0 transition-all delay-150 duration-300  bg-nav-opc `}
          onClick={toggleNavbar}
          ref={ref}
        >
          <div
            className=" bg-ghost-white-100 h-full w-[27.1rem] float-right z-30 p-[2.4rem] flex flex-col gap-9"
            onClick={(e) => e.stopPropagation()}
          >
            <Categories />
            <Roadmap
              totalInProgressCount={totalInProgressCount}
              totalPlannedCount={totalPlannedCount}
              totalLiveCount={totalLiveCount}
            />

            <Avatar user={user} />

            <LogoutBtn />
          </div>
        </nav>
      )}
    </>
  );
};

export default MobileNavbar;
