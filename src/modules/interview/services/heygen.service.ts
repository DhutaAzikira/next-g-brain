import { apiWebSocket } from "@/lib/api-websocket";
import { HeygenInitiateSessionResponse } from "@/types/response.type";
import { tryCatch } from "@/utils/try-catch";

export async function getHeygen() {
  const [res, err] = await tryCatch(
    apiWebSocket({
      url: "/api/heygen/initiate_session",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }),
  );

  if (err) {
    return null;
  }

  return (await res.json()) as HeygenInitiateSessionResponse;
}

export async function stopHeygen({ token, session_id }: { token: string; session_id: string }) {
  const [res, err] = await tryCatch(
    apiWebSocket({
      url: "/api/heygen/stop_session",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token, session_id }),
    }),
  );

  console.log(res);

  if (err) {
    return null;
  }

  return (await res.json()) as string;
}

export async function sendTaskToHeygen({
  token,
  sessionId,
  text,
  taskType,
}: {
  token: string;
  sessionId: string;
  text: string;
  taskType: "repeat" | "talk";
}) {
  const [res, err] = await tryCatch(
    apiWebSocket({
      url: "/api/heygen/task",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token, session_id: sessionId, text, task_type: taskType }),
    }),
  );

  if (err) {
    return null;
  }

  return (await res.json()) as string;
}
