import { NextResponse } from "next/server";
import { contactSchema, sendContactEmails } from "@/lib/email";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ message: "Please check the form fields and try again." }, { status: 400 });
  }
  await sendContactEmails(parsed.data);
  return NextResponse.json({ message: "Thanks. Your request was sent successfully." });
}
