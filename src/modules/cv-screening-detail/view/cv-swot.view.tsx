import { FaBolt, FaLightbulb, FaThumbsDown } from "react-icons/fa";
import { FaTriangleExclamation } from "react-icons/fa6";
import { ArrowRight } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ICVScreeningReportResponse } from "@/types/response.type";

export function CVSwotView({ data }: { data: ICVScreeningReportResponse }) {
  return (
    <Card className="shadow-none">
      <CardHeader>
        <CardTitle className="md:text-lg">
          <h3>Analisis SWOT CV</h3>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Card className="border border-green-200 bg-green-100 shadow-none">
            <CardHeader className="flex items-center gap-2 text-green-700">
              <div className="rounded-full bg-green-200 p-3">
                <FaBolt className="size-4 shrink-0" />
              </div>
              <CardTitle>Kekuatan</CardTitle>
            </CardHeader>

            <CardContent>
              <ul className="space-y-4">
                {data.strengths.map((item, index) => (
                  <li key={index} className="flex gap-2.5 text-sm md:text-base">
                    <ArrowRight className="size-4 shrink-0 text-green-700" strokeWidth={3} />
                    <span className="block leading-none text-green-700">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border border-red-200 bg-red-100 shadow-none">
            <CardHeader className="flex items-center gap-2 text-red-700">
              <div className="rounded-full bg-red-200 p-3">
                <FaThumbsDown className="size-4 shrink-0" />
              </div>
              <CardTitle>Kelemahan</CardTitle>
            </CardHeader>

            <CardContent>
              <ul className="space-y-4">
                {data.weaknesses.map((item, index) => (
                  <li key={index} className="flex gap-2.5 text-sm md:text-base">
                    <ArrowRight className="size-4 shrink-0 text-red-700" strokeWidth={3} />
                    <span className="block leading-none text-red-700">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border border-blue-200 bg-blue-100 shadow-none">
            <CardHeader className="flex items-center gap-2 text-blue-500">
              <div className="rounded-full bg-blue-200 p-3">
                <FaLightbulb className="size-4 shrink-0" />
              </div>
              <CardTitle>Kesempatan</CardTitle>
            </CardHeader>

            <CardContent>
              <ul className="space-y-4">
                {data.opportunities.map((item, index) => (
                  <li key={index} className="flex gap-2.5 text-sm md:text-base">
                    <ArrowRight className="size-4 shrink-0 text-blue-500" strokeWidth={3} />
                    <span className="block leading-none text-blue-700">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border border-yellow-200 bg-yellow-100 shadow-none">
            <CardHeader className="flex items-center gap-2 text-yellow-500">
              <div className="rounded-full bg-yellow-200 p-3">
                <FaTriangleExclamation className="size-4 shrink-0" />
              </div>
              <CardTitle>Ambang</CardTitle>
            </CardHeader>

            <CardContent>
              <ul className="space-y-4">
                {data.threats.map((item, index) => (
                  <li key={index} className="flex gap-2.5 text-sm md:text-base">
                    <ArrowRight className="size-4 shrink-0 text-yellow-500" strokeWidth={3} />
                    <span className="block leading-none text-yellow-700">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}
