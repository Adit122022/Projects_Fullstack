# Fairdeal.market — Frontend Redesign Implementation Plan

**Author:** Senior Frontend Engineer & UI/UX Specialist  
**Architecture:** Four-Layer Enterprise Clean Architecture with Redux Toolkit & React Router  
**Target:** Fairdeal Engineering Team Redesign Proposal  
**Document Location:** `docs/implementation-plan.md`

---

## 1. Architectural Foundations

### Four-Layer Architecture Map
```
src/
├── domain/                      # Core business models, value objects, interfaces (Zero UI/React dependencies)
│   ├── entities/                # Product, CartItem, PartnerInquiry, JobPosting, DeliveryPartner
│   ├── types/                   # Filter criteria, status enums, currency types
│   └── validation/              # Input validation rules (email, phone, GST, vehicle)
│
├── infrastructure/              # External interactions, mock repositories, persistence adapters
│   ├── mock-data/               # Verified catalog items, categories, brand partners, jobs, testimonials
│   ├── repositories/            # CatalogRepository, CareersRepository, PartnerRepository
│   └── config/                  # App constants, navigation links, SEO metadata
│
├── application/                 # Use cases, Redux Toolkit slices, selectors, custom business hooks
│   ├── store/                   # Root store configuration, typed dispatch & selector hooks
│   ├── features/
│   │   ├── catalog/             # CatalogSlice (search, filters, sorting, view mode)
│   │   ├── cart/                # CartSlice (demo shopping bag, item quantities, discounts)
│   │   ├── navigation/          # NavigationSlice (mobile drawer, search modal)
│   │   ├── brandPartners/       # BrandInquirySlice (form state, submission status)
│   │   └── careers/             # CareersSlice (department filter, active role modal)
│   └── selectors/               # Memoized Reselect selectors (cart totals, filtered catalog)
│
├── presentation/                # UI components, layouts, pages, animations, design system
│   ├── ui/                      # shadcn/ui primitives (Button, Dialog, Sheet, Accordion, Select, Tabs, Badge)
│   ├── components/              # Domain-informed reusable UI components (Header, Footer, ProductCard, etc.)
│   ├── layouts/                 # RootLayout, PageContainer, Navbar, Footer
│   ├── pages/                   # Home, AboutUs, BrandPartner, DeliverWithUs, Careers, RetailerExperience, FAQ, Legal
│   └── motion/                  # GSAP ScrollTrigger timeline hooks with reduced-motion support
│
└── shared/                      # Cross-cutting utilities, formatters (currency ₹, dates), common hooks
```

---

## 2. Route Structure & User Journeys

| Path | Page Component | Key Functionality & Interactivity |
| :--- | :--- | :--- |
| `/` | `HomePage` | Hero entrance animation, Live Counter stats, Value propositions, Marquee brand partners, Category browser, Retailer video testimonials, Investor showcase, App download banner. |
| `/about-us` | `AboutUsPage` | Brand narrative, Interactive team photo mosaic, Mission & Vision cards, FAIR Core Values with interactive tab switcher, Leadership profile cards with LinkedIn links. |
| `/brand-partner` | `BrandPartnerPage` | B2B Brand supplier proposition, Retail distribution metrics, Interactive Brand Partner Inquiry form with field-level validation and simulated submission state, Brand FAQs. |
| `/deliver-with-us` | `DeliverWithUsPage` | Delivery partner recruitment, Earnings potential breakdown, Interactive 3-step onboarding tracker, Vehicle categories (Bike, Auto, EV Loader), Warehouse map, FAQs. |
| `/careers` | `CareersPage` | Work culture showcase, Searchable & filterable job board by department and job type, Interactive Role Details modal, Application demo submission. |
| `/retailer-experience` | `RetailerExperiencePage` | Dedicated **Retailer Ordering Demo**: Full-featured FMCG wholesale catalog, Live SKU search, Category pill filters, Quantity counter (+/-), Floating Demo Cart Drawer, Order summary with estimated margin savings. |
| `/faq` | `FAQPage` | Categorized accordion FAQs covering retail ordering, delivery times, brand listing, payments, and returns. |
| `/privacy-policy` | `LegalPrivacyPage` | Official privacy policy guidelines & disclosure notice. |
| `/terms` | `LegalTermsPage` | Official terms of service & B2B trading conditions. |

---

## 3. State Management Boundaries (Redux Toolkit vs Local State)

### Redux Toolkit (Shared Application State):
1. **Catalog & Search Filter State (`catalogSlice`):**
   - Active search query, selected category filter, price range, sorting (popularity, price, margin), view toggle.
2. **Demo Shopping Cart (`cartSlice`):**
   - Cart items dictionary, quantity adjustments, calculated gross total, wholesale volume discounts, estimated retailer margin profit, demo checkout state.
3. **Mobile Drawer & UI Navigation (`navigationSlice`):**
   - Mobile menu open/close, active route tracking, demo cart drawer open/close.
4. **Partner Inquiries & Careers Applications (`inquirySlice` & `careersSlice`):**
   - Submission status (`idle | loading | success | error`), active selected role modal.

### Native React State (`useState` / `useReducer`):
- Local input focus / blur, accordion item open index, toast timeout dismissals, image loading fallback states, hover tooltips.

---

## 4. UI/UX Design System & Token Strategy

* **Color Palette:**
  * Primary Brand Blue: `#2959A3` (Deep Trustworthy Navy Blue)
  * Secondary Cyan/Sky: `#63C7ED` / `#2B63E1` (Energy & Quick Commerce accents)
  * Dark Charcoal / Headings: `#111827` / `#272727`
  * Body Text: `#3F3F3F` / `#4B5563`
  * Neutral Surfaces: `#FFFFFF` (Base), `#F3F8FF` (Soft Ice Blue tint for section contrast), `#EEF3FB`
  * Footer & Dark Contrast: `#363E51` / `#242A38` (Deep Slate Navy)
* **Typography:**
  * Clean, crisp sans-serif using Google Font `Plus Jakarta Sans` / `Inter` paired with custom typography scale.
* **Component Styling:**
  * Tailwind CSS for responsive utilities, flex/grid layouts, responsive typography.
  * shadcn/ui primitives with Radix accessibility built-in.
* **Touch & Usability:**
  * Minimum 44x44px touch targets on mobile.
  * Visible focus outlines for keyboard navigation (`focus-visible:ring-2 focus-visible:ring-blue-600`).

---

## 5. GSAP Animation & Motion Strategy

* **Restrained Entrance:**
  * Hero title & subtitle staggered entrance via GSAP timeline.
  * ScrollTrigger reveal for USP feature cards and KPI stats.
* **Accessibility First:**
  * All GSAP timelines query `window.matchMedia('(prefers-reduced-motion: reduce)')`. If enabled, elements render in their terminal visible state without delay or translation.
* **Lifecycle Discipline:**
  * All GSAP instances encapsulated in `gsap.context()` inside `useEffect` / `useLayoutEffect`, reverting cleanly on component unmount to prevent memory leaks during client-side route transitions.

---

## 6. Implementation Milestones

- [x] **Milestone 1:** Inspect directory & live website, complete `website-audit.md` and `implementation-plan.md`.
- [ ] **Milestone 2:** Initialize Vite + React + TypeScript + Tailwind CSS project with strict mode.
- [ ] **Milestone 3:** Configure Redux Toolkit store, typed hooks, root reducer, and domain entities.
- [ ] **Milestone 4:** Build domain mock data repositories (Catalog, Categories, Brands, Testimonials, Jobs).
- [ ] **Milestone 5:** Build shared UI primitives (shadcn/ui-styled buttons, inputs, dialogs, sheets, badges, tabs, accordions).
- [ ] **Milestone 6:** Implement layouts, responsive `SiteHeader`, mobile navigation drawer, and `SiteFooter`.
- [ ] **Milestone 7:** Implement `HomePage` with hero, counters, marquee, benefits, categories, testimonials, investors.
- [ ] **Milestone 8:** Implement `AboutUsPage` with team photo mosaic, FAIR values, mission/vision, leadership profiles.
- [ ] **Milestone 9:** Implement `BrandPartnerPage` with B2B value propositions, distribution metrics, and validated inquiry form.
- [ ] **Milestone 10:** Implement `DeliverWithUsPage` with earnings calculator, vehicle tiers, step-by-step onboarding, and warehouse locator.
- [ ] **Milestone 11:** Implement `CareersPage` with real-time role search, department filtering, and role detail modal.
- [ ] **Milestone 12:** Implement `RetailerExperiencePage` (Demo Ordering Portal) with search, filters, SKU cards, demo cart drawer, and order savings summary.
- [ ] **Milestone 13:** Implement `FAQPage` and Legal pages (`Privacy`, `Terms`, `Shipping`).
- [ ] **Milestone 14:** Implement restrained GSAP animations with reduced-motion support.
- [ ] **Milestone 15:** Write automated unit tests for Redux slices, selectors, and form validation.
- [ ] **Milestone 16:** Execute production build (`npm run build`), run tests, audit bundle, and generate `docs/performance-report.md` and `README.md`.
