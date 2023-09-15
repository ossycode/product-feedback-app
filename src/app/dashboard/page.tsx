"use client";

import Header from "@/components/shared/Header";
import Main from "@/components/shared/Main";
import MobileNavbar from "@/components/shared/MobileNavbar";
import Navbar from "@/components/shared/Navbar";
import FeedbackCard from "@/components/ui/FeedbackCard";
import NoFeedbackCard from "@/components/ui/NoFeedbackCard";
import SortByDiv from "@/components/ui/SortByDiv";
import { signOut } from "next-auth/react";
import Link from "next/link";

// lg:px-[16.5rem] lg:py-[9.4rem]
const Dashboard = () => {
  return (
    <div className="min-h-screen lg:grid lg:grid-cols-7 lg:py-[9.4rem] bg-ghost-white-100  xl:px-[10.5rem] lg:px-[3rem] ">
      <Header />
      <Navbar />
      <div className=" relative min-h-screen bg-ghost-white-100  md:px-[3.9rem] lg:col-start-3 lg:col-end-8 lg:pt-6 lg:px-1  ">
        <MobileNavbar />
        <SortByDiv />
        <Main />
      </div>
    </div>
  );
};

export default Dashboard;
