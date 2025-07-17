import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardHeader } from "@/components/ui/card";
import { ICVScreeningReportResponse } from "@/types/response.type";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { FaFile } from "react-icons/fa";

export async function CardCVHistory({ data }: { data: ICVScreeningReportResponse[] | null }) {
  if (!data || data.length === 0) {
    return null;
  }

  return (
    <Card className="h-120 gap-0 overflow-hidden shadow-none">
      <CardHeader className="border-b">
        <div className="flex items-center justify-between">
          <h3 className="clamp-[text,sm,lg] font-bold">Riwayat CV Screening</h3>

          <CardAction>
            <Link
              href="/dashboard/cv-screening"
              className="bg-primary hover:bg-primary/80 text-primary-foreground flex items-center gap-2 rounded-md px-3 py-2 transition-colors duration-500"
            >
              <PlusCircle className="size-4 shrink-0" />
              Analisis CV
            </Link>
          </CardAction>
        </div>
      </CardHeader>

      <CardContent className="no-scrollbar relative overflow-auto">
        <div className="sticky top-0 w-full">
          <div className="from-card absolute top-0 left-0 z-20 h-10 w-full bg-gradient-to-b to-transparent"></div>
        </div>
        <ul className="w-full flex-1 shrink-0 py-6">
          {data.map((item) => {
            return (
              <li
                key={item.id}
                className="even:bg-accent even:text-accent-foreground flex items-center justify-between rounded-md p-4"
              >
                <div className="flex items-center gap-6">
                  <div className="bg-primary text-primary-foreground even:bg-primary/80 rounded-md p-4">
                    <FaFile className="size-4 shrink-0" />
                  </div>

                  <div className="space-y-4 text-xs md:text-sm">
                    <div className="flex gap-4">
                      <div className="">
                        <p>Nama Lengkap</p>
                        <p>Posisi</p>
                      </div>
                      <div className="font-medium">
                        <p>{item.full_name}</p>
                        <p>{item.position}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-center md:items-end">
                    <span className="block text-sm text-nowrap">Skor</span>
                    <span className="text-primary flex items-end font-sans leading-none font-bold">
                      {item.score}
                      <span className="text-muted-foreground text-xs leading-[1.2] font-medium">
                        /100
                      </span>
                    </span>
                  </div>

                  <Button asChild variant="outline">
                    <Link href={"/dashboard/cv-screening/" + item.id} className="uppercase">
                      Detail
                    </Link>
                  </Button>
                </div>
              </li>
            );
          })}
        </ul>
        <div className="sticky bottom-0 w-full">
          <div className="from-card absolute bottom-0 left-0 z-20 h-10 w-full bg-gradient-to-t to-transparent"></div>
        </div>
      </CardContent>
    </Card>
  );
}
