import z from "zod";

export const activitySchema = z.object({
  title: z.string().min(1, "Title is required"),
  activity_type: z.string().min(1, "Activity type is required"),
  activity_category: z
    .array(z.string())
    .min(1, "At least one category is required"),
  location: z.string().min(1, "Location is required"),
  images: z
    .instanceof(File)
    .refine(
      (file) => ["image/jpeg", "image/jpg", "image/png"].includes(file.type),
      {
        message: "File harus berupa gambar (JPG, JPEG, atau PNG)",
      },
    )
    .refine((file) => file.size <= 2 * 1024 * 1024, {
      message: "Ukuran file maksimal 2 MB",
    })
    .nullable()
    .optional(),
  start_date: z.string().min(1, "Start date is required"),
  end_date: z.string().min(1, "End date is required"),
  max_participants: z.number().min(1, "Max participants must be at least 1"),
  description: z.string().min(1, "Description is required"),
  requirements: z.string().min(1, "Requirements is required"),
  benefits: z.string().optional().nullable(),
});

export type ActivityType = z.infer<typeof activitySchema>;
