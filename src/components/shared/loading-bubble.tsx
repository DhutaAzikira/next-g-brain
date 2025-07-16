import { motion } from "motion/react";

import { easing } from "@/utils/animation";
import { cn } from "@/utils/cn";

export type TurnStatus = "user" | "ai" | "none";

export function LoadingBubble({ turnStatus, isCenter = false }: { turnStatus: TurnStatus, isCenter?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 0.5, duration: 0.5, ease: easing.in },
      }}
      exit={{ opacity: 0 }}
      className={cn("flex gap-1 py-4", turnStatus === "user" ? "justify-end" : "justify-start", {
        "justify-end": turnStatus === "user",
        "justify-start": turnStatus === "ai",
        "justify-center": turnStatus === "none" && isCenter,
      })}
    >
      {Array.from({ length: 3 }).map((_, i) => {
        const reverseIndex = 2 - i;

        return (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 1, 1, 0],
              transition: {
                duration: 1.5,
                delay: 0.5 + turnStatus === "user" ? reverseIndex : i * 0.1,
                repeatDelay: 1,
                ease: easing.out,
                repeat: Infinity,
              },
            }}
            className="bg-gradient-purple size-2 rounded-full"
          />
        );
      })}
    </motion.div>
  );
}
