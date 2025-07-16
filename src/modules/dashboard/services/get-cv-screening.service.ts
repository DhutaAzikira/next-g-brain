import { apiServer } from "@/lib/api-server";
import { ICVScreeningReportResponse } from "@/types/response.type";
import { tryCatch } from "@/utils/try-catch";

export async function getCVScreening() {
  const [res, err] = await tryCatch(
    apiServer({
      method: "GET",
      url: "/api/cv-screening/report",
    }),
  );

  if (err) {
    return null;
  }

  return (await res.json()) as ICVScreeningReportResponse[];
}
