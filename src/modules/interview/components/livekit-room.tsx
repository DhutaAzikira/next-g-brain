import { HeygenInitiateSessionResponse } from "@/types/response.type";
import { LiveKitRoom as LKRoom, ParticipantTile } from "@livekit/components-react";
import { useEffect, useState } from "react";
import { getHeygen, stopHeygen } from "../services/heygen.service";

export function LiveKitRoom() {
  const [credentials, setCredentials] = useState<HeygenInitiateSessionResponse | null>(null);

  useEffect(() => {
    (async () => {
      const heygen = await getHeygen();
      setCredentials(heygen);
    })();
  }, []);

  if (!credentials) {
    return <div>Loading...</div>;
  }

  return (
    <LKRoom
      token={credentials?.livekit_connection.token || ""}
      serverUrl={credentials?.livekit_connection.server_url || ""}
      connect={true}
      video={true}
      //   audio={true}
      onDisconnected={async () => {
        await stopHeygen({
          token: credentials?.token || "",
          session_id: credentials?.session_id || "",
        });
      }}
      className="size-full"
    >
      <ParticipantTile />
    </LKRoom>
  );
}
