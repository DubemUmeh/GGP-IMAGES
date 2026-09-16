"use client";

import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

export interface TermsPrivacyConsentProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  error?: string | null;
  id?: string;
  className?: string;
  textClassName?: string;
  linkClassName?: string;
}

export function TermsPrivacyConsent({
  checked,
  onCheckedChange,
  error,
  id = "terms-privacy-consent",
  className,
  textClassName,
  linkClassName,
}: TermsPrivacyConsentProps) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <div className="flex items-start gap-2.5">
        <Checkbox
          id={id}
          checked={checked}
          onCheckedChange={(val) => onCheckedChange(Boolean(val))}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className="mt-0.5 shrink-0 cursor-pointer"
        />
        <label
          htmlFor={id}
          className={cn(
            "text-sm font-inter leading-tight cursor-pointer select-none",
            textClassName ?? "text-muted-foreground"
          )}
        >
          I agree to the{" "}
          <Link
            href="/privacy"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className={cn(
              "font-medium underline underline-offset-4 hover:opacity-80 transition-opacity text-primary",
              linkClassName
            )}
          >
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link
            href="/terms"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className={cn(
              "font-medium underline underline-offset-4 hover:opacity-80 transition-opacity text-primary",
              linkClassName
            )}
          >
            Terms of Service
          </Link>
          .
        </label>
      </div>
      {error && (
        <p
          id={`${id}-error`}
          className="text-xs font-semibold font-inter text-red-300 dark:text-red-400"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}
