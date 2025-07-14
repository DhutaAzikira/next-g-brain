import Link from "next/link";
import { Plus } from "lucide-react";

import { auth } from "@/auth";
import { Button } from "@/components/ui/button";

import { CardExtras } from "@/modules/dashboard/components/card/card-extra";
import { CardInformation } from "@/modules/dashboard/components/card/card-information";
import { CardSession } from "@/modules/dashboard/components/card/card-session";
import { CardWelcome } from "@/modules/dashboard/components/card/card-welcome";
import { DashboardHeaderView } from "@/modules/dashboard/views/header.view";
import { getInterviews } from "@/modules/dashboard/services/get-interviews.service";
import { getImageUrl } from "@/utils/image-url";

export default async function DashboardPage() {
  const [session, interviews] = await Promise.all([auth(), getInterviews()]);

  const user = session?.user;

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

      <div className="flex flex-col gap-6 p-2 md:p-4">
        <CardWelcome user={{ fullname: user?.name || "", imageUrl: getImageUrl(user?.image || "") }} />
        <CardInformation
          totalSession={interviews?.length || 0}
          averageScore={80}
          weeklyTarget={{ total: 10, completed: 5 }}
        />
        <CardSession showAll={(interviews?.length || 0) > 10} sessions={interviews} />
        {interviews?.length === 0 && <CardExtras />}
      </div>
    </>
  );
}
