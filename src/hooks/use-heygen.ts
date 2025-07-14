import { Participant, RemoteTrack, Room, RoomEvent } from "livekit-client";
import { useCallback, useEffect, useRef, useState } from "react";

import { ConnectionStatus } from "./use-websocket";
import { useDebounce } from "./use-debounce";

import {
  getHeygen,
  sendTaskToHeygen,
  stopHeygen,
} from "@/modules/interview/services/heygen.service";
import { HeygenInitiateSessionResponse } from "@/types/response.type";

interface UseHeygenProps {
  onConnected?: (room: Room) => void;
  onDisconnected?: () => Promise<void>;
  onTrackSubscribed?: (track: RemoteTrack) => void;
}

export function useHeygen({ onConnected, onDisconnected, onTrackSubscribed }: UseHeygenProps) {
  const roomRef = useRef<Room | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const avatarRef = useRef<HTMLVideoElement | null>(null);
  const heygenSessionRef = useRef<HeygenInitiateSessionResponse | null>(null);

  const [isSpeaking, setIsSpeaking] = useDebounce(false, 1000);
  const [isLoading, setIsLoading] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>("disconnected");
  const [participants, setParticipants] = useState<Participant[]>([]);

  const cleanup = useCallback(() => {
    if (roomRef.current) {
      roomRef.current.disconnect();
      roomRef.current = null;
    }

    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }

    setConnectionStatus("disconnected");
    setParticipants([]);
    setIsLoading(false);
  }, []);

  const connect = useCallback(async () => {
    if (roomRef.current || mediaStreamRef.current) return;

    setConnectionStatus("connecting");
    setIsLoading(true);

    try {
      heygenSessionRef.current = await getHeygen();

      if (!heygenSessionRef.current) {
        throw new Error("Failed to get heygen");
      }

      const room = new Room({ adaptiveStream: true, dynacast: true });
      const mediaStream = new MediaStream();

      room.on(RoomEvent.TrackUnsubscribed, (track) => {
        if (track.kind === "video" || track.kind === "audio") {
          mediaStream.removeTrack(track.mediaStreamTrack);
        }
      });

      room.on(RoomEvent.TrackSubscribed, (track) => {
        if (track.kind === "video" || track.kind === "audio") {
          mediaStream.addTrack(track.mediaStreamTrack);

          if (avatarRef.current && mediaStream.getVideoTracks().length > 0) {
            avatarRef.current.srcObject = mediaStream;
          }
        }

        if (track.kind === "audio") {
          const audioContext = new AudioContext();
          const source = audioContext.createMediaStreamSource(
            new MediaStream([track.mediaStreamTrack]),
          );

          const analyser = audioContext.createAnalyser();
          source.connect(analyser);

          const data = new Uint8Array(analyser.frequencyBinCount);

          const checkSpeaking = () => {
            analyser.getByteFrequencyData(data);
            const volume = data.reduce((a, b) => a + b) / data.length;

            if (volume > 5) {
              setIsSpeaking(true);
            } else {
              setIsSpeaking(false);
            }

            requestAnimationFrame(checkSpeaking);
          };

          checkSpeaking();
        }

        setConnectionStatus("connected");
        onTrackSubscribed?.(track);
      });

      room.on(RoomEvent.ParticipantActive, (participant) => {
        console.log(participant);
        setParticipants((prev) => [...prev, participant]);
      });

      room.on(RoomEvent.Disconnected, async (reason) => {
        await stopHeygen({
          token: heygenSessionRef.current?.token || "",
          session_id: heygenSessionRef.current?.session_id || "",
        });
        await onDisconnected?.();
        setConnectionStatus("disconnected");
        console.log(`HeyGen room disconnected: ${reason}`);
      });

      await room.connect(
        heygenSessionRef.current.livekit_connection.server_url,
        heygenSessionRef.current.livekit_connection.token,
      );

      roomRef.current = room;
      mediaStreamRef.current = mediaStream;

      onConnected?.(roomRef.current);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setConnectionStatus("error");
      console.error("WebSocket connection error:", error);
    }
  }, []);

  const disconnect = useCallback(async () => {
    await onDisconnected?.();
    cleanup();
  }, []);

  const send = useCallback(async (text: string, taskType: "repeat" | "talk") => {
    try {
      if (!heygenSessionRef.current) return;

      const response = await sendTaskToHeygen({
        token: heygenSessionRef.current.token,
        sessionId: heygenSessionRef.current.session_id,
        text,
        taskType,
      });

      if (!response) throw new Error("Failed to send task to heygen");

      console.log("heygen", response);
    } catch (error) {
      console.error("Error sending text to avatar via proxy:", error);
    }
  }, []);

  useEffect(() => {
    return () => {
      disconnect();
    };
  }, [disconnect]);

  return {
    isConnected: connectionStatus === "connected",
    isLoading,
    isSpeaking,
    connectionStatus,
    connect,
    disconnect,
    participants,
    send,
    avatarRef,
    session: heygenSessionRef.current,
  };
}
