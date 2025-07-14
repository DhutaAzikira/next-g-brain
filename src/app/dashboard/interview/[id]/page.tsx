import { InterviewView } from "@/modules/interview/views/index.view";

export default async function InterviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return <InterviewView sessionID={id} />;
}
