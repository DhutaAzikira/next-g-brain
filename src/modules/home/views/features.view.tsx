import { Card } from "@/components/ui/card";
import {
  FaBrain,
  FaChartSimple,
  FaFileVideo,
  FaShieldHalved,
  FaVideo,
} from "react-icons/fa6";
import { IoSpeedometer } from "react-icons/io5";

const FEATURES = [
  {
    icon: <FaVideo className="size-6 text-purple-600" />,
    title: "Simulasi Interview AI",
    description:
      "Latihan interview dengan AI yang menyerupai interviewer sungguhan dengan pertanyaan yang realistis.",
    bgColor: "bg-[#EDE9FE]",
    iconBg: "bg-purple-100",
  },
  {
    icon: <FaChartSimple className="size-6 text-[#7C3AED]" />,
    title: "Feedback Otomatis & Skor",
    description:
      "Dapatkan evaluasi mendetail dan skor untuk setiap jawaban yang kamu berikan.",
    bgColor: "bg-purple-50",
    iconBg: "bg-purple-100",
  },
  {
    icon: <FaBrain className="size-6 text-[#7C3AED]" />,
    title: "Insight Kognitif & Komunikasi",
    description:
      "Analisis mendalam tentang kemampuan berpikir dan komunikasi kamu saat menjawab.",
    iconBg: "bg-purple-100",
  },
  {
    icon: <FaFileVideo className="size-6 text-[#7C3AED]" />,
    title: "Rekaman Video & Transkrip",
    description:
      "Tonton ulang rekaman interview kamu lengkap dengan transkrip untuk belajar.",
    iconBg: "bg-purple-100",
  },
  {
    icon: <FaShieldHalved className="size-6 text-[#7C3AED]" />,
    title: "Sinyal Integritas",
    description:
      "Pelajari cara menjawab dengan jujur dan etis yang akan dihargai oleh recruiter.",
    iconBg: "bg-purple-100",
  },
  {
    icon: <IoSpeedometer className="size-6 text-[#7C3AED]" />,
    title: "Dashboard Riwayat",
    description:
      "Pantau kemajuan dan lihat riwayat latihan interview yang telah kamu lakukan.",
    iconBg: "bg-purple-100",
  },
];

export function HomeFeaturesView() {
  return (
    <section className="font-san flex items-center justify-center overflow-hidden bg-white dark:bg-gray-900">
      <div className="container flex w-full flex-col items-center justify-center gap-8 px-6 py-24 md:gap-12 md:px-0 md:py-30">
        <div className="w-fit space-y-7 text-center">
          <h2 className="clamp-[text,2xl,4xl] font-bold text-gray-900 dark:text-white">
            Fitur Unggulan
          </h2>
          <p className="clamp-[text,sm,lg] mx-auto max-w-[80ch] text-balance text-gray-600 dark:text-gray-400">
            Nikmati berbagai fitur canggih yang akan membantu kamu sukses dalam
            interview dan pencarian kerja, termasuk AI Job Hunter Desktop untuk
            otomatis apply ke LinkedIn, JobStreet, dan portal kerja lainnya
          </p>
        </div>

        <div className="grid w-full grid-cols-2 gap-3 pt-7 md:grid-cols-3 md:gap-8">
          {FEATURES.map((feature, index) => (
            <Card
              key={index}
              className="space-y-1 border-2 border-gray-100 bg-white p-3 shadow-none transition-shadow hover:shadow-lg md:p-6 dark:border-gray-800 dark:bg-gray-800"
            >
              <div className="flex justify-start">
                <div className={`rounded-full bg-[#EDE9FE] p-2 md:p-4`}>
                  {feature.icon}
                </div>
              </div>
              <div className="space-y-1">
                <h3 className="clamp-[text,xs,lg] font-semibold text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="clamp-[text,xs,lg] leading-relaxed text-gray-600 dark:text-gray-400">
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
