import { apiWebSocket } from "@/lib/api-websocket";
import { GladiaResponse } from "@/types/response.type";
import { tryCatch } from "@/utils/try-catch";

export async function getGladia() {
  const [res, err] = await tryCatch(
    apiWebSocket({
      url: "/api/gladia/init",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: "{}",
      // body: payload,
    }),
  );

  if (err) {
    return null;
  }

  return (await res.json()) as GladiaResponse;
}
