"use client";

import { usePathname } from "next/navigation";
import { Plus, SidebarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useSidebar } from "@/components/ui/sidebar";

export function DashboardNavigation() {
  const pathname = usePathname();
  const { toggleSidebar } = useSidebar();

  const include = ["/dashboard/cv-screening"];

  return (
    <header className="bg-background sticky top-0 z-50 flex w-full items-center justify-between border-b">
      <div className="flex h-(--header-height) w-full items-center gap-4 px-4 md:gap-6 md:px-6">
        <Button className="h-8 w-8" variant="ghost" size="icon" onClick={toggleSidebar}>
          <SidebarIcon />
        </Button>
        <Separator orientation="vertical" className="mr-2 h-4" />
      </div>

      <div className="px-4">
        {include.includes(pathname) && (
          <Button size="sm" className="bg-gradient-purple">
            <Plus />
            Mulai Interview
          </Button>
        )}
      </div>
    </header>
  );
}
