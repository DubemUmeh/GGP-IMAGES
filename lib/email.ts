import nodemailer from "nodemailer";
import { z } from "zod";
import { absoluteUrl, siteConfig } from "@/lib/seo";
import { resolveSubdivisionKey } from "@/lib/services";

export const contactSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(160),
  details: z.string().trim().min(10).max(5000),
  source: z.string().trim().max(80).default("Website contact form"),
  services: z.array(z.string().trim().max(80)).max(12).default([]),
});

export type ContactPayload = z.infer<typeof contactSchema>;

function emailShell(
  title: string,
  intro: string,
  rows: Array<[string, string]>,
) {
  const logo = absoluteUrl(siteConfig.logo);
  return `<!doctype html><html><body style="margin:0;background:#f8f9fa;font-family:Arial,sans-serif;color:#191c1d"><div style="max-width:680px;margin:0 auto;padding:28px"><div style="background:#6b004d;border-radius:28px 28px 0 0;padding:28px;text-align:center"><img src="${logo}" width="72" height="72" alt="GGP Images" style="border-radius:16px;background:#fff;padding:8px"><h1 style="margin:16px 0 0;color:#fff;font-size:26px">${title}</h1></div><div style="background:#fff;border:1px solid #e7e8e9;border-top:0;padding:28px;border-radius:0 0 28px 28px"><p style="font-size:16px;line-height:1.7">${intro}</p><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top:20px;border-collapse:collapse">${rows.map(([k, v]) => `<tr><td style="padding:14px;border-top:1px solid #edeeef;color:#6b004d;font-weight:700;width:35%">${k}</td><td style="padding:14px;border-top:1px solid #edeeef;line-height:1.6">${String(v).replaceAll("\n", "<br>")}</td></tr>`).join("")}</table><p style="margin-top:26px;color:#4a454f;font-size:13px;line-height:1.6">This message was sent from ${siteConfig.name}. You are receiving it because a website form was submitted or because you requested printing support.</p></div></div></body></html>`;
}

async function getTransporter() {
  if (!process.env.SMTP_HOST) return null;
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

export async function sendContactEmails(payload: ContactPayload) {
  const transporter = await getTransporter();
  if (!transporter) {
    console.info(
      "Contact submission received without SMTP configuration",
      payload,
    );
    return { skipped: true };
  }
  const adminEmail = process.env.ADMIN_EMAIL;
  const from = process.env.MAIL_FROM;
  const services = payload.services.length
    ? payload.services.join(", ")
    : "Not specified";
  await transporter.sendMail({
    from,
    to: adminEmail,
    replyTo: payload.email,
    subject: `New ${payload.source} from ${payload.name}`,
    html: emailShell(
      "New website enquiry",
      "A new quote/contact request has been submitted. Reply promptly while the buying intent is fresh.",
      [
        ["Name", payload.name],
        ["Email", payload.email],
        ["Services", services],
        ["Source", payload.source],
        ["Details", payload.details],
      ],
    ),
    text: `Name: ${payload.name}\nEmail: ${payload.email}\nServices: ${services}\nDetails: ${payload.details}`,
  });
  await transporter.sendMail({
    from,
    to: payload.email,
    replyTo: adminEmail,
    subject: "We received your GGP Images request",
    html: emailShell(
      "Request received",
      `Hi ${payload.name}, thank you for contacting GGP Images. Our team will review your project details and respond with next steps.`,
      [
        ["Services", services],
        [
          "What happens next",
          "We review your details, confirm artwork or production questions, and send a practical quote or recommendation.",
        ],
        ["Your message", payload.details],
      ],
    ),
    text: `Hi ${payload.name}, we received your request and will respond soon.`,
  });
  return { skipped: false };
}

/* ------------------- BOOKING ------------------------ */
export const bookingSchema = z.object({
  services: z
    .array(z.string().trim().max(80))
    .min(1, "Select at least one service"),
  subdivisions: z
    .array(z.string().trim().max(160))
    .min(1, "Select at least one subdivision"),
  projectName: z.string().trim().min(2).max(160),
  quantity: z.string().trim().max(40).optional().default(""),
  description: z.string().trim().max(5000).optional().default(""),
  date: z.string().trim().max(20).optional().default(""),
  time: z.string().trim().max(20).optional().default(""),
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(160),
  phone: z.string().trim().min(6).max(30),
  designUrls: z.array(z.string().url()).max(5).optional().default([]),
});

export type BookingPayload = z.infer<typeof bookingSchema>;

function designsBlock(urls: string[]) {
  if (!urls.length) return "";
  const thumbs = urls
    .map(
      (url) =>
        `<a href="${url}" style="display:inline-block;margin:4px" target="_blank"><img src="${url}" width="110" height="110" style="object-fit:cover;border-radius:12px;border:1px solid #edeeef" alt="Design upload"></a>`,
    )
    .join("");
  return `<div style="margin-top:20px"><p style="color:#6b004d;font-weight:700;margin-bottom:8px">Uploaded designs (${urls.length})</p>${thumbs}</div>`;
}

export async function sendBookingEmails(payload: BookingPayload) {
  const transporter = await getTransporter();
  const services = payload.services.join(", ");

  const groupedSubdivisions = new Map<string, string[]>();
  for (const key of payload.subdivisions) {
    const resolved = resolveSubdivisionKey(key);
    if (!resolved) continue;
    const list = groupedSubdivisions.get(resolved.service.name) ?? [];
    list.push(resolved.subdivision.name);
    groupedSubdivisions.set(resolved.service.name, list);
  }
  const subdivisionLabel = groupedSubdivisions.size
    ? [...groupedSubdivisions.entries()]
        .map(([svc, subs]) => `${svc}: ${subs.join(", ")}`)
        .join(" | ")
    : "Not specified";

  if (!transporter) {
    console.info(
      "Booking submission received without SMTP configuration",
      payload,
    );
    return { skipped: true };
  }

  const adminEmail = process.env.ADMIN_EMAIL;
  const from = process.env.MAIL_FROM;

  const adminHtml = emailShell(
    "New booking request",
    "A new order has been booked through the website. Reach out promptly.",
    [
      ["Name", payload.name],
      ["Email", payload.email],
      ["Phone", payload.phone],
      ["Services", services],
      ["Subdivisions", subdivisionLabel],
      ["Project", payload.projectName],
      ["Quantity", payload.quantity || "Not specified"],
      ["Preferred date", payload.date || "Not specified"],
      ["Preferred time", payload.time || "Not specified"],
      ["Description", payload.description || "—"],
    ],
  ).replace(
    "</div></div></body>",
    `${designsBlock(payload.designUrls)}</div></div></body>`,
  );

  await transporter.sendMail({
    from,
    to: adminEmail,
    replyTo: payload.email,
    subject: `New booking: ${payload.projectName} (${payload.name})`,
    html: adminHtml,
    text: `Name: ${payload.name}\nEmail: ${payload.email}\nPhone: ${payload.phone}\nServices: ${services}\nSubdivisions: ${subdivisionLabel}\nProject: ${payload.projectName}\nQuantity: ${payload.quantity}\nDate: ${payload.date}\nTime: ${payload.time}\nDescription: ${payload.description}\nDesigns: ${payload.designUrls.join(", ") || "None"}`,
  });

  await transporter.sendMail({
    from,
    to: payload.email,
    replyTo: adminEmail,
    subject: "We received your GGP Images booking",
    html: emailShell(
      "Booking received",
      `Hi ${payload.name}, thank you for booking with GGP Images. We're reviewing your project and will confirm shortly.`,
      [
        ["Services", services],
        ["Subdivisions", subdivisionLabel],
        ["Project", payload.projectName],
        [
          "What happens next",
          "We'll confirm your date/time and follow up with a quote based on your specs.",
        ],
      ],
    ),
    text: `Hi ${payload.name}, we received your booking and will confirm soon.`,
  });

  return { skipped: false };
}
