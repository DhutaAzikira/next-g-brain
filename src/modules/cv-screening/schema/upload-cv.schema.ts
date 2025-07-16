import { z } from "zod/v4";

export const uploadCvSchema = z.object({
  cv: z
    .file("File harus diisi")
    .max(2048 * 2048 * 2, "File terlalu besar")
    .refine((file) => file.type === "application/pdf" || file.type === "application/octet-stream", {
      message: "File harus berupa PDF atau file tidak dikenali sistem",
    }),
});

export type UploadCvSchemaType = z.infer<typeof uploadCvSchema>;
