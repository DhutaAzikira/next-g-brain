import { Loader2 } from "lucide-react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { cn } from "@/utils/cn";
import { auth } from "@/auth";

import { SettingProfileForm } from "../components/form/setting-profile.form";
import { Skeleton } from "@/components/ui/skeleton";

type SettingViewProps = {
  className?: string;
};

export async function SettingView({ className }: SettingViewProps) {
  const session = await auth();

  const user = session?.user;

  return (
    <Card className={cn("shadow-none", className)}>
      <SettingProfileForm user={user} className="@3xl/card-content:grid-cols-2" />
    </Card>
  );
}

export function SettingSkeletonView({ className }: SettingViewProps) {
  return (
    <Card className={cn("shadow-none", className)}>
      <CardHeader className="border-b @3xl/card-header:px-8">
        <div className="flex items-center gap-4">
          <Skeleton className="size-20 rounded-full" />

          <div className="space-y-1">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-60" />
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex h-122 items-center justify-center">
        <div className="animate-spin">
          <Loader2 className="text-secondary size-20" />
        </div>
      </CardContent>
    </Card>
  );
}
