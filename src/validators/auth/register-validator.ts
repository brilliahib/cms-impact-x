import z from "zod";

export const registerSchema = z
  .object({
    first_name: z
      .string()
      .min(2, "First name must be at least 2 characters long"),
    last_name: z
      .string()
      .min(2, "Last name must be at least 2 characters long"),
    email: z.string().email("Invalid email address"),
    username: z
      .string()
      .min(3, "Username must be at least 3 characters long")
      .optional(),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    password_confirmation: z
      .string()
      .min(6, "Confirm password must be at least 6 characters long"),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords do not match",
  });

export type RegisterType = z.infer<typeof registerSchema>;
