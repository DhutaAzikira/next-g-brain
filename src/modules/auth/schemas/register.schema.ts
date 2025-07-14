import { z } from "zod/v4";

export const registerSchema = z
  .object({
    username: z.string("Username harus diisi"),
    email: z.email("Email tidak valid"),
    password: z.string("Kata sandi harus diisi"),
    confirmPassword: z.string("Kata sandi harus diisi"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Kata sandi tidak cocok",
    path: ["confirmPassword"],
  });

export type RegisterSchemaType = z.infer<typeof registerSchema>;

export const registerProfileSchema = z.object({
  profile_picture: z.file().max(2048 * 2048 * 5, "File terlalu besar").optional(),
  full_name: z.string("Nama lengkap harus diisi"),
  phone_number: z.string("Nomor telepon harus diisi"),
  date_of_birth: z.iso.datetime("Tanggal lahir tidak valid"),
  gender: z.enum(["Laki-laki", "Perempuan"]),
  bio: z.string().optional(),
});

export type RegisterProfileSchemaType = z.infer<typeof registerProfileSchema>;
