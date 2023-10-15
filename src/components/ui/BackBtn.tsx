"use client";

import { useRouter } from "next/navigation";
import BackBtnSVG from "./BckBtnSVG";

const BackBtn = ({
  btnColor = "text-light-gray-200",
  arrowColor = "#4661E6",
}) => {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };

  return (
    <button
      className="flex items-center gap-6 rounded-2xl w-max hover:underline hover:underline-offset-2 hover:decoration-[#647196]"
      onClick={handleBack}
    >
      <BackBtnSVG stroke={arrowColor} />
      <span className={`text-[1.3rem] lg:text-heading4 font-bold ${btnColor}`}>
        Go Back
      </span>
    </button>
  );
};

export default BackBtn;
