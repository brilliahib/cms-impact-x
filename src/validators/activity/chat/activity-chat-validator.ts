import z from "zod";

export const activityChatSchema = z.object({
  activity_id: z.number().min(1, "Activity ID is required"),
  message: z.string().min(1, "Message is required"),
});

export type ActivityChatType = z.infer<typeof activityChatSchema>;
