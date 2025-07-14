import { z } from "zod/v4";

export const scheduleInterviewSchema = z.object({
  schedule_id: z.coerce.number(),
  date: z.iso.datetime(),
  posisi: z.string(),
  industri: z.string(),
  nama_perusahaan: z.string(),
  tingkatan: z.enum(["Entry", "Mid", "Senior", "Lead", "Manager"]),
  jenis_wawancara: z.enum(["Technical", "HR", "Design", "Management", "Other"]),
  detail_pekerjaan: z.string(),
  package: z.enum(["1", "2", "3"]),
  cv: z
    .file()
    .max(2048 * 2048 * 2, "File terlalu besar")
    .refine(
      (file) =>
        file.type === "application/pdf" ||
        file.type === "application/octet-stream",
      { message: "File harus berupa PDF atau file tidak dikenali sistem" },
    ),
});

export type ScheduleInterviewSchemaType = z.infer<
  typeof scheduleInterviewSchema
>;
