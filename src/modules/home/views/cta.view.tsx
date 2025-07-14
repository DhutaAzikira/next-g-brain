import { Button } from "@/components/ui/button";

export function HomeCtaView() {
  return (
    <section className="flex items-center justify-center overflow-hidden bg-gradient-to-r from-[#7C3AED] to-[#DB2777] font-sans">
      <div className="container flex w-full flex-col items-center justify-center gap-8 px-6 py-16 md:px-0 md:py-24">
        <div className="max-w-4xl space-y-6 text-center">
          <h2 className="clamp-[text,2xl,4xl] leading-tight font-bold text-white">
            Siap Hadapi Interview dengan Percaya Diri?
          </h2>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-purple-100 md:text-xl">
            Mulai latihan interview dengan AI sekarang dan tingkatkan peluang
            kamu untuk mendapatkan pekerjaan impian!
          </p>
        </div>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            size="lg"
            className="rounded-lg bg-white px-8 py-6 text-lg font-semibold text-purple-700 shadow-lg transition-all duration-300 hover:bg-purple-700 hover:text-white hover:shadow-xl"
          >
            Mulai Latihan Gratis
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="rounded-lg border-2 border-white bg-transparent px-8 py-6 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:bg-white/10 hover:text-white hover:shadow-xl"
          >
            Pelajari Lebih Lanjut
          </Button>
        </div>
      </div>
    </section>
  );
}
