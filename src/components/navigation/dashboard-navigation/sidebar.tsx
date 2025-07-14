"use client";

import Link from "next/link";
import Image from "next/image";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { siteConfig } from "@/lib/config";
import { cn } from "@/utils/cn";

import { SidebarMain } from "./sidebar-main";

import { User } from "next-auth";
import { SidebarLogout } from "./sidebar-logout";
import { getImageUrl } from "@/utils/image-url";

export function DashboardSidebar({
  className,
  links,
  user,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  links: typeof siteConfig.sidebarLinks;
  user: User | undefined;
}) {
  const { open } = useSidebar();

  return (
    <Sidebar {...props} className={cn("z-20 font-sans", className)} collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" tooltip={user?.name || ""} asChild>
              <Link
                href="/dashboard"
                className="flex items-center gap-2 px-4 text-lg font-semibold"
              >
                <Avatar className={cn("relative size-8 transition-all", open && "size-12")}>
                  {user?.image && (
                    <Image
                      src={getImageUrl(user.image)}
                      alt={user.name || ""}
                      width={48}
                      height={48}
                      className="absolute size-full object-cover"
                    />
                  )}
                  <AvatarFallback className="bg-gradient-green rounded-none text-white md:text-lg">
                    {user?.name?.charAt(0) || ""}
                  </AvatarFallback>
                </Avatar>

                <div className="font-inter overflow-hidden leading-none">
                  <p className="font-semibold">{user?.name || ""}</p>
                  <p className="text-muted-foreground truncate text-xs">{user?.email || ""}</p>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMain links={links.mainLinks} />
      </SidebarContent>

      <SidebarFooter>
        <SidebarLogout />
      </SidebarFooter>
    </Sidebar>
  );
}
