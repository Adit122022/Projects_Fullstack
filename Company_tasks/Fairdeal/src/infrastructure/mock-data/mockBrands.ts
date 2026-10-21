export interface BrandPartnerInfo {
  id: string
  name: string
  category: string
  growthMetric: string
  tagline: string
  logoText: string
  accentColor: string
}

export const MOCK_BRANDS: BrandPartnerInfo[] = [
  {
    id: 'brand-parle',
    name: 'Parle',
    category: 'Biscuits & Confectionery',
    growthMetric: '+42% Kirana Reach',
    tagline: "India's beloved biscuits delivered daily",
    logoText: 'PARLE',
    accentColor: '#E11D48',
  },
  {
    id: 'brand-haldiram',
    name: "Haldiram's",
    category: 'Traditional Namkeen & Sweets',
    growthMetric: '+38% Faster Rotation',
    tagline: 'Authentic Indian snacks in rapid replenishment',
    logoText: "HALDIRAM'S",
    accentColor: '#D97706',
  },
  {
    id: 'brand-coca-cola',
    name: 'Coca-Cola',
    category: 'Beverages',
    growthMetric: '20,000+ Outlets Served',
    tagline: 'Chilled beverages supplied just-in-time',
    logoText: 'COCA-COLA',
    accentColor: '#DC2626',
  },
  {
    id: 'brand-bisleri',
    name: 'Bisleri',
    category: 'Packaged Drinking Water',
    growthMetric: 'Zero Stockouts in Summer',
    tagline: 'Pure trusted mineral water on demand',
    logoText: 'BISLERI',
    accentColor: '#0284C7',
  },
  {
    id: 'brand-sting',
    name: 'Sting Energy',
    category: 'Energy Drinks',
    growthMetric: '4.8x Volume Growth',
    tagline: 'High-frequency Kirana beverage favorite',
    logoText: 'STING',
    accentColor: '#B91C1C',
  },
  {
    id: 'brand-mentos',
    name: 'Mentos',
    category: 'Mints & Candies',
    growthMetric: 'Immediate Shelf Placements',
    tagline: 'Impulse confectionery for front-counter sales',
    logoText: 'MENTOS',
    accentColor: '#2563EB',
  },
  {
    id: 'brand-kurkure',
    name: 'Kurkure',
    category: 'Snacks & Namkeen',
    growthMetric: '+35% Margin Visibility',
    tagline: 'Spicy tea-time snacking for every neighbourhood',
    logoText: 'KURKURE',
    accentColor: '#EA580C',
  },
  {
    id: 'brand-uncle-chipps',
    name: 'Uncle Chipps',
    category: 'Wafers & Chips',
    growthMetric: '99.4% On-Time Delivery',
    tagline: 'Classic potato chips loved for generations',
    logoText: 'UNCLE CHIPPS',
    accentColor: '#16A34A',
  },
  {
    id: 'brand-mountain-dew',
    name: 'Mountain Dew',
    category: 'Carbonated Drinks',
    growthMetric: '30-minute replenishment',
    tagline: 'High-velocity summer hydration',
    logoText: 'MTN DEW',
    accentColor: '#65A30D',
  },
  {
    id: 'brand-pass-pass',
    name: 'Pass Pass',
    category: 'Mouth Fresheners',
    growthMetric: 'Counter-top ubiquity',
    tagline: 'Herbal mouth fresheners in every paan shop',
    logoText: 'PASS PASS',
    accentColor: '#059669',
  },
]
