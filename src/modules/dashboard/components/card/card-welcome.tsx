import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";

type CardWelcome = {
  user: {
    fullname: string | undefined;
    imageUrl?: string;
  };
  title?: string;
  description?: string;
};

export function CardWelcome({
  user,
  title = "Selamat Datang, [fullname]!",
  description = "Ini adalah pusat kendali untuk perjalanan interview Anda. Mulai latihan dan tingkatkan kemampuan wawancara Anda.",
}: CardWelcome) {
  const transformTitle = title.replace("[fullname]", user.fullname || "");
  const transformDescription = description.replace("[fullname]", user.fullname || "");

  return (
    <div className="flex items-center gap-4 rounded-xl border bg-purple-50 p-4 md:p-8 dark:bg-purple-950">
      <Avatar className="relative size-20">
        {user.imageUrl && (
          <Image
            src={user.imageUrl}
            alt={user.fullname || ""}
            width={48}
            height={48}
            className="absolute size-full object-cover"
          />
        )}
        <AvatarFallback className="bg-gradient-purple clamp-[text,lg,4xl] font-medium text-white">
          {user.fullname?.charAt(0) || ""}
        </AvatarFallback>
      </Avatar>

      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-bold md:text-2xl">{transformTitle}</h1>
        <p className="text-muted-foreground max-w-[60ch]">{transformDescription}</p>
      </div>
    </div>
  );
}
