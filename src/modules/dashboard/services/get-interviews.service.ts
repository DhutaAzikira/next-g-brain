import { apiServer } from "@/lib/api-server";
import { IInterview } from "@/types/response.type";
import { tryCatch } from "@/utils/try-catch";

export async function getInterviews() {
  const [resGetDate, errGetDate] = await tryCatch(
    apiServer({
      method: "GET",
      url: `/api/interviews`,
    }),
  );

  if (errGetDate) {
    console.error(`Error get schedule date: ${errGetDate.message}`);
    return null;
  }

  return (await resGetDate.json()) as IInterview[];
}
