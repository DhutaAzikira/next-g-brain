import { AuthNavigation } from "@/components/navigation/auth-navigation";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: {
    default: "Akses Aman ke Akun Anda",
    template: `%s - Akses Aman ke Akun Anda`,
  },
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative z-10 flex min-h-svh flex-col">
      <Suspense fallback={null}>
        <AuthNavigation />
      </Suspense>

      <main className="flex flex-1 flex-col">{children}</main>
    </div>
  );
}
