import { fadeIn, mountAnim } from "@/utils/animation";
import { Loader2 } from "lucide-react";
import { motion } from "motion/react";

export function ScheduleOverlay() {
  return (
    <motion.div
      {...mountAnim(fadeIn)}
      className="fixed top-0 left-0 z-50 size-full rounded-xl bg-black/10"
    >
      <div className="absolute top-0 left-0 size-full animate-pulse bg-black/20 backdrop-blur-[2px]" />
      <div className="relative flex size-full flex-col items-center justify-center">
        <p className="text-primary text-2xl font-bold">Mohon Tunggu.</p>
        <p className="text-primary mb-6 text-sm">
          Kami sedang menyiapkan jadwal Anda.
        </p>

        <div>
          <Loader2 className="text-primary size-20 animate-spin" />
        </div>
      </div>
    </motion.div>
  );
}
