"use client";

import { useCallback, useEffect, useRef } from "react";
import Script from "next/script";

const SITE_KEY = "0x4AAAAAAFSUMZyRj5RJZ1u1";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: string | HTMLElement,
        options: {
          sitekey: string;
          action: string;
          theme?: "auto" | "light" | "dark";
          callback?: (token: string) => void;
          "error-callback"?: () => void;
          "expired-callback"?: () => void;
        },
      ) => string;
      reset: (widgetId?: string) => void;
    };
  }
}

export function TurnstileField({
  action,
  resetSignal = 0,
}: {
  action: "contact" | "booking";
  resetSignal?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const tokenInputRef = useRef<HTMLInputElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  const clearToken = useCallback(() => {
    if (tokenInputRef.current) tokenInputRef.current.value = "";
  }, []);

  const renderWidget = useCallback(() => {
    if (!window.turnstile || !containerRef.current || widgetIdRef.current) return;

    widgetIdRef.current = window.turnstile.render(containerRef.current, {
      sitekey: SITE_KEY,
      action,
      theme: "auto",
      callback: (token) => {
        if (tokenInputRef.current) tokenInputRef.current.value = token;
      },
      "error-callback": clearToken,
      "expired-callback": clearToken,
    });
  }, [action, clearToken]);

  useEffect(() => {
    if (resetSignal === 0) return;
    clearToken();
    if (window.turnstile && widgetIdRef.current) {
      window.turnstile.reset(widgetIdRef.current);
    }
  }, [resetSignal, clearToken]);

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium">Security verification</p>
      <Script
        id="cloudflare-turnstile-script"
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onReady={renderWidget}
      />
      <div ref={containerRef} className="min-h-[65px]" />
      <input
        ref={tokenInputRef}
        type="hidden"
        name="cf-turnstile-response"
        defaultValue=""
      />
      <p className="text-xs text-muted-foreground">
        Protected by Cloudflare Turnstile.
      </p>
    </div>
  );
}
