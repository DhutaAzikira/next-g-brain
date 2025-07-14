"use client";

import dynamic from "next/dynamic";

import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

interface InterviewViewProps {
  sessionID: string;
}

const InterviewSession = dynamic(
  () => import("../components/interview-session").then((mod) => mod.InterviewSession),
  {
    ssr: false,
  },
);

export function InterviewView({ sessionID }: InterviewViewProps) {
  const [sessionStarted, setSessionStarted] = useState(true);

  const handleEndInterview = () => setSessionStarted(false);

  if (!sessionStarted) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Card>
          <CardContent className="p-6">
            <div className="border-primary mx-auto h-8 w-8 animate-spin rounded-full border-b-2"></div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <InterviewSession sessionID={sessionID} onEndInterview={handleEndInterview} />;
}
