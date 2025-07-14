import { CardSettingInformation } from "@/modules/dashboard/components/card/card-setting-information";
import { DashboardHeaderView } from "@/modules/dashboard/views/header.view";
import {
  SettingSkeletonView,
  SettingView,
} from "@/modules/dashboard/views/setting.view";
import { Suspense } from "react";

export default function SettingPage() {
  return (
    <div className="@container/setting">
      <DashboardHeaderView
        title="Pengaturan Profil"
        description="Kelola informasi profil Anda"
      />

      <div className="grid grid-cols-1 gap-6 p-2 md:p-4 @6xl/setting:grid-cols-6">
        <Suspense
          fallback={<SettingSkeletonView className="@6xl/setting:col-span-4" />}
        >
          <SettingView className="@6xl/setting:col-span-4" />
        </Suspense>
        <CardSettingInformation className="@6xl/setting:col-span-2" />
      </div>
    </div>
  );
}
