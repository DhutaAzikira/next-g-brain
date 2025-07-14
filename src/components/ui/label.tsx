"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";

import { cn } from "@/utils/cn";

type LabelProps = React.ComponentProps<typeof LabelPrimitive.Root>;

function Label({ className, ...props }: LabelProps) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

function LabelWrapperInput({
  label,
  className,
  children,
  optional = false,
  showMark = true,
  errors,
  ...props
}: LabelProps & {
  label: string | React.ReactNode;
  optional?: boolean;
  showMark?: boolean;
  errors?: string[];
}) {
  return (
    <div className={cn("h-fit space-y-4", className)}>
      <Label {...props}>
        <span className="block size-fit">
          {label}
          {showMark && (
            <>
              {!optional ? (
                <span className="text-destructive">*</span>
              ) : (
                <span className="text-muted-foreground">&nbsp;(Opsional)</span>
              )}
            </>
          )}
        </span>
      </Label>

      {children}

      {errors && (
        <ul className="text-destructive text-sm space-y-1">
          {errors.map((err, idx) => {
            return (
              <li key={idx} className="list-inside list-disc">
                {err}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export { Label, LabelWrapperInput };
