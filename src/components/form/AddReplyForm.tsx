"use client";

import { PostReplyToComment } from "@/lib/actions/comment.actions";
import { usePathname } from "next/navigation";
import { useState } from "react";

const AddReplyForm = ({ commentAuthor, commentId, formRef }: any) => {
  const [replyText, setReplyText] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const pathname = usePathname();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault();
      setIsSubmitting(true);

      if (replyText?.trim() === "") return;
      if (replyText === undefined) return;

      await PostReplyToComment({
        content: replyText,
        parentId: commentId,
        path: pathname,
        replyingTo: commentAuthor,
      });
      setIsSubmitting(false);
      setReplyText("");
    } catch (err: Error | any) {
      console.log(`${err.code}: Error update creation`);
    } finally {
      setIsSubmitting(false);
      setReplyText("");
    }
  }

  return (
    <form
      className="flex items-start justify-between "
      onSubmit={(e) => handleSubmit(e)}
      ref={formRef}
    >
      <label
        htmlFor="reply"
        className="text-heading3 text-dark-grayish-400  min-h-[8rem] sm:min-w-[70%] md:min-w-[80%]"
      >
        <textarea
          id="reply"
          className="signupform-input min-w-full  text-[1.3rem] md:text-body2"
          maxLength={250}
          onChange={(e) => setReplyText(e.target.value)}
          value={replyText}
        />
      </label>

      <button
        className="bg-light-purple-500 new-form-btn py-3 px-2 sm:px-3 text-heading5 leading-normal md:px-6 md:py-4  "
        aria-disabled={isSubmitting}
      >
        <span className="hidden sl:flex">Post Reply</span>
        <span className="sl:hidden"> Reply</span>
      </button>
    </form>
  );
};

export default AddReplyForm;
