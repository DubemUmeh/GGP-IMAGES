import { NextResponse } from "next/server";
import { contactSchema, sendContactEmails } from "@/lib/email";
import { guardPublicSubmission } from "@/lib/anti-abuse";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json({ message: "Invalid submission." }, { status: 400 });
  }
  const blocked = await guardPublicSubmission(request, body as Record<string, unknown>, { action: "contact", limit: 5 });
  if (blocked) return blocked;
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ message: "Please check the form fields and try again." }, { status: 400 });
  }
  await sendContactEmails(parsed.data);
  return NextResponse.json({ message: "Thanks. Your request was sent successfully." });
}
