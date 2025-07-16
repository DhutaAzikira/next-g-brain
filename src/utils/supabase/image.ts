import { client } from "./client";

export function getSupabaseImage() {
  return client.storage.from("user-profiles");
}
