import { apiServer } from "@/lib/api-server";
import { CVDetailChartView } from "@/modules/cv-screening-detail/view/cv-detail-chart.view";
import { CVRevisionView } from "@/modules/cv-screening-detail/view/cv-revision.view";
import { CVSwotView } from "@/modules/cv-screening-detail/view/cv-swot.view";
import { ICVScreeningReportResponse } from "@/types/response.type";
import { tryCatch } from "@/utils/try-catch";
import { notFound } from "next/navigation";

export default async function CVScreeningDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [res, err] = await tryCatch(
    apiServer({
      method: "GET",
      url: "/api/cv-screening/report/" + id,
    }),
  );

  if (err) {
    notFound();
  }

  const data = (await res.json()) as ICVScreeningReportResponse;

  return (
    <div className="container mx-auto flex flex-1 flex-col gap-4 p-4 md:gap-6 md:px-6">
      <CVDetailChartView data={data} />
      <CVSwotView data={data} />
      <CVRevisionView data={data} />
    </div>
  );
}
