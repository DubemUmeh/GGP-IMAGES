import { NextResponse } from "next/server";

type PublicSubmission = Record<string, unknown>;
interface RateLimitEntry { count: number; resetAt: number }

const rateLimitStore = new Map<string, RateLimitEntry>();
const MAX_TRACKED_KEYS = 10_000;

function clientIp(request: Request): string {
  return request.headers.get("x-real-ip")?.trim()
    || request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || "unknown";
}

function rateLimit(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  for (const [storedKey, entry] of rateLimitStore) {
    if (entry.resetAt <= now) rateLimitStore.delete(storedKey);
  }
  let entry = rateLimitStore.get(key);
  if (!entry || entry.resetAt <= now) {
    if (rateLimitStore.size >= MAX_TRACKED_KEYS) {
      const oldestKey = rateLimitStore.keys().next().value;
      if (oldestKey) rateLimitStore.delete(oldestKey);
    }
    entry = { count: 0, resetAt: now + windowMs };
    rateLimitStore.set(key, entry);
  }
  if (entry.count >= limit) {
    return { allowed: false, retryAfter: Math.max(1, Math.ceil((entry.resetAt - now) / 1000)) };
  }
  entry.count += 1;
  return { allowed: true, retryAfter: 0 };
}

async function verifyTurnstile(token: unknown, request: Request, expectedAction: "contact" | "booking") {
  const secret = process.env.TURNSTILE_SECRET;
  if (typeof token !== "string" || token.length === 0 || token.length > 2048 || !secret) return false;
  const expectedHostnames = (process.env.TURNSTILE_HOSTNAMES || "ggpimages.com,www.ggpimages.com")
    .split(",").map((hostname) => hostname.trim().toLowerCase()).filter(Boolean);
  if (expectedHostnames.length === 0) return false;

  try {
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret,
        response: token,
        remoteip: clientIp(request),
      }),
      signal: AbortSignal.timeout(10_000),
      cache: "no-store",
    });
    if (!response.ok) return false;
    const result = await response.json() as { success?: boolean; action?: string; hostname?: string };
    return Boolean(result.success
      && result.action === expectedAction
      && typeof result.hostname === "string"
      && expectedHostnames.includes(result.hostname.toLowerCase()));
  } catch (error) {
    console.error("Turnstile Siteverify request failed", error);
    return false;
  }
}

export async function guardPublicSubmission(
  request: Request,
  body: PublicSubmission,
  options: { action: "contact" | "booking"; limit: number; windowMs?: number },
): Promise<NextResponse | null> {
  const ip = clientIp(request);
  const rate = rateLimit(options.action + ":" + ip, options.limit, options.windowMs ?? 60_000);
  if (!rate.allowed) {
    return NextResponse.json(
      { message: "Too many submissions. Please wait and try again." },
      { status: 429, headers: { "Retry-After": String(rate.retryAfter) } },
    );
  }

  if (["website", "company_website", "confirm_email", "honeypot"].some((key) => {
    const value = body[key];
    return typeof value === "string" ? value.trim().length > 0 : Boolean(value);
  })) {
    return NextResponse.json({ message: "Invalid submission." }, { status: 400 });
  }

  const startedAt = Number(body.formStartTime);
  const elapsed = Date.now() - startedAt;
  if (!Number.isFinite(startedAt) || startedAt <= 0 || elapsed < 3_000 || elapsed > 24 * 60 * 60 * 1_000) {
    return NextResponse.json(
      { message: "This form session has expired. Please refresh the page and try again." },
      { status: 400 },
    );
  }

  if (!(await verifyTurnstile(body["cf-turnstile-response"], request, options.action))) {
    const configured = Boolean(process.env.TURNSTILE_SECRET);
    return NextResponse.json(
      { message: configured ? "Security verification failed. Please complete the check and try again." : "Form security is not configured yet. Please try again later." },
      { status: configured ? 403 : 503 },
    );
  }
  return null;
}
