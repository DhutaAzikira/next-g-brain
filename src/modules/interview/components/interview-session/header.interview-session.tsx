import { AlertCircle, Loader2, Wifi, WifiOff } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { cn } from "@/utils/cn";
import { ConnectionStatus } from "@/hooks/use-websocket";
import { AnimatePresence, motion } from "motion/react";
import { duration, easing } from "@/utils/animation";
import { Button } from "@/components/ui/button";

interface InterviewSessionHeaderProps {
  status: ConnectionStatus;
  timeLeft: string;
  isAlmostFinished: boolean;
  connectionStatus: string;
  onStartClick: () => void;
}

export function InterviewSessionHeader({
  status,
  timeLeft,
  isAlmostFinished,
  connectionStatus,
  onStartClick,
}: InterviewSessionHeaderProps) {
  return (
    <div className="bg-background flex h-16 w-full items-center justify-between border-b">
      <div className="flex h-full items-center gap-6 pl-4">
        <div className="flex items-center gap-2">
          {getStatusIcon(status)}
          <p
            className={cn(
              "hidden font-sans text-sm font-medium capitalize md:block",
              getStatusColor(status),
            )}
          >
            {status}
          </p>
        </div>
        <Separator orientation="vertical" />
        <h1 className="font-sans text-sm font-bold md:text-lg">AI Interview</h1>
      </div>

      <div className="flex items-center gap-4 overflow-hidden px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={connectionStatus}
            initial={{ y: 20, opacity: 0 }}
            animate={{
              y: 0,
              opacity: 1,
              transition: { duration: duration.medium, ease: easing.inOut },
            }}
            exit={{
              y: -20,
              opacity: 0,
              transition: { duration: duration.short, delay: duration.short, ease: easing.out },
            }}
          >
            <p className="text-muted-foreground font-sans text-xs font-medium capitalize md:text-sm">
              {connectionStatus}
            </p>
          </motion.div>
        </AnimatePresence>

        {status === "disconnected" && <Button onClick={onStartClick}>Start Interview</Button>}

        <div
          className={cn(
            "bg-muted size-fit w-24 rounded-full border px-3 py-2 text-center font-sans font-medium lining-nums transition-colors duration-500 md:px-5",
            isAlmostFinished ? "text-background bg-destructive animate-pulse border-0" : "",
          )}
        >
          {timeLeft}
        </div>
      </div>
    </div>
  );
}

const getStatusIcon = (status: ConnectionStatus) => {
  switch (status) {
    case "connected":
      return <Wifi className="size-4 text-green-500" />;
    case "connecting":
      return <Loader2 className="size-4 animate-spin text-yellow-500" />;
    case "error":
      return <AlertCircle className="size-4 text-red-500" />;
    default:
      return <WifiOff className="size-4 text-gray-500" />;
  }
};

const getStatusColor = (status: ConnectionStatus) => {
  switch (status) {
    case "connected":
      return "text-green-500";
    case "connecting":
      return "text-yellow-500";
    case "error":
      return "text-red-500";
    default:
      return "text-gray-500";
  }
};
