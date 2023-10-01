import Header from "@/components/shared/Header";
import Main from "@/components/shared/Main";
import MobileNavbar from "@/components/shared/MobileNavbar";
import Navbar from "@/components/shared/Navbar";
import Categories from "@/components/ui/Categories";
import SortByDiv from "@/components/ui/SortByDiv";
import useAllFeedbacks from "@/hooks/useAllFeedbacks";
import { getFeedbacks } from "@/hooks/useFeedbacks";
import { getServerSession } from "next-auth";
import { useSearchParams } from "next/navigation";
import { use } from "react";

const Dashboard = () => {
  const { allFeedbacks } = use(getFeedbacks());

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-7 lg:py-[9.4rem] bg-ghost-white-100  xl:px-[10.5rem] lg:px-[3rem] ">
      <Header />
      <Navbar />

      <div className=" relative min-h-screen bg-ghost-white-100  md:px-[3.9rem] lg:col-start-3 lg:col-end-8 lg:pt-6 lg:px-1  ">
        <MobileNavbar />
        <Main allFeedbacks={allFeedbacks} />
      </div>
    </div>
  );
};

export default Dashboard;
