"use client";

import { useState } from "react";
import Link from "next/link";
import { MoreVertical, Pencil, Trash2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "@/components/ui/toast";
import { MediaDropzone } from "./media-drop-zone";

export type Item = {
  id: string;
  title: string;
  type: string;
  is_published: boolean;
  created_at: string;
  cloudinary_url: string;
  alt_text?: string;
  sort_order: number;
};

const emptyForm = {
  title: "",
  altText: "",
  description: "",
  sortOrder: "0",
  isPublished: false,
};

export function AdminGalleryManager({ initialItems }: { initialItems: Item[] }) {
  const [items, setItems] = useState<Item[]>(initialItems);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [file, setFile] = useState<File | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Item | null>(null);
  const [deleting, setDeleting] = useState(false);

  async function load() {
    setLoading(true);
    const r = await fetch("/api/admin/gallery");
    if (r.ok) setItems((await r.json()).items);
    setLoading(false);
  }

  async function upload(e: React.FormEvent) {
    e.preventDefault();
    if (!file) {
      toast.add({
        type: "error",
        title: "Error",
        description: "Select a file to upload",
      });
      return;
    }
    setUploading(true);
    const fd = new FormData();
    fd.set("title", form.title);
    fd.set("altText", form.altText);
    fd.set("description", form.description);
    fd.set("sortOrder", form.sortOrder);
    fd.set("isPublished", form.isPublished ? "true" : "false");
    fd.set("file", file);

    const r = await fetch("/api/admin/gallery", { method: "POST", body: fd });
    setUploading(false);
    if (r.ok) {
      toast.add({
        type: "success",
        title: "Success",
        description: "Media uploaded successfully",
      });
      setForm(emptyForm);
      setFile(null);
      load();
    } else {
      toast.add({
        type: "error",
        title: "Error",
        description: "Upload failed",
      });
    }
  }

  async function patch(id: string, body: unknown) {
    const r = await fetch(`/api/admin/gallery/${id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });
    
    toast.promise(
      r.json(),
      {
        loading: "Updating...",
        success: "Item updated successfully",
        error: "Update failed",
      }
    )
    // if (!r.ok) {
    //   toast.add({
    //     type: "error",
    //     title: "Error",
    //     description: "Update failed",
    //   });
    // }
    load();
  }

  async function confirmDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    const r = await fetch(`/api/admin/gallery/${deleteTarget.id}`, {
      method: "DELETE",
    });
    setDeleting(false);
    if (r.ok) {
      toast.add({
        type: "success",
        title: "Success",
        description: "Item deleted successfully",
      });
    } else {
      toast.add({
        type: "error",
        title: "Error",
        description: "Delete failed",
      });
    }
    setDeleteTarget(null);
    load();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Gallery
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Upload and manage media shown on the public site.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Upload className="h-5 w-5 text-brand-tertiary" />
            Upload media
          </CardTitle>
          <CardDescription>
            Images and videos are stored on Cloudinary and listed below once
            uploaded. One file per upload.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={upload} className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <MediaDropzone file={file} onFileChange={setFile} />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                required
                value={form.title}
                onChange={(e) =>
                  setForm((f) => ({ ...f, title: e.target.value }))
                }
                placeholder="Title"
              />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="altText">Alt text</Label>
              <Input
                id="altText"
                value={form.altText}
                onChange={(e) =>
                  setForm((f) => ({ ...f, altText: e.target.value }))
                }
                placeholder="Alt text"
              />
            </div>
            <div className="grid gap-1.5 sm:col-span-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={form.description}
                onChange={(e) =>
                  setForm((f) => ({ ...f, description: e.target.value }))
                }
                placeholder="Description"
              />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="sortOrder">Sort order</Label>
              <Input
                id="sortOrder"
                type="number"
                value={form.sortOrder}
                onChange={(e) =>
                  setForm((f) => ({ ...f, sortOrder: e.target.value }))
                }
              />
            </div>
            <div className="flex items-end gap-2 pb-1">
              <Switch
                id="isPublished"
                checked={form.isPublished}
                onCheckedChange={(checked) =>
                  setForm((f) => ({ ...f, isPublished: checked }))
                }
              />
              <Label htmlFor="isPublished" className="font-normal">
                Publish immediately
              </Label>
            </div>
            <div className="sm:col-span-2">
              <Button type="submit" disabled={uploading} className="gap-2">
                <Upload className="h-4 w-4" />
                {uploading ? "Uploading..." : "Upload"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card className="overflow-hidden py-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-24">Preview</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Published</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((i) => (
              <TableRow key={i.id}>
                <TableCell>
                  <span className="block h-14 w-16 overflow-hidden rounded-md bg-muted">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={i.cloudinary_url}
                      alt={i.alt_text ?? ""}
                      className="h-full w-full object-cover"
                    />
                  </span>
                </TableCell>
                <TableCell>
                  <Input
                    className="h-8 max-w-55 text-black"
                    readOnly
                    defaultValue={i.title}
                    onBlur={(e) => patch(i.id, { title: e.target.value })}
                  />
                  {/* <p className="h-8 max-w-55">{i.title}</p> */}
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className="capitalize">
                    {i.type}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Switch
                    checked={i.is_published}
                    onCheckedChange={(checked) =>
                      patch(i.id, { isPublished: checked })
                    }
                  />
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {new Date(i.created_at).toLocaleDateString("en-US")}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger render={(triggerProps) => (
                      <Button variant="ghost" size="icon" aria-label="Actions" {...triggerProps}>
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    )}>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem render={(itemProps) => (
                        <Link href={`/admin/gallery/${i.id}`} className="gap-2" {...itemProps}>
                          <Pencil className="h-3.5 w-3.5" />
                          Edit
                        </Link>
                      )} />
                      <DropdownMenuItem
                        className="gap-2 text-destructive focus:text-destructive"
                        onSelect={(e) => {
                          e.preventDefault();
                          setDeleteTarget(i);
                        }}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
            {!loading && items.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="py-12 text-center">
                  <p className="text-sm font-medium">No media yet</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Upload your first image or video above.
                  </p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>

      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this item?</AlertDialogTitle>
            <AlertDialogDescription>
              {deleteTarget
                ? `"${deleteTarget.title}" will be permanently removed from Cloudinary and the CMS. This can't be undone.`
                : ""}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              disabled={deleting}
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}