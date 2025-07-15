import { APIProps } from "@/types/api.type";
import { cookies } from "next/headers";

export async function apiServer({ url, method, headers, body }: APIProps) {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("token")?.value || "";
  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "";

  return await fetch(baseUrl + url, {
    method: method ?? "GET",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
      ...(token && { Authorization: `Token ${token}` }),
      ...headers,
    },
    body,
  });
}
