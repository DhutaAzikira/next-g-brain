/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

import { useTimerCountdown } from "@/hooks/use-timer";
import { ConnectionStatus, useWebSocket } from "@/hooks/use-websocket";
import { useSidebar } from "@/components/ui/sidebar";
import { useCamera } from "@/hooks/use-camera";
import { bufferToChunk, useAudioProcessor } from "@/hooks/use-audio-processor";
import { useChatMessages } from "@/hooks/use-chat-messages";
import { GladiaMessage, useGladia } from "@/hooks/use-gladia";
import { WEBSOCKET_CONFIG } from "@/lib/config-websocket";
import { endN8N, getN8N } from "../../services/n8n.service";

import { InterviewSessionHeader } from "./header.interview-session";
import { InterviewSessionCameraUser } from "./camera-user.interview-session";

import { Card } from "@/components/ui/card";

import { useHeygen } from "@/hooks/use-heygen";
import { InterviewSessionChatMessages } from "./chat-messages.interview-session";
import { InterviewSessionUserControl } from "./user-control.interview-session";
import { useUpdateEffect } from "@/hooks/use-update-effect";
import { InterviewSessionCameraAI } from "./camera-ai.interview-session";
import { sleep } from "@/utils/helper";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";

interface InterviewSessionProps {
  sessionID: string;
  onEndInterview: () => void;
}

interface N8NPayload {
  type: string;
  payload: { text: string };
}

type N8NChatMessage =
  | { type: "new_question"; payload: { question: string } }
  | { type: "user_answer"; payload: { answer: string } };

export function InterviewSession({ sessionID }: InterviewSessionProps) {
  const warnTime = "00:15";
  const n8nUrl = `${WEBSOCKET_CONFIG.WSS}/ws/interview/${sessionID}/`;

  const [turnStatus, setTurnStatus] = useState<"ai" | "user" | "none">("none");
  const [isStart, setIsStart] = useState(false);
  const [status, setStatus] = useState<ConnectionStatus>("disconnected");
  const [connectionStatus, setConnectionStatus] = useState("");
  const [isLoadingChat, setIsLoadingChat] = useState(false);
  const [buffer, setBuffer] = useState<Int16Array>(new Int16Array(4096));
  const [isDialogOpen, setIsDialogOpen] = useState(true);
  const [devices, setDevices] = useState<
    {
      deviceId: string;
      label: string;
      groupId: string;
    }[]
  >([]);

  const chat = useChatMessages();
  const timer = useTimerCountdown(10, warnTime);
  const camera = useCamera();
  const sidebar = useSidebar();

  const n8n = useWebSocket<N8NPayload, N8NChatMessage>(n8nUrl, {
    onOpen: async () => {
      console.log("n8n connected");
      setConnectionStatus("connected to n8n");
    },
    onClose: async () => {
      await endN8N(sessionID);
    },
    onMessage: (data) => {
      setIsLoadingChat(true);
      heygen.send(data.payload.text, "repeat").then((res) => {
        chat.addMessage({
          type: "ai",
          text: data.payload.text,
          timestamp: new Date(),
        });
        setIsLoadingChat(false);
        setIsStart(true);
        return res;
      });
    },
  });

  const heygen = useHeygen({
    onConnected: async () => {
      console.log("heygen connected");
      setConnectionStatus("connected to heygen");
      setConnectionStatus("loading avatar");
    },
    onTrackSubscribed: () => {
      setConnectionStatus("avatar ready");
    },
  });

  const gladia = useGladia({
    onOpen: () => {
      console.log("gladia connected");
      setConnectionStatus("connected to gladia");
      setStatus("connected");
      setTurnStatus("ai");
      setConnectionStatus("");
    },
    onMessage: (data) => {
      console.log(data);
      if (data.type === "speech_start") {
        console.log("speech start");
      }

      if (data.type === "speech_end") {
        console.log("speech end");
      }

      if (data.type === "transcript" && data.data?.is_final) {
        console.log("transcript", data.data?.utterance.text);
      }
      if (data.type === "transcript") {
        setIsLoadingChat(false);
        chat.addMessage({
          type: "user",
          text: data.data?.utterance.text || "",
          timestamp: new Date(),
        });
        n8n.sendMessage({
          type: "user_answer",
          payload: { answer: data.data?.utterance.text || "" },
        });
        setTurnStatus("ai");
      }
    },
  });

  const audio = useAudioProcessor({
    onOpen: async () => {
      console.log("audio connected");
    },
    onMessage: (buffer) => {
      setBuffer(buffer);
    },
    onError: (error) => {
      console.error("Audio processor error:", error);
    },
  });

  useUpdateEffect(() => {
    const firstConnect = async () => {
      sidebar.toggleSidebar();
      const deviceEnum = await audio.getAudioDevices();
      setDevices(deviceEnum);
      await audio.connect();
      await camera.connect();
    };

    firstConnect();
  });

  useEffect(() => {
    if (status === "connecting") {
      setIsLoadingChat(true);
    }
  }, [status]);

  useUpdateEffect(() => {
    if (heygen.isSpeaking && status === "connected" && isStart) {
      console.log("ai speaking");
    } else if (!heygen.isSpeaking && status === "connected" && isStart) {
      setTurnStatus("user");
      setIsLoadingChat(true);
    }
  }, [heygen.isSpeaking, status]);

  useUpdateEffect(() => {
    if (turnStatus === "user" && isStart && status === "connected") {
      const chunk = bufferToChunk(buffer.buffer);
      console.log(chunk);
      gladia.send({ type: "audio_chunk", data: { chunk } });
    }
  }, [turnStatus, buffer, isStart, status]);

  useEffect(() => {
    const interval = setInterval(() => {
      const int16 = new Int16Array(4096);
      const chunk = bufferToChunk(int16.buffer);
      const gladiaPayload: GladiaMessage = { type: "audio_chunk", data: { chunk } };

      if (turnStatus === "ai" && isStart && status === "connected" && gladia.isConnected) {
        console.log("empty chunk")
        gladia.send(gladiaPayload);
      }
    }, 340);

    return () => {
      clearInterval(interval);
    };
  }, [gladia, isStart, status, turnStatus]);

  useEffect(() => {
    const handleBeforeUnload = (e: Event) => {
      e.preventDefault();
      // @ts-expect-error error
      e.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    console.log(turnStatus);
  }, [turnStatus]);

  return (
    <div className="relative flex size-full flex-col">
      <Dialog open={isDialogOpen}>
        <DialogContent showCloseButton={false}>
          <DialogHeader>
            <DialogTitle>Start Interview</DialogTitle>
            <DialogDescription>Apakah Anda siap untuk memulai interview?</DialogDescription>
          </DialogHeader>

          <div className="flex justify-between">
            {devices.length > 0 && (
              <Select onValueChange={audio.switchDevice}>
                <SelectTrigger>
                  {devices.find((device) => device.deviceId === audio.currentDeviceId)?.label ||
                    "Pilih Microphone"}
                </SelectTrigger>

                <SelectContent>
                  {devices.map((device) => (
                    <SelectItem key={device.deviceId} value={device.deviceId}>
                      {device.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            <Button
              onClick={() => {
                setIsDialogOpen(false);
                setStatus("connecting");
                setConnectionStatus("connecting to heygen");
                heygen.connect();
                setConnectionStatus("connecting to n8n");
                n8n.connect();
                setConnectionStatus("connecting to gladia");
                gladia.connect();
                setConnectionStatus("loading avatar");
                getN8N(sessionID);
              }}
            >
              Start Interview
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <InterviewSessionHeader
        status={status}
        timeLeft={timer.timeLeft}
        isAlmostFinished={timer.isAlmostFinished}
        connectionStatus={connectionStatus}
        onStartClick={async () => {
          setStatus("connecting");
          setConnectionStatus("connecting to heygen");
          await heygen.connect();
          await sleep(500);
          setConnectionStatus("connecting to n8n");
          n8n.connect();
          setConnectionStatus("connecting to gladia");
          await gladia.connect();
          await getN8N(sessionID);
          setConnectionStatus("loading avatar");
          await sleep(1000);
          setConnectionStatus("avatar ready");
          await sleep(1000);
          setConnectionStatus("");
          timer.startTimer();
        }}
      />

      {/* <button onClick={assembleAndDownload}>Download</button> */}

      <div className="flex flex-1 flex-col gap-4 p-4 pb-0 md:flex-row md:pr-0">
        <div className="flex w-full flex-1 flex-col gap-4 pb-0">
          <div className="flex w-full flex-1 flex-col gap-4">
            <Card className="relative h-full w-full overflow-hidden p-0 shadow-none">
              <InterviewSessionCameraAI avatarRef={heygen.avatarRef} isLoading={heygen.isLoading} />
              <InterviewSessionCameraUser
                className="absolute bottom-0 left-0 mb-4 ml-4 hidden w-xs md:block"
                camera={camera}
              />
            </Card>
          </div>

          <div className="relative overflow-hidden">
            <InterviewSessionCameraUser
              className="aspect-video h-auto shrink-0 rounded-b-none md:hidden"
              camera={camera}
            />

            <InterviewSessionUserControl
              camera={camera}
              audio={audio}
              status={status}
              className="rounded-t-none py-4 md:rounded-t-xl md:py-6"
            />

            <InterviewSessionChatMessages
              messages={chat.messages}
              isLoading={isLoadingChat}
              turnStatus={turnStatus}
              className="absolute inset-0 z-10 block md:hidden"
            />
          </div>
        </div>

        <InterviewSessionChatMessages
          messages={chat.messages}
          isLoading={isLoadingChat}
          turnStatus={turnStatus}
          className="hidden md:block"
        />
      </div>
    </div>
  );
}
