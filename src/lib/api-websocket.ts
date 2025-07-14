import { APIProps } from "@/types/api.type";
import { WEBSOCKET_CONFIG } from "./config-websocket";

export async function apiWebSocket({ url, method, headers, body, cache, next }: APIProps) {
  const response = await fetch(WEBSOCKET_CONFIG.API + url, {
    method: method ?? "GET",
    headers,
    body,
    cache: cache ?? "force-cache",
    next,
  });

  if (!response.ok) {
    console.log(await response.json());
    throw new Error(response.statusText);
  }

  return response;
}
