import type { DeliveryPartnerTier } from '@/domain/entities'

export const MOCK_DELIVERY_TIERS: DeliveryPartnerTier[] = [
  {
    id: 'tier-bike',
    title: 'Two-Wheeler Partner',
    vehicleType: 'Bike',
    earningsMonth: 'Up to ₹35,000 / month',
    icon: 'Bike',
    highlights: [
      'Ideal for quick parcel runs (<15kg)',
      'Flexible 4, 8, or 10-hour daily shifts',
      'Daily fuel subsidy & milestone bonuses',
      'Dedicated rider support desk & insurance coverage',
    ],
    recommendedFor: 'Individual riders seeking flexible daily/weekly payouts.',
  },
  {
    id: 'tier-auto',
    title: 'Three-Wheeler Commercial',
    vehicleType: 'Auto',
    earningsMonth: 'Up to ₹48,000 / month',
    icon: 'Truck',
    highlights: [
      'Medium bulk Kirana crate delivery (up to 200kg)',
      'Guaranteed order clusters along dense retail corridors',
      'Higher rate-card per successful wholesale drop',
      'Assigned warehouse staging dock for quick turnarounds',
    ],
    recommendedFor: 'Commercial 3-wheeler owners wanting consistent multi-order routes.',
  },
  {
    id: 'tier-ev',
    title: 'EV Loader Fleet Partner',
    vehicleType: 'EV Loader',
    earningsMonth: 'Up to ₹60,000 / month',
    icon: 'Zap',
    highlights: [
      'Maximum volume capacity for palletized FMCG shipments',
      'Zero fuel expense with dedicated warehouse EV charging',
      'Long-term contractual stability & corporate payouts',
      'Priority load assignment across Gurugram & NCR hubs',
    ],
    recommendedFor: 'EV loader owners & fleet vendors seeking peak earnings.',
  },
]
