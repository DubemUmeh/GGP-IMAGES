import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatGhPhone(raw: string): { display: string; href: string } {
  let digits = raw.replace(/\D/g, "");
  if (digits.startsWith("0")) {
    digits = "233" + digits.slice(1);
  }
  const href = `tel:+${digits}`;
  if (digits.length === 12 && digits.startsWith("233")) {
    const cc = digits.slice(0, 3);
    const area = digits.slice(3, 5);
    const mid = digits.slice(5, 8);
    const last = digits.slice(8);
    const display = `+${cc} (${area}) ${mid} ${last}`;
    return { display, href };
  }
  return { display: `+${digits}`, href };
}
