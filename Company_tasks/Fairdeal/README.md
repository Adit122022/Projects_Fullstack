# Fairdeal.market — Frontend UI/UX Redesign Proposal

> **Proposal Disclaimer:**  
> This project is an **independent frontend engineering and UI/UX redesign proposal** inspired by the publicly accessible [Fairdeal.market](https://www.fairdeal.market/) platform. It is developed to demonstrate modern frontend architecture, state management, accessibility (WCAG 2.2 AA), and performance engineering. It is **not** the official Fairdeal website and does not connect to live production databases or process real financial transactions.

---

## 1. Project Overview

Fairdeal is an innovative B2B quick-commerce marketplace empowering 20,000+ Kirana retailers across Delhi NCR with direct-from-brand wholesale sourcing and an industry-leading **60-minute delivery SLA**.

This redesign proposal elevates the public digital presence of Fairdeal by:
1. **Strengthening Brand Identity:** Replacing generic layouts with modern B2B commerce aesthetics, high-contrast typography, and authoritative FMCG brand credibility.
2. **Transforming Kirana & Partner Journeys:** Providing tailored user flows for Kirana store owners, FMCG brand suppliers, delivery partners, and prospective engineering/operations hires.
3. **Interactive Retailer Experience Demo:** Showcasing a high-speed wholesale catalog with real-time margin savings calculation, live cart management, and instant order simulation.
4. **Accessible & Responsive Architecture:** Engineered strictly mobile-first with keyboard accessibility, screen-reader compliance, and smooth touch drawer interactions.

---

## 2. Technology Stack

- **Core Framework:** React 19 + TypeScript (Strict Mode)
- **Build Tooling:** Vite 8.3 (with Rollup manual chunking & HMR)
- **Styling:** Tailwind CSS 3.4 (with customized brand tokens & mobile-first breakpoints)
- **Global State Management:** Redux Toolkit 2.13 + React Redux 9.3
- **Routing:** React Router v7 (with route-level code splitting via `React.lazy`)
- **Animation:** GSAP 3.15 + GSAP ScrollTrigger (with automatic `prefers-reduced-motion` detection and `gsap.context()` cleanup)
- **UI Primitives:** Custom accessible primitives inspired by shadcn/ui (Sheet, Dialog, Tabs, Accordion, Badge, Button, Input, Select)
- **Icons:** Lucide React
- **Testing:** Vitest 5.0 + `@testing-library/react` + `jsdom` + `@testing-library/jest-dom`

---

## 3. Four-Layer Clean Architecture

The codebase enforces strict separation of concerns across four decoupled layers:

```
src/
├── app/                      # Application Setup & Bootstrapping
│   ├── App.tsx               # Root application wrapper
│   ├── router.tsx            # Route-level code-splitting & layout definitions
│   └── store/                # Redux store configuration, typed hooks, root reducer
│       ├── hooks.ts          # useAppDispatch & useAppSelector
│       ├── index.ts          # configureStore setup
│       └── rootReducer.ts    # Combined reducers
│
├── domain/                   # Enterprise Business Rules & Models (Pure TypeScript)
│   ├── entities/             # Product, Category, CartItem, PartnerInquiry, JobPosting, Leader
│   ├── types/                # Filter criteria, sorting options, validation results
│   └── validation/           # Form validation (phone, email, inquiry data)
│
├── infrastructure/           # Data Persistence, Mocks & External Services
│   ├── config/               # App configuration (contact info, links, dark store locations)
│   ├── mock-data/            # High-fidelity FMCG SKUs, brands, leaders, testimonials, jobs
│   └── repositories/         # CatalogRepository, CareersRepository, PartnerRepository
│
├── application/              # Use Cases & Application State (Redux Toolkit)
│   ├── features/             # Slices: catalog, cart, navigation, brandPartner, careers
│   └── selectors/            # Reselect memoized selectors (margins, pricing, filters)
│
├── presentation/             # Declarative UI & User Interaction (React Components)
│   ├── ui/                   # Accessible UI primitives (Button, Input, Sheet, Dialog, Tabs)
│   ├── navigation/           # SiteHeader, MobileNavigation, NavItems
│   ├── layouts/              # RootLayout with sticky header, alert banners, and footer
│   ├── components/           # Feature blocks (HeroSection, LiveStatsBar, ProductCard, CartDrawer)
│   └── pages/                # Lazy-loaded views (Home, AboutUs, BrandPartner, Careers, etc.)
│
└── styles/                   # Global CSS, design tokens, custom utility classes
```

---

## 4. Public Pages & User Journeys

| Route | Page | Purpose & Key Features |
| :--- | :--- | :--- |
| `/` | **Home Page** | Brand hero with 60-minute SLA badge, live Kirana order simulation, FMCG category carousel, brand partners marquee, verified founder profiles, and investor credibility. |
| `/about-us` | **About Us** | Fairdeal's origin story, mission & vision, **FAIR** core values, verified leadership team (Prateek Bansal, Yash Bansal, Ravi Chaurasia, Aishwarya Rana), and investor showcase. |
| `/brand-partner` | **Brand Partner Page** | B2B supplier onboarding: direct retailer distribution benefits, real-time analytics value prop, 4-step onboarding timeline, and an accessible partner inquiry form with live validation. |
| `/deliver-with-us` | **Delivery Partner Page** | Driver recruitment: interactive **Daily Earnings & Fuel Incentive Calculator**, onboarding criteria, vehicle tiers (Bike, Auto, EV Loader), required KYC documents, and FAQs. |
| `/careers` | **Careers Portal** | Talent acquisition: live job search, department filtering (Tech, Product, Operations, Growth, Finance), role detail modal, and application workflow simulation. |
| `/retailer-experience` | **Retailer Sourcing Demo** | Interactive Kirana ordering experience: wholesale FMCG catalog, brand & category filters, margin-percentage sorting, quick add-to-cart, live profit calculation, and simulated checkout. |
| `/faq` | **FAQ & Help Center** | Searchable accordions covering Kirana ordering, delivery timeframes, payment terms, and brand supplier agreements. |
| `/privacy` | **Privacy Policy** | Comprehensive data protection disclosures, local storage usage guidelines, and contact links. |
| `/terms` | **Terms of Service** | Marketplace terms, wholesale pricing disclaimer, prototype scope disclosure, and intellectual property credits. |

---

## 5. Getting Started

### Prerequisites
- Node.js `18.x` or higher
- npm `9.x` or higher

### Installation
```bash
# Clone or navigate to the project directory
cd Company_tasks/Fairdeal

# Install dependencies
npm install
```

### Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:5173/`.

### Run Automated Tests
```bash
npm test
```
Runs 33 automated unit tests covering domain validation, cart calculation selectors, catalog filtering, and navigation state.

### Production Build & Preview
```bash
# Build production bundle with TypeScript checks
npm run build

# Preview production build locally
npm run preview
```

---

## 6. Performance Benchmarks

Built with Vite and Rolldown manual chunk splitting:
- **Build Time:** ~1.66s
- **Total Critical CSS:** **8.47 kB** (gzipped)
- **Average Secondary Route Payload:** **< 4.5 kB** (gzipped)
- **Cumulative Layout Shift (CLS):** `0.0` (Explicit aspect ratios across all cards & media)
- **Animation Safety:** Zero layout recalculations; automatic `prefers-reduced-motion` detection; scoped `gsap.context()` lifecycle management.

For full technical performance metrics, refer to [`docs/performance-report.md`](docs/performance-report.md).

---

## 7. Documentation Index

- 📋 [Website Audit & UX Analysis](docs/website-audit.md)
- 📐 [Architectural Implementation Plan](docs/implementation-plan.md)
- ⚡ [Performance & Build Report](docs/performance-report.md)

---

## 8. Author & Proposal Context

Developed as an independent senior frontend engineering submission for the **Fairdeal engineering team**, demonstrating scalable architecture, clean state management, design systems implementation, and performance optimization.
