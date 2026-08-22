import "server-only";
export const GOOGLE_SCOPES = ["openid", "email", "profile"];
export function googleAuthUrl(state: string) {
  const { GOOGLE_CLIENT_ID, GOOGLE_REDIRECT_URI } = process.env;

  if (!GOOGLE_CLIENT_ID || !GOOGLE_REDIRECT_URI)
    throw new Error("Google OAuth environment variables are required");

  const u = new URL("https://accounts.google.com/o/oauth2/v2/auth");

  u.searchParams.set("client_id", GOOGLE_CLIENT_ID);
  u.searchParams.set("redirect_uri", GOOGLE_REDIRECT_URI);
  u.searchParams.set("response_type", "code");
  u.searchParams.set("scope", GOOGLE_SCOPES.join(" "));
  u.searchParams.set("state", state);

  return u.toString();
}

export async function exchangeCode(code: string) {
  const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI } =
    process.env;

  if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !GOOGLE_REDIRECT_URI)
    throw new Error("Google OAuth environment variables are required");

  const body = new URLSearchParams({
    code,
    client_id: GOOGLE_CLIENT_ID,
    client_secret: GOOGLE_CLIENT_SECRET,
    redirect_uri: GOOGLE_REDIRECT_URI,
    grant_type: "authorization_code",
  });

  const token = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body,
  });

  if (!token.ok) throw new Error("Google code exchange failed");

  const data = await token.json();
  const user = await fetch("https://openidconnect.googleapis.com/v1/userinfo", {
    headers: { authorization: `Bearer ${data.access_token}` },
  });

  if (!user.ok) throw new Error("Google identity lookup failed");

  return user.json() as Promise<{
    sub: string;
    email: string;
    email_verified: boolean;
    name?: string;
    picture?: string;
  }>;
}
