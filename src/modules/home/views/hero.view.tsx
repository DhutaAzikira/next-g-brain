import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export function HomeHeroView() {
  return (
    <section
      id="hero"
      className="col-span-full flex w-full items-center justify-center bg-gradient-to-br from-[#F5F3FF] to-[#FDF2F8] pt-30 pb-50 font-sans dark:bg-purple-800 dark:from-purple-600 dark:to-gray-900"
      aria-label="Latihan Interview Kerja Bareng AI"
      lang="id"
    >
      <div className="@container/hero container flex flex-col items-center justify-center gap-6 px-6 md:grid md:grid-cols-2 md:flex-row md:px-0">
        <header className="space-y-4 self-start">
          <h1 className="clamp-[text,3xl,5xl] leading-normal font-bold md:max-w-2xl">
            Latihan Interview Kerja Bareng AI
          </h1>
          <p className="clamp-[text,sm,3xl] gap-4 md:mb-12">
            Siap hadapi recruiter kapan pun, dimanapun di Indonesia.
          </p>
          <nav aria-label="Aksi utama">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href="/login"
                className={buttonVariants({
                  className: "w-full px-6 text-center sm:w-auto",
                })}
              >
                Mulai Sekarang
              </Link>
              <Link
                href="/login"
                className={buttonVariants({
                  variant: "outline",
                  className:
                    "border-primary text-primary hover:text-primary/80 w-full bg-transparent px-6 text-center sm:w-auto dark:text-purple-100",
                })}
              >
                Gabung Komunitas AI Interview Indonesia
              </Link>
            </div>
          </nav>
        </header>
        <Card
          className="relative aspect-video h-auto w-full"
          aria-label="Ilustrasi AI Interview"
        >
          <div className="bg-primary text-primary-foreground absolute right-0 bottom-0 m-4 rounded-full px-3 py-1">
            AI Interview
          </div>
        </Card>
      </div>
    </section>
  );
}
