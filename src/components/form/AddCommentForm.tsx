"use client";

import useUserSession from "@/hooks/useUserSession";
import { useParams, usePathname } from "next/navigation";
import { useState } from "react";

const AddCommentForm = () => {
  const params = useParams();
  const [commentText, setCommentText] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const pathname = usePathname();
  const MAX_LENGTH = 250;

  const user = useUserSession();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault();
      setIsSubmitting(true);
      if (commentText?.trim() === "") return;
      if (commentText === undefined) return;
      const res = await fetch(`/api/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: commentText,
          author: user?.id,
          parentId: params.id,
          path: pathname,
        }),
      });
    } catch (err: Error | any) {
      console.log(`${err.code}: Error update creation`);
    } finally {
      setIsSubmitting(false);
      setCommentText("");
    }
  }

  return (
    <div className="p-[2.4rem] bg-clr-white">
      <form onSubmit={(e) => handleSubmit(e)}>
        <label
          htmlFor="comment"
          className="text-heading3 text-dark-grayish-400"
        >
          Add Comment
          <textarea
            id="comment"
            className="signupform-input	mt-6 min-w-full min-h-[12rem] text-[1.3rem]"
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
            disabled={isSubmitting}
          >
            Post Comment
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCommentForm;
