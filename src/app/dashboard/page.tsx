import Header from "@/components/shared/Header";
import Main from "@/components/shared/Main";
import MobileNavbar from "@/components/shared/MobileNavbar";
import Navbar from "@/components/shared/Navbar";
import Categories from "@/components/ui/Categories";
import SortByDiv from "@/components/ui/SortByDiv";
import useAllFeedbacks from "@/hooks/useAllFeedbacks";
import { getFeedbacks } from "@/hooks/useFeedbacks";
import { useSearchParams } from "next/navigation";
import { use } from "react";

const Dashboard = () => {
  const { allFeedbacks } = use(getFeedbacks());

  //   searchParams,
  // }: {
  //   searchParams: { sort: string | undefined };

  // if (searchParams === undefined) return;

  // const { sort } = searchParams;

  // let sortProp = {};
  // if (sort === "Most Upvotes") {
  //   sortProp = { upvotes: "desc" };
  // }
  // if (sort === "Least Upvotes") {
  //   sortProp = { upvotes: "asc" };
  // }
  // if (sort === "Most Comments") {
  //   sortProp = { comments: "desc" };
  // }
  // if (sort === "Least Comments") {
  //   sortProp = { comments: "asc" };
  // }

  // console.log("dashboard:", sortProp);

  // if (data === undefined) return <Spinner />;

  // console.log(allFeedbacks);

  // const { allFeedbacks } = data;

  // if (currentSelectedCategory === "All") {
  //   totalSuggestionCount = allFeedbacks.filter(
  //     (feedback: any) => feedback.status === "Suggestion"
  //   ).length;
  // } else {
  //   totalSuggestionCount = allFeedbacks.filter(
  //     (feedback: any) =>
  //       feedback.status === "Suggestion" &&
  //       feedback.category === currentSelectedCategory
  //   ).length;
  // }

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-7 lg:py-[9.4rem] bg-ghost-white-100  xl:px-[10.5rem] lg:px-[3rem] ">
      <Header />
      <Navbar />

      <div className=" relative min-h-screen bg-ghost-white-100  md:px-[3.9rem] lg:col-start-3 lg:col-end-8 lg:pt-6 lg:px-1  ">
        <MobileNavbar />
        {/* <SortByDiv totalSuggestion={10} /> */}
        <Main allFeedbacks={allFeedbacks} />
      </div>
    </div>
  );
};

export default Dashboard;
