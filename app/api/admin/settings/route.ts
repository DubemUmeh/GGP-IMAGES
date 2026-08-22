/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/set-state-in-effect, @next/next/no-img-element */
import { NextResponse } from "next/server";
import { apiError, requirePermission } from "@/lib/admin/auth";
import { query } from "@/lib/admin/db";
import { settingsSchema } from "@/lib/admin/validators";
export async function GET() {
  try {
    await requirePermission("SETTINGS_VIEW");
    const r = await query<any>(
      "select value from site_settings where key='general'",
    );
    return NextResponse.json({ settings: r.rows[0]?.value ?? {} });
  } catch (e) {
    return apiError(e);
  }
}
export async function PATCH(req: Request) {
  try {
    await requirePermission("SETTINGS_EDIT");
    const data = settingsSchema.parse(await req.json());
    await query(
      "insert into site_settings(key,value,updated_at) values('general',$1,now()) on conflict(key) do update set value=excluded.value, updated_at=now()",
      [JSON.stringify(data)],
    );
    return NextResponse.json({ settings: data });
  } catch (e) {
    return apiError(e);
  }
}
