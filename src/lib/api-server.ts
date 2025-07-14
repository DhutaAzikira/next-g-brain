import { APIProps } from "@/types/api.type";
import { cookies } from "next/headers";

export async function apiServer({ url, method, headers, body }: APIProps) {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("token")?.value || "";
  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "";

  const response = await fetch(baseUrl + url, {
    method: method ?? "GET",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
      ...(token && { Authorization: `Token ${token}` }),
      ...headers,
    },
    body,
  });

  if (!response.ok) {
    console.log(response)
    throw new Error(response.statusText);
  }

  return response;
}
