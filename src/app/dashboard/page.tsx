import Header from "@/components/shared/Header";
import Main from "@/components/shared/Main";
import MobileNavbar from "@/components/shared/MobileNavbar";
import Navbar from "@/components/shared/Navbar";
import Pagination from "@/components/ui/Pagination";
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
  const { sort, cat } = searchParams;

  const check = searchParams.page ? +searchParams.page : 1;

  const urlSortProp = sort;
  let selectedCategory;

  if (cat === "all") {
    selectedCategory = undefined;
  }

  if (cat === "ui") {
    selectedCategory = "UI";
  }
  if (cat === "ux") {
    selectedCategory = "UX";
  }
  if (cat === "feature") {
    selectedCategory = "Feature";
  }
  if (cat === "bug") {
    selectedCategory = "Bug";
  }
  if (cat === "enhancement") {
    selectedCategory = "Enhancement";
  }

  const {
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
        selectedCategory,
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
