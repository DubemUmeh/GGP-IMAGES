import { NextResponse } from "next/server";
import { apiError, requireAdmin } from "@/lib/admin/auth";
import { query } from "@/lib/admin/db";
import { adminCreateSchema } from "@/lib/admin/validators";

export async function GET() {
  try {
    await requireAdmin();
    const r = await query(
      "select id,email,name,avatar_url,is_active,last_login_at,created_at from admins order by created_at desc",
    );
    return NextResponse.json({ admins: r.rows });
  } catch (e) {
    return apiError(e);
  }
}

export async function POST(req: Request) {
  try {
    await requireAdmin();
    const data = adminCreateSchema.parse(await req.json());
    const r = await query(
      "insert into admins(email,name) values($1,$2) returning id,email,name,is_active",
      [data.email, data.name ?? null],
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
