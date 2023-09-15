import Image from "next/image";
import Button from "./button";

const FeedbackCard = () => {
  // flex flex-col items-start
  return (
    <div className=" sm:min-w-[32.7rem] sm:min-h-[20rem] bg-clr-white rounded-2xl p-[2.4rem] grid grid-cols-2 gap-x-[15rem] gap-y-[2.8rem] md:grid-flow-row md:grid-cols-7  md:gap-0  md:min-h-[15.1rem] ">
      <div className="flex flex-col items-start gap-3 col-span-2 md:col-start-2 md:col-end-7">
        <h1 className="text-dark-grayish-400 tracking-[-0.0181rem] font-bold text-[1.3rem] md:text-heading3">
          Add tags for solutions
        </h1>
        <p className="text-[1.3rem] text-light-gray-200 md:text-body1">
          Easier to search for solutions based on a specific stack.
        </p>
        <Button btnProps="bg-light-purple-100 text-dark-blue p-2 text-[1.3rem] font-semibold pl-4">
          Enchancement
        </Button>
      </div>

      {/* <div className="flex items-center justify-between w-full">
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
      </div> */}
      <Button btnProps="flex items-center gap-2 md:gap-4 bg-light-purple-100  text-[1.3rem] font-bold text-[1.3rem] py-[0.6rem] px-[1.6rem] w-max md:order-first md:flex-col md:justify-center md:h-max md:w-[4rem] md:h-5.3rem] lg:py-[1rem]  ">
        <Image
          src={"/assets/shared/icon-arrow-up.svg"}
          alt="up arrow"
          width={10}
          height={10}
        />
        <span>112</span>
      </Button>
      <Button btnProps="flex items-center gap-2 bg-transparent  text-[1.3rem] font-bold text-[1.3rem] md:text-[1.6rem] py-[0.6rem] px-[1.6rem] md:order-last">
        <Image
          src={"/assets/shared/icon-comments.svg"}
          alt="up arrow"
          width={15}
          height={15}
        />
        <span>2</span>
      </Button>
    </div>
  );
};

export default FeedbackCard;
