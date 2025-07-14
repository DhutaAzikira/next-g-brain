import { MainHeaderNavigation } from "@/components/navigation/main-navigation/header";
import { MainFooterNavigation } from "@/components/navigation/main-navigation/footer";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative z-10 flex min-h-svh flex-col">
      <MainHeaderNavigation />

      <main className="flex flex-1 flex-col">{children}</main>

      <MainFooterNavigation />
    </div>
  );
}
