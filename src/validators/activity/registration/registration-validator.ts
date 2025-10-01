import z from "zod";

export const registrationSchema = z.object({
  activity_id: z.number().min(1, "Activity ID is required"),
});

export type RegistrationType = z.infer<typeof registrationSchema>;
