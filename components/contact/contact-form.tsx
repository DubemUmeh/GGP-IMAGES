"use client";

import { useState } from "react";
import { LuSend } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const serviceOptions = [
  { value: "branding", label: "Branding & Design" },
  { value: "printing", label: "Printing Services" },
  { value: "uniforms-apparel", label: "Uniforms & Apparel" },
  { value: "packaging", label: "Packaging Solutions" },
  { value: "marketing", label: "Marketing Materials" },
  { value: "promotions", label: "Promotional Items" },
  { value: "event-materials", label: "Event Materials" },
  { value: "signage-displays", label: "Signage & Displays" },
  { value: "other", label: "Other" },
];

export function ContactForm() {
  const [status, setStatus] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      details: String(formData.get("details") || ""),
      source: "Contact page form",
      services: formData.getAll("services").map(String),
    };
    const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    const data = await response.json().catch(() => ({ message: "Something went wrong." }));
    setStatus(data.message);
    setPending(false);
    if (response.ok) form.reset();
  }

  return (
    <div className="c-glass-panel relative overflow-hidden rounded-3xl p-8 md:p-12">
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand-purple-fixed-dim opacity-20 blur-[80px]" />
      <h2 className="mb-8 text-2xl font-bold text-card">Send a Message</h2>
      <form className="space-y-6 text-card" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" name="name" placeholder="Jane Doe" className="h-auto text-primary text-base tracking-wide rounded-xl bg-card py-4" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="jane@company.com"
              className="h-auto text-primary text-base tracking-wide rounded-xl bg-card py-4"
              required
            />
          </div>
        </div>

        <fieldset className="space-y-2">
          <legend className="mb-1 text-sm font-medium leading-none">
            Services Needed
          </legend>
          <p className="text-xs text-card/60">Select all that apply.</p>
          <div className="flex flex-wrap gap-2 pt-1">
            {serviceOptions.map((option) => (
              <label key={option.value} className="cursor-pointer">
                <input
                  type="checkbox"
                  name="services"
                  value={option.value}
                  className="peer sr-only"
                />
                <span className="inline-flex items-center rounded-full border border-card/30 bg-card/10 px-4 py-2 text-sm font-medium text-card transition-colors hover:border-card/50 peer-checked:border-secondary peer-checked:bg-secondary peer-checked:text-secondary-foreground peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2">
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="space-y-2">
          <Label htmlFor="details">Project Details</Label>
          <Textarea
            id="details"
            name="details"
            placeholder="Tell us about your goals, timeline, and any specific requirements..."
            rows={5}
            className="resize-none text-primary text-pretty rounded-xl bg-card py-4"
            required
          />
        </div>

        <Button
          type="submit"
          disabled={pending}
          className="group flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-6 text-primary-foreground hover:-translate-y-1 hover:bg-brand-purple-container hover:shadow-lg"
        >
          {pending ? "Sending..." : "Submit Request"}
          <LuSend className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
        {status && <p className="text-sm font-semibold text-card" aria-live="polite">{status}</p>}
      </form>
    </div>
  );
}