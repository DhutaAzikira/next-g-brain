import { auth } from "@/auth";
import { BreadcrumbType } from "@/hooks/use-breadcrumb";
import { CreateScheduleForm } from "@/modules/dashboard/components/form/create-shedule.form";
import { getScheduleDate } from "@/modules/dashboard/services/get-schedule-date.service";
import { DashboardHeaderView } from "@/modules/dashboard/views/header.view";
import { format } from "date-fns";
import { notFound } from "next/navigation";
import { z } from "zod/v4";

const dateSchema = z.iso.date().optional();

export default async function CreateInterviewSchedulePage({
  searchParams,
}: {
  searchParams: Promise<{ date: string }>;
}) {
  const { date } = await searchParams;
  const parsedDate = dateSchema.safeParse(date);

  if (!parsedDate.success) {
    notFound();
  }

  const newDate = format(parsedDate.data || new Date(), "yyyy-MM-dd")

  const [session, scheduleDate] = await Promise.all([
    auth(),
    getScheduleDate(newDate),
  ]);

  const user = session?.user;

  const links: BreadcrumbType[] = [
    {
      title: "Dashboard",
      url: "/dashboard",
    },
    {
      title: "Latihan Wawancara",
      url: "/dashboard/interview/create",
    },
  ];

  const schedule = scheduleDate
    ? scheduleDate.map((item) => {
        const start_time =
          item.start_time.split(":")[0] + ":" + item.start_time.split(":")[1];
        const end_time =
          item.end_time.split(":")[0] + ":" + item.end_time.split(":")[1];

        return {
          ...item,
          start_time,
          end_time,
        };
      })
    : null;

  return (
    <div className="relative">
      <DashboardHeaderView
        title="Latihan Wawancara"
        description="Atur target latihan Anda untuk simulasi yang lebih akurat."
        links={links}
      />

      <div className="mt-4 flex items-center justify-center p-2 md:p-4">
        <CreateScheduleForm user={user} scheduleDate={schedule} date={newDate} />
      </div>
    </div>
  );
}
