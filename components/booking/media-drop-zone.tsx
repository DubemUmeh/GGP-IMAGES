"use client";

import { useEffect, useRef, useState } from "react";
import { FileText, Plus, Upload, X } from "lucide-react";
import { cn } from "@/lib/utils";

const ACCEPTED_TYPES = [
  "image/png",
  "image/jpeg",
  "image/webp",
];
const ACCEPTED_EXT = ".png,.jpg,.jpeg,.webp";

type MultiFileDropzoneProps = {
  files: File[];
  onFilesChange: (files: File[]) => void;
  maxFiles: number;
  maxFileBytes: number;
  error?: string | null;
  onError?: (message: string | null) => void;
};

export function MultiFileDropzone({
  files,
  onFilesChange,
  maxFiles,
  maxFileBytes,
  error = null,
  onError,
}: MultiFileDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  function addFiles(incoming: FileList | File[] | null) {
    const picked = Array.from(incoming ?? []);
    if (!picked.length) return;

    onError?.(null);

    const unsupported = picked.find((f) => !ACCEPTED_TYPES.includes(f.type));
    if (unsupported) {
      onError?.(`"${unsupported.name}" is not a supported file type.`);
      return;
    }

    const oversized = picked.find((f) => f.size > maxFileBytes);
    if (oversized) {
      onError?.(
        `"${oversized.name}" exceeds ${Math.round(maxFileBytes / (1024 * 1024))}MB.`,
      );
      return;
    }

    const combined = [...files, ...picked];
    if (combined.length > maxFiles) {
      onError?.(`You can upload up to ${maxFiles} files.`);
      onFilesChange(combined.slice(0, maxFiles));
      return;
    }

    onFilesChange(combined);
  }

  function removeFile(index: number) {
    onError?.(null);
    onFilesChange(files.filter((_, i) => i !== index));
  }

  const atLimit = files.length >= maxFiles;

  return (
    <div className="grid gap-2">
      {files.length === 0 ? (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            addFiles(e.dataTransfer.files);
          }}
          onClick={() => inputRef.current?.click()}
          role="button"
          tabIndex={0}
          className={cn(
            "flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-5 py-8 text-center transition-colors",
            isDragging
              ? "border-secondary bg-secondary/5"
              : "border-border hover:border-secondary hover:bg-secondary/5",
          )}
        >
          <Upload size={23} className="text-muted-foreground" />
          <span className="mt-3 text-sm font-medium text-foreground">
            Click to upload or drag and drop
          </span>
          <span className="mt-1 text-xs text-muted-foreground">
            PNG, JPG (Max.{" "}
            {Math.round(maxFileBytes / (1024 * 1024))}MB each, up to{" "}
            {maxFiles} files)
          </span>
        </div>
      ) : (
        <div
          onDragOver={(e) => {
            if (atLimit) return;
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            if (!atLimit) addFiles(e.dataTransfer.files);
          }}
          className={cn(
            "flex flex-wrap gap-3 rounded-xl border-2 border-dashed p-3 transition-colors",
            isDragging
              ? "border-secondary bg-secondary/5"
              : "border-border",
          )}
        >
          {files.map((file, index) => (
            <FileThumb key={`${file.name}-${index}`} file={file} onRemove={() => removeFile(index)} />
          ))}

          {!atLimit && (
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              aria-label="Add another file"
              className="flex h-20 w-20 shrink-0 flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed border-border text-muted-foreground transition-colors hover:border-secondary hover:bg-secondary/5 hover:text-secondary"
            >
              <Plus size={20} />
              <span className="text-[10px] font-medium">Add</span>
            </button>
          )}
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_EXT}
        multiple
        className="hidden"
        onChange={(e) => {
          addFiles(e.target.files);
          e.target.value = ""; // allow re-selecting the same file later
        }}
      />

      {error && <p className="text-xs text-destructive">{error}</p>}

      <p className="text-xs text-muted-foreground">
        Files upload only when you submit the booking.
      </p>
    </div>
  );
}

function FileThumb({ file, onRemove }: { file: File; onRemove: () => void }) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const isImage = file.type.startsWith("image/");

  useEffect(() => {
    if (!isImage) return;
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file, isImage]);

  return (
    <div className="group relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-border bg-muted">
      {isImage && previewUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={previewUrl} alt={file.name} className="h-full w-full object-cover" />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-1 p-1 text-muted-foreground">
          <FileText size={20} />
          <span className="w-full truncate px-1 text-center text-[9px] leading-tight">
            {file.name}
          </span>
        </div>
      )}
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remove ${file.name}`}
        className="absolute right-1 top-1 rounded-full bg-black/60 p-0.5 text-white opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
      >
        <X size={12} />
      </button>
    </div>
  );
}