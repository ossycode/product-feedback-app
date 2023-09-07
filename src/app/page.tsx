"use client";

import Button from "@/components/ui/button";
import SortButton from "@/components/ui/sortButton";
import SortPopup from "@/components/ui/sortPopup";
import Image from "next/image";
import { categories } from "@/constants/index";
import Header from "@/components/shared/Header";
import MobileNavbar from "@/components/shared/MobileNavbar";
import { useToggleNav } from "@/context/ToggleNavContext";
import SortByDiv from "@/components/ui/SortByDiv";
import FeedbackCard from "@/components/ui/FeedbackCard";
import NoFeedbackCard from "@/components/ui/NoFeedbackCard";

export default function Home() {
  return (
    <div className="min-h-screen overflow-scroll">
      <Header />
      <div className=" relative">
        <MobileNavbar />
        <SortByDiv />
      </div>
      <main className="py-[3.2rem] px-[2.4rem] main-body w-full flex flex-col gap-[1.6rem] overflow-scroll">
        <FeedbackCard />
        <FeedbackCard />

        <FeedbackCard />

        <NoFeedbackCard />
      </main>
    </div>
  );
}
