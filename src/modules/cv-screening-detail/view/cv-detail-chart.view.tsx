"use client";

import { Check, TriangleAlert, XIcon } from "lucide-react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/utils/cn";
import { ICVScreeningReportResponse } from "@/types/response.type";

export function CVDetailChartView({ data }: { data: ICVScreeningReportResponse }) {
  const config = {
    score: {
      label: "Skor",
    },
    ringkasan_profile: {
      label: "Ringkasan Profile",
      color: "var(--chart-1)",
    },
    pengalaman_kerja: {
      label: "Pengalaman Kerja",
      color: "var(--chart-2)",
    },
    pendidikan: {
      label: "Pendidikan",
      color: "var(--chart-3)",
    },
    keterampilan: {
      label: "Keterampilan",
      color: "var(--chart-4)",
    },
    sertifikasi: {
      label: "Sertifikasi",
      color: "var(--chart-5)",
    },
    proyek: {
      label: "Proyek",
      color: "var(--chart-6)",
    },
    pencapaian: {
      label: "Pencapaian",
      color: "var(--chart-7)",
    },
  };

  const chart = [
    {
      category: "ringkasan_profile",
      score: data.profile_summary_score,
      fill: "var(--chart-1)",
    },
    {
      category: "pengalaman_kerja",
      score: data.work_experience_score,
      fill: "var(--chart-2)",
    },
    {
      category: "pendidikan",
      score: data.education_score,
      fill: "var(--chart-3)",
    },
    {
      category: "keterampilan",
      score: data.skills_score,
      fill: "var(--chart-4)",
    },
    {
      category: "sertifikasi",
      score: data.certifications_score,
      fill: "var(--chart-5)",
    },
    {
      category: "proyek",
      score: data.projects_score,
      fill: "var(--chart-6)",
    },
    {
      category: "pencapaian",
      score: data.achievements_score,
      fill: "var(--chart-7)",
    },
  ];

  const chartScore = [
    {
      label: "Format & Struktur",
      score: data.format_and_structure_score,
    },
    {
      label: "Kesesuaian Posisi",
      score: data.suitability_score,
    },
    {
      label: "Pengalaman",
      score: data.experiences_score,
    },
    {
      label: "Keterampilan",
      score: data.skills_score,
    },
  ];

  const isMobile = useIsMobile();

  return (
    <Card className="shadow-none">
      <CardHeader>
        <div className="flex flex-col-reverse items-center gap-6 md:flex-row md:justify-between">
          <div className="w-full space-y-2 md:w-fit">
            <CardTitle className="clamp-[text,lg,xl] font-bold">Hasil Analisis CV</CardTitle>
            <div className="text-muted-foreground flex items-center gap-1 text-xs md:text-sm">
              <span>{data.full_name}</span> - <span className="text-primary">{data.position}</span>
            </div>
          </div>

          <div className="flex flex-col-reverse items-center gap-4 py-4 md:flex-row md:gap-6 md:py-0 md:pr-2">
            <div className="flex flex-col items-center gap-1 md:items-end">
              <span className="block text-sm text-nowrap">Skor Keseluruhan</span>
              <span className="text-primary flex items-end font-sans text-2xl leading-none font-bold">
                {data.score}
                <span className="text-muted-foreground text-base leading-[1.2] font-medium">
                  /100
                </span>
              </span>
            </div>

            <div className="bg-primary/10 outline-primary text-primary flex items-center justify-center rounded-full p-3 outline-3 outline-offset-2">
              <Check className="size-5" strokeWidth={3} />
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-4">
          {chartScore.map((item, idx) => {
            const lowestScore = 50;
            const averageScore = 75;

            const isBellowAverage = item.score < averageScore;
            const isBellowLowest = item.score < lowestScore;

            return (
              <div key={idx} className="bg-secondary flex justify-between rounded-xl border p-4">
                <div className="flex flex-col gap-2">
                  <h2 className="text-sm md:text-base">{item.label}</h2>
                  <span className="text-foreground flex items-end font-sans text-2xl leading-none font-bold">
                    {item.score}
                    <span className="text-muted-foreground text-base leading-[1.2] font-medium">
                      /100
                    </span>
                  </span>
                </div>

                <div
                  className={cn(
                    "size-fit self-end rounded-full bg-green-500/10 p-3 text-green-500 [&_svg:not([class*='size-'])]:size-4",
                    isBellowAverage && "bg-yellow-500/10 text-yellow-500",
                    isBellowLowest && "bg-red-500/10 text-red-500",
                  )}
                >
                  {isBellowLowest ? <XIcon /> : isBellowAverage ? <TriangleAlert /> : <Check />}
                </div>
              </div>
            );
          })}
        </div>

        <p className="mb-6 text-lg font-bold">Score Bagian CV</p>

        <div className="w-full overflow-x-auto">
          <div className="min-w-[800px] md:min-w-full">
            <ChartContainer config={config} className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  accessibilityLayer
                  data={chart}
                  margin={{
                    bottom: 10,
                    left: 0,
                    top: 2,
                  }}
                >
                  <ChartTooltip
                    content={<ChartTooltipContent hideLabel />}
                    cursor={{ opacity: 0.5 }}
                  />
                  <CartesianGrid vertical={false} strokeDasharray="5 4" stroke="var(--border)" />
                  <Bar dataKey="score" radius={[4, 4, 0, 0]} barSize={!isMobile ? "7%" : "10%"} />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 12 }}
                    width={30}
                    domain={[0, 100]}
                  />
                  <XAxis
                    dataKey="category"
                    tickLine={false}
                    type="category"
                    height={isMobile ? 40 : 10}
                    tickFormatter={(category) => config[category as keyof typeof config]?.label}
                    interval={0}
                    tick={{ fontSize: 12 }}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
