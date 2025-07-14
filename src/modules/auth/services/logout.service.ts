"use server";

import { signOut } from "@/auth";
import { cookies } from "next/headers";

export async function logout() {
  const cookiesStore = await cookies();
  cookiesStore.delete("token");
  await signOut({ redirectTo: "/login" });
}
