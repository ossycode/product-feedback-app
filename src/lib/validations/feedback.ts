import * as z from "zod";

export const FeedbackValidation = z.object({
  title: z.string().min(3, { message: "Can't be empty, minimum 3 characters" }),
  // accountId: z.string(),
  description: z
    .string()
    .min(5, { message: "Can't be empty, minimum 5 characters" })
    .max(250),
});
