import { Loader2 } from "lucide-react";

export function LoadingAnimation() {
  return (
    <div className="flex size-full flex-1 items-center justify-center">
      <Loader2 className="text-primary size-10 animate-spin" />
    </div>
  );
}
