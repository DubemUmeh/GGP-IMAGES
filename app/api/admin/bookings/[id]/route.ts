/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { apiError, requireAdmin } from "@/lib/admin/auth";
import { query } from "@/lib/admin/db";
import { bookingStatusSchema } from "@/lib/admin/validators";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await requireAdmin();
    const { id } = await params;
    const r = await query<any>("select * from bookings where id=$1", [id]);
    if (!r.rows[0])
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    return NextResponse.json({ booking: r.rows[0] });
  } catch (e) {
    return apiError(e);
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await requireAdmin();
    const { id } = await params;
    const { status } = bookingStatusSchema.parse(await req.json());

    const r = await query(
      "update bookings set status=$1, updated_at=now() where id=$2 returning *",
      [status, id],
    );

    if (!r.rows[0])
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    return NextResponse.json({ booking: r.rows[0] });
  } catch (e) {
    return apiError(e);
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await requireAdmin();
    const { id } = await params;
    const r = await query("delete from bookings where id=$1 returning id", [
      id,
    ]);
    if (!r.rows[0])
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    return NextResponse.json({ message: "Deleted" });
  } catch (e) {
    return apiError(e);
  }
}
