import { useRef, useState, useCallback } from "react";

export function useCamera() {
  const ref = useRef<HTMLVideoElement>(null);
  const [isEnabled, setIsEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const connect = useCallback(async () => {
    setIsLoading(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });

      stream.getVideoTracks().forEach((track) => {
        track.enabled = isEnabled;
      });

      if (ref.current) {
        ref.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Error accessing user camera:", error);
      setIsEnabled(false);
    } finally {
      setIsLoading(false);
    }
  }, [isEnabled]);

  const toggleVideo = useCallback(() => {
    setIsEnabled((prev) => {
      const newEnabled = !prev;
      if (ref.current?.srcObject) {
        const stream = ref.current.srcObject as MediaStream;
        stream.getVideoTracks().forEach((track) => {
          track.enabled = newEnabled;
        });
      }
      return newEnabled;
    });
  }, []);

  return {
    connect,
    ref,
    isEnabled,
    isLoading,
    toggleVideo,
  };
}
