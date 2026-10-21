import type { JobPosting } from '@/domain/entities'

export const MOCK_JOBS: JobPosting[] = [
  {
    id: 'job-sr-frontend',
    title: 'Senior Frontend Engineer (React / TypeScript / Web & Mobile)',
    department: 'Technology',
    location: 'Gurugram, Haryana (On-site / Hybrid)',
    employmentType: 'Full-time',
    experience: '3–6 Years',
    overview:
      'We are looking for a Senior Frontend Engineer to build high-performance, accessible, and resilient web & mobile interfaces for 20,000+ Kirana store owners and brand partners.',
    responsibilities: [
      'Architect robust web applications using React, TypeScript, and modern state architectures.',
      'Deliver fluid 60fps animations and micro-interactions optimized for low-end mobile devices and spotty connectivity.',
      'Collaborate closely with product designers and backend engineers to implement low-latency catalog search and order placement flows.',
      'Implement strict accessibility standards (WCAG 2.2 AA) and maintain comprehensive unit test coverage.',
    ],
    requirements: [
      'Strong proficiency in TypeScript, React, React Router, Redux Toolkit, and Tailwind CSS.',
      'Proven track record of optimizing Core Web Vitals (LCP, FID/INP, CLS) and bundle sizes.',
      'Experience building responsive B2B commerce interfaces or quick commerce applications.',
      'Passion for Kirana retail empowerment and solving real supply-chain problems.',
    ],
    postedDate: 'Recently Posted',
  },
  {
    id: 'job-staff-backend',
    title: 'Staff Backend Engineer (Distributed Systems & Dispatch)',
    department: 'Technology',
    location: 'Gurugram, Haryana (On-site)',
    employmentType: 'Full-time',
    experience: '6–10 Years',
    overview:
      'Lead our core routing, warehouse inventory syncing, and 60-minute dispatch algorithms handling thousands of daily wholesale shipments.',
    responsibilities: [
      'Design event-driven microservices for sub-second catalog availability and order orchestration.',
      'Optimize database queries and caching layers for peak Kirana ordering rush hours.',
      'Mentor senior engineers and establish high engineering benchmarks across the organization.',
    ],
    requirements: [
      'Deep expertise in Go, Node.js or Java with distributed database systems (PostgreSQL, Redis, Kafka).',
      'Experience in real-time geospatial routing and delivery dispatch systems.',
    ],
    postedDate: 'Active Opening',
  },
  {
    id: 'job-lead-product-mgr',
    title: 'Lead Product Manager — Kirana Commerce & Growth',
    department: 'Product',
    location: 'Gurugram, Haryana (On-site)',
    employmentType: 'Full-time',
    experience: '4–7 Years',
    overview:
      'Own the end-to-end retailer ordering lifecycle, driving conversion, repeat ordering rate, and credit/financing adoption.',
    responsibilities: [
      'Conduct regular on-ground field visits with Kirana store owners across Delhi-NCR.',
      'Define product roadmaps for bulk pricing tiers, predictive reordering, and digital invoice management.',
    ],
    requirements: [
      'Prior product management experience in B2B marketplaces, quick commerce, or FMCG tech.',
      'Data-driven mindset with strong SQL and analytics proficiency.',
    ],
    postedDate: 'Active Opening',
  },
  {
    id: 'job-ops-warehouse-lead',
    title: 'Warehouse Fulfillment Manager (Dark Store Hub)',
    department: 'Operations',
    location: 'Sector 67, Gurugram',
    employmentType: 'Full-time',
    experience: '3–5 Years',
    overview:
      'Lead picking, packing, inventory reconciliation, and rider dispatch at our flagship Gurugram fulfillment center.',
    responsibilities: [
      'Ensure 10-minute order pick-to-dispatch turnaround time.',
      'Manage warehouse floor safety, bin locations, and SKU shelf-life audits.',
      'Supervise a team of 40+ pickers and staging personnel.',
    ],
    requirements: [
      'Experience managing high-throughput warehouses in FMCG or e-commerce fulfillment.',
      'Strong leadership and emergency response skills.',
    ],
    postedDate: 'Active Opening',
  },
  {
    id: 'job-brand-account-dir',
    title: 'Key Account Manager — Brand Partnerships (FMCG)',
    department: 'Growth & Sales',
    location: 'Gurugram, Haryana',
    employmentType: 'Full-time',
    experience: '3–6 Years',
    overview:
      'Partner directly with national and regional FMCG brands (Beverages, Confectionery, Staples) to drive retail shelf presence on Fairdeal.',
    responsibilities: [
      'Identify and onboard emerging and established FMCG manufacturers onto our last-mile network.',
      'Analyze brand sell-through metrics and execute co-marketing campaigns to 20,000+ Kirana owners.',
    ],
    requirements: [
      'Demonstrated B2B sales or FMCG key account management experience in North India.',
      'Exceptional negotiation, presentation, and relationship-building abilities.',
    ],
    postedDate: 'Active Opening',
  },
  {
    id: 'job-finance-associate',
    title: 'Senior Financial Analyst — Unit Economics & Pricing',
    department: 'Finance',
    location: 'Gurugram, Haryana',
    employmentType: 'Full-time',
    experience: '2–4 Years',
    overview:
      'Analyze route margins, wholesale procurement price fluctuations, and warehouse capital allocation.',
    responsibilities: [
      'Build dynamic gross margin and courier payout models.',
      'Deliver executive dashboards on city-level contribution margins.',
    ],
    requirements: [
      'Chartered Accountant (CA) or MBA in Finance with top-tier financial modeling skills.',
    ],
    postedDate: 'Active Opening',
  },
]
