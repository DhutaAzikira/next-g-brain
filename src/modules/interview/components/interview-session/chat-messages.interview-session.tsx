import { AnimatePresence, motion } from "motion/react";
import { MessageCircle, XIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { ChatMessage } from "../chat-message";

import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Message } from "@/hooks/use-chat-messages";
import { cn } from "@/utils/cn";
import { duration, easing } from "@/utils/animation";
import { useIsMobile } from "@/hooks/use-mobile";
import { LoadingBubble, TurnStatus } from "@/components/shared/loading-bubble";

interface ChatMessagesProps {
  messages: Message[];
  isLoading: boolean;
  turnStatus: TurnStatus
  className?: string;
}

export function InterviewSessionChatMessages({
  messages,
  isLoading,
  turnStatus,
  className,
}: ChatMessagesProps) {
  const chatEndRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [isShow, setIsShow] = useState(!isMobile);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading, turnStatus]);

  return (
    <>
      <AnimatePresence initial={false}>
        {!isShow && (
          <motion.div
            key="chat-messages-button"
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            className="fixed right-8 bottom-8 z-50 block size-fit md:hidden"
          >
            <Button
              size="icon"
              variant="outline"
              className="bg-gradient-purple size-12 rounded-full text-white shadow-none"
              onClick={() => setIsShow(true)}
            >
              <MessageCircle className="size-5" />
            </Button>
          </motion.div>
        )}

        {isShow && (
          <motion.div
            key="chat-messages"
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { duration: duration.medium, ease: easing.out },
            }}
            exit={{ opacity: 0, y: 20, transition: { duration: duration.short, ease: easing.in } }}
            className={cn(
              "relative flex max-h-[calc(100vh-8rem-1px)] max-w-[400px] flex-1",
              className,
            )}
          >
            <Card className="h-full w-full flex-1 overflow-hidden rounded-none rounded-tl-2xl rounded-tr-2xl shadow-none md:rounded-tr-none">
              <CardHeader>
                <CardTitle>Live Chat</CardTitle>
                <CardAction className="block md:hidden">
                  <Button
                    size="icon"
                    variant="outline"
                    className="rounded-full shadow-none"
                    onClick={() => setIsShow(false)}
                  >
                    <XIcon className="size-4" />
                  </Button>
                </CardAction>
              </CardHeader>
              <CardContent className="no-scrollbar flex h-full flex-col gap-4 overflow-auto">
                <AnimatePresence mode="popLayout">
                  {messages.map((msg, idx) => (
                    <ChatMessage key={idx + msg.text} message={msg} />
                  ))}
                  {isLoading && <LoadingBubble turnStatus={turnStatus} />}
                </AnimatePresence>
                <div ref={chatEndRef} />
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
