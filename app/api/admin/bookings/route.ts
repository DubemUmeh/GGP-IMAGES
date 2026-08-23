import { NextResponse } from "next/server";
import { apiError, requireAdmin } from "@/lib/admin/auth";
import { query } from "@/lib/admin/db";

export async function GET() {
  try {
    await requireAdmin();
    const r = await query("select * from bookings order by created_at desc");
    return NextResponse.json({ bookings: r.rows });
  } catch (e) {
    return apiError(e);
  }
}
