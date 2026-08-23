import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/admin/auth";
import { query } from "@/lib/admin/db";
import { BookingDetailView } from "@/components/admin/booking-detail-view";

type BookingRow = {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  services: string[];
  project: string;
  quantity: string | null;
  description: string | null;
  preferred_date: string | null;
  preferred_time: string | null;
  design_urls: string[];
  status: string;
  created_at: string;
};

function toArray(value: unknown): string[] {
  if (Array.isArray(value)) return value;
  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
  return [];
}

export default async function BookingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();
  const { id } = await params;

  const r = await query<BookingRow>(
    "select * from bookings where id=$1",
    [id],
  );

  const row = r.rows[0];
  if (!row) notFound();

  const booking: BookingRow = {
    ...row,
    services: toArray(row.services),
    design_urls: toArray(row.design_urls),
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Booking details
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Submitted {new Date(booking.created_at).toLocaleDateString("en-US")}
        </p>
      </div>
      <BookingDetailView booking={booking} />
    </div>
  );
}