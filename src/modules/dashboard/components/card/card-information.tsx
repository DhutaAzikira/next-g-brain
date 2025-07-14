import { Card, CardContent } from "@/components/ui/card";
import { RiTimeFill } from "@remixicon/react";
import { ChartLine, CircleQuestionMark } from "lucide-react";

type CardInformationProps = {
  totalSession?: number;
  averageScore?: number;
  weeklyTarget?: {
    total: number;
    completed: number;
  };
};

export function CardInformation({
  totalSession,
  averageScore,
  weeklyTarget,
}: CardInformationProps) {
  return (
    <div className="grid grid-cols-1 gap-6 font-sans lg:grid-cols-3">
      <Card className="shadow-none">
        <CardContent className="flex items-center gap-4">
          <div className="flex aspect-square h-full w-auto items-center justify-center rounded-xl bg-blue-50 text-blue-700">
            <RiTimeFill className="size-4 md:size-5" />
          </div>

          <div className="">
            <p className="text-muted-foreground text-xs">Total Sesi</p>
            <p className="text-xl font-bold sm:text-2xl">
              {totalSession || "N/A"}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-none">
        <CardContent className="flex items-center gap-4">
          <div className="flex aspect-square h-full w-auto items-center justify-center rounded-xl bg-green-50 text-green-700">
            <ChartLine className="size-4 md:size-5" />
          </div>

          <div className="">
            <p className="text-muted-foreground text-xs">Skor Rata-rata</p>
            <p className="text-xl font-bold sm:text-2xl">
              {averageScore ?? "⎯"}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-none">
        <CardContent className="flex items-center gap-4">
          <div className="flex aspect-square h-full w-auto items-center justify-center rounded-xl bg-purple-50 text-purple-700">
            <CircleQuestionMark className="size-4 md:size-5" />
          </div>

          <div className="">
            <p className="text-muted-foreground text-xs">Target Mingguan</p>
            <p className="text-xl font-bold sm:text-2xl">
              {weeklyTarget?.completed ?? 0} / {weeklyTarget?.total ?? 0}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
