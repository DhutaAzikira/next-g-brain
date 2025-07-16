import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { RiTimeFill } from "@remixicon/react";
import { ChartLine } from "lucide-react";
import Image from "next/image";

type CardWelcome = {
  user: {
    fullname: string | undefined;
    imageUrl?: string;
  };
  title?: string;
  description?: string;
  totalSession?: number;
  averageScore?: number;
};

export function CardWelcome({
  user,
  title = "Selamat Datang, [fullname]!",
  description = "Ini adalah pusat kendali untuk perjalanan interview Anda. Mulai latihan dan tingkatkan kemampuan wawancara Anda.",
  totalSession,
  averageScore,
}: CardWelcome) {
  const transformTitle = title.replace("[fullname]", user.fullname || "");
  const transformDescription = description.replace("[fullname]", user.fullname || "");

  return (
    <div className="flex w-full flex-col justify-between rounded-xl border bg-purple-50 p-4 md:flex-row md:p-8">
      <div className="flex items-center gap-4">
        <Avatar className="relative size-20">
          {user.imageUrl && (
            <Image
              src={user.imageUrl}
              alt={user.fullname || ""}
              width={48}
              height={48}
              className="absolute size-full object-cover"
            />
          )}
          <AvatarFallback className="bg-gradient-purple clamp-[text,lg,4xl] font-medium text-white">
            {user.fullname?.charAt(0) || ""}
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-bold md:text-2xl">{transformTitle}</h1>
          <p className="text-muted-foreground max-w-[60ch]">{transformDescription}</p>
        </div>
      </div>

      <div className="bg-card flex flex-col gap-6 rounded-xl border p-4 md:flex-row md:gap-8">
        <div className="shadow-none">
          <div className="flex items-center gap-4">
            <div className="flex aspect-square h-full w-auto items-center justify-center rounded-xl bg-blue-50 p-4 text-blue-700">
              <RiTimeFill className="size-4 md:size-5" />
            </div>

            <div className="">
              <p className="text-muted-foreground text-xs">Total Sesi</p>
              <p className="text-xl font-bold text-nowrap sm:text-2xl">{totalSession || "N/A"}</p>
            </div>
          </div>
        </div>
        <div className="shadow-none">
          <div className="flex items-center gap-4">
            <div className="flex aspect-square h-full w-auto items-center justify-center rounded-xl bg-green-50 p-4 text-green-700">
              <ChartLine className="size-4 md:size-5" />
            </div>

            <div className="">
              <p className="text-muted-foreground text-xs">Skor Rata-rata</p>
              <p className="text-xl font-bold sm:text-2xl">{averageScore ?? "⎯"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
