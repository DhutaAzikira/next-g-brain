import { Card } from "@/components/ui/card";
import Image from "next/image";

const INTERFACE_FEATURES = [
  {
    title: "Interview dengan Avatar AI",
    description: "Berinteraksi dengan avatar AI yang responsif dan realistis.",
    imageUrl: "/images/avatar-interview.webp",
    imageAlt: "AI Avatar Interview Interface",
  },
  {
    title: "Hasil Evaluasi Lengkap",
    description: "Dapatkan analisis mendalam tentang performa interview kamu.",
    imageUrl: "/images/evaluation-dashboard.webp",
    imageAlt: "Detailed Evaluation Results Dashboard",
  },
  {
    title: "Halaman Transkrip & Video",
    description: "Tonton ulang rekaman dan baca transkrip untuk belajar.",
    imageUrl: "/images/transcript-video.webp",
    imageAlt: "Video and Transcript Page Interface",
  },
  {
    title: "Riwayat di Dashboard",
    description: "Pantau kemajuan dan lihat riwayat interview kamu.",
    imageUrl: "/images/interview-history.webp",
    imageAlt: "Dashboard History and Analytics",
  },
];

export function HomeInterfaceView() {
  return (
    <section className="flex items-center justify-center overflow-hidden bg-gray-50 font-sans dark:bg-gray-900">
      <div className="container flex w-full flex-col items-center justify-center gap-8 px-6 py-24 md:gap-12 md:px-0 md:py-30">
        <div className="w-fit space-y-4 text-center">
          <h2 className="clamp-[text,2xl,4xl] font-bold text-gray-900 dark:text-white">
            Lihat Antarmuka Kami
          </h2>
          <p className="clamp-[text,sm,lg] mx-auto max-w-[60ch] text-balance text-gray-600 dark:text-gray-400">
            Platform yang intuitif dan mudah digunakan untuk membantu kamu
            berlatih interview. Dilengkapi AI Job Hunter Desktop untuk pencarian
            kerja otomatis di berbagai portal.
          </p>
        </div>

        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {INTERFACE_FEATURES.map((feature, index) => (
            <Card
              key={index}
              className="group max-h-xs md:max-h-xl overflow-hidden border-none p-0 shadow-lg transition-shadow duration-300 hover:shadow-xl dark:bg-gray-800"
            >
              <div className="relative h-80 w-full overflow-hidden">
                <Image
                  src={feature.imageUrl}
                  alt={feature.imageAlt}
                  fill
                  className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                />
              </div>

              <div className="space-y-3 p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="leading-relaxed text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
