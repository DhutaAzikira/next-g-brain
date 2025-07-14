import { apiWebSocket } from "@/lib/api-websocket";
import { tryCatch } from "@/utils/try-catch";

export async function getN8N(bookingCode: string) {
  const payload = JSON.stringify({ booking_code: bookingCode });

  const [res, err] = await tryCatch(
    apiWebSocket({
      url: "/api/interview/start",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        cache: "force-cache",
      },
      body: payload,
    }),
  );

  if (err) {
    return null;
  }

  return (await res.json()) as { sessionId: string };
}

export async function endN8N(sessionId: string) {
  const payload = JSON.stringify({ sessionId });
  const [res, err] = await tryCatch(
    apiWebSocket({
      url: "/api/interview/end",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        cache: "force-cache",
      },
      body: payload,
    }),
  );

  if (err) {
    return null;
  }

  return (await res.json()) as { status: string };
}
