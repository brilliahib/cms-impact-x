import z from "zod";

export const registrationUpdateSchema = z.object({
  status: z.enum(["pending", "accepted", "rejected"]),
});

export type RegistrationUpdateType = z.infer<typeof registrationUpdateSchema>;
