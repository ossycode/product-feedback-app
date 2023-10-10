import Header from "@/components/shared/Header";
import Main from "@/components/shared/Main";
import MobileNavbar from "@/components/shared/MobileNavbar";
import Navbar from "@/components/shared/Navbar";
import Pagination from "@/components/ui/Pagination";
import { useSortBy } from "@/context/SortByContext";
import { fetchFeedbacks } from "@/lib/actions/feedback.actions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - Product Feedback App ",
  description: "Product feedback app",
};

async function Dashboard({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const { sort } = searchParams;

  // console.log(urlSortProp);
  const check = searchParams.page ? +searchParams.page : 1;

  const urlSortProp = sort;
  const {
    allSugestionFeedbacks,
    newSuggestedFeedbacks,
    totalSuggestionCount,
    totalInProgressCount,
    totalPlannedCount,
    totalLiveCount,
    isNext,
  } = await JSON.parse(
    JSON.stringify(
      await fetchFeedbacks({
        pageNumber: check,
        pageSize: 3,
        urlSortProp,
      })
    )
  );

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-7 lg:py-[9.4rem] bg-ghost-white-100  xl:px-[10.5rem] lg:px-[3rem] ">
      <Header />
      <Navbar />

      <div className=" relative min-h-screen bg-ghost-white-100  md:px-[3.9rem] lg:col-start-3 lg:col-end-8 lg:pt-6 lg:px-1  ">
        <MobileNavbar
          totalInProgressCount={totalInProgressCount}
          totalPlannedCount={totalPlannedCount}
          totalLiveCount={totalLiveCount}
        />
        <Main
          allSugestionFeedbacks={newSuggestedFeedbacks}
          totalSuggestionCount={totalSuggestionCount}
          // fetchFeedbacks={fetchFeedbacks}
        />
        <Pagination
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          isNext={isNext}
        />
      </div>
    </div>
  );
}

export default Dashboard;
