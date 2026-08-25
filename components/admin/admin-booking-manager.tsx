"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  CalendarDays,
  Clock3,
  Eye,
  MoreVertical,
  Search,
  Trash2,
  UserRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
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
import { getServiceBySlug, getSubdivision } from "@/lib/services";

export type Booking = {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  services: string[];
  service: string | null;
  subdivision: string | null;
  project: string;
  quantity: string | null;
  preferred_date: string | null;
  preferred_time: string | null;
  status: string;
  created_at: string;
};

const STATUS_STYLES: Record<string, string> = {
  new: "bg-blue-50 text-blue-700 border-blue-100",
  contacted: "bg-amber-50 text-amber-700 border-amber-100",
  confirmed: "bg-emerald-50 text-emerald-700 border-emerald-100",
  cancelled: "bg-neutral-100 text-neutral-500 border-neutral-200",
};

function serviceLabel(b: Pick<Booking, "service" | "subdivision" | "services">) {
  const service = b.service ? getServiceBySlug(b.service) : null;
  const subdivision = b.service && b.subdivision ? getSubdivision(b.service, b.subdivision) : null;
  return { service: service?.name ?? b.services[0] ?? "Not specified", subdivision: subdivision?.name ?? (b.subdivision || "Not specified") };
}

function normalizeBookings(rows: Booking[]): Booking[] {
  return rows.map((b) => ({
    ...b,
    services: Array.isArray(b.services)
      ? b.services
      : typeof b.services === "string"
        ? JSON.parse(b.services)
        : [],
  }));
}

export function AdminBookingManager({ initialBookings }: { initialBookings: Booking[] }) {
  const [bookings, setBookings] = useState<Booking[]>(() => normalizeBookings(initialBookings));
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [deleteTarget, setDeleteTarget] = useState<Booking | null>(null);
  const [deleting, setDeleting] = useState(false);

  async function load() {
    setLoading(true);
    const r = await fetch("/api/admin/bookings");
    if (r.ok) {
      const data = await r.json();
      setBookings(normalizeBookings(data.bookings ?? []));
    }
    setLoading(false);
  }

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return bookings.filter((b) => {
      const matchesSearch =
        b.customer_name.toLowerCase().includes(q) ||
        b.customer_email.toLowerCase().includes(q) ||
        b.project.toLowerCase().includes(q) ||
        serviceLabel(b).service.toLowerCase().includes(q) ||
        serviceLabel(b).subdivision.toLowerCase().includes(q);
      const matchesStatus = statusFilter === "all" || b.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [bookings, search, statusFilter]);

  const stats = useMemo(() => {
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    return {
      total: bookings.length,
      new: bookings.filter((b) => b.status === "new").length,
      month: bookings.filter((b) => new Date(b.created_at) >= startOfMonth).length,
      week: bookings.filter((b) => new Date(b.created_at) >= startOfWeek).length,
    };
  }, [bookings]);

  async function confirmDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    const r = await fetch(`/api/admin/bookings/${deleteTarget.id}`, {
      method: "DELETE",
    });
    setDeleting(false);
    if (r.ok) {
      toast.add({
        type: "success",
        title: "Success",
        description: "Booking deleted successfully",
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
          Bookings
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Manage and view all booking requests from customers.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={UserRound} label="Total bookings" value={stats.total} description="All time" accent="text-brand-tertiary bg-orange-50" />
        <StatCard icon={UserRound} label="New" value={stats.new} description="Awaiting response" accent="text-emerald-600 bg-emerald-50" />
        <StatCard icon={CalendarDays} label="This month" value={stats.month} description="Bookings received" accent="text-blue-600 bg-blue-50" />
        <StatCard icon={UserRound} label="This week" value={stats.week} description="Bookings received" accent="text-purple-600 bg-purple-50" />
      </div>

      <Card className="overflow-hidden py-0">
        <div className="flex flex-col gap-3 border-b p-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by name, email or project..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v ?? "all")}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="contacted">Contacted</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Services</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Preferred</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((b) => (
                <TableRow key={b.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted text-base font-medium">
                        {b.customer_name.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-base font-semibold">{b.customer_name}</p>
                        <p className="truncate text-sm text-muted-foreground">{b.customer_email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex max-w-[220px] flex-wrap gap-1">
                      <Badge variant="secondary" className="font-normal">{serviceLabel(b).service}</Badge>
                      <Badge variant="outline" className="font-normal">{serviceLabel(b).subdivision}</Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm font-medium">{b.project}</p>
                    {b.quantity && (
                      <p className="text-xs text-muted-foreground">Qty: {b.quantity}</p>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1 text-sm">
                      {b.preferred_date && (
                        <div className="flex items-center gap-1.5 text-foreground">
                          <CalendarDays className="h-3.5 w-3.5 text-muted-foreground" />
                          {b.preferred_date}
                        </div>
                      )}
                      {b.preferred_time && (
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                          <Clock3 className="h-3.5 w-3.5" />
                          {b.preferred_time}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`capitalize ${STATUS_STYLES[b.status] ?? ""}`}
                    >
                      {b.status}
                    </Badge>
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
                          <Link href={`/admin/bookings/${b.id}`} className="gap-2" {...itemProps}>
                            <Eye className="h-3.5 w-3.5" />
                            View
                          </Link>
                        )} />
                        <DropdownMenuItem
                          className="gap-2 text-destructive focus:text-destructive"
                          onClick={(e) => {
                            e.preventDefault();
                            setDeleteTarget(b);
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
              {!loading && filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="py-12 text-center">
                    <p className="text-sm font-medium">No bookings found</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Try changing your search or filter.
                    </p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this booking?</AlertDialogTitle>
            <AlertDialogDescription>
              {deleteTarget
                ? `The booking from "${deleteTarget.customer_name}" for "${deleteTarget.project}" will be permanently removed. This can't be undone.`
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

function StatCard({
  icon: Icon,
  label,
  value,
  description,
  accent,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number;
  description: string;
  accent: string;
}) {
  return (
    <Card>
      <CardContent className="flex items-center gap-4 py-2">
        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${accent}`}>
          <Icon className="h-5.5 w-5.5" />
        </div>
        <div className="tracking-wide">
          <p className="text-base font-medium text-muted-foreground">{label}</p>
          <p className="text-2xl font-bold tracking-tight">{value}</p>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}