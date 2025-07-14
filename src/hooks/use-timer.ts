"use client";

import { useState, useEffect, useRef, useCallback } from "react";

type Timer = `${number}:${number}`;

export function useTimerCountdown(minutes: number, relative?: Timer) {
  const [timeLeft, setTimeLeft] = useState("00:00");
  const [isRunning, setIsRunning] = useState(false);
  const [isAlmostFinished, setIsAlmostFinished] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const durationRef = useRef(minutes * 60);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const stopTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsRunning(false);
    setIsAlmostFinished(false);
  }, []);

  const startTimer = useCallback(() => {
    if (isRunning) return;
    setIsRunning(true);
    setIsAlmostFinished(false);
    durationRef.current = minutes * 60;
    setTimeLeft(formatTime(durationRef.current));

    intervalRef.current = setInterval(() => {
      durationRef.current -= 1;
      const newTimeLeft = formatTime(durationRef.current);
      setTimeLeft(newTimeLeft);

      if (relative && relative === newTimeLeft) {
        setIsAlmostFinished(true);
      }

      if (durationRef.current <= 0) {
        stopTimer();
        setTimeLeft("00:00");
      }
    }, 1000);
  }, [isRunning, minutes, relative, stopTimer]);

  useEffect(() => {
    setTimeLeft(formatTime(minutes * 60));
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [minutes]);

  const estimateSpeechDuration = (text: string) => {
    const wordsPerMinute = 150;
    const words = text.trim().split(/\s+/).length;
    return (words / wordsPerMinute) * 60 * 1000;
  };

  return {
    actualTime: durationRef.current,
    timeLeft,
    isAlmostFinished,
    isRunning,
    startTimer,
    stopTimer,
    estimateSpeechDuration,
  };
}
