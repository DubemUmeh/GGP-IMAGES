"use client";

import { useState } from "react";
import { LuCircleCheck, LuSend } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MultiSelectField } from "@/components/booking/multi-select";
import { serviceOptions } from "@/lib/services";

const highlights = [
  "Fast turnaround times available",
  "Dedicated project manager",
  "Nationwide shipping",
];


export function QuoteCtaSection() {
  const [status, setStatus] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      details: String(formData.get("details") || ""),
      source: "Services quote CTA form",
      services: selectedServices,
    };
    const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    const data = await response.json().catch(() => ({ message: "Something went wrong." }));
    setStatus(data.message);
    setPending(false);
    if (response.ok) {
      form.reset();
      setSelectedServices([]);
    }
  }

  return (
    <section className="mx-auto mb-16 max-w-7xl px-3 md:px-6 py-16">
      <div className="relative overflow-hidden rounded-[32px] bg-brand-tertiary p-4 shadow-2xl md:p-12 lg:p-16">
        <div className="relative z-10 grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
              Ready to Bring Your Brand to Life?
            </h2>
            <p className="mb-8 max-w-lg text-lg text-white/80">
              Get a custom quote tailored to your project&apos;s exact specifications. Our team of
              experts is ready to help you choose the right materials, finishes, and printing
              techniques to achieve flawless results.
            </p>
            <div className="mb-8 space-y-4">
              {highlights.map((item) => (
                <div key={item} className="flex items-center gap-3 text-white/90">
                  <LuCircleCheck className="h-5 w-5 text-brand-orange-fixed-dim" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel rounded-2xl p-3 md:p-6 md:p-8">
            <h3 className="mb-6 text-xl font-semibold text-primary">Request a Custom Quote</h3>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-1">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" name="name" placeholder="John Doe" className="bg-card/80" required />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@company.com"
                    className="bg-card/80"
                    required
                  />
                </div>
              </div>

              <MultiSelectField
                label="Services Needed"
                placeholder="Select one or more services"
                values={selectedServices}
                onChange={setSelectedServices}
                items={serviceOptions}
              />

              <div className="space-y-1">
                <Label htmlFor="details">Project Details</Label>
                <Textarea
                  id="details"
                  name="details"
                  placeholder="Tell us about quantities, materials, timeline..."
                  rows={3}
                  className="resize-none bg-card/80"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={pending}
                className="mt-4 w-full rounded-xl bg-brand-tertiary py-6 text-primary-foreground hover:bg-brand-purple-container"
              >
                {pending ? "Sending..." : "Submit Request"}
                <LuSend className="ml-1 h-4 w-4" />
              </Button>
              {status && <p className="text-sm font-semibold text-primary" aria-live="polite">{status}</p>}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}