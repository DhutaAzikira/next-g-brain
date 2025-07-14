import { useCallback, useState } from "react";

export interface Message {
  type: "ai" | "user";
  text: string;
  timestamp: Date;
}

export function useChatMessages() {
  const [messages, setMessages] = useState<Message[]>([]);

  const addMessage = useCallback((message: Message) => {
    setMessages((prev) => [...prev, message]);
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  return {
    messages,
    addMessage,
    clearMessages,
  };
}
