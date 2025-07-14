import { useCallback, useEffect, useRef, useState } from "react";

import { getGladia } from "@/modules/interview/services/gladia.service";
import { ConnectionStatus } from "./use-websocket";

export type GladiaMessage =
  | {
      type: "speech_start" | "transcript" | "speech_end";
      data?: {
        is_final: boolean;
        utterance: {
          text: string;
        };
      };
    }
  | { type: "stop" }
  | { type: "audio_chunk"; data: { chunk: string } };

interface UseGladiaOptions {
  onMessage?: (data: GladiaMessage) => void;
  onOpen?: () => void;
  onClose?: () => void;
  onError?: (error: Event) => void;
}

export function useGladia({ onMessage, onOpen, onClose, onError }: UseGladiaOptions) {
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>("disconnected");
  const [lastMessage, setLastMessage] = useState<GladiaMessage | null>(null);
  const [messages, setMessages] = useState<GladiaMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const ws = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reconnectAttemptsRef = useRef(0);
  const messageQueueRef = useRef<GladiaMessage[]>([]);

  const connect = useCallback(async () => {
    if (ws.current?.readyState === WebSocket.OPEN) return;

    setConnectionStatus("connecting");
    cleanupWebSocket();

    try {
      const gladia = await getGladia();

      if (!gladia) {
        throw new Error("Failed to get gladia");
      }

      const socket = new WebSocket(gladia.url);
      ws.current = socket;

      socket.onopen = () => {
        setConnectionStatus("connected");
        reconnectAttemptsRef.current = 0;
        onOpen?.();
      };

      socket.onmessage = (event) => {
        const data: GladiaMessage = JSON.parse(event.data);

        setIsLoading(false);
        onMessage?.(data);
        if (data.type === "transcript" && data.data && data.data.is_final) {
          setLastMessage(data);
          setMessages((prev) => [...prev, data]);
        }
      };

      socket.onclose = () => {
        setConnectionStatus("disconnected");
        onClose?.();

        if (reconnectAttemptsRef.current < 3) {
          reconnectAttemptsRef.current++;
          reconnectTimeoutRef.current = setTimeout(() => connect(), 3000);
        }
      };

      socket.onerror = (error) => {
        setConnectionStatus("error");
        onError?.(error);
      };
    } catch (error) {
      setConnectionStatus("error");
      console.error("WebSocket connection error:", error);
    }
  }, [onClose, onError, onMessage, onOpen]);

  const cleanupWebSocket = useCallback(() => {
    if (ws.current) {
      ws.current.onopen = null;
      ws.current.onmessage = null;
      ws.current.onclose = null;
      ws.current.onerror = null;
      ws.current.send(JSON.stringify({ type: "stop" }));
      ws.current.close();
      ws.current = null;
    }
  }, []);

  const disconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
    cleanupWebSocket();
    setConnectionStatus("disconnected");
  }, [cleanupWebSocket]);

  const send = useCallback((message: GladiaMessage) => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(typeof message === "string" ? message : JSON.stringify(message));
      return true;
    } else {
      messageQueueRef.current.push(message);
      return false;
    }
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
    setLastMessage(null);
  }, []);

  useEffect(() => {
    return () => {
      disconnect();
    };
  }, [disconnect]);

  return {
    isConnected: connectionStatus === "connected",
    isLoading,
    connectionStatus,
    lastMessage,
    messages,
    connect,
    disconnect,
    send,
    clearMessages,
  };
}
