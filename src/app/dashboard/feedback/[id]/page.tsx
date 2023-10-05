import AddCommentForm from "@/components/form/AddCommentForm";
import FeedbackDetails from "@/components/ui/FeedbackDetails";
import { getFeedback } from "@/hooks/useFeedbacks";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const feedback = await getFeedback(params.id);
  return {
    title: feedback.title,
    description: feedback.description,
  };
}

const FeedbackPage = async ({ params }: { params: { id: string } }) => {
  const feedback = await getFeedback(params.id);

  // if (isLoading && data === undefined) {
  //   return <Spinner />;
  // }

  return (
    <div className="p-[2.4rem] bg-ghost-white-100 min-h-screen flex flex-col gap-[2.4rem] md:py-[5.6rem] md:px-[3.9rem] lg:px-[18rem]  xl:px-[35.5rem] xl:py-[8rem]">
      <FeedbackDetails feedback={feedback} params={params} />
      <AddCommentForm />
    </div>
  );
};

export default FeedbackPage;
