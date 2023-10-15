import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import AddCommentForm from "@/components/form/AddCommentForm";
import BackBtn from "@/components/ui/BackBtn";
import CommentCard from "@/components/ui/CommentCard";
import FeedbackCard from "@/components/ui/FeedbackCard";
import { fetchSingleFeedbackbyId } from "@/lib/actions/feedback.actions";
import { getServerSession } from "next-auth";
import Link from "next/link";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const feedback = await fetchSingleFeedbackbyId(params.id);
  return {
    title: feedback.title,
    description: feedback.description,
  };
}

const FeedbackPage = async ({ params }: { params: { id: string } }) => {
  const feedback = await JSON.parse(
    JSON.stringify(await fetchSingleFeedbackbyId(params.id))
  );

  const session = await getServerSession(authOptions);
  const currentUser = session?.user.id;

  const isFeedbackAuthor = currentUser === feedback.author._id.toString();

  const totalComments = feedback.thread.length;

  return (
    <div className="p-[2.4rem] bg-ghost-white-100 min-h-screen flex flex-col gap-[2.4rem] md:py-[5.6rem] md:px-[3.9rem] lg:px-[18rem]  xl:px-[35.5rem] xl:py-[8rem]">
      <div className="flex items-center justify-between">
        <BackBtn />
        {isFeedbackAuthor && (
          <Link
            href={`/dashboard/feedback/${params.id}/edit`}
            className="new-form-btn bg-dark-blue hover:bg-[#7C91F9]"
          >
            Edit Feedback
          </Link>
        )}
      </div>
      <FeedbackCard
        id={feedback._id}
        title={feedback.title}
        description={feedback.description}
        category={feedback.category}
        upvotes={feedback.upvotes}
        totalComments={totalComments}
      />
      <div className="bg-clr-white p-[2.4rem] md:px-[3.2rem] flex flex-col items-start rounded-xl">
        <h1 className="text-heading3 text-dark-grayish-400 ">
          {" "}
          {totalComments} {totalComments > 1 ? "Comments" : "Comment"}
        </h1>
        {totalComments > 0 && (
          <div className=" divide-y-[0.1rem] divide-comment-divide md:flex flex-col  w-full">
            {feedback.comments.map((comment: any) => (
              <CommentCard key={comment._id} comment={comment} />
            ))}
          </div>
        )}
      </div>

      <AddCommentForm />
    </div>
  );
};

export default FeedbackPage;
