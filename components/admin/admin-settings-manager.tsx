"use client";

import { useEffect, useMemo, useState } from "react";
import { Save, UserPlus, ShieldCheck, Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/toast";

type Settings = Record<string, string>;
type Admin = {
  id: string;
  name: string | null;
  email: string;
  role_name: string;
  is_active: boolean;
};
type Role = {
  id: string;
  name: string;
  description: string | null;
  is_super_admin: boolean;
  permissions?: string[];
};
type Permission = { name: string; description: string | null };

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

// Group permissions by their feature prefix, e.g. GALLERY_VIEW -> "Gallery"
function groupPermissions(perms: Permission[]) {
  const groups: Record<string, Permission[]> = {};
  for (const p of perms) {
    const prefix = p.name.split("_")[0];
    const label = prefix.charAt(0) + prefix.slice(1).toLowerCase();
    if (!groups[label]) groups[label] = [];
    groups[label].push(p);
  }
  return groups;
}

function permissionLabel(name: string) {
  const parts = name.split("_");
  return parts.slice(1).join(" ").toLowerCase().replace(/^\w/, (c) => c.toUpperCase());
}

export function AdminSettingsManager() {
  const [settings, setSettings] = useState<Settings>({});
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [perms, setPerms] = useState<Permission[]>([]);
  const [savingSettings, setSavingSettings] = useState(false);
  const [addingAdmin, setAddingAdmin] = useState(false);

  // Role dialog state
  const [roleDialogOpen, setRoleDialogOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [roleName, setRoleName] = useState("");
  const [roleDescription, setRoleDescription] = useState("");
  const [roleIsSuperAdmin, setRoleIsSuperAdmin] = useState(false);
  const [rolePermissions, setRolePermissions] = useState<string[]>([]);
  const [savingRole, setSavingRole] = useState(false);// add alongside your other useState calls
  const [formValues, setFormValues] = useState<Settings>({});

  // sync form values whenever settings loads/changes (initial load + after save)
  useEffect(() => {
    setFormValues(settings);
  }, [settings]);

  const groupedPerms = useMemo(() => groupPermissions(perms), [perms]);

  async function load() {
    const [s, a, r] = await Promise.all([
      fetch("/api/admin/settings"),
      fetch("/api/admin/admins"),
      fetch("/api/admin/roles"),
    ]);
    if (s.ok) setSettings((await s.json()).settings ?? {});
    if (a.ok) setAdmins((await a.json()).admins ?? []);
    if (r.ok) {
      const j = await r.json();
      setRoles(j.roles ?? []);
      setPerms(j.permissions ?? []);
    }
  }

  useEffect(() => {
    load();
  }, []);

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
      setSettings(j.settings ?? formValues);
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
      load();
    } else {
      toast.add({
        type: "error",
        title: "Error",
        description: "Could not add admin",
      });
    }
  }

  async function revoke(id: string) {
    if (!confirm("Revoke this admin's access?")) return;
    const r = await fetch(`/api/admin/admins/${id}`, { method: "DELETE" });
    r.ok ? toast.add({
      type: "success",
      title: "Success",
      description: "Access revoked successfully",
    })
      :
      toast.add({
        type: "error",
        title: "Error",
        description: "Failed to revoke access",
      });
    load();
  }

  function openCreateRole() {
    setEditingRole(null);
    setRoleName("");
    setRoleDescription("");
    setRoleIsSuperAdmin(false);
    setRolePermissions([]);
    setRoleDialogOpen(true);
  }

  function openEditRole(role: Role) {
    setEditingRole(role);
    setRoleName(role.name);
    setRoleDescription(role.description ?? "");
    setRoleIsSuperAdmin(role.is_super_admin);
    setRolePermissions(role.permissions ?? []);
    setRoleDialogOpen(true);
  }

  function togglePermission(name: string, checked: boolean) {
    setRolePermissions((prev) =>
      checked ? [...prev, name] : prev.filter((p) => p !== name),
    );
  }

  async function saveRole(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSavingRole(true);
    const body = {
      name: roleName,
      description: roleDescription || null,
      isSuperAdmin: roleIsSuperAdmin,
      permissions: roleIsSuperAdmin ? [] : rolePermissions,
    };
    const url = editingRole ? `/api/admin/roles/${editingRole.id}` : "/api/admin/roles";
    const method = editingRole ? "PATCH" : "POST";
    const r = await fetch(url, {
      method,
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });
    setSavingRole(false);
    if (r.ok) {
      toast.add({
        type: "success",
        title: "Success",
        description: editingRole ? "Role updated" : "Role created",
      });
      setRoleDialogOpen(false);
      load();
    } else {
      const j = await r.json().catch(() => ({}));
      toast.add({
        type: "error",
        title: "Error",
        description: j.message ?? "Could not save role",
      });
    }
  }

  async function deleteRole(role: Role) {
    if (!confirm(`Delete the "${role.name}" role? This cannot be undone.`)) return;
    const r = await fetch(`/api/admin/roles/${role.id}`, { method: "DELETE" });
    if (r.ok) {
      toast.add({ type: "success", title: "Success", description: "Role deleted" });
      load();
    } else {
      const j = await r.json().catch(() => ({}));
      toast.add({
        type: "error",
        title: "Error",
        description: j.message ?? "Could not delete role",
      });
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Settings
        </h1>
        <p className="mt-2 text-base text-muted-foreground">
          Manage site details, administrators, and roles.
        </p>
      </div>

      <Tabs defaultValue="general">
        <TabsList>
          <TabsTrigger value="general" className="text-base">General</TabsTrigger>
          <TabsTrigger value="admins" className="text-base">Administrators</TabsTrigger>
          <TabsTrigger value="roles" className="text-base">Roles & permissions</TabsTrigger>
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
                <div className="grid gap-1.5">
                  <Label htmlFor="roleId" className="text-base">Role</Label>
                  <Select name="roleId">
                    <SelectTrigger id="roleId" className="w-44 text-base">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map((r) => (
                        <SelectItem key={r.id} value={r.name} className="text-base">{r.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                        <Badge variant="secondary" className="text-sm">{a.role_name}</Badge>
                        <Badge variant={a.is_active ? "outline" : "destructive"} className={`text-sm ${a.is_active ? "border-emerald-200 bg-emerald-50 text-emerald-700" : ""}`}>
                          {a.is_active ? "Active" : "Revoked"}
                        </Badge>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="text-base text-destructive hover:text-destructive" onClick={() => revoke(a.id)}>
                      Revoke
                    </Button>
                  </li>
                ))}
                {admins.length === 0 && (
                  <li className="py-6 text-center text-base text-muted-foreground">No administrators yet</li>
                )}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roles">
          <Card>
            <CardHeader className="flex flex-row items-start justify-between gap-4">
              <div>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <ShieldCheck className="h-5 w-5 text-brand-tertiary" />
                  Roles & permissions
                </CardTitle>
                <CardDescription className="text-base">
                  Permissions are database-backed. Super admin roles automatically
                  pass every backend permission check.
                </CardDescription>
              </div>
              <Button size="sm" className="gap-2 text-base" onClick={openCreateRole}>
                <Plus className="h-4 w-4" />
                New role
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {roles.map((r) => (
                <div key={r.id} className="flex items-start justify-between gap-4 rounded-lg border p-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-lg font-medium">{r.name}</p>
                      {r.is_super_admin && (
                        <Badge variant="secondary" className="text-sm">Super admin</Badge>
                      )}
                    </div>
                    {r.description && (
                      <p className="mt-1 text-base text-muted-foreground">{r.description}</p>
                    )}
                    {!r.is_super_admin && r.permissions && r.permissions.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {r.permissions.map((p) => (
                          <Badge key={p} variant="outline" className="text-sm font-normal">
                            {p}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex shrink-0 gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEditRole(r)}>
                      <Pencil className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:text-destructive"
                      onClick={() => deleteRole(r)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              ))}
              {roles.length === 0 && (
                <p className="py-6 text-center text-base text-muted-foreground">No roles yet</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={roleDialogOpen} onOpenChange={setRoleDialogOpen}>
        <DialogContent className="max-h-[85vh] w-full min-w-2xl max-w-4xl overflow-y-auto no-scrollbar">
          <form onSubmit={saveRole} className="w-full">
            <DialogHeader>
              <DialogTitle className="text-xl">{editingRole ? "Edit role" : "Create role"}</DialogTitle>
              <DialogDescription className="text-base">
                Assign permissions grouped by feature area. Super admin roles
                bypass individual permission checks entirely.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-1.5">
                  <Label htmlFor="role-name" className="text-base">Role name</Label>
                  <Input
                    id="role-name"
                    value={roleName}
                    onChange={(e) => setRoleName(e.target.value)}
                    placeholder="e.g. Booking Manager"
                    className="text-base"
                    required
                  />
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="role-description" className="text-base">Description</Label>
                  <Input
                    id="role-description"
                    value={roleDescription}
                    onChange={(e) => setRoleDescription(e.target.value)}
                    placeholder="Optional"
                    className="text-base"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-lg border p-3">
                <Switch
                  id="role-super-admin"
                  checked={roleIsSuperAdmin}
                  onCheckedChange={setRoleIsSuperAdmin}
                />
                <div>
                  <Label htmlFor="role-super-admin" className="text-base font-medium">
                    Super admin
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Bypasses every permission check. Individual permissions below are ignored.
                  </p>
                </div>
              </div>

              {!roleIsSuperAdmin && (
                <div className="space-y-4">
                  {Object.entries(groupedPerms).map(([group, groupPerms]) => (
                    <div key={group}>
                      <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                        {group}
                      </p>
                      <div className="grid gap-2 sm:grid-cols-2">
                        {groupPerms.map((p) => (
                          <label
                            key={p.name}
                            htmlFor={`perm-${p.name}`}
                            className="flex items-start gap-2 rounded-md border p-2 text-base hover:bg-muted/50"
                          >
                            <Checkbox
                              id={`perm-${p.name}`}
                              checked={rolePermissions.includes(p.name)}
                              onCheckedChange={(checked: boolean) =>
                                togglePermission(p.name, checked === true)
                              }
                            />
                            <span>
                              {permissionLabel(p.name)}
                              {p.description && (
                                <span className="block text-sm text-muted-foreground">
                                  {p.description}
                                </span>
                              )}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setRoleDialogOpen(false)} className="text-base">
                Cancel
              </Button>
              <Button type="submit" disabled={savingRole} className="text-base">
                {savingRole ? "Saving..." : editingRole ? "Save changes" : "Create role"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}