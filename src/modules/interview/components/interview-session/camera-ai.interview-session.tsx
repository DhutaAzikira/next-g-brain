import { Loader2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

type InterviewSessionCameraAIProps = {
  isLoading: boolean;
  avatarRef: React.RefObject<HTMLVideoElement | null>;
};

export function InterviewSessionCameraAI({ avatarRef, isLoading }: InterviewSessionCameraAIProps) {
  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-background absolute inset-0 z-10 flex items-center justify-center"
          >
            <div className="text-primary flex flex-col items-center justify-center gap-4 opacity-80">
              <p className="text-lg font-bold">Connecting to HeyGen</p>
              <Loader2 className="size-12 animate-spin" strokeWidth={1.5} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <video
        ref={avatarRef}
        autoPlay
        playsInline
        disablePictureInPicture
        disableRemotePlayback
        className="size-full object-cover"
      />
    </>
  );
}
