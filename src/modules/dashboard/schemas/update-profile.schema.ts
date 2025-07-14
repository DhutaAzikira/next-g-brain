import { z } from "zod/v4";

export const updateProfileSchema = z.object({
  full_name: z.string(),
  phone_number: z.string(),
  date_of_birth: z.iso.datetime(),
  gender: z.enum(["Laki-laki", "Perempuan"]),
  bio: z.string().optional(),
  profile_picture: z
    .file()
    .max(2048 * 2048 * 5, "File terlalu besar")
    .optional(),
});

export type UpdateProfileSchemaType = z.infer<typeof updateProfileSchema>;
