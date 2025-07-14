"use client";

import { useState } from "react";
import { OTPInput, SlotProps } from "input-otp";
import { ArrowLeft, Mail, RotateCw } from "lucide-react";
import { RiCheckboxCircleFill, RiErrorWarningFill } from "@remixicon/react";

import { Timer } from "@/components/ui/timer";
import { cn } from "@/utils/cn";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function OtpForm() {
  const [time, setTime] = useState(300);
  const [otpValue, setOtpValue] = useState("");

  const handleResend = () => {
    setTime(300);
  };

  return (
    <form className="w-full space-y-6">
      <div className="flex flex-col">
        <OTPInput
          name="otp"
          value={otpValue}
          onChange={setOtpValue}
          maxLength={6}
          render={({ slots }) => (
            <div className="mb-6 flex gap-2">
              {slots.map((slot, idx) => (
                <Slot key={idx} {...slot} />
              ))}
            </div>
          )}
        />

        <div className="mb-4 flex w-full flex-col items-center justify-center gap-4">
          <div className="bg-muted flex h-25 w-full flex-col items-center justify-center gap-2 rounded-md">
            <p className="text-muted-foreground">
              Kode akan kadaluwarsa dalam:
            </p>
            <Timer
              time={time}
              className="text-2xl font-bold text-purple-700 md:text-3xl"
            />
          </div>

          <div className="flex w-full flex-col items-center justify-center gap-2">
            <p className="text-muted-foreground text-sm">
              Tidak menerima Kode?
            </p>
            <button
              type="button"
              onClick={handleResend}
              className="group flex items-center gap-2 text-purple-700 hover:underline"
            >
              <RotateCw className="size-4 transition-transform duration-500 group-hover:rotate-360" />
              <p className="text-sm font-medium">Kirim ulang kode</p>
            </button>
          </div>
        </div>

        <Button
          type="submit"
          disabled={otpValue.length !== 6}
          className="bg-gradient-purple mb-2 h-12 w-full font-bold hover:opacity-80"
        >
          <RiCheckboxCircleFill className="size-4" /> Verifikasi & Lanjutkan
        </Button>

        <Button type="button" variant="outline" className="mb-6">
          <Mail /> Kirim via SMS
        </Button>

        <div className="flex items-center justify-center">
          <Link
            href="/register"
            className="flex items-center gap-2 opacity-80 transition-opacity hover:underline hover:opacity-100"
          >
            <ArrowLeft className="size-4.5" />{" "}
            <span className="text-sm leading-none">
              Kembali ke halaman registrasi
            </span>
          </Link>
        </div>
      </div>

      <div className="flex gap-2 rounded-md border border-amber-200 bg-amber-50 p-4 text-amber-700">
        <RiErrorWarningFill className="size-4" />

        <div className="space-y-2">
          <p className="leading-none font-medium">Tips keamanan:</p>
          <ul className="list-inside list-disc space-y-1 text-sm">
            <li>Jangan bagikan kode OTP kepada siapapun</li>
            <li>Kode hanya berlaku selama 5 menit</li>
            <li>Pastikan Anda berada di situs resmi</li>
          </ul>
        </div>
      </div>
    </form>
  );
}

function Slot(props: SlotProps) {
  return (
    <div
      className={cn(
        "border-input bg-background text-foreground flex aspect-square flex-1 items-center justify-center rounded-md border font-medium shadow-xs transition-[color,box-shadow]",
        { "border-ring ring-ring/50 z-10 ring-[3px]": props.isActive },
      )}
    >
      {props.char !== null && (
        <div className="text-lg md:text-xl">{props.char}</div>
      )}
    </div>
  );
}
