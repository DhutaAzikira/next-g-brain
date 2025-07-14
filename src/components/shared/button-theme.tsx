"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import dynamic from "next/dynamic";

import { Button as UIButton } from "../ui/button";
import { cn } from "@/utils/cn";

export function Button({className}: { className?: string }) {
  const { theme, setTheme } = useTheme();

  const selectedTheme = {
    dark: "light",
    light: "dark",
  };

  const handleClick = () => {
    setTheme(selectedTheme[theme as keyof typeof selectedTheme]);
  };

  return (
    <UIButton
      size="icon"
      className={cn("rounded-full", className)}
      name={`theme-${theme}`}
      aria-label={`Switch to ${selectedTheme[theme as keyof typeof selectedTheme]} mode`}
      onClick={handleClick}
      variant='outline'
      suppressHydrationWarning
    >
      {theme === "dark" ? (
        <Sun suppressHydrationWarning />
      ) : (
        <Moon suppressHydrationWarning />
      )}
    </UIButton>
  );
}

export const ButtonTheme = dynamic(
  () => import("./button-theme").then((mod) => mod.Button),
  {
    ssr: false,
  },
);
