"use client";

import { usePathname } from "next/navigation";
import { BriefcaseBusiness, ChartLine, ChevronRight, Cog } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { siteConfig } from "@/lib/config";
import Link from "next/link";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export function SidebarMain({
  links,
}: {
  links: typeof siteConfig.sidebarLinks.mainLinks;
}) {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {links.map((link, idx) => {
            const icon = {
              dashboard: <ChartLine className="size-4" />,
              work: <BriefcaseBusiness className="size-4" />,
              setting: <Cog className="size-4" />,
            };

            return (
              <Collapsible key={idx} asChild defaultOpen={link.isActive}>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    size="default"
                    isActive={pathname === link.url}
                    tooltip={link.title}
                  >
                    <Link href={link.url}>
                      {icon[link.icon as keyof typeof icon]}
                      <span>{link.title}</span>
                    </Link>
                  </SidebarMenuButton>

                  {link.items.length ? (
                    <>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuAction className="data-[state=open]:rotate-90">
                          <ChevronRight />
                          <span className="sr-only">Toggle</span>
                        </SidebarMenuAction>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {link.items.map((sub, subIdx) => {
                            return (
                              <SidebarMenuSubItem key={subIdx}>
                                <SidebarMenuSubButton
                                  asChild
                                  className="group gap-2 overflow-hidden"
                                >
                                  <Link href={sub.url}>
                                    <span>{sub.title}</span>
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            );
                          })}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </>
                  ) : null}
                </SidebarMenuItem>
              </Collapsible>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
