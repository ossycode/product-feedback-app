import EditFeedbackForm from "@/components/form/EditFeedbackForm";
import BackBtn from "@/components/ui/BackBtn";
import Spinner from "@/components/ui/Spinner";
import useFeedback from "@/hooks/useFeedback";
import { getFeedback } from "@/hooks/useFeedbacks";
import { use } from "react";

const EditFeedbackPage = async ({ params }: { params: { id: string } }) => {
  // const { data, isLoading } = useFeedback(params.id);

  const feedback = await getFeedback(params.id);

  // if (isLoading) {
  //   return <Spinner />;
  // }

  return (
    <div className="bg-ghost-white-100 px-[2.4rem] py-[3.4rem] min-h-screen flex flex-col gap-20 md:px-[11.4rem] md:py-[5.6rem] lg:px-[25rem] lg:py-[11rem] xl:px-[45rem] xl:py-[18rem]">
      <BackBtn />
      <EditFeedbackForm
        title={feedback?.title}
        description={feedback?.description}
        status={feedback.status}
        category={feedback.category}
      />
    </div>
  );
};

export default EditFeedbackPage;