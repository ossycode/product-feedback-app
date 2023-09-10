import * as z from "zod";

export const UserValidation = z.object({
  title: z.string().url().nonempty(),
  //   category: z.string(),
  //   status: z.boolean(),
  description: z.string().min(5).max(1000),
});
