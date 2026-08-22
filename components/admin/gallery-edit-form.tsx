"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/toast";
import { MediaDropzone } from "./media-drop-zone";

type GalleryRow = {
  id: string;
  title: string;
  description: string | null;
  alt_text: string | null;
  sort_order: number;
  is_published: boolean;
  type: string;
  cloudinary_url: string;
};

export function GalleryEditForm({ item }: { item: GalleryRow }) {
  const router = useRouter();
  const [title, setTitle] = useState(item.title);
  const [description, setDescription] = useState(item.description ?? "");
  const [altText, setAltText] = useState(item.alt_text ?? "");
  const [sortOrder, setSortOrder] = useState(String(item.sort_order));
  const [isPublished, setIsPublished] = useState(item.is_published);
  const [file, setFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    const fd = new FormData();
    fd.set("title", title);
    fd.set("description", description);
    fd.set("altText", altText);
    fd.set("sortOrder", sortOrder);
    fd.set("isPublished", isPublished ? "true" : "false");
    if (file) fd.set("file", file);

    const r = await fetch(`/api/admin/gallery/${item.id}`, {
      method: "PATCH",
      body: fd,
    });

    setSaving(false);

    if (r.ok) {
      toast.add({
        type: "success",
        title: "Saved",
        description: "Gallery item updated successfully",
      });
      router.push("/admin/gallery");
      router.refresh();
    } else {
      toast.add({
        type: "error",
        title: "Error",
        description: "Update failed",
      });
    }
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Label className="mb-1.5 block">Media</Label>
            <MediaDropzone
              file={file}
              onFileChange={setFile}
              existingPreviewUrl={item.cloudinary_url}
              existingPreviewIsVideo={item.type.toLowerCase() === "video"}
            />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="altText">Alt text</Label>
            <Input
              id="altText"
              value={altText}
              onChange={(e) => setAltText(e.target.value)}
            />
          </div>
          <div className="grid gap-1.5 sm:col-span-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="sortOrder">Sort order</Label>
            <Input
              id="sortOrder"
              type="number"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            />
          </div>
          <div className="flex items-end gap-2 pb-1">
            <Switch
              id="isPublished"
              checked={isPublished}
              onCheckedChange={setIsPublished}
            />
            <Label htmlFor="isPublished" className="font-normal">
              Published
            </Label>
          </div>
          <div className="flex gap-2 sm:col-span-2">
            <Button type="submit" disabled={saving}>
              {saving ? "Saving..." : "Save changes"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/admin/gallery")}
              disabled={saving}
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}