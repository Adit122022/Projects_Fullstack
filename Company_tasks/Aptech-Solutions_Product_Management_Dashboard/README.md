# Aptech Solutions Product Management Dashboard

This project is an administrative dashboard for product operations. The frontend provides authentication, product listing and CRUD forms, filters, user views, dashboard charts, image upload, and theme controls. The repository contains the frontend application under `product-dashboard/`; its configured product API base is DummyJSON, and image uploads use Cloudinary's unsigned upload endpoint.

## How it is built

The app is a TypeScript React single-page application served by Vite. React Router handles pages, protected-route components guard the dashboard, Axios centralizes HTTP calls and token handling, and TanStack Query manages server state. React Hook Form and Zod support forms and validation. Reusable UI components follow shadcn-style composition with Radix primitives, Tailwind CSS, and class utility helpers. Recharts provides data visualizations.

## Stack and tools

- React 19, TypeScript, Vite 7, React Router 7
- Tailwind CSS 4, Radix UI, shadcn-style components
- TanStack Query, TanStack Table, Zustand
- Axios, React Hook Form, Zod
- Recharts, Lucide React, Sonner
- npm, ESLint

## Run locally

Prerequisites: Node.js 18+ and npm.

```bash
cd product-dashboard
npm install
```

Create `product-dashboard/.env` with the variables referenced in `src/config/constants.ts`:

```env
VITE_API_BASE_URL=https://dummyjson.com
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_unsigned_upload_preset
```

Then run:

```bash
npm run dev
```

Vite prints the local development URL (normally `http://localhost:5173`). Create a production bundle with `npm run build` and preview it with `npm run preview`.

## How the app is organized

- `src/api` — Axios client
- `src/components` — dashboard, product, auth, layout, and shared UI
- `src/pages` — routed application screens
- `src/services` — authentication, product, user, and upload calls
- `src/hooks` — reusable behavior such as debounced input
- `src/store` and `src/types` — state and TypeScript contracts

## Data and integration notes

The project is primarily a frontend demonstration. `VITE_API_BASE_URL` points at DummyJSON by default, whose product API is not a purpose-built authenticated CRUD backend for this dashboard. Cloudinary credentials and an unsigned upload preset are needed to use image upload. The README in `product-dashboard/` contains older API claims; confirm service behavior in `src/services` before relying on a feature as a complete production flow.
