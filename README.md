This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
# GGP-IMAGES


## Public form protection

The public contact and booking submission endpoints use Cloudflare Turnstile (Managed mode), hidden honeypot fields, a minimum form completion time, and per-IP request limits. Turnstile tokens are verified server-side with Cloudflare Siteverify; the server checks the expected action and hostname before processing a submission.

Configure these variables in your deployment environment:

- `TURNSTILE_SECRET`: the Turnstile widget secret. Keep it server-side and never expose it as a `NEXT_PUBLIC_*` variable.
- `TURNSTILE_HOSTNAMES`: comma-separated hostnames accepted by Siteverify, for example `ggpimages.com,www.ggpimages.com`. Add preview hostnames only if you intentionally want those deployments to accept submissions.

The site key is public and is embedded in the shared widget component. The in-memory IP limiter is best-effort and applies per running server instance; for strict cross-instance enforcement, replace it with a shared rate-limit store such as Redis or a database-backed counter.
