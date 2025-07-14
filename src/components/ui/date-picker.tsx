"use client";

import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
import { ChevronDownIcon } from "lucide-react";
import { Calendar } from "./calendar";
import { cn } from "@/utils/cn";
import { format } from "date-fns";
import { id as localeID } from "date-fns/locale";

type DatePickerProps = Omit<
  React.ComponentProps<typeof Calendar>,
  "mode" | "selected" | "onSelect" | "captionLayout"
> & {
  id: string;
  className?: string;
  placeholder?: string;
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  disabledButton?: boolean;
};

export function DatePicker({
  id,
  placeholder = "Select date",
  required = false,
  disabled,
  className,
  value,
  onChange,
  disabledButton,
  ...props
}: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(value);

  const handleCalendarChange = (newDate: Date | undefined) => {
    setDate(newDate);
    setOpen(false);
    onChange?.(newDate);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <input type="hidden" name={id} value={date ? date.toISOString() : ""} required={required} />

      <PopoverTrigger asChild>
        <Button
          id={id}
          type="button"
          variant="outline"
          className={cn(
            "hover:text-muted-foreground w-full justify-between font-normal shadow-none hover:bg-inherit",
            date ? "text-foreground" : "text-muted-foreground",
            className,
          )}
          disabled={disabledButton}
        >
          {date ? format(date, "PPP", { locale: localeID }) : placeholder}
          <ChevronDownIcon className="text-muted-foreground/50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent>
        <Calendar
          mode="single"
          selected={date}
          required={required}
          captionLayout="dropdown"
          onSelect={handleCalendarChange}
          disabled={disabled}
          {...props}
        />
      </PopoverContent>
    </Popover>
  );
}
