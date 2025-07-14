import { z } from "zod/v4";

export const loginSchema = z.object({
    username: z.string().nonempty(),
    password: z.string().nonempty(),
    remember: z.boolean()
})

export type LoginSchemaType = z.infer<typeof loginSchema>;
