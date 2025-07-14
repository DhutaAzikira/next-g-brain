import { Loader2, VideoOff } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { Card } from "@/components/ui/card";
import { useCamera } from "@/hooks/use-camera";
import { cn } from "@/utils/cn";

interface InterviewSessionCameraUserProps {
  camera: ReturnType<typeof useCamera>;
  className?: string;
}

export function InterviewSessionCameraUser({ camera, className }: InterviewSessionCameraUserProps) {
  return (
    <Card
      className={cn(
        "border-muted-foreground relative aspect-video overflow-hidden p-0 shadow-none",
        className,
      )}
    >
      <AnimatePresence>
        {camera.isLoading && (
          <motion.div className="bg-background absolute inset-0 z-10 flex items-center justify-center">
            <Loader2 className="size-8 animate-spin" strokeWidth={1.5} />
          </motion.div>
        )}
      </AnimatePresence>
      <video
        ref={camera.ref}
        className="size-full object-cover"
        autoPlay
        muted
        playsInline
        disablePictureInPicture
        disableRemotePlayback
      />

      {!camera.isEnabled && (
        <div className="bg-gradient-purple absolute inset-0 z-10 flex items-center justify-center text-white dark:brightness-70">
          <VideoOff className="h-8 w-8" />
        </div>
      )}
    </Card>
  );
}
