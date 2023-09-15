import { suggestionsSortOptions } from "@/constants";
import SortPopup from "./sortPopup";
import Button from "./button";
import Image from "next/image";

const SortByDiv = () => {
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
            <span className="text-heading3">0</span>{" "}
            <span className="text-heading3">Suggestion</span>
          </div>
        </div>
        <SortPopup
          ArrayData={suggestionsSortOptions}
          popupProps="text 	"
          hoverProps=""
          imageSize={10}
        />
      </div>

      <Button btnProps=" bg-light-purple-500 p-2.5 sm:p-4 md:py-4.5 md:px-6 font-bold w-max ">
        + Add Feedback
      </Button>
    </div>
  );
};

export default SortByDiv;
