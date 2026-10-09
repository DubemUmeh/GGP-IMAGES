"use client";

import Script from "next/script";

const SITE_KEY = "0x4AAAAAAFSUMZyRj5RJZ1u1";

export function TurnstileField({ action }: { action: "contact" | "booking" }) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-medium">Security verification</p>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        strategy="afterInteractive"
      />
      <div
        className="cf-turnstile min-h-[65px]"
        data-sitekey={SITE_KEY}
        data-action={action}
        data-theme="auto"
      />
      <p className="text-xs text-muted-foreground">
        Protected by Cloudflare Turnstile.
      </p>
    </div>
  );
}
