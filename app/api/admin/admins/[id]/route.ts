/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/set-state-in-effect, @next/next/no-img-element */
import { NextResponse } from "next/server";
import { apiError, requirePermission } from "@/lib/admin/auth";
import { query } from "@/lib/admin/db";
import { adminPatchSchema } from "@/lib/admin/validators";

async function wouldRemoveLastSuper(
  id: string,
  isActive?: boolean,
  roleId?: string,
) {
  const r = await query<{ count: string }>(
    `select count(*) from admins a join roles r on r.id=a.role_id where a.is_active=true and r.is_super_admin=true and a.id<>$1`,
    [id],
  );

  if (Number(r.rows[0]?.count ?? 0) > 0) return false;

  const current = await query<any>(
    "select a.is_active,r.is_super_admin from admins a join roles r on r.id=a.role_id where a.id=$1",
    [id],
  );

  if (!current.rows[0]?.is_super_admin) return false;
  if (isActive === false) return true;

  if (roleId) {
    const nr = await query<any>(
      "select is_super_admin from roles where id=$1",
      [roleId],
    );
    return !nr.rows[0]?.is_super_admin;
  }
  return false;
}
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await requirePermission("ADMINS_EDIT");

    const { id } = await params;
    const data = adminPatchSchema.parse(await req.json());

    if (await wouldRemoveLastSuper(id, data.isActive, data.roleId))
      return NextResponse.json(
        { message: "Cannot remove the final active super administrator" },
        { status: 409 },
      );

    const r = await query(
      "update admins set name=coalesce($1,name),role_id=coalesce($2,role_id),is_active=coalesce($3,is_active),updated_at=now() where id=$4 returning *",
      [data.name, data.roleId, data.isActive, id],
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
    await requirePermission("ADMINS_REVOKE");

    const { id } = await params;
    if (await wouldRemoveLastSuper(id, false))
      return NextResponse.json(
        { message: "Cannot revoke the final active super administrator" },
        { status: 409 },
      );

    const r = await query(
      "update admins set is_active=false,updated_at=now() where id=$1 returning id",
      [id],
    );
    if (!r.rows[0])
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    return NextResponse.json({ message: "Revoked" });
  } catch (e) {
    return apiError(e);
  }
}
