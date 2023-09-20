import Header from "@/components/shared/Header";
import Main from "@/components/shared/Main";
import MobileNavbar from "@/components/shared/MobileNavbar";
import Navbar from "@/components/shared/Navbar";
import SortByDiv from "@/components/ui/SortByDiv";
import { getFeedbacks } from "@/hooks/useFeedbacks";
import { use } from "react";

// lg:px-[16.5rem] lg:py-[9.4rem]
const Dashboard = () => {
  const { totalSuggestionCount } = use(getFeedbacks());

  console.log(totalSuggestionCount);

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-7 lg:py-[9.4rem] bg-ghost-white-100  xl:px-[10.5rem] lg:px-[3rem] ">
      <Header />
      <Navbar />
      <div className=" relative min-h-screen bg-ghost-white-100  md:px-[3.9rem] lg:col-start-3 lg:col-end-8 lg:pt-6 lg:px-1  ">
        <MobileNavbar />
        <SortByDiv totalSuggestion={totalSuggestionCount} />
        <Main />
      </div>
    </div>
  );
};

export default Dashboard;
