# Public form abuse protection

The public contact/quote and booking endpoints require Cloudflare Turnstile verification, a honeypot check, a minimum submission duration, and per-IP rate limiting.

## Environment variables

Configure these in the deployment environment and local development environment:

- `NEXT_PUBLIC_TURNSTILE_SITE_KEY`: the public site key for the Turnstile widget.
- `TURNSTILE_SECRET_KEY`: the private server-side secret used with Cloudflare Siteverify. Never expose this value to client code.

Create the Turnstile widget in the Cloudflare dashboard in **Managed** mode. Add each production hostname that serves the forms to the widget's allowed hostnames. The server also verifies the token's hostname and the expected action (`contact` or `booking`).

## Protected endpoints

- `POST /api/contact`: used by the contact form and service quote CTA.
- `POST /api/booking`: used by the main booking page and service-specific booking forms, including design uploads.

Each endpoint allows up to five submissions per IP per minute per running application instance. This in-memory limiter is a lightweight application-level guard; serverless instances do not share memory, so configure a Vercel Firewall rate-limit rule for both endpoints for an additional distributed edge-level control.

The client sends a form start timestamp, but this is only an anti-bot signal and is not a cryptographic proof of elapsed time. Turnstile verification is mandatory and is performed server-side for every submission.
