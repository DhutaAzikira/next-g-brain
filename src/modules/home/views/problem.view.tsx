import { Card } from "@/components/ui/card";
import Link from "next/link";
import { FaArrowRight, FaBan, FaQuestion } from "react-icons/fa6";
import { PiSmileyXEyesFill } from "react-icons/pi";

const PROBLEMS = [
  {
    icon: <PiSmileyXEyesFill className="size-6 text-red-500" />,
    title: "Grogi saat interview",
    description:
      "Kamu merasa gugup dan kehilangan kemampuan untuk berpikir jernih saat berhadapan dengan interviewer.",
    bgColor: "bg-[#FEE2E2]",
  },
  {
    icon: <FaQuestion className="size-6 text-yellow-500" />,
    title: "Gak tahu cara jawab",
    description:
      "Sering bingung bagaimana menjawab pertanyaan interviewer dengan tepat dan terstruktur.",
    bgColor: "bg-[#FEF9C3]",
  },
  {
    icon: <FaBan className="size-6 text-blue-500" />,
    title: "Gagal terus",
    description:
      "Sudah berkali-kali interview tapi selalu gagal tanpa tahu apa yang perlu diperbaiki.",
    bgColor: "bg-[#DBEAFE]",
  },
];

export function HomeProblemView() {
  return (
    <section className="flex items-center justify-center overflow-hidden bg-white font-sans dark:bg-gray-900">
      <div className="container flex w-full flex-col items-center justify-center gap-8 px-6 py-24 md:gap-12 md:px-0 md:py-30">
        <div className="w-fit space-y-4 text-center">
          <h2 className="clamp-[text,2xl,4xl] font-bold text-gray-900 dark:text-white">
            Masalah yang Sering Dihadapi
          </h2>
          <p className="clamp-[text,sm,lg] mx-auto max-w-2xl text-gray-600 dark:text-gray-400">
            Banyak pencari kerja mengalami kesulitan yang sama. Kami hadir untuk
            membantu dengan AI Interview dan AI Job Hunter Desktop.
          </p>
        </div>

        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {PROBLEMS.map((problem, index) => (
            <Card
              key={index}
              className="relative space-y-0 border-0 bg-[#F9FAFB] p-6 shadow-none dark:bg-gray-800"
            >
              <div className="flex flex-row items-center gap-4 md:flex-col md:items-start">
                <div className="flex">
                  <div className={`rounded-full p-3 ${problem.bgColor}`}>
                    {problem.icon}
                  </div>
                </div>
                <h3 className="clamp-[text,lg,xl] font-semibold text-gray-900 dark:text-white">
                  {problem.title}
                </h3>
              </div>
              <p className="clamp-[text,sm,lg] pt-0 leading-relaxed text-gray-600 dark:text-gray-400">
                {problem.description}
              </p>
            </Card>
          ))}
        </div>

        <Card className="grid w-full space-y-6 border-0 bg-[#F9FAFB] px-7 py-16 shadow-none md:grid-cols-2 dark:bg-gray-800">
          <div className="flex max-w-2xl flex-col gap-4">
            <h3 className="clamp-[text,xl,3xl] font-bold text-gray-900 dark:text-white">
              Kami bantu kamu latihan lewat AI yang bisa kasih feedback jujur &
              real-time.
            </h3>

            <div className="mx-auto max-w-2xl space-y-4 text-left">
              <p className="leading-relaxed text-gray-600 dark:text-gray-400">
                Berlatih interview dengan AI kami akan membantu kamu
                mempersiapkan diri menghadapi pertanyaan yang sering muncul,
                meningkatkan kepercayaan diri, dan mendapatkan masukan yang
                objektif.
              </p>

              <p className="leading-relaxed text-gray-600 dark:text-gray-400">
                Plus, dengan AI Job Hunter Desktop kami, kamu bisa otomatis
                mencari dan melamar pekerjaan di LinkedIn, JobStreet, dan portal
                kerja lainnya.
              </p>
            </div>

            <div className="pt-4">
              <Link
                href="#"
                className="group flex items-center gap-1 font-semibold text-[#7C3AED] transition-colors hover:text-[#5c4389]"
              >
                Pelajari lebih lanjut
                <FaArrowRight className="h-4 w-4 stroke-[3] transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
