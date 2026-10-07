import { SiteMediaManager } from "@/components/admin/site-media-manager";
import { getSiteMediaSlots } from "@/lib/site-media";

export default async function SiteMediaPage() {
  const slots = await getSiteMediaSlots();
  return <SiteMediaManager initialSlots={slots} />;
}
