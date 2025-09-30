import z from "zod";

export const feedSchema = z.object({
  content: z
    .string()
    .min(1, "Content is required")
    .max(500, "Content must be at most 500 characters"),
  activity_id: z.number().nullable().optional(),
});

export type FeedType = z.infer<typeof feedSchema>;
