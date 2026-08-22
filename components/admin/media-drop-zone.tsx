"use client";

import { useEffect, useRef, useState } from "react";
import { UploadCloud, X } from "lucide-react";
import { cn } from "@/lib/utils";

const ACCEPTED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
  "video/mp4",
  "video/webm",
  "video/quicktime",
];

type MediaDropzoneProps = {
  file: File | null;
  onFileChange: (file: File | null) => void;
  existingPreviewUrl?: string | null;
  existingPreviewIsVideo?: boolean;
  error?: string | null;
};

export function MediaDropzone({
  file,
  onFileChange,
  existingPreviewUrl = null,
  existingPreviewIsVideo = false,
  error = null,
}: MediaDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [localPreviewUrl, setLocalPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!file) {
      setLocalPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setLocalPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  function handleFiles(fileList: FileList | null) {
    const next = fileList?.[0];
    if (!next) return;
    if (!ACCEPTED_TYPES.includes(next.type)) return;
    onFileChange(next);
  }

  function clear() {
    onFileChange(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  const showingVideo = file
    ? file.type.startsWith("video/")
    : existingPreviewIsVideo;
  const previewUrl = localPreviewUrl ?? existingPreviewUrl;

  return (
    <div className="grid gap-1.5">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          handleFiles(e.dataTransfer.files);
        }}
        onClick={() => inputRef.current?.click()}
        role="button"
        tabIndex={0}
        className={cn(
          "relative flex min-h-48 cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed p-4 text-center transition-colors",
          isDragging
            ? "border-brand-tertiary bg-brand-tertiary/5"
            : "border-muted-foreground/25 hover:border-muted-foreground/50",
        )}
      >
        {previewUrl ? (
          <>
            {showingVideo ? (
              <video
                src={previewUrl}
                className="h-40 w-full rounded-lg object-cover"
                muted
                playsInline
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={previewUrl}
                alt="Preview"
                className="h-40 w-full rounded-lg object-cover"
              />
            )}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                clear();
              }}
              className="absolute right-2 top-2 rounded-full bg-black/60 p-1 text-white hover:bg-black/80"
              aria-label="Remove selected file"
            >
              <X className="h-4 w-4" />
            </button>
            <p className="text-xs text-muted-foreground">
              Click or drop a file to replace
            </p>
          </>
        ) : (
          <>
            <UploadCloud className="h-8 w-8 text-muted-foreground" />
            <p className="text-sm font-medium">
              Drag & drop an image or video here
            </p>
            <p className="text-xs text-muted-foreground">
              or click to browse — 1 file, up to 10MB (images) / 100MB
              (video)
            </p>
          </>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_TYPES.join(",")}
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}