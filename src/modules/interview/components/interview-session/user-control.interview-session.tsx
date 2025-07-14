import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAudioProcessor } from "@/hooks/use-audio-processor";
import { useCamera } from "@/hooks/use-camera";
import { ConnectionStatus } from "@/hooks/use-websocket";
import { cn } from "@/utils/cn";
import { ChevronUp, Mic, MicOff, Video, VideoOff } from "lucide-react";

type UserControlProps = {
  camera: ReturnType<typeof useCamera>;
  audio: ReturnType<typeof useAudioProcessor>;
  className?: string;
  status: ConnectionStatus;
  onClick?: () => void;
};

export function InterviewSessionUserControl({
  camera,
  audio,
  className,
  status,
  // onClick,
}: UserControlProps) {
  return (
    <Card
      className={cn(
        "bg-sidebar flex w-full items-center justify-between gap-4 rounded-b-none",
        className,
      )}
    >
      <div className="flex items-center gap-6 md:gap-8">
        <div className="flex flex-col items-center gap-2">
          <Button
            variant={camera.isEnabled ? "default" : "destructive"}
            size="icon"
            onClick={camera.toggleVideo}
            disabled={status === "connecting"}
            className="rounded-full md:size-14"
          >
            {camera.isEnabled ? (
              <Video className="size-4 md:size-6" />
            ) : (
              <VideoOff className="size-4 md:size-6" />
            )}
          </Button>
          <p className="text-muted-foreground text-xs">Video {camera.isEnabled ? "ON" : "OFF"}</p>
        </div>

        <div className="flex flex-col items-center gap-2">
          <div className="relative">
            <Button
              size="icon"
              variant={audio.isRecording ? "default" : "destructive"}
              onClick={audio.toggleAudio}
              disabled={status === "connecting"}
              className="rounded-full md:size-14"
            >
              {audio.isRecording ? (
                <Mic className="size-4 md:size-6" />
              ) : (
                <MicOff className="size-4 md:size-6" />
              )}
            </Button>

            <Button
              size="icon"
              variant={audio.isRecording ? "default" : "destructive"}
              disabled={status === "connecting"}
              className="border-background absolute right-0 bottom-0 z-10 size-6 rounded-full border-1"
            >
              <ChevronUp />
            </Button>
          </div>
          <p className="text-muted-foreground text-xs">Audio {audio.isRecording ? "ON" : "OFF"}</p>
        </div>
      </div>
    </Card>
  );
}
