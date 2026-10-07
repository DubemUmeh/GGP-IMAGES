"use client";

import { useState } from "react";
import { Clock3, Image as ImageIcon, RotateCcw, Upload, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/toast";

type Media = {
  key: string;
  url: string;
  type: "image" | "video";
  altText: string;
  isDefault: boolean;
  versionId?: string;
  posterUrl?: string;
};

type Slot = {
  key: string;
  page: string;
  section: string;
  label: string;
  description: string;
  defaultUrl: string;
  defaultAlt: string;
  media: Media;
};

type HistoryItem = Media & { createdAt: string; createdBy: string | null };

export function SiteMediaManager({ initialSlots }: { initialSlots: Slot[] }) {
  const [slots, setSlots] = useState(initialSlots);
  const [uploading, setUploading] = useState<string | null>(null);
  const [historyKey, setHistoryKey] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [files, setFiles] = useState<Record<string, File | null>>({});

  async function replaceMedia(slot: Slot) {
    const file = files[slot.key];
    if (!file) {
      toast.add({ type: "error", title: "Select a file", description: "Choose an image or video first." });
      return;
    }

    setUploading(slot.key);
    const form = new FormData();
    form.set("slotKey", slot.key);
    form.set("altText", slot.media.altText || slot.defaultAlt);
    form.set("file", file);

    const response = await fetch("/api/admin/site-media", { method: "POST", body: form });
    setUploading(null);

    if (!response.ok) {
      const data = await response.json().catch(() => null);
      toast.add({ type: "error", title: "Upload failed", description: data?.message ?? "The media could not be replaced." });
      return;
    }

    const data = await response.json();
    setSlots((current) => current.map((item) => item.key === slot.key ? { ...item, media: data.media } : item));
    setFiles((current) => ({ ...current, [slot.key]: null }));
    toast.add({ type: "success", title: "Media updated", description: slot.label + " was replaced." });
  }

  async function updateAltText(slot: Slot, altText: string) {
    if (!slot.media.versionId) return;
    const response = await fetch("/api/admin/site-media", {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ versionId: slot.media.versionId, altText }),
    });

    if (!response.ok) {
      toast.add({ type: "error", title: "Update failed", description: "Alt text could not be updated." });
      return;
    }

    setSlots((current) => current.map((item) => item.key === slot.key
      ? { ...item, media: { ...item.media, altText } }
      : item));
  }

  async function loadHistory(key: string) {
    const response = await fetch("/api/admin/site-media?slotKey=" + encodeURIComponent(key));
    if (!response.ok) return;
    const data = await response.json();
    setHistory(data.history);
    setHistoryKey(key);
  }

  async function restore(slotKey: string, versionId: string) {
    const response = await fetch("/api/admin/site-media", {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ versionId, restore: true }),
    });

    if (!response.ok) {
      toast.add({ type: "error", title: "Restore failed", description: "The previous media could not be restored." });
      return;
    }

    const data = await response.json();
    setSlots((current) => current.map((item) => item.key === slotKey ? { ...item, media: data.media } : item));
    await loadHistory(slotKey);
    toast.add({ type: "success", title: "Media restored", description: "The selected version is now live." });
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Site Media</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Replace service visuals without editing the code. Default media stays active until you upload an override.
        </p>
      </div>

      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-bold font-manrope">Services</h2>
          <p className="text-sm text-muted-foreground">
            Service media only. Homepage project and portfolio media are not managed here.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {slots.map((slot) => (
            <Card key={slot.key} className="overflow-hidden">
              <div className="aspect-video bg-muted">
                {slot.media.type === "video" ? (
                  <video src={slot.media.url} poster={slot.media.posterUrl} controls className="h-full w-full object-cover" />
                ) : (
                  <img src={slot.media.url} alt={slot.media.altText} className="h-full w-full object-cover" />
                )}
              </div>

              <CardHeader>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <CardTitle>{slot.label}</CardTitle>
                    <CardDescription className="mt-1">{slot.description}</CardDescription>
                  </div>
                  <Badge variant={slot.media.isDefault ? "secondary" : "default"}>
                    {slot.media.isDefault ? "Default" : "Custom"}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  {slot.media.type === "video" ? <Video className="h-4 w-4" /> : <ImageIcon className="h-4 w-4" />}
                  {slot.media.type === "video" ? "Video" : "Image"}
                </div>

                <div className="space-y-2">
                  <Label htmlFor={"alt-" + slot.key}>Alt text</Label>
                  <Input
                    id={"alt-" + slot.key}
                    defaultValue={slot.media.altText}
                    disabled={slot.media.isDefault}
                    onBlur={(event) => updateAltText(slot, event.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={"file-" + slot.key}>Replace media</Label>
                  <Input
                    id={"file-" + slot.key}
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/avif,video/mp4,video/webm,video/quicktime"
                    onChange={(event) => setFiles((current) => ({
                      ...current,
                      [slot.key]: event.target.files?.[0] ?? null,
                    }))}
                  />
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button type="button" disabled={uploading === slot.key} onClick={() => replaceMedia(slot)} className="gap-2">
                    <Upload className="h-4 w-4" />
                    {uploading === slot.key ? "Uploading..." : "Replace media"}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => loadHistory(slot.key)} className="gap-2">
                    <Clock3 className="h-4 w-4" />
                    History
                  </Button>
                </div>

                {historyKey === slot.key && (
                  <div className="space-y-3 rounded-xl border bg-muted/30 p-3">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold">Version history</p>
                      <Button type="button" variant="ghost" size="sm" onClick={() => setHistoryKey(null)}>Close</Button>
                    </div>

                    {history.length === 0 ? (
                      <p className="text-sm text-muted-foreground">No custom versions yet. The default is still active.</p>
                    ) : history.map((item) => (
                      <div key={item.versionId} className="flex items-center gap-3 rounded-lg bg-background p-2">
                        <div className="h-14 w-20 shrink-0 overflow-hidden rounded-md bg-muted">
                          {item.type === "video" ? (
                            <video src={item.url} poster={item.posterUrl} className="h-full w-full object-cover" />
                          ) : (
                            <img src={item.url} alt="" className="h-full w-full object-cover" />
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-medium">{new Date(item.createdAt).toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">{item.type === "video" ? "Video" : "Image"}</p>
                        </div>
                        {item.versionId !== slot.media.versionId ? (
                          <Button type="button" variant="outline" size="sm" onClick={() => restore(slot.key, item.versionId!)} className="gap-1">
                            <RotateCcw className="h-3.5 w-3.5" />
                            Restore
                          </Button>
                        ) : <Badge>Current</Badge>}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
