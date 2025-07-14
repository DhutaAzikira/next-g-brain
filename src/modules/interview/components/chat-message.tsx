import { easing } from "@/utils/animation";
import { cn } from "@/utils/cn";
import { motion } from "motion/react";

interface ChatMessageProps {
  message: {
    text: string;
    type: "ai" | "user";
    timestamp: Date;
  };
}

export function ChatMessage({ message }: ChatMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: easing.out },
      }}
      exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
      className={cn("flex flex-col gap-2.5", message.type === "user" ? "items-end" : "items-start")}
    >
      <p className="font-sans text-xs leading-none font-medium">
        {message.type === "user" ? (
          <span className="text-primary">You</span>
        ) : (
          <span className="">Heygen</span>
        )}
      </p>
      <div
        className={cn(
          "max-w-[80%] rounded-lg px-4 py-2",
          message.type === "user"
            ? "bg-secondary text-secondary-foreground"
            : "bg-gradient-purple text-white",
        )}
      >
        <p className="text-sm">{message.text}</p>
        <p
          className={cn(
            "mt-1 text-xs",
            message.type !== "user" ? "text-right" : "text-foreground text-left",
          )}
        >
          {message.timestamp.toLocaleTimeString("id-ID", {
            hour: "numeric",
            minute: "numeric",
          })}
        </p>
      </div>
    </motion.div>
  );
}
