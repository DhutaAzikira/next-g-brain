import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FaDiscord, FaWhatsapp } from "react-icons/fa";

const TESTIMONIALS = [
  {
    name: "Budi Santoso",
    role: "Software Engineer",
    avatar: "/api/placeholder/40/40",
    testimonial:
      "Komunitas ini sangat membantu persiapan interview saya. Berkat tips dari teman-teman, akhirnya lolos di startup impian!",
    initials: "BS",
  },
  {
    name: "Siti Nurhaliza",
    role: "UI/UX Designer",
    avatar: "/api/placeholder/40/40",
    testimonial:
      "Diskusi di grup sangat insightful! Banyak feedback yang bikin portfolio saya lebih kuat untuk interview.",
    initials: "SN",
  },
  {
    name: "Dewi Lestari",
    role: "Marketing",
    avatar: "/api/placeholder/40/40",
    testimonial:
      "Senang bisa berbagi pengalaman interview dan dapat masukan yang membangun dari komunitas!",
    initials: "DL",
  },
  {
    name: "Reza Rahadian",
    role: "Data Analyst",
    avatar: "/api/placeholder/40/40",
    testimonial:
      "Belajar bareng komunitas bikin persiapan interview jadi lebih terarah dan percaya diri!",
    initials: "RR",
  },
];

export function HomeCommunityView() {
  return (
    <section className="flex items-center justify-center overflow-hidden bg-white font-sans dark:bg-gray-900">
      <div className="container flex w-full flex-col items-center justify-center gap-8 px-6 py-24 md:px-0 md:py-30">
        <div className="max-w-3xl space-y-4 text-center">
          <h2 className="clamp-[text,2xl,4xl] font-bold text-gray-900 dark:text-white">
            Gabung Komunitas
          </h2>
          <p className="clamp-[text,sm,lg] mx-auto max-w-2xl text-gray-600 dark:text-gray-400">
            Tempat ngobrol bareng pejuang kerja lain. Diskusikan tips interview
            dan pengalaman menggunakan AI Job Hunter Desktop.
          </p>
        </div>

        <Card className="w-full max-w-full border-0 bg-gradient-to-br from-[#F5F3FF] to-[#FDF2F8] p-6 shadow-lg md:p-8 dark:from-purple-600 dark:to-gray-900">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 md:text-3xl dark:text-white">
                Belajar Bersama Lebih Menyenangkan!
              </h3>
              <p className="text-base text-gray-600 md:text-lg dark:text-gray-400">
                Bergabunglah dengan ribuan pencari kerja lainnya untuk berbagi
                tips, pengalaman, dan dukungan dalam perjalanan karir kamu.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button
                  size="lg"
                  className="flex items-center gap-2 bg-green-500 px-6 py-3 text-white hover:bg-green-600"
                >
                  <FaWhatsapp />
                  Join WhatsApp Group
                </Button>
                <Button
                  size="lg"
                  className="flex items-center gap-2 bg-indigo-500 px-6 py-3 text-white hover:text-white"
                >
                  <FaDiscord />
                  Masuk ke Discord
                </Button>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {TESTIMONIALS.map((testimonial, index) => (
                <Card
                  key={index}
                  className="border-0 bg-white p-4 shadow-2xs dark:bg-gray-700"
                >
                  <div className="flex gap-3">
                    <Avatar className="h-10 w-10 flex-shrink-0">
                      <AvatarImage
                        src={testimonial.avatar}
                        alt={testimonial.name}
                      />
                      <AvatarFallback className="bg-gray-200 text-gray-700 dark:bg-gray-600 dark:text-gray-300">
                        {testimonial.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <div className="mb-2 flex flex-col gap-1">
                        <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                          {testimonial.name}
                        </h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {testimonial.role}
                        </p>
                      </div>
                      <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                        &quot;{testimonial.testimonial}&quot;
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold text-indigo-600 md:text-xl dark:text-indigo-300">
              1.300+ sesi interview disimulasikan oleh member komunitas kami
            </p>
          </div>
        </Card>
      </div>
    </section>
  );
}
