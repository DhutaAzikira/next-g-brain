"use client";

import { cn } from "@/utils/cn";
import { AlertCircle, Users } from "lucide-react";
import { useState } from "react";
import { Button } from "./button";
import { ISchedule } from "@/types/response.type";

export type TimeSlot = {
  time: string;
  available: boolean;
};

// export const initialTimeSlot: TimeSlot[] = [
//   { time: "00:00", available: true },
//   { time: "00:30", available: true },
//   { time: "01:00", available: true },
//   { time: "01:30", available: true },
//   { time: "02:00", available: true },
//   { time: "02:30", available: true },
//   { time: "03:00", available: true },
//   { time: "03:30", available: true },
//   { time: "04:00", available: true },
//   { time: "04:30", available: true },
//   { time: "05:00", available: true },
//   { time: "05:30", available: true },
//   { time: "06:00", available: true },
//   { time: "06:30", available: true },
//   { time: "07:00", available: true },
//   { time: "07:30", available: true },
//   { time: "08:00", available: true },
//   { time: "08:30", available: true },
//   { time: "09:00", available: true },
//   { time: "09:30", available: true },
//   { time: "10:00", available: true },
//   { time: "10:30", available: true },
//   { time: "11:00", available: true },
//   { time: "11:30", available: true },
//   { time: "12:00", available: true },
//   { time: "12:30", available: true },
//   { time: "13:00", available: true },
//   { time: "13:30", available: true },
//   { time: "14:00", available: true },
//   { time: "14:30", available: true },
//   { time: "15:00", available: true },
//   { time: "15:30", available: true },
//   { time: "16:00", available: true },
//   { time: "16:30", available: true },
//   { time: "17:00", available: true },
//   { time: "17:30", available: true },
//   { time: "18:00", available: true },
//   { time: "18:30", available: true },
//   { time: "19:00", available: true },
//   { time: "19:30", available: true },
//   { time: "20:00", available: true },
//   { time: "20:30", available: true },
//   { time: "21:00", available: true },
//   { time: "21:30", available: true },
//   { time: "22:00", available: true },
//   { time: "22:30", available: true },
//   { time: "23:00", available: true },
//   { time: "23:30", available: true },
// ];

type TimePickerProps = {
  name: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  times: ISchedule[] | null;
  isLoading?: boolean;
};

export function TimePicker({
  name,
  times,
  required,
  disabled,
  className,
  isLoading,
}: TimePickerProps) {
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<number | undefined>(undefined);

  const handleTimeSelect = (time: string, available: boolean) => {
    if (available) {
      setSelectedTime(time);
    }
  };

  const availableSession = times?.filter(
    (item) => item.remaining_capacity === 0,
  ).length;

  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        "has-[data-slot=time-picker]:disabled:opacity-80",
        className,
      )}
    >
      <input
        data-slot="time-picker"
        name={name}
        className="sr-only"
        defaultValue={selectedId}
        disabled={disabled}
        required={required}
      />

      <div className="flex items-center justify-between">
        <p className="text-muted-foreground flex items-center gap-1 text-xs leading-none">
          <AlertCircle className="size-3" />
          <span>Pilih waktu yang tersedia (jeda 30 menit)</span>
        </p>

        <p
          className={cn(
            "text-destructive flex items-center gap-1 text-xs leading-none",
            availableSession !== 3 ? "text-primary" : "",
          )}
        >
          <Users className="size-3" />
          <span>
            Tersedia: {availableSession === 3 ? "Penuh" : "Tersisa"} (
            {availableSession}/3)
          </span>
        </p>
      </div>

      <div
        className={cn(
          "no-scrollbar grid h-[200px] grid-cols-6 gap-2 overflow-auto",
          isLoading ? "animate-pulse" : "",
        )}
      >
        {!isLoading &&
          times?.map((slot) => {
            return (
              <Button
                type="button"
                key={slot.id}
                variant="outline"
                className={cn(
                  "h-12 text-sm font-medium transition-colors",
                  slot.remaining_capacity === 0
                    ? "cursor-not-allowed border-red-200 bg-red-50 text-red-400 hover:bg-red-50"
                    : selectedTime === slot.start_time
                      ? "bg-gradient-purple text-white hover:text-white/90"
                      : "",
                )}
                onClick={() => {
                  handleTimeSelect(
                    slot.start_time,
                    slot.remaining_capacity !== 0,
                  );
                  setSelectedId(slot.id);
                }}
                disabled={slot.remaining_capacity === 0}
              >
                {slot.start_time}
              </Button>
            );
          })}
      </div>
    </div>
  );
}
