import { query } from "@/lib/admin/db";
import { requireAdmin } from "@/lib/admin/auth";
import { AdminBookingManager, Booking } from "@/components/admin/admin-booking-manager";

export default async function AdminBookingPage() {
  await requireAdmin();
  const r = await query(
    "select * from bookings order by created_at desc",
  );
  return <AdminBookingManager initialBookings={r.rows as unknown as Booking[]} />;
}