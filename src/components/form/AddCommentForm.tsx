"use client";

import { PostCommentToFeedback } from "@/lib/actions/comment.actions";
import { useParams, usePathname } from "next/navigation";
import { useState } from "react";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import toast from "react-hot-toast";

const AddCommentForm = () => {
  const params = useParams();
  const [commentText, setCommentText] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const pathname = usePathname();
  const MAX_LENGTH = 250;

  const { pending } = useFormStatus();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      if (commentText.trim() === "") {
        setError(true);
        return;
      }

      await PostCommentToFeedback({
        content: commentText,
        parentId: params.id.toString(),
        path: pathname,
      });
      setCommentText("");
      setError(false);
    } catch (err: Error | any) {
      toast.error("Something went wrong");
      console.log(`${err.code}: Error update creation`);
    } finally {
      setCommentText("");
      setError(false);
    }
  };

  return (
    <div className="p-[2.4rem] bg-clr-white rounded-2xl">
      <form onSubmit={(e) => handleSubmit(e)}>
        <label
          htmlFor="comment"
          className="text-heading3 text-dark-grayish-400"
        >
          Add Comment
          <textarea
            id="comment"
            className={`signupform-input	mt-6 min-w-full min-h-[12rem] text-[1.3rem] md:text-body2 ${
              error && "border-red-600"
            }`}
            placeholder="Type your comment here"
            onChange={(e) => setCommentText(e.target.value)}
            value={commentText}
            maxLength={MAX_LENGTH}
          />
        </label>

        <div className="flex items-center justify-between mt-6">
          <span className="text-[1.3rem] text-light-gray-200">
            {MAX_LENGTH - commentText?.length} Character left
          </span>
          <button
            className="bg-light-purple-500 new-form-btn"
            aria-disabled={pending}
          >
            Post Comment
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCommentForm;
