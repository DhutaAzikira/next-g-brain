"use client";

import { useEffect, useState } from "react";

import { cn } from "@/utils/cn";
import { Digit } from "./number/digit.number";
import { animate } from "motion/react";

type CountProps = {
  count: number;
  className?: string;
  duration?: number;
};

export function Count({ count, className }: CountProps) {
  const [value, setValue] = useState(0);

  const isThousand = Math.floor(count / 1000);
  const isHundred = Math.floor(count / 100);
  const isTen = Math.floor(count / 10);

  useEffect(() => {
    animate(value, count, {
      duration: 1,
      ease: "linear",
      onUpdate: (latest) => {
        setValue(latest);
      },
    });
  }, [count]);

  return (
    <div className={cn("flex items-center tabular-nums", className)}>
      {isThousand ? (
        <>
          <Digit value={value} place={1000} />
          <div>,</div>
          <Digit value={value} place={100} />
          <Digit value={value} place={10} />
          <Digit value={value} place={1} />
        </>
      ) : isHundred ? (
        <>
          <Digit value={value} place={100} />
          <Digit value={value} place={10} />
          <Digit value={value} place={1} />
        </>
      ) : isTen ? (
        <>
          <Digit value={value} place={10} />
          <Digit value={value} place={1} />
        </>
      ) : (
        <Digit value={value} place={1} />
      )}
    </div>
  );
}
