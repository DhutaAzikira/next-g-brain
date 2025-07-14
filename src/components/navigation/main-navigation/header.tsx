import Link from "next/link";

import { ButtonHome } from "@/components/shared/button-home";

import { siteConfig } from "@/lib/config";
import { getDeviceInfo } from "@/lib/device-detection";
import { cn } from "@/utils/cn";

import { DesktopNav } from "./desktop-nav";
import { buttonVariants } from "../../ui/button";
import { ButtonTheme } from "../../shared/button-theme";
import { auth } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logout } from "@/modules/auth/services/logout.service";

export async function MainHeaderNavigation() {
  const [{ isDesktop }, session] = await Promise.all([getDeviceInfo(), auth()]);
  const user = session?.user;

  return (
    <header className="bg-background border-border/40 0 sticky top-0 z-2 flex h-16 w-full items-center justify-center border-b px-6">
      <div className="container flex w-full items-center justify-between">
        {/* Logo */}
        <ButtonHome />

        <nav className="flex w-full items-center gap-4 md:w-fit md:gap-6">
          {/* Navigation */}
          {isDesktop && <DesktopNav links={siteConfig.navLinks} />}
        </nav>

        <div className="flex items-center gap-2">
          {/* Auth */}
          {!user ? (
            <>
              <Link
                href="/login"
                className={cn(
                  buttonVariants({
                    variant: "ghost",
                    size: "default",
                  }),
                  "rounded-full md:px-4",
                )}
              >
                Masuk
              </Link>
              <Link
                href="/register"
                className={cn(
                  buttonVariants({
                    variant: "default",
                    size: "default",
                  }),
                  "rounded-full md:px-4",
                )}
              >
                Daftar
              </Link>
            </>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar>
                  <AvatarImage
                    src={user?.image || ""}
                    alt={user?.name || ""}
                    className="shrink-0"
                  />
                  <AvatarFallback className="bg-gradient-purple text-white">
                    {user?.name?.charAt(0) || ""}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>

              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/setting">Pengaturan</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <form action={logout}>
                    <button type="submit">Logout</button>
                  </form>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {/* Theme */}
          {isDesktop && <ButtonTheme />}
        </div>
      </div>
    </header>
  );
}
