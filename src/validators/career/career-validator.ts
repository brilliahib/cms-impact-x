import z from "zod";

export const careerSchema = z.object({
  work_inspires: z.string().min(1, { message: "Inspire is required." }),
  work_prefer: z.string().min(1, { message: "Prefer is required." }),
  work_challenge: z.string().min(1, { message: "Challenge is required." }),
  work_hardskills: z
    .array(z.string())
    .min(1, { message: "Select at least one hard skill." }),
  work_softskills: z
    .array(z.string())
    .min(1, { message: "Select at least one soft skill." }),
  work_roles: z.string().min(1, { message: "Role is required." }),
});

export type CareerType = z.infer<typeof careerSchema>;
