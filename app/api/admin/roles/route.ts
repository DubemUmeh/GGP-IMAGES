/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/set-state-in-effect, @next/next/no-img-element */
import { NextResponse } from "next/server";
import { apiError, requirePermission } from "@/lib/admin/auth";
import { query, transaction } from "@/lib/admin/db";
import { roleSchema } from "@/lib/admin/validators";
export async function GET() {
  try {
    await requirePermission("ROLES_VIEW");
    const roles = await query("select * from roles order by name");
    const permissions = await query(
      "select name,description from permissions order by name",
    );
    return NextResponse.json({
      roles: roles.rows,
      permissions: permissions.rows,
    });
  } catch (e) {
    return apiError(e);
  }
}
export async function POST(req: Request) {
  try {
    await requirePermission("ROLES_CREATE");
    const data = roleSchema.parse(await req.json());
    const role = await transaction(async (c) => {
      const r = await c.query<any>(
        "insert into roles(name,description,is_super_admin) values($1,$2,$3) returning *",
        [data.name, data.description, data.isSuperAdmin],
      );
      if (!data.isSuperAdmin && data.permissions.length)
        await c.query(
          "insert into role_permissions(role_id,permission_id) select $1,id from permissions where name=any($2)",
          [r.rows[0].id, data.permissions],
        );
      return r.rows[0];
    });
    return NextResponse.json({ role }, { status: 201 });
  } catch (e) {
    return apiError(e);
  }
}
