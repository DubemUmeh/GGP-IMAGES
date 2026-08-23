import { NextResponse } from "next/server";
import { apiError, requireAdmin } from "@/lib/admin/auth";
import { query } from "@/lib/admin/db";
import { adminPatchSchema } from "@/lib/admin/validators";

async function wouldRemoveLastAdmin(id: string, isActive?: boolean) {
  if (isActive !== false) return false;
  const r = await query<{ count: string }>(
    "select count(*) from admins where is_active=true and id<>$1",
    [id],
  );
  return Number(r.rows[0]?.count ?? 0) === 0;
}

async function wouldDeleteLastAdmin(id: string) {
  const r = await query<{ count: string }>(
    "select count(*) from admins where id<>$1",
    [id],
  );
  return Number(r.rows[0]?.count ?? 0) === 0;
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await requireAdmin();
    const { id } = await params;
    const data = adminPatchSchema.parse(await req.json());

    if (await wouldRemoveLastAdmin(id, data.isActive))
      return NextResponse.json(
        { message: "Cannot revoke the final active administrator" },
        { status: 409 },
      );

    const r = await query(
      "update admins set name=coalesce($1,name),is_active=coalesce($2,is_active),updated_at=now() where id=$3 returning *",
      [data.name ?? null, data.isActive ?? null, id],
    );
    if (!r.rows[0])
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    return NextResponse.json({ admin: r.rows[0] });
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

    if (await wouldDeleteLastAdmin(id))
      return NextResponse.json(
        { message: "Cannot delete the final administrator" },
        { status: 409 },
      );

    const r = await query("delete from admins where id=$1 returning id", [id]);
    if (!r.rows[0])
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    return NextResponse.json({ message: "Deleted" });
  } catch (e) {
    return apiError(e);
  }
}
