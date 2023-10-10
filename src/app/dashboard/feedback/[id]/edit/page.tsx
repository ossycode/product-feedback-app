import EditFeedbackForm from "@/components/form/EditFeedbackForm";
import BackBtn from "@/components/ui/BackBtn";
import { fetchSingleFeedbackbyId } from "@/lib/actions/feedback.actions";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const feedback = await fetchSingleFeedbackbyId(params.id);
  return {
    title: `Edit Feedback:: ${feedback.title}`,
    description: feedback.description,
  };
}

const EditFeedbackPage = async ({ params }: { params: { id: string } }) => {
  const feedback = await JSON.parse(
    JSON.stringify(await fetchSingleFeedbackbyId(params.id))
  );

  return (
    <div className="bg-ghost-white-100 px-[2.4rem] py-[3.4rem] min-h-screen flex flex-col gap-20 md:px-[11.4rem] md:py-[5.6rem] lg:px-[25rem] lg:py-[11rem] xl:px-[45rem] xl:py-[18rem]">
      <BackBtn />
      <EditFeedbackForm
        title={feedback?.title}
        description={feedback?.description}
        status={feedback.status}
        category={feedback.category}
        feedbackId={feedback._id}
      />
    </div>
  );
};

export default EditFeedbackPage;
