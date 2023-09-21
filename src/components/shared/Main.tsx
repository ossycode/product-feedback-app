import FeedbackCard from "../ui/FeedbackCard";
import NoFeedbackCard from "../ui/NoFeedbackCard";
import { getFeedbacks } from "@/hooks/useFeedbacks";
import { use } from "react";

const Main = () => {
  const { feedbacksSuggestions } = use(getFeedbacks());

  if (feedbacksSuggestions.length === 0) {
    return (
      <main className="bg-ghost-white-100 h-full mt-1 pt-8 pb-36 px-4 md:px-0">
        <NoFeedbackCard />
      </main>
    );
  }

  return (
    <main className="main-body flex flex-col gap-[1.6rem] overflow-scroll sm:px-[2.4rem] px-4 pt-[2.4rem] md:px-0  ">
      {feedbacksSuggestions.map((feedback: any) => (
        <FeedbackCard
          key={feedback._id}
          id={feedback._id}
          title={feedback.title}
          description={feedback.description}
          category={feedback.category}
          upvotes={feedback.upvotes}
          totalComments={feedback.comments.length}
        />
      ))}
    </main>
  );
};

export default Main;
