import { useRef, useState, useCallback, useEffect } from "react";

type UseAudioProcessorProps = {
  bufferSize?: number;
  sampleRate?: number;
  selectedDeviceId?: string;
  onMessage?: (data: Int16Array) => void;
  onError?: (error: Error) => void;
  onOpen?: () => Promise<void>;
  onClose?: () => void;
};

type AudioDevice = {
  deviceId: string;
  label: string;
  groupId: string;
};

export function encodeBase64(uint8: Uint8Array): string {
  let binary = "";
  const len = uint8.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(uint8[i]);
  }
  return btoa(binary);
}

export function bufferToChunk(buffer: ArrayBufferLike) {
  const uint8 = new Uint8Array(buffer);
  const chunk = encodeBase64(uint8);
  return chunk;
}

export function useAudioProcessor({
  bufferSize = 4096 as const,
  sampleRate = 16000 as const,
  selectedDeviceId,
  onMessage,
  onError,
  onOpen,
  onClose,
}: UseAudioProcessorProps) {
  const streamRef = useRef<MediaStream | null>(null);
  const audioRef = useRef<AudioContext | null>(null);
  const workletNodeRef = useRef<AudioWorkletNode | null>(null);

  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [audioDevices, setAudioDevices] = useState<AudioDevice[]>([]);
  const [currentDeviceId, setCurrentDeviceId] = useState("");

  const cleanup = useCallback(() => {
    try {
      // Disconnect and stop worklet node
      if (workletNodeRef.current) {
        workletNodeRef.current.port.onmessage = null;
        workletNodeRef.current.disconnect();
        workletNodeRef.current = null;
      }

      // Close audio context safely
      if (audioRef.current && audioRef.current.state !== "closed") {
        audioRef.current.close().catch(console.error);
        audioRef.current = null;
      }

      // Stop all media tracks
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => {
          if (track.readyState === "live") track.stop();
        });
        streamRef.current = null;
      }
    } catch (err) {
      console.error("Error during cleanup:", err);
    }
  }, []);

  const getAudioDevices = useCallback(async () => {
    try {
      // Request permission first
      const tempStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          deviceId: currentDeviceId ? { exact: currentDeviceId } : undefined,
          sampleRate,
          sampleSize: 16,
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true,
        },
      });
      tempStream.getTracks().forEach((track) => track.stop());

      const devices = await navigator.mediaDevices.enumerateDevices();
      const audioInputs = devices
        .filter((device) => device.kind === "audioinput")
        .map((device) => ({
          deviceId: device.deviceId,
          label: device.label || `Microphone ${device.deviceId.slice(0, 8)}`,
          groupId: device.groupId,
        }));

      setAudioDevices(audioInputs);

      if (!selectedDeviceId && audioInputs.length > 0) {
        setCurrentDeviceId(audioInputs[0].deviceId);
      } else if (selectedDeviceId) {
        setCurrentDeviceId(selectedDeviceId);
      }

      return audioInputs;
    } catch (error) {
      console.error("Error getting audio devices:", error);
      onError?.(new Error("Failed to get audio devices"));
      return [];
    }
  }, [currentDeviceId, sampleRate, selectedDeviceId, onError]);

  const connect = useCallback(async () => {
    if (streamRef.current && isRecording) return;

    setIsLoading(true);
    try {
      const deviceId = currentDeviceId || selectedDeviceId;
      console.log(deviceId);
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          sampleRate,
          channelCount: 1,
          deviceId,
          echoCancellation: true,
          noiseSuppression: true,
        },
        video: false,
      });
      streamRef.current = stream;

      audioRef.current = new AudioContext();

      if (audioRef.current.state !== "running") {
        await audioRef.current.resume();
      }

      const actualSampleRate = audioRef.current.sampleRate;

      await audioRef.current.audioWorklet.addModule("/gladia-processor.js");
      const source = audioRef.current.createMediaStreamSource(stream);

      workletNodeRef.current = new AudioWorkletNode(audioRef.current, "gladia-processor", {
        processorOptions: {
          bufferSize,
          inputSampleRate: actualSampleRate,
          targetSampleRate: sampleRate,
          echoCancellation: true,
          noiseSuppression: true,
        },
      });

      workletNodeRef.current.port.onmessage = (event) => {
        if (event.data.debug) {
          console.log("Actual sample rate:", event.data.inputSampleRate);
          console.log("Target sample rate:", event.data.targetSampleRate);
          return;
        }
        const int16Data = event.data as Int16Array;
        onMessage?.(int16Data);
      };

      source.connect(workletNodeRef.current);
      workletNodeRef.current.connect(audioRef.current.destination);

      await onOpen?.();
      setIsRecording(true);
    } catch (error) {
      onError?.(error as Error);
      console.error("Audio processing error:", error);
      cleanup();
    } finally {
      setIsLoading(false);
    }
  }, [
    currentDeviceId,
    selectedDeviceId,
    bufferSize,
    cleanup,
    isRecording,
    onError,
    onMessage,
    onOpen,
    sampleRate,
  ]);

  const stop = useCallback(() => {
    if (!isRecording) return;
    cleanup();
    setIsRecording(false);
    onClose?.();
  }, [isRecording, cleanup, onClose]);

  const switchDevice = useCallback(
    async (deviceId: string) => {
      const wasRecording = isRecording;
      if (wasRecording) {
        stop();
      }
      setCurrentDeviceId(deviceId);
      if (wasRecording) {
        setTimeout(() => {
          connect();
        }, 100);
      }
    },
    [isRecording, stop, connect],
  );

  const toggleAudio = useCallback(() => {
    if (isRecording) {
      stop();
    } else {
      connect();
    }
  }, [isRecording, connect, stop]);

  useEffect(() => {
    if (selectedDeviceId) {
      setCurrentDeviceId(selectedDeviceId);
    }
  }, [selectedDeviceId]);

  useEffect(() => {
    return () => {
      cleanup();
    };
  }, [cleanup]);

  return {
    toggleAudio,
    connect,
    stop,
    switchDevice,
    getAudioDevices,
    isRecording,
    isLoading,
    audioDevices,
    currentDeviceId,
  };
}
