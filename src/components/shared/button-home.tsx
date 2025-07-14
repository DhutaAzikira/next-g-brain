import Link from "next/link";
import { LogoIcon } from "./svg-logo";

export function ButtonHome() {
  return (
    <Link
      href="/"
      aria-label="Home"
      className="text-primary flex items-center gap-2 text-lg leading-none font-bold transition-opacity duration-500 hover:opacity-80 md:text-xl"
    >
      <LogoIcon />
      InterviewAI
    </Link>
  );
}
