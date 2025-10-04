import z from "zod";

export const feedCommentSchema = z.object({
  content: z.string().min(1, "Comment content is required"),
  mentions: z.array(z.number().int("Mention ID must be an integer")).optional(),
});

export type FeedCommentType = z.infer<typeof feedCommentSchema>;
