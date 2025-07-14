import { ActionError } from "@/types/action.type";
import { z, ZodError } from "zod/v4";

export function handleActionError<E>(error: unknown): ActionError<E> {
  if (error instanceof Error) return error.message;
  if (error instanceof ZodError) return z.flattenError(error).fieldErrors;
  return "Gagal mengirim data";
}
