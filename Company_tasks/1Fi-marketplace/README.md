# 1Fi Marketplace

1Fi Marketplace is a product marketplace interface prototype built around browsing devices, comparing product variants, and selecting EMI plans. The product data is local JSON with an asynchronous service wrapper, so the current application can demonstrate loading and selection states without a live marketplace API.

## How it is built

The application uses Next.js App Router and TypeScript. The shop page reads product data through `src/services/api.ts`; typed models describe products, variants, and EMI options. Reusable UI components cover cards, buttons, badges, and skeleton loaders. The product detail route selects a product by ID, updates price based on variant selection, and presents the EMI selector. Styling uses Tailwind CSS utilities and shared class helpers.

## Stack and tools

- Next.js 16, React 19, TypeScript
- Tailwind CSS 4, Lucide React
- `clsx` and `tailwind-merge` for class composition
- npm, ESLint

## Run locally

Prerequisites: Node.js and npm.

```bash
npm install
npm run dev
```

Open the URL printed by Next.js (normally `http://localhost:3000/shop`). Create a production build with `npm run build`, and serve it with `npm start` after building.

## How the product flow works

1. `/shop` renders the marketplace tabs and product listing.
2. Product records and option data are defined in `src/data/products.json` and typed in `src/types/index.ts`.
3. `src/services/api.ts` exposes asynchronous data access and simulated latency for loading-state design.
4. `/shop/product/[id]` renders product details, option-dependent price, and EMI-plan selection.

## Source map

- `src/app` — routes and global layout
- `src/data` and `src/types` — prototype catalog and contracts
- `src/services` — product data access wrapper
- `src/components/shop` — listing and EMI interaction
- `src/components/ui` — reusable interface primitives

## Scope

This repository contains a frontend prototype, not a payment or product backend. Product data is locally simulated; cart persistence, real inventory, checkout/payment integration, and production API behavior would need a separate implementation.
