import { supabase } from "./client";

export function getSupabaseImage() {
  return supabase().storage.from("user-profiles");
}
