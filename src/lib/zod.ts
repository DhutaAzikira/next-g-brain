import { z, ZodError } from "zod/v4";

export const flattenError = (error: ZodError) => z.flattenError(error)