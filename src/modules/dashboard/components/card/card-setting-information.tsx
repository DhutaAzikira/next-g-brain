import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/utils/cn";

export function CardSettingInformation({ className }: { className?: string }) {
  return (
    <Card
      className={cn(
        "h-fit border border-purple-200 bg-purple-100 shadow-none",
        className,
      )}
    >
      <CardContent className="flex gap-3">
        <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-purple-200 font-mono text-sm text-purple-600">
          i
        </div>
        <div className="space-y-2">
          <h3 className="text-sm leading-none font-medium text-purple-700">
            Mengapa kami membutuhkan informasi ini?
          </h3>
          <p className="text-xs text-purple-500">
            Informasi profil membantu AI kami memberikan pertanyaan interview
            dan feedback yang lebih personal dan relevan dengan tujuan karier
            Anda.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
