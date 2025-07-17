import Image from "next/image";
import Link from "next/link";

export function ButtonHome() {
  return (
    <Link
      href="/"
      aria-label="Home"
      className="text-primary flex items-center gap-2 text-lg leading-none font-bold transition-opacity duration-500 hover:opacity-80 md:text-xl"
    >
      <Image src="/images/LOGO 2.png" alt="Logo" width={100} height={60} />
    </Link>
  );
}
