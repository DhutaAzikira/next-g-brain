import type { Metadata } from "next";

import { GlassDisplacementFilter } from "@/components/shared/svg-filter";
import { ThemeProvider } from "@/providers/theme-provider";

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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || ((!('theme' in localStorage) || localStorage.theme === 'system') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.querySelector('meta[name="theme-color"]').setAttribute('content', '#0a0a0a')
                }
                if (localStorage.layout) {
                  document.documentElement.classList.add('layout-' + localStorage.layout)
                }
              } catch (_) {}
            `,
          }}
        />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body
        className={cn(
          fontVariables,
          "text-foreground group/body font-inter overscroll-none antialiased",
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SessionProvider session={session}>{children}</SessionProvider>
        </ThemeProvider>
        <GlassDisplacementFilter />
        <Toaster />
      </body>
    </html>
  );
}
