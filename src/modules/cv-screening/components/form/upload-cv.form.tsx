"use client";

import { AnimatePresence, motion } from "motion/react";
import { startTransition, useActionState, useCallback, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { InputFile } from "@/components/ui/input-file";
import { LoadingBubble } from "@/components/shared/loading-bubble";

import { uploadCvAction } from "../../service/upload-cv.service";

import { initialActionState } from "@/types/action.type";
import { FileMetadata, FileWithPreview } from "@/hooks/use-file-upload";
import { cn } from "@/utils/cn";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function CVScreeningForm() {
  const router = useRouter();

  const [state, action, isPending] = useActionState(uploadCvAction, initialActionState);
  const [file, setFile] = useState<FileWithPreview | null>(null);

  const errorObj = typeof state.errors === "object" ? state.errors : null;

  const handleFileChange = useCallback((fileWithPreview: FileWithPreview[]) => {
    if (fileWithPreview[0]) {
      setFile(fileWithPreview[0]);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (file && file.file instanceof File) {
      formData.append("cv", file.file);
    }

    startTransition(() => action(formData));
  };

  useEffect(() => {
    if (state.success && state.message) {
      toast.success(state.message, {
        description: state.data?.full_name + " - " + state.data?.position,
      });
      router.push("/dashboard/cv-screening/" + state.data?.id);
    }
  }, [state.data, state.message, state.success]);

  return (
    <CardContent className="relative overflow-hidden">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <InputFile
          className="min-h-[300px]"
          name="cv"
          required
          disabled={isPending}
          initialFiles={file ? [file.file as FileMetadata] : undefined}
          onFilesChange={handleFileChange}
          accept="application/pdf,application/octet-stream"
          onFilesAdded={handleFileChange}
        />
        {errorObj?.cv && (
          <ul className="text-destructive space-y-1 text-sm">
            {errorObj.cv.map((err, idx) => (
              <li key={idx} className="list-inside list-disc">
                {err}
              </li>
            ))}
          </ul>
        )}
        <Button
          type="submit"
          disabled={isPending || (file && file.file.size > 0 ? false : true)}
          className={cn("mx-auto min-w-sm", {
            "bg-muted": isPending,
          })}
        >
          <AnimatePresence mode="wait">
            {!isPending ? (
              <motion.span
                key="submit"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.1 } }}
                exit={{ opacity: 0 }}
              >
                Unggah
              </motion.span>
            ) : (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-muted/10 absolute z-10 flex size-full items-center justify-center rounded-md backdrop-blur-xs"
              >
                <LoadingBubble turnStatus="none" />
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </form>
    </CardContent>
  );
}
