import Link from "next/link";
import { Plus } from "lucide-react";

import { auth } from "@/auth";
import { Button } from "@/components/ui/button";

import { CardExtras } from "@/modules/dashboard/components/card/card-extra";
import { CardSession } from "@/modules/dashboard/components/card/card-session";
import { CardWelcome } from "@/modules/dashboard/components/card/card-welcome";
import { DashboardHeaderView } from "@/modules/dashboard/views/header.view";
import { getInterviews } from "@/modules/dashboard/services/get-interviews.service";
import { getImageUrl } from "@/utils/image-url";
import { CardCVHistory } from "@/modules/dashboard/components/card/card-cv-history";
import { getCVScreening } from "@/modules/dashboard/services/get-cv-screening.service";

export default async function DashboardPage() {
  const [session, interviews, cvScreening] = await Promise.all([
    auth(),
    getInterviews(),
    getCVScreening(),
  ]);

  const user = session?.user;
  const averageScore = interviews?.length
    ? interviews?.reduce((acc, curr) => acc + (curr.skor_keseluruhan || 0), 0) / interviews?.length
    : 0;

  return (
    <>
      <DashboardHeaderView title="Dashboard" description="Pusat kendali interview Anda">
        <Button
          asChild
          className="bg-gradient-purple font-semibold transition-opacity duration-500 hover:opacity-80"
        >
          <Link href="/dashboard/interview/create">
            <Plus />
            Latihan Interview
          </Link>
        </Button>
      </DashboardHeaderView>

      <div className="container mx-auto flex flex-col gap-6 p-2 md:p-4">
        <CardWelcome
          user={{ fullname: user?.name || "", imageUrl: getImageUrl(user?.image || "") }}
          totalSession={interviews?.length || 0}
          averageScore={averageScore}
        />

        <CardCVHistory data={cvScreening} />

        <CardSession showAll={(interviews?.length || 0) > 10} sessions={interviews} />
        {interviews?.length === 0 && <CardExtras />}
      </div>
    </>
  );
}
