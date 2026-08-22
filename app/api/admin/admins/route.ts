/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/set-state-in-effect, @next/next/no-img-element */
import { NextResponse } from "next/server";
import { apiError, requirePermission } from "@/lib/admin/auth";
import { query } from "@/lib/admin/db";
import { adminCreateSchema } from "@/lib/admin/validators";

export async function GET() {
  try {
    await requirePermission("ADMINS_VIEW");
    const r = await query(
      "select a.id,a.email,a.name,a.avatar_url,a.is_active,a.last_login_at,a.created_at,r.name as role_name,r.id as role_id from admins a join roles r on r.id=a.role_id order by a.created_at desc",
    );
    return NextResponse.json({ admins: r.rows });
  } catch (e) {
    return apiError(e);
  }
}

export async function POST(req: Request) {
  try {
    await requirePermission("ADMINS_INVITE");
    const data = adminCreateSchema.parse(await req.json());
    const r = await query(
      "insert into admins(email,name,role_id) values($1,$2,$3) returning id,email,name,is_active,role_id",
      [data.email, data.name ?? null, data.roleId],
    );
    return NextResponse.json({ admin: r.rows[0] }, { status: 201 });
  } catch (e: any) {
    if (e?.code === "23505")
      return NextResponse.json(
        { message: "Admin already exists" },
        { status: 409 },
      );
    return apiError(e);
  }
}
