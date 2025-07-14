import { RiPlayFill } from "@remixicon/react";
import { VariantProps } from "class-variance-authority";
import { ArrowRight, BadgeCheck, CalendarCheck2, CircleOff, History } from "lucide-react";
import Link from "next/link";

import { Badge, badgeVariants } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { formatDate } from "@/lib/format-date";
import { IInterview } from "@/types/response.type";
import { cn } from "@/utils/cn";

type CardSessionProps = {
  showAll?: boolean;
  sessions?: IInterview[] | null;
};

export function CardSession({ showAll = false, sessions = [] }: CardSessionProps) {
  if (sessions?.length) {
    sessions?.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }

  return (
    <Card className="shadow-none">
      <CardHeader className="border-b">
        <CardTitle className="text-xl">Riwayat Interview</CardTitle>
        {showAll && (
          <CardAction>
            <Button asChild variant="link" className="text-purple-700">
              <Link href={"#"}>
                Lihat Semua <ArrowRight />
              </Link>
            </Button>
          </CardAction>
        )}
      </CardHeader>

      {sessions?.length === 0 ? (
        <CardFallback />
      ) : (
        <CardContent className="no-scrollbar h-[450px] space-y-4 overflow-x-clip overflow-y-auto">
          {sessions?.map((item) => {
            const badgeVariant: Record<
              IInterview["status"],
              VariantProps<typeof badgeVariants>["variant"]
            > = {
              Pending: "pending",
              Scheduled: "secondary",
              Completed: "success",
              Cancelled: "destructive",
            };

            const buttonVariant: Record<
              IInterview["status"],
              VariantProps<typeof buttonVariants>["variant"]
            > = {
              Cancelled: "destructive",
              Pending: "secondary",
              Scheduled: "secondary",
              Completed: "default",
            };

            const buttonLabel: Record<IInterview["status"], string> = {
              Cancelled: "Cancelled",
              Pending: "Evaluating",
              Scheduled: "Mulai Interview",
              Completed: "Lihat Hasil",
            };

            const iconVariants: Record<Lowercase<IInterview["status"]>, React.ReactNode> = {
              cancelled: <CircleOff className="size-2/5" />,
              pending: <History className="size-2/5" />,
              scheduled: <CalendarCheck2 className="size-2/5" />,
              completed: <BadgeCheck className="size-2/5" />,
            };

            const Icon = () =>
              iconVariants[item.status.toLowerCase() as keyof typeof iconVariants] || (
                <BadgeCheck className="size-2/5" />
              );

            return (
              <div key={item.id} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="bg-primary-foreground border-primary/20 text-primary flex size-14 items-center justify-center rounded-xl border">
                    <Icon />
                  </div>

                  <div>
                    <p className="font-sans font-medium">{item.posisi}</p>
                    <p className="text-muted-foreground text-sm">{formatDate(item.date)}</p>
                    <Badge variant={badgeVariant[item.status]}>{item.status}</Badge>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="flex flex-col items-center justify-center">
                    <div className={cn("clamp-[text,lg,xl] font-bold")}>
                      {item.final_score === null ? "-" : item.final_score}
                    </div>
                    <div className="text-muted-foreground text-xs">Skor</div>
                  </div>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        disabled={item.status === "Pending"}
                        size="sm"
                        variant={buttonVariant[item.status]}
                      >
                        {buttonLabel[item.status] || "Lihat Hasil"}
                      </Button>
                    </DialogTrigger>

                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Hasil Interview</DialogTitle>
                        <DialogDescription className="text-muted-foreground text-sm">
                          {item.summary}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="mt-4 flex flex-col items-center gap-4 justify-between md:flex-row">
                        <div className="flex items-center gap-2">
                          <div className="bg-muted flex items-center justify-center gap-1 rounded-md border p-2">
                            <p className="text-muted-foreground text-xs leading-none">Posisi</p>
                            <p className="text-xs leading-none font-semibold">{item.posisi}</p>
                          </div>
                          <div className="bg-muted flex items-center justify-center gap-1 rounded-md border p-2">
                            <p className="text-muted-foreground text-xs leading-none">Score</p>
                            <p className="text-xs leading-none font-semibold">
                              {item.final_score?.toString() || "Calibrate"}
                            </p>
                          </div>
                        </div>

                        {item.status === "Scheduled" && (
                          <Button asChild size="sm">
                            <Link
                              href={`/dashboard/interview/${item.booking_code}`}
                              target="_blank"
                              autoFocus
                            >
                              Mulai Sekarang
                            </Link>
                          </Button>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            );
          })}
        </CardContent>
      )}
    </Card>
  );
}

function CardFallback() {
  return (
    <>
      <CardContent className="flex flex-col items-center pt-4">
        <div className="mb-4 flex items-center justify-center">
          <div className="bg-muted text-muted-foreground flex size-20 items-center justify-center rounded-full">
            <History className="size-7" />
          </div>
        </div>

        <div className="space-y-2 text-center">
          <p className="text-base leading-none font-semibold md:text-lg">
            Belum Ada Riwayat Interview
          </p>
          <p className="text-muted-foreground text-sm">
            Anda belum memiliki riwayat interview. Mulai sesi pertama Anda sekarang!
          </p>
        </div>
      </CardContent>

      <CardFooter className="justify-center pb-4">
        <Button className="bg-gradient-purple hover:opacity-80">
          <RiPlayFill /> Mulai Interview Pertama
        </Button>
      </CardFooter>
    </>
  );
}
