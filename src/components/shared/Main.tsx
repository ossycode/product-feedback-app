import { any } from "zod";
import FeedbackCard from "../ui/FeedbackCard";
import NoFeedbackCard from "../ui/NoFeedbackCard";

const feedbacks: [] = [];

const Main = () => {
  if (feedbacks.length === 0) {
    return (
      <main className="bg-ghost-white-100 h-full mt-1 pt-8 pb-36 px-4 md:px-0">
        <NoFeedbackCard />
      </main>
    );
  }

  return (
    <main className="main-body flex flex-col gap-[1.6rem] overflow-scroll sm:px-[2.4rem] px-4 pt-[2.4rem] md:px-0  ">
      {feedbacks.map((feedback) => (
        <FeedbackCard key={feedback} />
      ))}
      {/* <FeedbackCard /> */}
    </main>
  );
};

export default Main;
