import {
  Card,
  CardAction,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/utils/cn";
import { ArrowRight, Briefcase, CalendarCheck, Cog } from "lucide-react";
import Link from "next/link";

export function CardExtras() {
  const extras = [
    {
      title: "Jadwal Interview",
      description:
        "Atur jadwal simulasi wawancara sesuai waktu yang Anda inginkan",
      icon: <CalendarCheck />,
      href: "/dashboard/interview/schedule",
    },
    {
      title: "Cari Pekerjaan",
      description:
        "Jelajahi peluang karir dan posisi yang sesuai dengan keahlian Anda",
      icon: <Briefcase />,
      href: "/dashboard/work",
    },
    {
      title: "Pengaturan",
      description: "Kelola profil, preferensi, dan pengaturan akun Anda",
      icon: <Cog />,
      href: "/dashboard/setting",
    }
  ];

  return (
    <div className="grid grid-cols-1 gap-6 font-sans lg:grid-cols-3">
      {extras.map((item, index) => {
        const iconVariants = {
          "Jadwal Interview":
            "bg-blue-50 text-blue-500 dark:bg-blue-700 dark:text-blue-100",
          "Cari Pekerjaan":
            "bg-green-50 text-green-500 dark:bg-green-700 dark:text-green-100",
          Pengaturan:
            "bg-purple-50 text-purple-500 dark:bg-purple-700 dark:text-purple-100",
        };

        const linkVariants = {
          "Jadwal Interview":
            "text-blue-600 hover:text-blue-500 dark:text-blue-500 dark:hover:text-blue-400",
          "Cari Pekerjaan":
            "text-green-600 hover:text-green-500 dark:text-green-500 dark:hover:text-green-400",
          Pengaturan:
            "text-purple-600 hover:text-purple-500 dark:text-purple-500 dark:hover:text-purple-400",
        };

        return (
          <Card key={index} className="shadow-none">
            <CardHeader>
              <div className="space-y-2">
                <CardTitle className="text-lg">{item.title}</CardTitle>
                <p className="text-muted-foreground max-w-[30ch] text-sm">
                  {item.description}
                </p>
              </div>

              <CardAction>
                <div
                  className={cn(
                    "grid size-12 place-content-center rounded-xl",
                    iconVariants[item.title as keyof typeof iconVariants],
                  )}
                >
                  {item.icon}
                </div>
              </CardAction>
            </CardHeader>

            <CardFooter>
              <CardAction>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 text-sm leading-none font-medium transition-colors hover:underline",
                    linkVariants[item.title as keyof typeof linkVariants],
                  )}
                >
                  Lihat Jadwal
                  <ArrowRight className="size-4" />
                </Link>
              </CardAction>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
