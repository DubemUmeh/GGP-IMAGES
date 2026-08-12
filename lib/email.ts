import nodemailer from "nodemailer";
import { z } from "zod";
import { absoluteUrl, siteConfig } from "@/lib/seo";

export const contactSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(160),
  details: z.string().trim().min(10).max(5000),
  source: z.string().trim().max(80).default("Website contact form"),
  services: z.array(z.string().trim().max(80)).max(12).default([]),
});

export type ContactPayload = z.infer<typeof contactSchema>;

function emailShell(title: string, intro: string, rows: Array<[string, string]>) {
  const logo = absoluteUrl(siteConfig.logo);
  return `<!doctype html><html><body style="margin:0;background:#f8f9fa;font-family:Arial,sans-serif;color:#191c1d"><div style="max-width:680px;margin:0 auto;padding:28px"><div style="background:#6b004d;border-radius:28px 28px 0 0;padding:28px;text-align:center"><img src="${logo}" width="72" height="72" alt="GGP Images" style="border-radius:16px;background:#fff;padding:8px"><h1 style="margin:16px 0 0;color:#fff;font-size:26px">${title}</h1></div><div style="background:#fff;border:1px solid #e7e8e9;border-top:0;padding:28px;border-radius:0 0 28px 28px"><p style="font-size:16px;line-height:1.7">${intro}</p><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top:20px;border-collapse:collapse">${rows.map(([k,v]) => `<tr><td style="padding:14px;border-top:1px solid #edeeef;color:#6b004d;font-weight:700;width:35%">${k}</td><td style="padding:14px;border-top:1px solid #edeeef;line-height:1.6">${String(v).replaceAll("\n", "<br>")}</td></tr>`).join("")}</table><p style="margin-top:26px;color:#4a454f;font-size:13px;line-height:1.6">This message was sent from ${siteConfig.name}. You are receiving it because a website form was submitted or because you requested printing support.</p></div></div></body></html>`;
}

async function getTransporter() {
  if (!process.env.SMTP_HOST) return null;
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } : undefined,
  });
}

export async function sendContactEmails(payload: ContactPayload) {
  const transporter = await getTransporter();
  if (!transporter) {
    console.info("Contact submission received without SMTP configuration", payload);
    return { skipped: true };
  }
  const adminEmail = process.env.ADMIN_EMAIL || siteConfig.email;
  const from = process.env.MAIL_FROM || `GGP Images <${siteConfig.email}>`;
  const services = payload.services.length ? payload.services.join(", ") : "Not specified";
  await transporter.sendMail({
    from,
    to: adminEmail,
    replyTo: payload.email,
    subject: `New ${payload.source} from ${payload.name}`,
    html: emailShell("New website enquiry", "A new quote/contact request has been submitted. Reply promptly while the buying intent is fresh.", [["Name", payload.name], ["Email", payload.email], ["Services", services], ["Source", payload.source], ["Details", payload.details]]),
    text: `Name: ${payload.name}\nEmail: ${payload.email}\nServices: ${services}\nDetails: ${payload.details}`,
  });
  await transporter.sendMail({
    from,
    to: payload.email,
    replyTo: adminEmail,
    subject: "We received your GGP Images request",
    html: emailShell("Request received", `Hi ${payload.name}, thank you for contacting GGP Images. Our team will review your project details and respond with next steps.`, [["Services", services], ["What happens next", "We review your details, confirm artwork or production questions, and send a practical quote or recommendation."], ["Your message", payload.details]]),
    text: `Hi ${payload.name}, we received your request and will respond soon.`,
  });
  return { skipped: false };
}
