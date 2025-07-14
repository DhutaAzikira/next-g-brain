"use client";

import { useState } from "react";

import { cn } from "@/utils/cn";
import { Input } from "./input";
import { Eye, EyeOff } from "lucide-react";

type InputPasswordProps = Omit<React.ComponentProps<typeof Input>, "type">;

export function InputPassword({ className, ...props }: InputPasswordProps) {
  const [isVisible, setIsVisible] = useState(false);

  const activeType = {
    true: "text",
    false: "password",
  };

  const activeIcon = {
    true: <EyeOff aria-hidden className="size-4" />,
    false: <Eye aria-hidden className="size-4" />,
  };

  const handleToggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <div className={cn("relative", className)}>
      <Input
        type={activeType[String(isVisible) as keyof typeof activeType]}
        className="pe-9"
        {...props}
      />

      <button
        type="button"
        className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] duration-500 outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
        disabled={props.disabled}
        onClick={handleToggleVisibility}
      >
        {activeIcon[String(isVisible) as keyof typeof activeIcon]}
      </button>
    </div>
  );
}
