import {  Mic, MicOff, Phone, PhoneOff, Video, VideoOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAudioProcessor } from "@/hooks/use-audio-processor";
import { useCamera } from "@/hooks/use-camera";
import { ConnectionStatus } from "@/hooks/use-websocket";

import { cn } from "@/utils/cn";

type UserControlProps = {
  camera: ReturnType<typeof useCamera>;
  audio: ReturnType<typeof useAudioProcessor>;
  className?: string;
  status: ConnectionStatus;
};

export function InterviewSessionUserControl({
  camera,
  audio,
  className,
  status,
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
            variant={camera.isEnabled ? "outline" : "destructive"}
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
          <Button
            size="icon"
            variant={audio.isRecording ? "outline" : "destructive"}
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
          <p className="text-muted-foreground text-xs">Audio {audio.isRecording ? "ON" : "OFF"}</p>
        </div>
        
        <div className="flex flex-col items-center gap-2">
          <Button
            size="icon"
            variant={audio.isRecording ? "success" : "destructive"}
            onClick={audio.toggleAudio}
            disabled={status === "connecting"}
            className="rounded-full md:size-14"
          >
            {audio.isRecording ? (
              <Phone className="size-4 md:size-6" />
            ) : (
              <PhoneOff className="size-4 md:size-6" />
            )}
          </Button>
          <p className="text-muted-foreground text-xs">Audio {audio.isRecording ? "ON" : "OFF"}</p>
        </div>
      </div>
    </Card>
  );
}
