import { tryCatch } from "@/utils/try-catch";
import { ISchedule } from "@/types/response.type";
import { apiServer } from "@/lib/api-server";

export async function getScheduleDate(date: string) {
  const [resGetDate, errGetDate] = await tryCatch(
    apiServer({
      method: "GET",
      url: `/api/get-available-schedules?date=${date}`,
    }),
  );

  if (errGetDate) {
    console.error(`Error #%d get schedule date: ${errGetDate.message}`,);
    return null;
  }

  return (await resGetDate.json()) as ISchedule[];
}
