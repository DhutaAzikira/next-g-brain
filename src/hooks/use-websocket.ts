/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useRef, useState } from "react";

interface UseWebSocketOptions<T> {
  onMessage?: (data: T) => void;
  onOpen?: () => Promise<void>;
  onClose?: () => Promise<void>;
  onError?: (error: Event) => void;
  reconnectAttempts?: number;
  reconnectInterval?: number;
  autoConnect?: boolean; // NEW
}

export type ConnectionStatus = "connecting" | "connected" | "disconnected" | "error";

export function useWebSocket<T = unknown, SendMessage = any>(
  initialUrl: string,
  options: UseWebSocketOptions<T> = {},
) {
  const [url, setUrl] = useState(initialUrl);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>("disconnected");
  const [lastMessage, setLastMessage] = useState<T | null>(null);
  const [messages, setMessages] = useState<T[]>([]);

  const ws = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reconnectAttemptsRef = useRef(0);
  const messageQueueRef = useRef<SendMessage[]>([]);

  const {
    onMessage,
    onOpen,
    onClose,
    onError,
    reconnectAttempts = 3,
    reconnectInterval = 3000,
    autoConnect = false,
  } = options;

  const cleanupWebSocket = useCallback(() => {
    if (ws.current) {
      ws.current.onopen = null;
      ws.current.onmessage = null;
      ws.current.onclose = null;
      ws.current.onerror = null;
      ws.current.close();
      ws.current = null;
    }
  }, []);

  const flushQueue = useCallback(() => {
    while (messageQueueRef.current.length && ws.current?.readyState === WebSocket.OPEN) {
      const msg = messageQueueRef.current.shift();
      if (msg) {
        ws.current.send(typeof msg === "string" ? msg : JSON.stringify(msg));
      }
    }
  }, []);

  const connect = useCallback(
    (overrideUrl?: string) => {
      const targetUrl = overrideUrl || url;
      if (!targetUrl) return;

      if (ws.current?.readyState === WebSocket.OPEN) return;

      setConnectionStatus("connecting");
      cleanupWebSocket();

      try {
        const socket = new WebSocket(targetUrl);
        ws.current = socket;

        socket.onopen = async () => {
          setConnectionStatus("connected");
          reconnectAttemptsRef.current = 0;
          flushQueue();
          await onOpen?.();
        };

        socket.onmessage = (event) => {
          let data: T;
          try {
            data = JSON.parse(event.data);
          } catch {
            data = event.data;
          }
          setLastMessage(data);
          setMessages((prev) => [...prev, data]);
          onMessage?.(data);
        };

        socket.onclose = async () => {
          setConnectionStatus("disconnected");
          await onClose?.();

          if (reconnectAttemptsRef.current < reconnectAttempts) {
            reconnectAttemptsRef.current++;
            reconnectTimeoutRef.current = setTimeout(() => connect(targetUrl), reconnectInterval);
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
    },
    [onClose, onError, onMessage, onOpen, url],
  );

  const disconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
    cleanupWebSocket();
    setConnectionStatus("disconnected");
  }, [cleanupWebSocket]);

  const sendMessage = useCallback((message: SendMessage) => {
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

  useEffect(() => {
    if (url && autoConnect) {
      connect(url);
    }
  }, [url, connect, autoConnect]);

  return {
    isConnected: connectionStatus === "connected",
    connectionStatus,
    lastMessage,
    messages,
    connect,
    disconnect,
    sendMessage,
    clearMessages,
    setUrl, // 🔑 allow dynamic URL update
  };
}
