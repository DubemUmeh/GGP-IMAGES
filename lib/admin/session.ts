import "server-only";
import { cookies } from "next/headers";
import { createHash, randomBytes, timingSafeEqual } from "node:crypto";
import { query } from "./db";

const SESSION_COOKIE = "ggp_admin_session";
const STATE_COOKIE = "ggp_oauth_state";
const MAX_AGE = 60 * 60 * 8;
const hash = (v: string) => createHash("sha256").update(v).digest("hex");

export async function createSession(adminId: string) {
  const token = randomBytes(32).toString("base64url");
  await query(
    "insert into admin_sessions(admin_id, token_hash, expires_at) values($1,$2,now()+ interval '8 hours')",
    [adminId, hash(token)],
  );

  (await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function destroySession() {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;

  if (token)
    await query("delete from admin_sessions where token_hash=$1", [
      hash(token),
    ]).catch(() => {});

  store.delete(SESSION_COOKIE);
}
export async function sessionAdminId() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;

  if (!token) return null;
  const tokenHash = hash(token);

  const res = await query<{ admin_id: string }>(
    "update admin_sessions set last_seen_at=now() where token_hash=$1 and expires_at>now() returning admin_id",
    [tokenHash],
  );

  return res.rows[0]?.admin_id ?? null;
}
export async function createOauthState() {
  const state = randomBytes(32).toString("base64url");

  (await cookies()).set(STATE_COOKIE, state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 600,
  });

  return state;
}

export async function consumeOauthState(received: string | null) {
  const store = await cookies();
  const expected = store.get(STATE_COOKIE)?.value;
  store.delete(STATE_COOKIE);

  if (!received || !expected) return false;

  const a = Buffer.from(received);
  const b = Buffer.from(expected);

  return a.length === b.length && timingSafeEqual(a, b);
}
