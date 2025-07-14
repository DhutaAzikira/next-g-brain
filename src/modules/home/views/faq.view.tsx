import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ_DATA = [
  {
    question: "Apakah ini gratis?",
    answer:
      "Ya, kami menyediakan paket Free yang memungkinkan kamu untuk mencoba 1 sesi interview gratis. Untuk akses penuh ke semua fitur, kamu bisa berlangganan paket Pro kami.",
  },
  {
    question: "Interview-nya pakai bahasa apa?",
    answer:
      "Saat ini kami mendukung interview dalam Bahasa Indonesia dan Bahasa Inggris. Kamu bisa memilih bahasa yang ingin kamu gunakan saat setup interview.",
  },
  {
    question: "Cocok untuk fresh graduate?",
    answer:
      "Sangat cocok! Kami memiliki skenario interview khusus untuk fresh graduate dengan pertanyaan yang relevan untuk posisi entry-level di berbagai industri.",
  },
  {
    question: "Apakah data saya aman?",
    answer:
      "Keamanan data adalah prioritas kami. Semua data interview kamu dienkripsi dan kami tidak akan membagikan informasi pribadi kamu kepada pihak ketiga tanpa izin.",
  },
  {
    question: "Apakah bisa via HP?",
    answer:
      "Tentu! Platform kami responsif dan dapat diakses melalui smartphone, tablet, atau komputer. Pastikan kamu memiliki kamera dan mikrofon yang berfungsi dengan baik.",
  },
  {
    question: "Apakah bisa latihan setiap hari?",
    answer:
      "Dengan paket Pro, kamu bisa melakukan latihan interview sebanyak yang kamu mau, kapan pun kamu mau. Platform kami tersedia 24/7 untuk kamu.",
  },
];

export function HomeFaqView() {
  return (
    <section className="flex items-center justify-center overflow-hidden bg-gray-50 font-sans dark:bg-gray-900">
      <div className="container flex w-full flex-col items-center justify-center gap-6 px-6 py-24 md:px-0 md:py-30">
        <div className="w-full max-w-3xl space-y-6">
          <div className="mb-12 space-y-4 text-center">
            <h2 className="clamp-[text,2xl,4xl] font-bold text-gray-900 dark:text-white">
              Pertanyaan Umum
            </h2>
            <p className="clamp-[text,sm,lg] text-gray-600 dark:text-gray-400">
              Jawaban untuk pertanyaan yang sering ditanyakan
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {FAQ_DATA.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="rounded-lg border-0 bg-white px-6 py-2 shadow-2xs hover:bg-purple-50 dark:bg-gray-800 dark:hover:bg-gray-700/50"
              >
                <AccordionTrigger className="rounded-lg px-0 py-4 text-left hover:no-underline [&[data-state=open]>svg]:rotate-180">
                  <span className="text-lg font-medium text-gray-900 dark:text-white">
                    {item.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-4">
                  <div className="pt-2">
                    <p className="leading-relaxed text-gray-600 dark:text-gray-300">
                      {item.answer}
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
