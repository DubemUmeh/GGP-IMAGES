import { NextResponse } from "next/server";
import { bookingSchema, sendBookingEmails } from "@/lib/email";
import { uploadToCloudinary } from "@/lib/admin/cloudinary";
import { query } from "@/lib/admin/db";

const MAX_FILES = 5;

export async function POST(request: Request) {
  const form = await request.formData().catch(() => null);
  if (!form) {
    return NextResponse.json(
      { message: "Invalid submission." },
      { status: 400 },
    );
  }

  const files = form
    .getAll("designs")
    .filter((f): f is File => f instanceof File);

  if (files.length > MAX_FILES) {
    return NextResponse.json(
      { message: `You can upload up to ${MAX_FILES} files.` },
      { status: 400 },
    );
  }

  const raw = {
    services: form.getAll("services").map(String),
    projectName: String(form.get("projectName") ?? ""),
    quantity: String(form.get("quantity") ?? ""),
    description: String(form.get("description") ?? ""),
    date: String(form.get("date") ?? ""),
    time: String(form.get("time") ?? ""),
    name: String(form.get("name") ?? ""),
    email: String(form.get("email") ?? ""),
    phone: String(form.get("phone") ?? ""),
  };

  const parsedBase = bookingSchema.omit({ designUrls: true }).safeParse(raw);
  if (!parsedBase.success) {
    return NextResponse.json(
      {
        message:
          parsedBase.error.issues[0]?.message ||
          "Please check the form fields and try again.",
      },
      { status: 400 },
    );
  }

  let designUrls: string[] = [];
  try {
    if (files.length) {
      const uploads = await Promise.all(
        files.map((file) =>
          uploadToCloudinary(file, "GGP-IMAGES/booking-brand-designs"),
        ),
      );
      designUrls = uploads.map((u) => u.secureUrl);
    }
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Design upload failed.";
    return NextResponse.json({ message }, { status: 400 });
  }

  const payload = { ...parsedBase.data, designUrls };

  try {
    await query(
      `insert into bookings(
        customer_name, customer_email, customer_phone,
        services, project, quantity, description,
        preferred_date, preferred_time, design_urls
      ) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,
      [
        payload.name,
        payload.email,
        payload.phone,
        JSON.stringify(payload.services),
        payload.projectName,
        payload.quantity || null,
        payload.description || null,
        payload.date || null,
        payload.time || null,
        JSON.stringify(designUrls),
      ],
    );
  } catch (err) {
    // Don't fail the customer's submission just because persistence failed —
    // they've already been emailed. Log for investigation instead.
    console.error("Failed to persist booking to DB", err);
  }

  await sendBookingEmails(payload);

  return NextResponse.json({
    message: "Booking received. We'll be in touch shortly.",
  });
}