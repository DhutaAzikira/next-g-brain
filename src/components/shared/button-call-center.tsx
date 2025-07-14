// "use client";

import { cn } from "@/utils/cn";
import { Headset } from "lucide-react";

export function ButtonCallCenter() {
  // const pathname = usePathname();

  // if (pathname.startsWith("/dashboard/interview")) return null;

  return (
    <a
      href="#"
      aria-label="Call Center"
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "bg-gradient-purple fixed right-0 bottom-0 mr-6 mb-6 flex size-12 scale-3d items-center justify-center rounded-full transition-[scale] duration-500 transform-3d hover:scale-110 md:mr-8 md:mb-8",
      )}
    >
      <Headset className="size-5 text-white" strokeWidth={2} />
    </a>
  );
}
