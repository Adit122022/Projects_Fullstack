import type { RetailerTestimonial } from '@/domain/entities'

export const MOCK_TESTIMONIALS: RetailerTestimonial[] = [
  {
    id: 'test-rahul-arya',
    name: 'Rahul Arya',
    storeName: 'Arya General Store',
    location: 'Sector 49, Gurugram',
    quote:
      'Earlier, I used to sell ₹15–20K daily. Now, after Fairdeal came in, sales have increased by ₹5–10K more. Everything is available in one place, and my shop also doesn’t face stock-outs anymore.',
    highlight: '+₹5K–10K extra daily sales',
    salesGrowth: '+35% Turnover',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'test-mahanti-sah',
    name: 'Mahanti Sah',
    storeName: 'Sah Kirana & Daily Needs',
    location: 'Sohna Road, Gurugram',
    quote:
      'Earlier, I had to buy bulk stock worth ₹30–35K. Now I place daily orders of just ₹5–6K, and the money rotates faster.',
    highlight: 'Working capital freed up',
    salesGrowth: '6x Faster Cash Cycle',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'test-vannya-tea',
    name: 'Vannya',
    storeName: 'Vannya Tea Stall & Mart',
    location: 'Cyber City, Gurugram',
    quote:
      'Fairdeal delivers milk, biscuits, rusk, and disposable glasses right to my stall in under an hour. I never have to close the counter to rush to the wholesale market.',
    highlight: 'Zero counter downtime',
    salesGrowth: '100% In-Stock Availability',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'test-ram-sagar',
    name: 'Ram Sagar',
    storeName: 'Sagar Provision Store',
    location: 'Old Railway Road, Gurugram',
    quote:
      'The 60-minute delivery is 100% real. When cold drinks sell out on hot afternoons, I order on Fairdeal and have chilled crates stacked before the evening rush.',
    highlight: '60-minute rapid turnaround',
    salesGrowth: 'No Lost Summer Sales',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
  },
]
