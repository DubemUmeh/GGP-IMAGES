"use client";

import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import Image from "next/image";
import {
  ArrowRight,
  CalendarDays,
  Clock3,
  Lock,
} from "lucide-react";
import { Feature, FormSection, SummaryRow, Reason, SuccessMessage } from "@/components/booking/ui";
import { MultiSelectField } from "@/components/booking/multi-select";
import { GroupedMultiSelectField, type OptionGroup } from "@/components/booking/grouped-multi-select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MultiFileDropzone } from "@/components/booking/media-drop-zone";
import { flattenSubdivisions, getServiceByName, serviceOptions, buildSubdivisionKey, parseSubdivisionKey } from "@/lib/services";
import { todayUTCDateString } from "@/lib/date";

const MAX_FILES = 5;
const MAX_FILE_BYTES = 10 * 1024 * 1024; // matches MAX_IMAGE_BYTES server-side

export default function BookingPage() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedSubdivisions, setSelectedSubdivisions] = useState<string[]>([]);
  const [form, setForm] = useState({
    projectName: "",
    quantity: "",
    description: "",
    date: "",
    time: "",
    name: "",
    email: "",
    phone: "",
  });

  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // One group per selected core service. GroupedMultiSelectField shows a
  // service heading per group when there's more than one service selected,
  // and falls back to a flat subdivision list when there's just one.
  const subdivisionGroups: OptionGroup[] = useMemo(
    () =>
      selectedServices
        .map((name) => getServiceByName(name))
        .filter((service) => Boolean(service))
        .map((service) => {
          const slug: string = service!.slug;
          return {
            key: slug,
            label: service!.name,
            items: flattenSubdivisions(service!).map((sub) => ({
              value: buildSubdivisionKey(slug, sub.slug),
              label: sub.name,
            })),
          };
        }),
    [selectedServices]
  );

  // Drop any selected subdivisions that belonged to a service the user has
  // since deselected, so stale selections can't linger and get submitted.
  function handleServicesChange(names: string[]) {
    setSelectedServices(names);
    setSelectedSubdivisions((current) => {
      const stillSelectedServiceSlugs = new Set<string>(
        names
          .map((n) => getServiceByName(n)?.slug)
          .filter((s): s is NonNullable<typeof s> => Boolean(s))
          .map((s) => String(s))
      );
      return current.filter((key) => {
        const parsed = parseSubdivisionKey(key);
        return parsed && stillSelectedServiceSlugs.has(parsed.serviceSlug);
      });
    });
  }

  function updateField(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (selectedServices.length === 0) {
      setError("Please select at least one service.");
      return;
    }
    if (subdivisionGroups.length > 0 && selectedSubdivisions.length === 0) {
      setError("Please select at least one subdivision.");
      return;
    }

    setSubmitting(true);
    try {
      const body = new FormData();
      selectedServices.forEach((s) => body.append("services", s));
      selectedSubdivisions.forEach((key) => body.append("subdivisions", key));
      Object.entries(form).forEach(([key, value]) => body.append(key, value));
      files.forEach((file) => body.append("designs", file));

      const res = await fetch("/api/booking", { method: "POST", body });
      const data = await res.json().catch(() => ({ message: "Something went wrong." }));

      if (!res.ok) {
        setError(data.message || "Something went wrong. Please try again.");
        return;
      }

      setSubmitted(true);
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const subdivisionSummaryLabels = selectedSubdivisions.map((key) => {
    const parsed = parseSubdivisionKey(key);
    const group = parsed ? subdivisionGroups.find((g) => g.key === parsed.serviceSlug) : undefined;
    const item = group?.items.find((i) => i.value === key);
    const subLabel = item?.label ?? parsed?.subdivisionSlug ?? key;
    return subdivisionGroups.length > 1 && group ? `${group.label} — ${subLabel}` : subLabel;
  });

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#111]">
        <Image
          src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1800&q=80"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-linear-to-r from-black/30 via-black/20 to-black/10" />

        <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-semibold font-manrope uppercase tracking-widest text-secondary backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-secondary" />
              Book an Order
            </span>

            <h1 className="mt-6 text-4xl font-extrabold font-manrope leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
              Let&apos;s Bring Your <span className="text-secondary">Project to Life.</span>
            </h1>

            <p className="mt-5 max-w-2xl text-base font-inter leading-relaxed text-white/70 sm:text-lg">
              Schedule your order with ease. Choose your service, provide your project details,
              and we&apos;ll handle the rest.
            </p>

            <div className="mt-10 grid max-w-2xl gap-5 sm:grid-cols-3">
              <Feature icon={<Clock3 size={18} />} title="Quick & Easy" text="Book in minutes" />
              <Feature icon={<Lock size={18} />} title="Secure & Reliable" text="Your data is safe" />
              <Feature icon={<CalendarDays size={18} />} title="On-time Delivery" text="We value your time" />
            </div>
          </div>
        </div>
      </section>

      {/* Booking */}
      <section className="bg-brand-tertiary px-5 py-14 sm:px-6 lg:px-8 lg:py-20 border-b border-b-secondary">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.4fr_0.6fr]">
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-8"
          >
            {submitted ? (
              <SuccessMessage />
            ) : (
              <>
                <FormSection number="1" title="Choose a Service" />
                <div className="mb-8">
                  <MultiSelectField
                    placeholder="Select one or more services"
                    values={selectedServices}
                    onChange={handleServicesChange}
                    items={serviceOptions}
                  />
                </div>

                {subdivisionGroups.length > 0 && (
                  <div className="mb-8">
                    <GroupedMultiSelectField
                      label="Subdivision"
                      placeholder="Select one or more subdivisions"
                      values={selectedSubdivisions}
                      onChange={setSelectedSubdivisions}
                      groups={subdivisionGroups}
                      itemLabel="subdivisions"
                    />
                  </div>
                )}

                <FormSection number="2" title="Project Details" />

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="projectName">Project Name / Title</Label>
                    <Input
                      id="projectName"
                      name="projectName"
                      placeholder="E.g. Company T-Shirts"
                      value={form.projectName}
                      onChange={updateField}
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input
                      id="quantity"
                      name="quantity"
                      placeholder="E.g. 50"
                      value={form.quantity}
                      onChange={updateField}
                    />
                  </div>

                  <div className="flex flex-col gap-2 sm:col-span-2">
                    <Label htmlFor="description">Description / Requirements</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={form.description}
                      onChange={updateField}
                      rows={5}
                      placeholder="Tell us more about your project..."
                    />
                  </div>

                  {/* Upload */}
                  <div className="sm:col-span-2">
                    <Label>Upload Design (Optional, up to {MAX_FILES})</Label>
                    <div className="mt-2">
                      <MultiFileDropzone
                        files={files}
                        onFilesChange={setFiles}
                        maxFiles={MAX_FILES}
                        maxFileBytes={MAX_FILE_BYTES}
                        error={fileError}
                        onError={setFileError}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-8 grid gap-5 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="date">Preferred Date</Label>
                    <Input id="date" name="date" type="date" value={form.date} onChange={updateField} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="time">Preferred Time</Label>
                    <Input id="time" name="time" type="time" value={form.time} onChange={updateField} isToday={form.time === todayUTCDateString()} />
                  </div>
                </div>

                <div className="mt-8">
                  <FormSection number="3" title="Your Information" />

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" name="name" placeholder="Your full name" value={form.name} onChange={updateField} required />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" name="email" type="email" placeholder="you@example.com" value={form.email} onChange={updateField} required />
                    </div>
                    <div className="flex flex-col gap-2 sm:col-span-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" name="phone" type="tel" placeholder="+233 20 123 4567" value={form.phone} onChange={updateField} required />
                    </div>
                  </div>
                </div>

                {error && (
                  <p className="mt-6 rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
                    {error}
                  </p>
                )}

                <div className="mt-8 flex flex-col gap-4">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex items-center justify-center gap-2 rounded-xl bg-secondary px-6 py-4 text-sm font-bold font-manrope text-secondary-foreground shadow-[0_10px_30px_rgba(253,139,0,0.25)] transition-colors hover:bg-secondary/90 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {submitting ? "Booking..." : "Book Now"}
                    <ArrowRight size={17} />
                  </button>

                  <div className="flex items-center justify-center gap-2 text-center text-xs text-muted-foreground">
                    <Lock size={13} className="shrink-0" />
                    We respect your privacy and never share your information.
                  </div>
                </div>
              </>
            )}
          </form>

          <aside className="space-y-5">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                  <CalendarDays size={19} />
                </div>
                <h2 className="font-bold text-card-foreground">Booking Summary</h2>
              </div>

              <div className="mt-6 space-y-5">
                <SummaryRow label="Services" value={selectedServices.length ? selectedServices.join(", ") : "Not selected"} />
                <SummaryRow label="Subdivisions" value={subdivisionSummaryLabels.length ? subdivisionSummaryLabels.join(", ") : "—"} />
                <SummaryRow label="Quantity" value={form.quantity || "—"} />
                <SummaryRow label="Date" value={form.date || "—"} />
                <SummaryRow label="Time" value={form.time || "—"} />
                <SummaryRow label="Files" value={files.length ? `${files.length} attached` : "None"} />
              </div>

              <div className="mt-6 border-t border-border pt-5">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-medium text-muted-foreground">Estimate</span>
                  <span className="text-xl font-black text-secondary">GH₵ 0.00</span>
                </div>
              </div>

              <p className="mt-4 text-xs leading-5 text-muted-foreground">
                Final pricing depends on the service, materials, quantity, specifications, and
                delivery requirements.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <h2 className="font-bold text-card-foreground">Why Book With Us?</h2>
              <div className="mt-5 space-y-5">
                <Reason title="Professional Support" text="We're here to help you every step of the way." />
                <Reason title="Quality Guarantee" text="Top-notch quality on every order." />
                <Reason title="Fast Turnaround" text="Quick production and timely delivery." />
                <Reason title="Customer Satisfaction" text="We put your satisfaction first." />
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}