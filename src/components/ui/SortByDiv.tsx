import { suggestionsSortOptions } from "@/constants";
import SortPopup from "./sortPopup";
import Button from "./button";

const SortByDiv = () => {
  return (
    <div
      className="bg-[#373F68] text-light-purple-100 flex items-center
     justify-between py-[0.8rem]  overflow-visible text-[1.3rem] pr-[2.4rem]"
    >
      <SortPopup
        ArrayData={suggestionsSortOptions}
        popupProps="text"
        hoverProps=""
        imageSize={10}
      />
      <Button btnProps=" bg-light-purple-500 py-4 px-4 font-bold  w-max ">
        + Add Feedback
      </Button>
    </div>
  );
};

export default SortByDiv;
