import Link from "next/link";
import Image from "next/image";

import { ButtonHome } from "@/components/shared/button-home";

import { siteConfig } from "@/lib/config";
import { getDeviceInfo } from "@/lib/device-detection";
import { cn } from "@/utils/cn";

import { DesktopNav } from "./desktop-nav";
import { buttonVariants } from "../../ui/button";
import { auth } from "@/auth";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logout } from "@/modules/auth/services/logout.service";
import { getImageUrl } from "@/utils/image-url";
import { Cog, LogOut, PanelLeftIcon } from "lucide-react";

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
              <DropdownMenuTrigger>
                <Avatar>
                  {user?.image && (
                    <Image
                      src={getImageUrl(user.image)}
                      alt={user.name || ""}
                      width={48}
                      height={48}
                    />
                  )}
                  <AvatarFallback className="bg-gradient-purple text-white">
                    {user?.name?.charAt(0) || ""}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link
                    href="/dashboard"
                    className="text-muted-foreground hover:text-foreground flex items-center gap-2 md:gap-4"
                  >
                    <PanelLeftIcon className="size-4" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href="/dashboard/setting"
                    className="text-muted-foreground hover:text-foreground flex items-center gap-2 md:gap-4"
                  >
                    <Cog className="size-4" />
                    Pengaturan
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <form action={logout}>
                    <button
                      type="submit"
                      className="text-muted-foreground hover:text-foreground flex items-center gap-2 md:gap-4"
                    >
                      <LogOut className="size-4" />
                      Logout
                    </button>
                  </form>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  );
}
