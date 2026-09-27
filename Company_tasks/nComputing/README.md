# nComputing Product, Lead, and Checkout Experience

This project combines a product-facing website with lead capture, a checkout flow, and an administrative view. The frontend includes product pages such as RX420, profile, login, checkout, and admin routes. Separate API services handle authentication, leads, orders, email, and payments.

## How it is built

The customer-facing site is a Next.js App Router application in `frontend/`. Authentication integration and application pages/components live beside API route handlers. A separate TypeScript Express API in `backend/` uses controller, route, and service modules. Prisma describes the relational data layer and connects to a PostgreSQL-compatible database (including Neon); Razorpay handles payment order/signature operations, while Resend handles email. JWT middleware protects API paths.

## Stack and tools

- Next.js 16, React 19, TypeScript, Tailwind CSS 4
- Better Auth, PostgreSQL client, Prisma ORM
- Express 4, TypeScript, Zod validation
- Razorpay, Resend
- Radix/shadcn-style UI components, TanStack Table, Recharts, dnd-kit
- npm, ESLint

## Run locally

Prerequisites: Node.js/npm, PostgreSQL (or Neon), and provider accounts for payments and email when those flows are exercised.

Install each app:

```bash
cd frontend
npm install
cd ../backend
npm install
```

Create `backend/.env` (the backend config loads this file):

```env
PORT=5000
DATABASE_URL=your_postgresql_connection_string
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret
RESEND_API_KEY=your_resend_key
JWT_SECRET=replace_with_a_long_random_secret
FRONTEND_URL=http://localhost:3000
ADMIN_EMAIL=admin@example.com
```

The Prisma schema is in `backend/prisma/schema.prisma`. Generate the client and synchronize the schema using the project's scripts:

```bash
npm run prisma:generate
npm run prisma:migrate
```

Run the API in development:

```bash
npm run dev
```

Create `frontend/.env.local` with the applicable values used by the Next.js app, including `DATABASE_URL`, `NEXT_PUBLIC_APP_URL=http://localhost:3000`, Google OAuth credentials if using that provider, `RESEND_API_KEY` if email is used, and `NEXT_PUBLIC_API_URL=http://localhost:5000` for the separate API. Then run:

```bash
cd ../frontend
npm run dev
```

The frontend runs on port 3000 by default. The backend expects port 5000 by default.

## Source map

- `frontend/app` — marketing/product pages, auth routes, admin and checkout screens
- `frontend/components` and `frontend/lib` — UI, authentication, and shared helpers
- `backend/src/auth`, `leads`, `orders`, `payments` — feature modules
- `backend/src/config` — environment and Prisma setup
- `backend/prisma` — relational schema and seed data

## Notes

Environment variable defaults in backend code include mock payment/email values and a development JWT secret. Set real, private values before use beyond local development. The checkout flow depends on valid payment configuration. The README's setup reflects the split frontend/backend commands; there is no root package manifest.
