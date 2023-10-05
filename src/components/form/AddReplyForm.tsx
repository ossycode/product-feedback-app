"use client";

import useComment from "@/hooks/useComment";
import useUserSession from "@/hooks/useUserSession";
import { useParams, usePathname, useRouter } from "next/navigation";
import { LegacyRef, startTransition, useState } from "react";

// interface Props {
//   commentAuthor: string;
//   commentId: string;
//   formRef: HTMLFormElement | null;
// }

const AddReplyForm = ({ commentAuthor, commentId, formRef }: any) => {
  const [replyText, setReplyText] = useState<string>("");
  const params = useParams();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const pathname = usePathname();
  const router = useRouter();
  const { mutate } = useComment(commentId);

  const user = useUserSession();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault();
      setIsSubmitting(true);

      if (replyText?.trim() === "") return;
      if (replyText === undefined) return;
      const res = await fetch(`/api/replies`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: replyText,
          author: user?.id,
          parentId: commentId,
          path: pathname,
          replyingTo: commentAuthor,
        }),
      });
      mutate();
      if (res.ok) {
        startTransition(() => router.refresh());
        setIsSubmitting(false);
        setReplyText("");
      }
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
        disabled={isSubmitting}
      >
        <span className="hidden sl:flex">Post Reply</span>
        <span className="sl:hidden"> Reply</span>
      </button>
    </form>
  );
};

export default AddReplyForm;
