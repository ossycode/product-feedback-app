"use client";

import { suggestionsSortOptions } from "@/constants";
import SortPopup from "./sortPopup";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import useCustomRouter from "@/hooks/useCustomRouter";
import { useSortBy } from "@/context/SortByContext";

interface Props {
  totalSuggestion: number;
}

const SortByDiv = ({ totalSuggestion }: Props) => {
  const { pushQuery, query } = useCustomRouter();
  const { sortBy, setSortBy } = useSortBy();
  const [filterOption, setFilterOption] = useState<string>(
    query.sort || "most upvotes"
  );

  useEffect(() => {
    setSortBy(filterOption);
    pushQuery({ sort: filterOption });
  }, [pushQuery, setSortBy, filterOption, sortBy, query]);

  const getSelectedfilterOption = (currentCat: string): void => {
    if (currentCat) {
      setFilterOption(currentCat.toLowerCase());
    }
  };

  return (
    <div
      className="bg-[#373F68] text-light-purple-100 flex items-center
     justify-around md:justify-between px-6 sm:px-9 py-2 md:py-4 sm:py-[0.8rem]  overflow-visible text-[1.3rem] sm:pr-[2.4rem] md:rounded-2xl "
    >
      <div className="basis-3/5 md:basis-[70%]	flex items-center gap-[3.8rem]">
        <div className="hidden md:flex gap-6">
          <Image
            src={"/assets/suggestions/icon-suggestions.svg"}
            alt="suggestions"
            width={20}
            height={20}
            className="object-contain"
          />
          <div>
            <span className="text-heading3">{totalSuggestion}</span>{" "}
            <span className="text-heading3">
              {totalSuggestion > 1 ? "Suggestions" : "Suggestion"}
            </span>
          </div>
        </div>
        <SortPopup
          ArrayData={suggestionsSortOptions}
          popupProps="text 	"
          titleProps="gap-1 sm:gap-4 py-5"
          imageSize={10}
          sortbyProps=""
          titleDivProps=""
          handleSelected={getSelectedfilterOption}
          defaultValue={"Most Upvotes"}
        />
      </div>

      <Link
        className=" bg-light-purple-500 p-2.5 sm:p-4 md:py-4.5 md:px-6 font-bold w-max rounded-2xl"
        href={"/dashboard/feedback/new"}
      >
        + Add Feedback
      </Link>
    </div>
  );
};

export default SortByDiv;
