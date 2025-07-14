import { RiCalendarScheduleFill, RiLightbulbFill } from "@remixicon/react";
import { CalendarCheck, Check, Clock, Mic, User2 } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IScheduleResponse } from "@/types/response.type";
import { interviewOptions } from "@/utils/constant";
import { ButtonClipboard } from "@/components/shared/button-clipboard";
import { formatDate } from "@/lib/format-date";

export function ScheduleSuccess({ data }: { data: IScheduleResponse }) {
  const formatTime = (time: string) => {
    const [hour, minute] = time.split(":");
    return `${hour}:${minute}`;
  };

  const tips = [
    "Pastikan koneksi internet stabil",
    "Siapkan lingkungan yang tenang",
    "Tes mikrofon dan kamera",
    "Review CV dan portfolio Anda",
  ];

  return (
    <div className="flex w-full flex-col items-center justify-center py-10 md:py-14">
      <div className="mb-8 flex flex-col items-center justify-center gap-4">
        <div className="bg-gradient-green flex size-24 items-center justify-center rounded-full shadow-2xl">
          <Check className="size-8 text-white" strokeWidth={3} />
        </div>

        <div className="space-y-2 text-center">
          <h1 className="clamp-[text,2xl,3xl] leading-none font-bold">Jadwal Terkonfirmasi!</h1>
          <p className="clamp-[text,lg,xl] text-muted-foreground leading-none font-medium">
            Simulasi wawancara Anda siap dimulai
          </p>
        </div>
      </div>

      <Card className="mb-6 w-full max-w-3xl">
        <CardHeader className="flex items-center leading-none">
          <RiCalendarScheduleFill className="clamp-[size,4,6] text-primary" />
          <CardTitle>Detail Booking</CardTitle>
        </CardHeader>

        <CardContent className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="flex items-center gap-3">
            <div className="bg-primary-foreground text-primary grid size-10 place-content-center rounded-xl">
              <CalendarCheck className="size-4" />
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Tanggal</p>
              <p className="font-semibold">{formatDate(data.date)}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-primary-foreground text-primary grid size-10 place-content-center rounded-xl">
              <User2 className="size-4" />
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Posisi</p>
              <p className="font-semibold">{data.posisi}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-primary-foreground text-primary grid size-10 place-content-center rounded-xl">
              <Clock className="size-4" />
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Waktu</p>
              <p className="font-semibold">
                {formatTime(data.start_time)} - {formatTime(data.end_time)} WIB
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-primary-foreground text-primary grid size-10 place-content-center rounded-xl">
              <Mic className="size-4" />
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Tipe Interview</p>
              <p className="font-semibold">
                {interviewOptions.find((item) => item.value === data?.jenis_wawancara)?.label}
              </p>
            </div>
          </div>

          <div className="bg-secondary text-secondary-foreground col-span-full flex items-center justify-between rounded-xl p-4">
            <div>
              <p className="text-muted-foreground text-xs">ID Booking</p>
              <p>{data.booking_code}</p>
            </div>
            <ButtonClipboard
              value={data.booking_code}
              className="text-primary hover:text-primary/80"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="w-full max-w-3xl bg-gradient-to-bl from-[#FDF2F8] to-[#FAF5FF] dark:from-purple-600 dark:to-purple-950">
        <CardContent className="space-y-5">
          <div className="flex items-center gap-1 leading-none">
            <RiLightbulbFill className="size-5 text-yellow-400" />
            <p>Tips Persiapan</p>
          </div>

          <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
            {tips.map((item, index) => (
              <li key={index} className="flex items-center gap-2 text-sm leading-none">
                <div className="rounded-full bg-green-500 p-0.5 text-green-50">
                  <Check className="size-3" />
                </div>
                {item}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
