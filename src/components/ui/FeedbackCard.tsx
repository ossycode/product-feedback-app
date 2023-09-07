import Image from "next/image";
import Button from "./button";

const FeedbackCard = () => {
  return (
    <div className="flex flex-col items-start gap-6 min-w-[32.7rem] min-h-[20rem] bg-clr-white rounded-2xl p-[2.4rem] ">
      <h1 className="text-dark-grayish-400 tracking-[-0.0181rem] font-bold text-[1.3rem]">
        Add tags for solutions
      </h1>
      <p className="text-[1.3rem] text-light-gray-200">
        Easier to search for solutions based on a specific stack.
      </p>
      <Button btnProps="bg-light-purple-100 text-dark-blue p-2 text-[1.3rem] font-semibold">
        Enchancement
      </Button>
      <div className="flex items-center justify-between w-full">
        <Button btnProps="flex items-center gap-2 bg-light-purple-100  text-[1.3rem] font-bold text-[1.3rem] py-[0.6rem] px-[1.6rem]">
          <Image
            src={"/assets/shared/icon-arrow-up.svg"}
            alt="up arrow"
            width={10}
            height={10}
          />
          <span>112</span>
        </Button>

        <Button btnProps="flex items-center gap-2 bg-transparent  text-[1.3rem] font-bold text-[1.3rem] py-[0.6rem] px-[1.6rem]">
          <Image
            src={"/assets/shared/icon-comments.svg"}
            alt="up arrow"
            width={15}
            height={15}
          />
          <span>2</span>
        </Button>
      </div>
    </div>
  );
};

export default FeedbackCard;
