import { NextResponse } from "next/server";
import { contactSchema, sendContactEmails } from "@/lib/email";
import {
  checkSubmissionRateLimit,
  getClientIp,
  isHoneypotFilled,
  isSubmissionTooFast,
  rateLimitResponse,
  verifyTurnstileToken,
} from "@/lib/form-abuse-protection";

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const rateCheck = checkSubmissionRateLimit(ip, "contact");
  if (!rateCheck.allowed) {
    return rateLimitResponse(rateCheck.retryAfterSeconds);
  }

  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json({ message: "Invalid submission." }, { status: 400 });
  }

  const fields = body as Record<string, unknown>;
  if (
    isHoneypotFilled(fields.website) ||
    isHoneypotFilled(fields.confirm_email) ||
    isHoneypotFilled(fields.honeypot)
  ) {
    return NextResponse.json({ message: "Invalid submission." }, { status: 400 });
  }

  if (isSubmissionTooFast(fields.formStartTime)) {
    return NextResponse.json(
      { message: "Please take a moment to review your message and try again." },
      { status: 400 },
    );
  }

  const verification = await verifyTurnstileToken(
    fields["cf-turnstile-response"] ?? fields.turnstileToken,
    request,
    "contact",
  );
  if (!verification.success) {
    return NextResponse.json(
      { message: verification.message || "Security verification failed." },
      { status: verification.status },
    );
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { message: "Please check the form fields and try again." },
      { status: 400 },
    );
  }

  try {
    await sendContactEmails(parsed.data);
    return NextResponse.json({ message: "Thanks. Your request was sent successfully." });
  } catch (error) {
    console.error("Failed to process contact submission", error);
    return NextResponse.json(
      { message: "We couldn't send your request right now. Please try again later." },
      { status: 500 },
    );
  }
}
