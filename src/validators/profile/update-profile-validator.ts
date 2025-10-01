import z from "zod";

export const updateUserAndProfileSchema = z.object({
  first_name: z
    .string()
    .min(1, "First name is required")
    .max(100, "First name must be at most 100 characters")
    .optional(),
  last_name: z
    .string()
    .min(1, "Last name is required")
    .max(100, "Last name must be at most 100 characters")
    .optional(),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(100, "Username must be at most 100 characters")
    .optional(),

  about_description: z.string().nullable().optional(),
  role: z.string().max(100).nullable().optional(),
  university: z.string().max(150).nullable().optional(),
  major: z.string().max(150).nullable().optional(),

  profile_images: z
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

  contact_info: z.array(z.string()).min(1, "At least one category is required"),

  skills: z.array(z.string()).min(1, "At least one category is required"),
});

export type UpdateUserAndProfileType = z.infer<
  typeof updateUserAndProfileSchema
>;
