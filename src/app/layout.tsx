import type { Metadata } from "next";

import { GlassDisplacementFilter } from "@/components/shared/svg-filter";

import "@/styles/globals.css";

import { siteConfig } from "@/lib/config";
import { fontVariables } from "@/lib/fonts";
import { cn } from "@/utils/cn";
import { Toaster } from "sonner";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  keywords: [],
  authors: [],
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [],
    locale: "en-US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [],
    site: siteConfig.url,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          fontVariables,
          "text-foreground group/body font-inter overscroll-none antialiased",
        )}
      >
        <SessionProvider session={session}>{children}</SessionProvider>
        <GlassDisplacementFilter />
        <Toaster />
      </body>
    </html>
  );
}
