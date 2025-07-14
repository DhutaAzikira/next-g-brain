"use client";

import { SidebarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useSidebar } from "@/components/ui/sidebar";
import { ButtonTheme } from "@/components/shared/button-theme";

export function DashboardNavigation() {
  const { toggleSidebar } = useSidebar();

  return (
    <header className="bg-background sticky top-0 z-50 flex w-full items-center justify-between border-b">
      <div className="flex h-(--header-height) w-full items-center gap-4 md:gap-6 px-4 md:px-6">
        <Button
          className="h-8 w-8"
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
        >
          <SidebarIcon />
        </Button>
        <Separator orientation="vertical" className="mr-2 h-4" />
      </div>

      <div className="px-4">
        <ButtonTheme className="size-6" />
      </div>
    </header>
  );
}
