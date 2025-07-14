import { Metadata } from "next";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { DashboardNavigation } from "@/components/navigation/dashboard-navigation";
import { DashboardSidebar } from "@/components/navigation/dashboard-navigation/sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { siteConfig } from "@/lib/config";
import { getDeviceInfo } from "@/lib/device-detection";

export const metadata: Metadata = {
  title: {
    default: "Dashboard",
    template: `%s - G-Brain Dashboard`,
  },
};

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const LINKS = siteConfig.sidebarLinks;

  const session = await auth();
  const { isDesktop } = await getDeviceInfo();

  if (!session) {
    redirect("/login");
  }

  return (
    <SidebarProvider
      defaultOpen={isDesktop}
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <DashboardSidebar links={LINKS} user={session.user} />

      <SidebarInset className="bg-muted @container/dashboard">
        <DashboardNavigation />
        {children}
        {/* <ButtonCallCenter /> */}
      </SidebarInset>
    </SidebarProvider>
  );
}
