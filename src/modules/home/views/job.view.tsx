"use client";

import { motion, AnimatePresence, useInView } from "motion/react";
import { Check } from "lucide-react";

import { Card } from "@/components/ui/card";
import { useRef } from "react";
import { Count } from "@/components/animation/count.animation";
import { duration, easing } from "@/utils/animation";

const LIST = [
  "Otomatis scan & apply ke ribuan lowongan",
  "Support LinkedIn, JobStreet, Glints, Kalibrr",
  "AI matching berdasarkan skill & pengalaman",
  "Laporan harian progress aplikasi",
];

export function HomeJobView() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: "all" });

  return (
    <section
      ref={ref}
      className="flex items-center justify-center overflow-hidden bg-gray-50 px-4 font-sans dark:bg-gray-900"
    >
      <div className="container flex w-full flex-col items-center justify-center gap-6 px-6 py-24 md:grid md:grid-cols-2 md:gap-12 md:px-0 md:py-30">
        <div className="w-fit space-y-4">
          <h2 className="clamp-[text,xl,3xl] font-bold">AI Job Hunter Desktop</h2>
          <p className="clamp-[text,sm,lg] mx-auto mb-6 max-w-[50ch] text-balance">
            Aplikasi desktop AI yang otomatis mencari dan melamar pekerjaan untukmu di LinkedIn,
            JobStreet, dan portal kerja lainnya.
          </p>

          <ul className="grid grid-cols-1 gap-4 md:gap-6">
            {LIST.map((item, index) => (
              <li key={index} className="flex items-center gap-2 text-sm leading-none">
                <div className="rounded-full border border-green-200 bg-green-50 p-1 text-green-500">
                  <Check className="size-3" />
                </div>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <Card className="relative aspect-video h-auto w-full">
          <AnimatePresence mode="wait">
            {isInView && (
              <motion.div
                key="1"
                initial={{ opacity: 0, x: -100 }}
                animate={{
                  opacity: 1,
                  x: 0,
                  transition: { duration: duration.long, ease: easing.out },
                }}
                className="absolute -bottom-4 -left-4"
              >
                <div className="bg-card flex flex-col items-center justify-center gap-1 rounded-xl border px-6 py-3 shadow-xl">
                  <Count count={2847} className="font-extrabold text-blue-500" />

                  <p className="text-muted-foreground text-xs">Jobs Applied</p>
                </div>
              </motion.div>
            )}

            {isInView && (
              <motion.div
                key="2"
                initial={{ opacity: 0, x: 100 }}
                animate={{
                  opacity: 1,
                  x: 0,
                  transition: {
                    duration: duration.long,
                    delay: duration.short,
                    ease: easing.out,
                  },
                }}
                className="absolute -top-4 -right-4"
              >
                <div className="bg-card flex flex-col items-center justify-center gap-1 rounded-xl border px-6 py-3 shadow-xl">
                  <Count count={156} className="font-extrabold text-green-500" />

                  <p className="text-muted-foreground text-xs">Responses</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </div>
    </section>
  );
}
