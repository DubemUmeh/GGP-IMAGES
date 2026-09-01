import Link from "next/link";
import {
  BookOpenCheck,
  CalendarClock,
  Image as ImageIcon,
  LayoutDashboard,
  TrendingUp,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const STATUS_COLORS: Record<string, string> = {
  new: "#3b82f6",
  contacted: "#f59e0b",
  confirmed: "#10b981",
  cancelled: "#a3a3a3",
};

const STATUS_BADGE: Record<string, string> = {
  new: "bg-blue-50 text-blue-700 border-blue-100",
  contacted: "bg-amber-50 text-amber-700 border-amber-100",
  confirmed: "bg-emerald-50 text-emerald-700 border-emerald-100",
  cancelled: "bg-neutral-100 text-neutral-500 border-neutral-200",
};

type BookingStats = { total: number; new: number; this_week: number; this_month: number };
type GalleryStats = { total: number; published: number; images: number; videos: number };
type StatusRow = { status: string; count: number };
type TrendRow = { label: string; count: number };
type RecentBooking = {
  id: string;
  customer_name: string;
  project: string;
  status: string;
  created_at: string;
};
type RecentGalleryItem = {
  id: string;
  title: string;
  cloudinary_url: string;
  type: string;
  is_published: boolean;
  created_at: string;
};

export function AdminDashboard({
  adminName,
  canViewBookings,
  canViewGallery,
  bookingStats,
  bookingStatusRows,
  bookingTrendRows,
  recentBookings,
  galleryStats,
  recentGallery,
}: {
  adminName: string;
  canViewBookings: boolean;
  canViewGallery: boolean;
  bookingStats: BookingStats;
  bookingStatusRows: StatusRow[];
  bookingTrendRows: TrendRow[];
  recentBookings: RecentBooking[];
  galleryStats: GalleryStats;
  recentGallery: RecentGalleryItem[];
}) {
  const publishRate = galleryStats.total
    ? Math.round((galleryStats.published / galleryStats.total) * 100)
    : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-tertiary/10 text-brand-tertiary">
          <LayoutDashboard className="h-5.5 w-5.5" />
        </div>
        <div>
          <h1 className="text-2xl font-bold font-manrope tracking-tight sm:text-3xl">
            Welcome back, {adminName.split(" ")[0]}
          </h1>
          <p className="text-sm font-inter text-muted-foreground">
            Here&apos;s how the site is doing right now.
          </p>
        </div>
      </div>

      {/* Top stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {canViewBookings && (
          <>
            <StatCard
              icon={BookOpenCheck}
              label="Total bookings"
              value={bookingStats.total}
              description="All time"
              accent="text-brand-tertiary bg-orange-50"
            />
            <StatCard
              icon={CalendarClock}
              label="New this week"
              value={bookingStats.this_week}
              description={`${bookingStats.new} awaiting response`}
              accent="text-blue-600 bg-blue-50"
            />
          </>
        )}
        {canViewGallery && (
          <>
            <StatCard
              icon={ImageIcon}
              label="Gallery items"
              value={galleryStats.total}
              description={`${galleryStats.images} images · ${galleryStats.videos} videos`}
              accent="text-purple-600 bg-purple-50"
            />
            <StatCard
              icon={TrendingUp}
              label="Published rate"
              value={`${publishRate}%`}
              description={`${galleryStats.published} of ${galleryStats.total} live`}
              accent="text-emerald-600 bg-emerald-50"
            />
          </>
        )}
      </div>

      {canViewBookings && (
        <div className="grid gap-4 lg:grid-cols-5">
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle className="text-lg">Bookings, last 7 days</CardTitle>
              <CardDescription>Submissions received per day</CardDescription>
            </CardHeader>
            <CardContent>
              <MiniBarChart data={bookingTrendRows} />
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg">Status breakdown</CardTitle>
              <CardDescription>Current pipeline</CardDescription>
            </CardHeader>
            <CardContent>
              <StatusDonut rows={bookingStatusRows} total={bookingStats.total} />
            </CardContent>
          </Card>
        </div>
      )}

      <div className="grid gap-4 lg:grid-cols-2">
        {canViewBookings && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg">Recent bookings</CardTitle>
                <CardDescription>Latest 5 submissions</CardDescription>
              </div>
              <Link
                href="/admin/bookings"
                className="text-xs font-medium text-secondary hover:underline"
              >
                View all
              </Link>
            </CardHeader>
            <CardContent>
              {recentBookings.length === 0 ? (
                <p className="py-6 text-center text-sm text-muted-foreground">
                  No bookings yet
                </p>
              ) : (
                <ul className="divide-y">
                  {recentBookings.map((b) => (
                    <li key={b.id} className="flex items-center justify-between gap-3 py-3">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium">{b.customer_name}</p>
                        <p className="truncate text-xs text-muted-foreground">{b.project}</p>
                      </div>
                      <Badge
                        variant="outline"
                        className={`shrink-0 capitalize ${STATUS_BADGE[b.status] ?? ""}`}
                      >
                        {b.status}
                      </Badge>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        )}

        {canViewGallery && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg">Recent uploads</CardTitle>
                <CardDescription>Latest 5 gallery items</CardDescription>
              </div>
              <Link
                href="/admin/gallery"
                className="text-xs font-medium text-secondary hover:underline"
              >
                View all
              </Link>
            </CardHeader>
            <CardContent>
              {recentGallery.length === 0 ? (
                <p className="py-6 text-center text-sm text-muted-foreground">
                  No uploads yet
                </p>
              ) : (
                <ul className="divide-y">
                  {recentGallery.map((g) => (
                    <li key={g.id} className="flex items-center gap-3 py-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={g.cloudinary_url}
                        alt={g.title}
                        className="h-10 w-12 shrink-0 rounded-md object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">{g.title}</p>
                        <p className="text-xs capitalize text-muted-foreground">{g.type}</p>
                      </div>
                      <Badge
                        variant="outline"
                        className={
                          g.is_published
                            ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                            : ""
                        }
                      >
                        {g.is_published ? "Published" : "Draft"}
                      </Badge>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        )}
      </div>
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
  value: number | string;
  description: string;
  accent: string;
}) {
  return (
    <Card>
      <CardContent className="flex items-center gap-4 py-2">
        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${accent}`}>
          <Icon className="h-5.5 w-5.5" />
        </div>
        <div>
          <p className="text-sm font-medium font-inter text-muted-foreground">{label}</p>
          <p className="text-2xl font-bold font-manrope tracking-tight">{value}</p>
          <p className="text-xs font-inter text-muted-foreground">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function MiniBarChart({ data }: { data: { label: string; count: number }[] }) {
  const max = Math.max(1, ...data.map((d) => d.count));
  return (
    <div className="flex h-40 items-end gap-3">
      {data.map((d) => (
        <div key={d.label} className="flex flex-1 flex-col items-center gap-2">
          <div className="flex h-32 w-full items-end justify-center">
            <div
              className="w-full max-w-8 rounded-t-md bg-secondary transition-all"
              style={{ height: `${(d.count / max) * 100}%`, minHeight: d.count ? "6px" : "2px" }}
              title={`${d.count} on ${d.label}`}
            />
          </div>
          <span className="text-xs font-medium text-muted-foreground">{d.label}</span>
        </div>
      ))}
    </div>
  );
}

function StatusDonut({ rows, total }: { rows: { status: string; count: number }[]; total: number }) {
  if (!total) {
    return <p className="py-8 text-center text-sm text-muted-foreground">No data yet</p>;
  }

  let cursor = 0;
  const segments = rows.map((r) => {
    const pct = (r.count / total) * 100;
    const seg = `${STATUS_COLORS[r.status] ?? "#a3a3a3"} ${cursor}% ${cursor + pct}%`;
    cursor += pct;
    return seg;
  });

  return (
    <div className="flex items-center gap-6">
      <div
        className="h-28 w-28 shrink-0 rounded-full"
        style={{
          background: `conic-gradient(${segments.join(", ")})`,
        }}
      >
        <div className="flex h-full w-full items-center justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-card text-sm font-bold">
            {total}
          </div>
        </div>
      </div>
      <ul className="space-y-1.5">
        {rows.map((r) => (
          <li key={r.status} className="flex items-center gap-2 text-sm">
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: STATUS_COLORS[r.status] ?? "#a3a3a3" }}
            />
            <span className="capitalize text-muted-foreground">{r.status}</span>
            <span className="ml-auto font-medium">{r.count}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}