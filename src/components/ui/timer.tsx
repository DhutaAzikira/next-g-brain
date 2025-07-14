"use client";

import { useEffect, useState } from "react";

import { Digit } from "@/components/animation/number/digit.number";
import { cn } from "@/utils/cn";

interface TimerProps extends React.ComponentProps<"div"> {
  time: number; // as seconds
}

export function Timer({ time, className, ...props }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(time);
  const [isExpired, setIsExpired] = useState(false);

  const isHour = Math.floor(time / 3600);
  const isMinute = Math.floor(time / 60);

  useEffect(() => {
    if (timeLeft > 0 && !isExpired) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setIsExpired(true);
    }
  }, [isExpired, timeLeft]);

  // Calculate minutes and seconds
  const hour = Math.floor(timeLeft / 3600);
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className={cn("", className)} {...props}>
      {isHour ? (
        <>
          <Digit value={hour} place={10} />
          <Digit value={hour} place={1} />
          <span className="mx-1">:</span>
        </>
      ) : null}
      {isMinute ? (
        <>
          <Digit value={minutes} place={10} />
          <Digit value={minutes} place={1} />
          <span className="mx-1">:</span>
        </>
      ) : null}
      <Digit value={seconds} place={10} />
      <Digit value={seconds} place={1} />
    </div>
  );
}
