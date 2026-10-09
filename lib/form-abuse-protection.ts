import { NextResponse } from "next/server";

const WINDOW_MS = 60_000;
const MAX_SUBMISSIONS_PER_WINDOW = 5;
const MIN_SUBMISSION_TIME_MS = 3_000;

type RateLimitEntry = { count: number; resetAt: number };
const rateLimitEntries = new Map<string, RateLimitEntry>();

export function getClientIp(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

/**
 * Per-process IP rate limiting. This is a lightweight first layer; distributed
 * deployments should additionally enforce edge-level limits in Vercel.
 */
export function checkSubmissionRateLimit(
  ip: string,
  endpoint: "contact" | "booking",
): { allowed: boolean; retryAfterSeconds: number } {
  const now = Date.now();
  const key = `${endpoint}:${ip}`;
  const current = rateLimitEntries.get(key);

  if (!current || current.resetAt <= now) {
    rateLimitEntries.set(key, {
      count: 1,
      resetAt: now + WINDOW_MS,
    });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  if (current.count >= MAX_SUBMISSIONS_PER_WINDOW) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((current.resetAt - now) / 1000)),
    };
  }

  current.count += 1;
  return { allowed: true, retryAfterSeconds: 0 };
}

export function rateLimitResponse(retryAfterSeconds: number) {
  return NextResponse.json(
    { message: "Too many submissions. Please wait a minute and try again." },
    {
      status: 429,
      headers: { "Retry-After": String(retryAfterSeconds) },
    },
  );
}

export function isHoneypotFilled(value: FormDataEntryValue | unknown): boolean {
  return typeof value === "string" && value.trim().length > 0;
}

export function isSubmissionTooFast(value: unknown): boolean {
  const startedAt = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(startedAt) || startedAt <= 0) return true;

  const elapsed = Date.now() - startedAt;
  return elapsed < MIN_SUBMISSION_TIME_MS;
}

export async function verifyTurnstileToken(
  token: unknown,
  request: Request,
  expectedAction: "contact" | "booking",
): Promise<{ success: boolean; status: number; message?: string }> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    console.error("TURNSTILE_SECRET_KEY is not configured.");
    return {
      success: false,
      status: 503,
      message: "Security verification is temporarily unavailable. Please try again later.",
    };
  }

  if (typeof token !== "string" || token.length === 0 || token.length > 2048) {
    return {
      success: false,
      status: 400,
      message: "Please complete the security verification and try again.",
    };
  }

  try {
    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          secret,
          response: token,
          remoteip: getClientIp(request),
        }),
        signal: AbortSignal.timeout(10_000),
        cache: "no-store",
      },
    );

    if (!response.ok) {
      console.error("Turnstile Siteverify returned HTTP", response.status);
      return {
        success: false,
        status: 503,
        message: "Security verification is temporarily unavailable. Please try again.",
      };
    }

    const result = (await response.json()) as {
      success?: boolean;
      action?: string;
      hostname?: string;
      "error-codes"?: string[];
    };

    const expectedHostname = new URL(request.url).hostname;
    if (
      !result.success ||
      result.action !== expectedAction ||
      result.hostname !== expectedHostname
    ) {
      console.warn("Turnstile verification rejected a submission", {
        actionMatches: result.action === expectedAction,
        hostnameMatches: result.hostname === expectedHostname,
        errorCodes: result["error-codes"],
      });
      return {
        success: false,
        status: 400,
        message: "Security verification failed. Please try again.",
      };
    }

    return { success: true, status: 200 };
  } catch (error) {
    console.error("Turnstile Siteverify request failed:", error);
    return {
      success: false,
      status: 503,
      message: "Security verification is temporarily unavailable. Please try again.",
    };
  }
}
