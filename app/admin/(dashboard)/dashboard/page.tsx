import { requireAdmin } from "@/lib/admin/auth";
import { query } from "@/lib/admin/db";
import { AdminDashboard } from "@/components/admin/admin-dashboard";

export default async function AdminDashboardPage() {
  const admin = await requireAdmin();

  const [
    bookingStatsRes,
    bookingStatusRes,
    bookingTrendRes,
    recentBookingsRes,
    galleryStatsRes,
    recentGalleryRes,
  ] = await Promise.all([
    query<any>(
      `select
        count(*)::int as total,
        count(*) filter (where status='new')::int as new,
        count(*) filter (where created_at >= date_trunc('week', now()))::int as this_week,
        count(*) filter (where created_at >= date_trunc('month', now()))::int as this_month
      from bookings`,
    ),
    query<any>(
      `select status, count(*)::int as count from bookings group by status`,
    ),
    query<any>(
      `select to_char(d::date, 'Dy') as label, coalesce(c.count,0)::int as count
       from generate_series(current_date - interval '6 days', current_date, interval '1 day') d
       left join (
         select date_trunc('day', created_at)::date as day, count(*)::int as count
         from bookings
         where created_at >= current_date - interval '6 days'
         group by 1
       ) c on c.day = d::date
       order by d`,
    ),
    query<any>(
      `select id, customer_name, project, status, created_at
       from bookings order by created_at desc limit 5`,
    ),
    query<any>(
      `select
        count(*)::int as total,
        count(*) filter (where is_published)::int as published,
        count(*) filter (where type='IMAGE')::int as images,
        count(*) filter (where type='VIDEO')::int as videos
      from gallery_items`,
    ),
    query<any>(
      `select id, title, cloudinary_url, type, is_published, created_at
       from gallery_items order by created_at desc limit 5`,
    ),
  ]);

  return (
    <AdminDashboard
      adminName={admin.name ?? admin.email}
      canViewBookings={true}
      canViewGallery={true}
      bookingStats={
        bookingStatsRes.rows[0] ?? { total: 0, new: 0, this_week: 0, this_month: 0 }
      }
      bookingStatusRows={bookingStatusRes.rows}
      bookingTrendRows={bookingTrendRes.rows}
      recentBookings={recentBookingsRes.rows}
      galleryStats={
        galleryStatsRes.rows[0] ?? { total: 0, published: 0, images: 0, videos: 0 }
      }
      recentGallery={recentGalleryRes.rows}
    />
  );
}