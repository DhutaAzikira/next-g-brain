import { getSupabaseImage } from "./supabase/image";

export function getImageUrl(payload: string) {
  if (payload.startsWith("public/")) {
    return getSupabaseImage().getPublicUrl(payload).data.publicUrl;
  }

  return payload;
}
