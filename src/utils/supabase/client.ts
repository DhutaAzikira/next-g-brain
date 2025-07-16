import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

let supabaseClient: SupabaseClient | null = null;

export const client = (() => {
  if (!supabaseClient) {
    if (!supabaseKey && typeof window !== "undefined") {
      throw new Error("supabaseKey is required.");
    }

    if (!supabaseUrl) {
      throw new Error("supabaseUrl is required.");
    }
    
    // During build time, create a dummy client if key is missing
    if (!supabaseKey) {
      console.warn("Supabase key not found during build. Using placeholder.");
      return createClient(supabaseUrl, "placeholder-key-for-build");
    }
    
    supabaseClient = createClient(supabaseUrl, supabaseKey);
  }
  return supabaseClient;
})();
