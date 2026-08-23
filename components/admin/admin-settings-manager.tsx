"use client";

import { useState } from "react";
import { Save, UserPlus, MoreVertical, Ban, CheckCircle2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/toast";

type Settings = Record<string, string>;
export type Admin = {
  id: string;
  name: string | null;
  email: string;
  is_active: boolean;
};

type ConfirmAction = "revoke" | "activate" | "delete";
type ConfirmTarget = { admin: Admin; action: ConfirmAction };

const SETTINGS_FIELDS = [
  { key: "companyName", label: "Company name" },
  { key: "companyDescription", label: "Company description" },
  { key: "phone", label: "Phone" },
  { key: "email", label: "Email" },
  { key: "address", label: "Address" },
  { key: "instagram", label: "Instagram" },
  { key: "facebook", label: "Facebook" },
  { key: "tiktok", label: "TikTok" },
];

const CONFIRM_COPY: Record<
  ConfirmAction, { title: string; description: (a: Admin) => string; actionLabel: string; pendingLabel: string; destructive: boolean }
> = {
  revoke: {
    title: "Revoke this admin's access?",
    description: (a) =>
      `"${a.name ?? a.email}" will lose access to this admin panel immediately. You can reactivate them later.`,
    actionLabel: "Revoke",
    pendingLabel: "Revoking...",
    destructive: true,
  },
  activate: {
    title: "Reactivate this admin?",
    description: (a) =>
      `"${a.name ?? a.email}" will regain access to this admin panel.`,
    actionLabel: "Activate",
    pendingLabel: "Activating...",
    destructive: false,
  },
  delete: {
    title: "Delete this admin?",
    description: (a) =>
      `"${a.name ?? a.email}" will be permanently removed. This can't be undone.`,
    actionLabel: "Delete",
    pendingLabel: "Deleting...",
    destructive: true,
  },
};

export function AdminSettingsManager({
  initialSettings,
  initialAdmins,
}: {
  initialSettings: Settings;
  initialAdmins: Admin[];
}) {
  const [admins, setAdmins] = useState<Admin[]>(initialAdmins);
  const [savingSettings, setSavingSettings] = useState(false);
  const [addingAdmin, setAddingAdmin] = useState(false);
  const [formValues, setFormValues] = useState<Settings>(initialSettings);
  const [confirmTarget, setConfirmTarget] = useState<ConfirmTarget | null>(null);
  const [processing, setProcessing] = useState(false);

  async function reloadAdmins() {
    const r = await fetch("/api/admin/admins");
    if (r.ok) setAdmins((await r.json()).admins ?? []);
  }

  async function saveSettings(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSavingSettings(true);
    const r = await fetch("/api/admin/settings", {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(formValues),
    });
    setSavingSettings(false);
    if (r.ok) {
      const j = await r.json();
      setFormValues(j.settings ?? formValues);
      toast.add({
        type: "success",
        title: "Success",
        description: "Settings saved successfully",
      });
    } else {
      toast.add({
        type: "error",
        title: "Error",
        description: "Save failed",
      });
    }
  }

  async function addAdmin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setAddingAdmin(true);
    const form = e.currentTarget;
    const body = Object.fromEntries(new FormData(form));
    const r = await fetch("/api/admin/admins", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });
    setAddingAdmin(false);
    if (r.ok) {
      toast.add({
        type: "success",
        title: "Success",
        description: "Admin added successfully",
      });
      form.reset();
      reloadAdmins();
    } else {
      toast.add({
        type: "error",
        title: "Error",
        description: "Could not add admin",
      });
    }
  }

  async function confirmActionRun() {
    if (!confirmTarget) return;
    const { admin, action } = confirmTarget;
    setProcessing(true);

    const r =
      action === "delete"
        ? await fetch(`/api/admin/admins/${admin.id}`, { method: "DELETE" })
        : await fetch(`/api/admin/admins/${admin.id}`, {
            method: "PATCH",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ isActive: action === "activate" }),
          });

    setProcessing(false);

    if (r.ok) {
      toast.add({
        type: "success",
        title: "Success",
        description:
          action === "delete"
            ? "Admin deleted"
            : action === "activate"
            ? "Admin activated"
            : "Access revoked successfully",
      });
    } else {
      const j = await r.json().catch(() => ({}));
      toast.add({
        type: "error",
        title: "Error",
        description: j.message ?? "Action failed",
      });
    }

    setConfirmTarget(null);
    reloadAdmins();
  }

  const copy = confirmTarget ? CONFIRM_COPY[confirmTarget.action] : null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Settings
        </h1>
        <p className="mt-2 text-base text-muted-foreground">
          Manage site details and administrators.
        </p>
      </div>

      <Tabs defaultValue="general">
        <TabsList>
          <TabsTrigger value="general" className="text-base">General</TabsTrigger>
          <TabsTrigger value="admins" className="text-base">Administrators</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">General settings</CardTitle>
              <CardDescription className="text-base">
                Shown across the public site and contact touchpoints.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={saveSettings} className="grid gap-4 sm:grid-cols-2">
                {SETTINGS_FIELDS.map((f) => (
                  <div key={f.key} className="grid gap-1.5">
                    <Label htmlFor={f.key} className="text-base">{f.label}</Label>
                    <Input
                      id={f.key}
                      name={f.key}
                      value={formValues[f.key] ?? ""}
                      onChange={(e) =>
                        setFormValues((v) => ({ ...v, [f.key]: e.target.value }))
                      }
                      placeholder={f.label}
                      className="text-base"
                    />
                  </div>
                ))}
                <div className="sm:col-span-2">
                  <Button type="submit" disabled={savingSettings} className="gap-2 text-base">
                    <Save className="h-4 w-4" />
                    {savingSettings ? "Saving..." : "Save changes"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="admins">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Administrators</CardTitle>
              <CardDescription className="text-base">
                People with access to this admin panel.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={addAdmin} className="flex flex-wrap items-end gap-3">
                <div className="grid gap-1.5">
                  <Label htmlFor="email" className="text-base">Email</Label>
                  <Input id="email" name="email" placeholder="email@example.com" className="w-56 text-base" required />
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="name" className="text-base">Name</Label>
                  <Input id="name" name="name" placeholder="Name" className="w-48 text-base" />
                </div>
                <Button type="submit" disabled={addingAdmin} className="gap-2 text-base">
                  <UserPlus className="h-4 w-4" />
                  Add
                </Button>
              </form>

              <Separator />

              <ul className="divide-y">
                {admins.map((a) => (
                  <li key={a.id} className="flex items-center justify-between gap-4 py-3">
                    <div className="min-w-0">
                      <p className="truncate text-base font-medium">
                        {a.name ?? a.email} <span className="text-muted-foreground">({a.email})</span>
                      </p>
                      <div className="mt-1 flex items-center gap-2">
                        <Badge variant={a.is_active ? "outline" : "destructive"} className={`text-sm ${a.is_active ? "border-emerald-200 bg-emerald-50 text-emerald-700" : ""}`}>
                          {a.is_active ? "Active" : "Revoked"}
                        </Badge>
                      </div>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger render={(triggerProps) => (
                        <Button variant="ghost" size="icon" aria-label="Actions" {...triggerProps}>
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      )}>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {a.is_active ? (
                          <DropdownMenuItem
                            className="gap-2"
                            onClick={() => setConfirmTarget({ admin: a, action: "revoke" })}
                          >
                            <Ban className="h-3.5 w-3.5" />
                            Revoke
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem
                            className="gap-2"
                            onClick={() => setConfirmTarget({ admin: a, action: "activate" })}
                          >
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            Activate
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem
                          className="gap-2 text-destructive focus:text-destructive"
                          onClick={() => setConfirmTarget({ admin: a, action: "delete" })}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </li>
                ))}
                {admins.length === 0 && (
                  <li className="py-6 text-center text-base text-muted-foreground">No administrators yet</li>
                )}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <AlertDialog
        open={!!confirmTarget}
        onOpenChange={(open) => !open && setConfirmTarget(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{copy?.title}</AlertDialogTitle>
            <AlertDialogDescription>
              {confirmTarget ? copy!.description(confirmTarget.admin) : ""}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={processing}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              disabled={processing}
              onClick={confirmActionRun}
              className={
                copy?.destructive
                  ? "bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  : ""
              }
            >
              {processing ? copy?.pendingLabel : copy?.actionLabel}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}