import { InputFile } from "@/components/ui/input-file";
import { LabelWrapperInput } from "@/components/ui/label";
import { FileWithPreview } from "@/hooks/use-file-upload";
import { DefaultInputType } from "./default.type";
import { useMemo } from "react";

type CreateScheduleFileInputProps = {
  file: FileWithPreview;
  setFile: (file: FileWithPreview) => void;
};

export function CreateScheduleFileInput({
  file,
  setFile,
  errors,
  isPending,
}: CreateScheduleFileInputProps & Pick<DefaultInputType, "errors" | "isPending">) {
  const initialFiles = useMemo(() => {
    if (file.id) {
      return [
        {
          id: file.id,
          name: file.file.name,
          size: file.file.size,
          type: file.file.type,
          url: file.preview || "",
        },
      ];
    }
    return undefined;
  }, [file]);

  const handleFilesAdded = (files: FileWithPreview[]) => {
    if (files[0]) {
      setFile(files[0]);
    }
  };

  return (
    <LabelWrapperInput label="Upload CV" htmlFor="cv" className="col-span-full" errors={errors}>
      <InputFile
        name="cv"
        disabled={isPending}
        required={true}
        accept="application/pdf,application/octet-stream"
        initialFiles={initialFiles}
        onFilesAdded={handleFilesAdded}
      />
    </LabelWrapperInput>
  );
}
