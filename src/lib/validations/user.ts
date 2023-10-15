import { z } from "zod";

export const UserValidation = z
  .object({
    fullName: z.string().min(3, { message: "Can't be empty" }).max(60),
    username: z.string().min(3, { message: "Can't be empty" }).max(30),
    email: z
      .string()
      .email({ message: "Invalid email address" })
      .min(1, { message: "Can't be empty" }),
    password: z
      .string()
      .min(5, { message: "Must be 5 or more characters long" }),
    confirmPassword: z
      .string()
      .min(5, { message: "Must be 5 or more characters long" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password don't match",
  });
