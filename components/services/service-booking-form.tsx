"use client";

import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import { FaWhatsapp } from "react-icons/fa6";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MultiSelectField } from "./multi-select";
import type { CoreService } from "@/lib/services";
import { flattenSubdivisions, buildSubdivisionKey } from "@/lib/services";
import { siteConfig } from "@/lib/seo";
import { todayUTCDateString } from "@/lib/date";

export function ServiceBookingForm({ service }: { service: CoreService }) {
  const subdivisions = useMemo(() => flattenSubdivisions(service), [service]);
  const [selectedSubdivisions, setSelectedSubdivisions] = useState<string[]>(
    subdivisions[0] ? [subdivisions[0].slug] : []
  );
  const [status, setStatus] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [form, setForm] = useState({ projectName: service.name, quantity: "", description: "", date: "", time: "", name: "", email: "", phone: "" });

  const message = `Hello, I am interested in ${service.name}${
    selectedSubdivisions.length
      ? ` — ${selectedSubdivisions
          .map((slug) => subdivisions.find((s) => s.slug === slug)?.name ?? slug)
          .join(", ")}`
      : ""
  }.`;
  const whatsappUrl = `https://wa.me/${siteConfig.phone.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;

  function updateField(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(null);
    if (selectedSubdivisions.length === 0) {
      setStatus("Please select at least one subdivision.");
      return;
    }
    setPending(true);
    const body = new FormData();
    body.append("services", service.name);
    selectedSubdivisions.forEach((slug) =>
      body.append("subdivisions", buildSubdivisionKey(service.slug, slug))
    );
    Object.entries(form).forEach(([key, value]) => body.append(key, value));
    const response = await fetch("/api/booking", { method: "POST", body });
    const data = await response.json().catch(() => ({ message: "Something went wrong." }));
    setStatus(data.message);
    setPending(false);
    if (response.ok) setForm({ projectName: service.name, quantity: "", description: "", date: "", time: "", name: "", email: "", phone: "" });
  }

  // MultiSelectField works with display labels, so map slug<->name here
  const subdivisionLabels = selectedSubdivisions.map(
    (slug) => subdivisions.find((s) => s.slug === slug)?.name ?? slug
  );
  const subdivisionNameList = subdivisions.map((s) => s.name);

  function handleSubdivisionChange(names: string[]) {
    const slugs = names
      .map((name) => subdivisions.find((s) => s.name === name)?.slug)
      .filter((slug): slug is string => Boolean(slug));
    setSelectedSubdivisions(slugs);
  }

  return (
    <div id="book" className="rounded-[32px] border border-white/10 bg-card p-4 md:p-6 shadow-secondary shadow-sm md:p-8">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-bold font-manrope uppercase tracking-widest text-secondary">Book this service</p>
          <h2 className="mt-2 text-2xl font-black font-manrope tracking-wide text-card-foreground">Request {service.name}</h2>
        </div>
        <a href={whatsappUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-xl bg-whatsapp px-4 py-2 font-semibold font-manrope text-white hover:bg-whatsapp/90"><FaWhatsapp className="mr-2" /> WhatsApp</a>
      </div>
      <form className="grid gap-5" onSubmit={handleSubmit}>
        <div className="grid gap-5 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Core Service</Label>
            <Input value={service.name} readOnly className="bg-muted uppercase text-black tracking-wide font-semibold text-base" />
          </div>
          <MultiSelectField
            label="Subdivision"
            placeholder="Select subdivisions"
            values={subdivisionLabels}
            onChange={handleSubdivisionChange}
            items={subdivisionNameList}
          />
        </div>
        <div className="grid gap-5 md:grid-cols-2 *:text-black">
          <Input name="name" placeholder="Full name" value={form.name} onChange={updateField} required />
          <Input name="email" type="email" placeholder="Email address" value={form.email} onChange={updateField} required />
          <Input name="phone" placeholder="Phone / WhatsApp number" value={form.phone} onChange={updateField} required />
          <Input name="quantity" placeholder="Quantity (optional)" value={form.quantity} onChange={updateField} />
          <Input name="date" type="date" value={form.date} onChange={updateField} />
          <Input name="time" type="time" value={form.time} onChange={updateField} isToday={form.date === todayUTCDateString()} />
        </div>
        <Input name="projectName" className="text-black text-base tracking-wide" placeholder="Project name" value={form.projectName} onChange={updateField} required />
        <Textarea name="description" className="text-black text-base tracking-wide" placeholder="Tell us about sizes, materials, deadline, artwork, and delivery needs..." rows={5} value={form.description} onChange={updateField} />
        <button disabled={pending} className="rounded-xl bg-primary py-4 font-semibold font-manrope text-primary-foreground hover:bg-brand-purple-container disabled:opacity-60">{pending ? "Sending..." : "Submit booking request"}</button>
        {status && <p className="text-sm font-semibold font-inter text-card-foreground" aria-live="polite">{status}</p>}
      </form>
    </div>
  );
}