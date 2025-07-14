/* eslint-disable @next/next/no-img-element */
"use client";

import {
  AlertCircleIcon,
  ArrowLeftIcon,
  CircleUserRoundIcon,
  XIcon,
  ZoomInIcon,
  ZoomOutIcon,
} from "lucide-react";

import { FileMetadata, FileWithPreview, formatBytes, useFileUpload } from "@/hooks/use-file-upload";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils/cn";
import { useCallback, useEffect, useRef, useState } from "react";
import { Area, getCroppedImg } from "@/utils/create-image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./dialog";
import { Cropper, CropperCropArea, CropperDescription, CropperImage } from "./cropper";
import { Slider } from "./slider";

type InputAvatarProps = {
  className?: string;
  maxSize?: number;
  multiple?: boolean;
  initialFiles?: FileMetadata[];
  onFilesChange?: (files: FileWithPreview[]) => void;
  onFilesAdded?: (addedFiles: FileWithPreview[]) => void;
  name?: string;
  required?: boolean;
  disabled?: boolean;
};

export function InputAvatar({
  className,
  maxSize: maxSizeMB = 5,
  multiple,
  initialFiles,
  onFilesChange,
  onFilesAdded,
  name,
  required,
  disabled,
}: InputAvatarProps) {
  const maxSize = maxSizeMB * 1024 * 1024;
  const [
    { files, isDragging, errors },
    {
      removeFile,
      openFileDialog,
      getInputProps,
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
    },
  ] = useFileUpload({
    accept: "image/*",
    maxSize,
    initialFiles,
    multiple,
    onFilesChange,
    onFilesAdded,
  });

  const previewUrl = files[0]?.preview || null;
  const fileId = files[0]?.id;

  const previousFileIdRef = useRef<string | undefined | null>(null);
  const hiddenInputRef = useRef<HTMLInputElement>(null);

  const [finalImageUrl, setFinalImageUrl] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [croppedFile, setCroppedFile] = useState<File | null>(null);
  const [zoom, setZoom] = useState(1);

  const handleCropChange = useCallback((pixels: Area | null) => {
    setCroppedAreaPixels(pixels);
  }, []);

  const handleApply = async () => {
    if (!previewUrl || !fileId || !croppedAreaPixels) {
      console.error("Missing data for apply:", {
        previewUrl,
        fileId,
        croppedAreaPixels,
      });
      // Remove file if apply is clicked without crop data?
      if (fileId) {
        removeFile(fileId);
        setCroppedAreaPixels(null);
      }
      return;
    }

    try {
      const croppedBlob = await getCroppedImg(previewUrl, croppedAreaPixels);

      if (!croppedBlob) {
        throw new Error("Failed to generate cropped image blob.");
      }

      const originalFile = files[0]?.file;
      const originalFileName =
        originalFile instanceof File ? originalFile.name : "cropped-image.jpg";
      const fileExtension = originalFileName.split(".").pop() || "jpg";
      const baseName = originalFileName.replace(/\.[^/.]+$/, "");

      const croppedFileObject = new File([croppedBlob], `${baseName}-cropped.${fileExtension}`, {
        type: croppedBlob.type || "image/jpeg",
        lastModified: Date.now(),
      });

      setCroppedFile(croppedFileObject);

      if (hiddenInputRef.current) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(croppedFileObject);
        hiddenInputRef.current.files = dataTransfer.files;

        const changeEvent = new Event("change", { bubbles: true });
        hiddenInputRef.current.dispatchEvent(changeEvent);
      }

      const newFinalUrl = URL.createObjectURL(croppedBlob);

      if (finalImageUrl) {
        URL.revokeObjectURL(finalImageUrl);
      }

      setFinalImageUrl(newFinalUrl);
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error during apply:", error);
      setIsDialogOpen(false);
    }
  };

  const handleRemoveFinalImage = () => {
    if (finalImageUrl) {
      URL.revokeObjectURL(finalImageUrl);
    }
    setFinalImageUrl(null);
    setCroppedFile(null);

    if (hiddenInputRef.current) {
      hiddenInputRef.current.value = "";
      const changeEvent = new Event("change", { bubbles: true });
      hiddenInputRef.current.dispatchEvent(changeEvent);
    }
  };

  useEffect(() => {
    const currentFinalUrl = finalImageUrl;
    return () => {
      if (currentFinalUrl && currentFinalUrl.startsWith("blob:")) {
        URL.revokeObjectURL(currentFinalUrl);
      }
    };
  }, [finalImageUrl]);

  useEffect(() => {
    if (fileId && fileId !== previousFileIdRef.current) {
      setIsDialogOpen(true);
      setCroppedAreaPixels(null);
      setZoom(1);
    }
    previousFileIdRef.current = fileId;
  }, [fileId]);

  useEffect(() => {
    if (initialFiles && initialFiles.length > 0 && !finalImageUrl) {
      const initialFile = initialFiles[0];
      setFinalImageUrl(initialFile.url);

      fetch(initialFile.url)
        .then((res) => res.blob())
        .then((blob) => {
          const file = new File([blob], initialFile.name, { type: initialFile.type });
          setCroppedFile(file);

          if (hiddenInputRef.current) {
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(file);
            hiddenInputRef.current.files = dataTransfer.files;
          }
        })
        .catch(console.error);
    }
  }, [initialFiles, finalImageUrl]);

  return (
    <div className={cn("relative inline-flex", className)}>
      {/* Drop area */}
      <button
        type="button"
        className={cn(
          "border-input hover:bg-accent/50 data-[dragging=true]:bg-accent/50 focus-visible:border-ring focus-visible:ring-ring/50 relative flex size-full items-center justify-center overflow-hidden rounded-full border border-dashed transition-colors outline-none focus-visible:ring-[3px] has-disabled:pointer-events-none has-disabled:opacity-50 has-[img]:border-none",
          errors.length > 0 && "border-destructive/50",
        )}
        onClick={openFileDialog}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        data-dragging={isDragging || undefined}
        aria-label={finalImageUrl ? "Change image" : "Upload image"}
      >
        {finalImageUrl ? (
          <img
            className="size-full object-cover"
            src={finalImageUrl}
            alt="User avatar"
            width={64}
            height={64}
            style={{ objectFit: "cover" }}
          />
        ) : (
          <div aria-hidden="true">
            {errors.length > 0 ? (
              <div className="text-destructive flex flex-col items-center justify-center gap-1">
                <AlertCircleIcon className="size-4 opacity-60" />
                <p className="text-[10px] uppercase">Max. {formatBytes(maxSize)}</p>
              </div>
            ) : (
              <CircleUserRoundIcon className="size-4 opacity-60" />
            )}
          </div>
        )}
      </button>
      {finalImageUrl && (
        <Button
          onClick={() => removeFile(files[0]?.id)}
          size="icon"
          className="border-background focus-visible:border-background absolute -top-1 -right-1 size-6 rounded-full border-2 shadow-none"
          aria-label="Remove image"
        >
          <XIcon className="size-3.5" />
        </Button>
      )}
      {finalImageUrl && (
        <Button
          onClick={handleRemoveFinalImage}
          size="icon"
          className="border-background focus-visible:border-background absolute -top-1 -right-1 size-6 rounded-full border-2 shadow-none"
          aria-label="Remove image"
        >
          <XIcon className="size-3.5" />
        </Button>
      )}

      <input
        {...getInputProps({ disabled })}
        className="sr-only"
        aria-label="Upload image file"
        tabIndex={-1}
      />

      <input
        ref={hiddenInputRef}
        type="file"
        name={name}
        required={required && !croppedFile}
        className="sr-only"
        tabIndex={-1}
        onChange={(e) => {
          console.log(e.currentTarget.files)
        }}
        disabled={disabled}
      />

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="gap-0 p-0 sm:max-w-140 *:[button]:hidden">
          <DialogDescription className="sr-only">Crop image dialog</DialogDescription>
          <DialogHeader className="contents space-y-0 text-left">
            <DialogTitle className="flex items-center justify-between border-b p-4 text-base">
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="-my-1 opacity-60"
                  onClick={() => setIsDialogOpen(false)}
                  aria-label="Cancel"
                >
                  <ArrowLeftIcon aria-hidden="true" />
                </Button>
                <span>Crop image</span>
              </div>
              <Button className="-my-1" onClick={handleApply} disabled={!previewUrl} autoFocus>
                Apply
              </Button>
            </DialogTitle>
          </DialogHeader>
          {previewUrl && (
            <Cropper
              className="h-96 sm:h-120"
              image={previewUrl}
              zoom={zoom}
              onCropChange={handleCropChange}
              onZoomChange={setZoom}
            >
              <CropperDescription />
              <CropperImage />
              <CropperCropArea className="border-primary rounded-full" />
            </Cropper>
          )}
          <DialogFooter className="border-t px-4 py-6">
            <div className="mx-auto flex w-full max-w-80 items-center gap-4">
              <ZoomOutIcon className="shrink-0 opacity-60" size={16} aria-hidden="true" />
              <Slider
                defaultValue={[1]}
                value={[zoom]}
                min={1}
                max={3}
                step={0.1}
                onValueChange={(value) => setZoom(value[0])}
                aria-label="Zoom slider"
              />
              <ZoomInIcon className="shrink-0 opacity-60" size={16} aria-hidden="true" />
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
