"use client";

import useCustomRouter from "@/hooks/useCustomRouter";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

// import { Button } from "../ui/button";

interface Props {
  pageNumber: number;
  isNext: boolean;
}

function Pagination({ pageNumber, isNext }: Props) {
  const router = useRouter();
  const path = usePathname();
  //   const searchParams = useSearchParams();
  const { pushQuery, query } = useCustomRouter();

  //   const query: any = {};

  //   //   let page = searchParams.get("page");
  //   let page = parseInt(searchParams.get("page")!);

  //   if (page) query.page = page;

  const handleNavigation = (type: string) => {
    let nextPageNumber = pageNumber;

    if (type === "prev") {
      nextPageNumber = Math.max(1, pageNumber - 1);
    } else if (type === "next") {
      nextPageNumber = pageNumber + 1;
    }

    // if (nextPageNumber > 1) {
    //   router.push(`/${path}?page=${nextPageNumber}`);
    // } else {
    //   router.push(`/${path}`);
    // }
    pushQuery({ page: nextPageNumber });
  };

  if (!isNext && pageNumber === 1) return null;

  return (
    <div className="mt-10 flex w-full items-center justify-center gap-5">
      <button
        onClick={() => handleNavigation("prev")}
        disabled={pageNumber === 1}
        className="text-body3 md:text-body2  text-clr-white bg-dark-grayish-400 py-2 px-4 rounded-xl"
      >
        Prev
      </button>
      <p className="text-heading4 md:text-body3 bg-dark-grayish-400 px-4 py-2 rounded-full text-clr-white">
        {pageNumber}
      </p>
      <button
        onClick={() => handleNavigation("next")}
        disabled={!isNext}
        className="text-body3 md:text-body2  text-clr-white bg-dark-grayish-400 py-2 px-4 rounded-xl"
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
