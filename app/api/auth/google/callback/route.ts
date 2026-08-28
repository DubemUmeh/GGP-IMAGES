import { NextRequest, NextResponse } from "next/server";
import { consumeOauthState, createSession } from "@/lib/admin/session";
import { exchangeCode } from "@/lib/admin/google";
import { query } from "@/lib/admin/db";

function toLogin(req: NextRequest, error: string) {
  const url = new URL("/admin", req.url);
  url.searchParams.set("error", error);
  return NextResponse.redirect(url);
}

export async function GET(req: NextRequest) {
  try {
    const code = req.nextUrl.searchParams.get("code");
    const state = req.nextUrl.searchParams.get("state");

    if (!code || !(await consumeOauthState(state)))
      return toLogin(req, "invalid_state");

    const ident = await exchangeCode(code);

    if (!ident.email_verified)
      return toLogin(req, "email_unverified");

    const email = ident.email.toLowerCase();
    const found = await query<{ id: string; is_active: boolean }>(
      "select id,is_active from admins where lower(email)=$1",
      [email],
    );

    const admin = found.rows[0];

    if (!admin || !admin.is_active)
      return toLogin(req, "unauthorized");

    await query(
      "update admins set google_id=$1,name=coalesce($2,name),avatar_url=coalesce($3,avatar_url),last_login_at=now(),updated_at=now() where id=$4",
      [ident.sub, ident.name, ident.picture, admin.id],
    );
    await createSession(admin.id);
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  } catch (e) {
    console.error(e);
    return toLogin(req, "auth_failed");
  }
}
