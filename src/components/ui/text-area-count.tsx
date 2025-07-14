"use client";

import { useCharacterLimit } from "@/hooks/use-char-limit";
import { Textarea } from "./textarea";
import { cn } from "@/utils/cn";

type TextAreaCountProps = {
  name?: string;
  placeholder?: string;
  initialValue?: string;
  maxLength?: number;
  rows?: number;
  required?: boolean;
  className?: string;
  disabled?: boolean;
};

export function TextAreaCount({
  name,
  placeholder,
  initialValue,
  maxLength = 250,
  rows,
  required = false,
  className,
  disabled = false,
}: TextAreaCountProps) {
  const {
    value,
    characterCount,
    handleChange,
    maxLength: limit,
  } = useCharacterLimit({ initialValue, maxLength });

  return (
    <div className={cn("relative w-full", className)}>
      <Textarea
        name={name}
        placeholder={placeholder}
        value={value}
        maxLength={maxLength}
        rows={rows}
        required={required}
        disabled={disabled}
        onChange={handleChange}
        className="peer field-sizing-content max-h-29.5 min-h-0 resize-none pb-6"
      />
      <p
        className="text-border peer-focus-visible:text-muted-foreground absolute right-0 bottom-0 mr-2 mb-2 text-right font-sans text-xs leading-none font-medium"
        role="status"
        aria-live="polite"
      >
        <span className="tabular-nums">
          {limit - characterCount} / {limit}
        </span>{" "}
        karakter tersisa
      </p>
    </div>
  );
}
