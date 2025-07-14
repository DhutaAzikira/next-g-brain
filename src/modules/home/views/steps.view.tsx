import { Card } from "@/components/ui/card";
import { FaFileAlt, FaRocket } from "react-icons/fa";
import { FaBriefcase, FaChartLine } from "react-icons/fa6";
import { IoChatbubbles } from "react-icons/io5";

const STEPS = [
  {
    number: 1,
    icon: <FaFileAlt className="size-8 text-[#8B5CF6]" />,
    title: "Screening CV",
    description:
      "AI menganalisis CV kamu dan memberikan saran perbaikan untuk meningkatkan peluang lolos screening.",
    bgColor: "bg-purple-50",
    numberColor: "bg-purple-600",
  },
  {
    number: 2,
    icon: <FaBriefcase className="size-8 text-[#8B5CF6]" />,
    title: "Pilih posisi & industri",
    description:
      "Tentukan posisi dan industri yang kamu minati untuk mendapatkan pertanyaan yang relevan.",
    bgColor: "bg-purple-50",
    numberColor: "bg-purple-600",
  },
  {
    number: 3,
    icon: <IoChatbubbles className="size-8 text-[#8B5CF6]" />,
    title: "Interview dengan AI",
    description:
      "Lakukan simulasi interview dengan AI interviewer yang akan memberikan pertanyaan sesuai posisi.",
    bgColor: "bg-purple-50",
    numberColor: "bg-purple-600",
  },
  {
    number: 4,
    icon: <FaChartLine className="size-8 text-[#8B5CF6]" />,
    title: "Dapat hasil & evaluasi",
    description:
      "Terima feedback dan skor evaluasi secara instan untuk meningkatkan performa interview kamu.",
    bgColor: "bg-purple-50",
    numberColor: "bg-purple-600",
  },
  {
    number: 5,
    icon: <FaRocket className="size-8 text-[#8B5CF6]" />,
    title: "Auto Apply Kerja",
    description:
      "AI Job Hunter Desktop otomatis melamar pekerjaan yang sesuai dengan CV dan profil kamu di berbagai portal.",
    bgColor: "bg-purple-50",
    numberColor: "bg-purple-600",
  },
];

export function HomeStepsView() {
  return (
    <section className="flex items-center justify-center overflow-hidden bg-gray-50 font-sans dark:bg-gray-900">
      <div className="container flex w-full flex-col items-center justify-center gap-8 px-6 py-24 md:gap-24 md:px-0 md:py-30">
        <div className="w-fit space-y-4 text-center">
          <h2 className="clamp-[text,2xl,4xl] font-bold text-gray-900 dark:text-white">
            Cara Kerja
          </h2>
          <p className="clamp-[text,sm,lg] mx-auto max-w-[80ch] text-balance text-gray-600 dark:text-gray-400">
            Lima langkah lengkap untuk sukses dalam pencarian kerja dengan
            InterviewAI dan AI Job Hunter Desktop.
          </p>
        </div>

        <div className="w-full">
          <div className="grid grid-cols-1 gap-3 gap-y-10 md:grid-cols-5 md:gap-6">
            {STEPS.map((step) => (
              <div
                key={step.number}
                className="flex flex-col items-center gap-7"
              >
                <Card className="space-y-1 border-0 bg-white p-6 text-center shadow-none transition-shadow hover:shadow-lg md:space-y-9 dark:bg-gray-800">
                  <div className="flex justify-center">
                    <div className="">{step.icon}</div>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <h3 className="clamp-[text,sm,lg] font-semibold text-gray-900 dark:text-white">
                      {step.title}
                    </h3>

                    <p className="clamp-[text,xs,sm] leading-relaxed text-gray-600 dark:text-gray-400">
                      {step.description}
                    </p>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
