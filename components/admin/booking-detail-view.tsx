"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarDays, Clock3 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { toast } from "@/components/ui/toast";
import Image from "next/image";
import { getServiceBySlug, getSubdivision } from "@/lib/services";

type BookingRow = {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  services: string[];
  service: string | null;
  subdivision: string | null;
  project: string;
  quantity: string | null;
  description: string | null;
  preferred_date: string | null;
  preferred_time: string | null;
  design_urls: string[];
  status: string;
};

export function BookingDetailView({ booking }: { booking: BookingRow }) {
  const router = useRouter();
  const [status, setStatus] = useState(booking.status);
  const [saving, setSaving] = useState(false);
  const serviceName = booking.service ? getServiceBySlug(booking.service)?.name : booking.services[0];
  const subdivisionName = booking.service && booking.subdivision ? getSubdivision(booking.service, booking.subdivision)?.name : booking.subdivision;

  async function updateStatus(next: string) {
    setSaving(true);
    const prev = status;
    setStatus(next);

    const r = await fetch(`/api/admin/bookings/${booking.id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ status: next }),
    });

    setSaving(false);

    if (!r.ok) {
      setStatus(prev);
      toast.add({
        type: "error",
        title: "Error",
        description: "Status update failed",
      });
      return;
    }

    toast.add({
      type: "success",
      title: "Saved",
      description: "Booking status updated",
    });
    router.refresh();
  }

  return (
    <Card>
      <CardContent className="space-y-5 pt-6">
        <DetailSection title="Customer">
          <DetailRow label="Name" value={booking.customer_name} />
          <DetailRow label="Email" value={booking.customer_email} />
          <DetailRow label="Phone" value={booking.customer_phone} />
        </DetailSection>

        <Separator />

        <DetailSection title="Services">
          <DetailRow label="Service" value={serviceName || "Not specified"} />
          <DetailRow label="Subdivision" value={subdivisionName || "Not specified"} />
          {booking.services.length > 1 && <div className="flex flex-wrap gap-2">{booking.services.map((s) => <Badge key={s} variant="secondary">{s}</Badge>)}</div>}
        </DetailSection>

        <Separator />

        <DetailSection title="Project">
          <DetailRow label="Project" value={booking.project} />
          {booking.quantity && (
            <DetailRow label="Quantity" value={booking.quantity} />
          )}
          {booking.description && (
            <p className="text-sm text-muted-foreground">
              {booking.description}
            </p>
          )}
        </DetailSection>

        {(booking.preferred_date || booking.preferred_time) && (
          <>
            <Separator />
            <DetailSection title="Preferred schedule">
              <div className="space-y-1 text-sm">
                {booking.preferred_date && (
                  <div className="flex items-center gap-1.5">
                    <CalendarDays className="h-3.5 w-3.5 text-muted-foreground" />
                    {booking.preferred_date}
                  </div>
                )}
                {booking.preferred_time && (
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Clock3 className="h-3.5 w-3.5" />
                    {booking.preferred_time}
                  </div>
                )}
              </div>
            </DetailSection>
          </>
        )}

        {booking.design_urls?.length > 0 && (
          <>
            <Separator />
            <DetailSection title="Reference designs">
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                {booking.design_urls.map((url) => (
                  <a
                    key={url}
                    href={url}
                    target='_blank'
                    rel="noreferrer"
                    className="block overflow-hidden rounded-lg border"
                  >
                    <Image
                      src={url}
                      alt="Reference design"
                      width={100}
                      height={100}
                      className="aspect-square w-full object-cover"
                    />
                  </a>
                ))}
              </div>
            </DetailSection>
          </>
        )}

        <Separator />

        <DetailSection title="Status">
          <Select
            value={status}
            onValueChange={(v) => v && updateStatus(v)}
            disabled={saving}
          >
            <SelectTrigger className="w-full sm:w-[220px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="contacted">Contacted</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </DetailSection>
      </CardContent>
    </Card>
  );
}

function DetailSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {title}
      </h3>
      <div className="space-y-2">{children}</div>
    </section>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-right font-medium">{value}</span>
    </div>
  );
}