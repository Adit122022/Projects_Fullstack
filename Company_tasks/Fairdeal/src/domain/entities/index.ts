export interface Product {
  id: string
  name: string
  brand: string
  category: string
  packSize: string
  mrp: number
  wholesalePrice: number
  marginPercentage: number
  image: string
  inStock: boolean
  minOrderQty: number
  isBestSeller?: boolean
  isFeatured?: boolean
}

export interface Category {
  id: string
  name: string
  slug: string
  icon: string
  itemCount: number
  description: string
  color: string
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface PartnerInquiry {
  companyName: string
  contactPerson: string
  email: string
  phone: string
  category: string
  city: string
  message: string
}

export interface JobPosting {
  id: string
  title: string
  department: 'Technology' | 'Product' | 'Operations' | 'Growth & Sales' | 'Finance'
  location: string
  employmentType: 'Full-time' | 'Contract'
  experience: string
  overview: string
  responsibilities: string[]
  requirements: string[]
  postedDate: string
}

export interface DeliveryPartnerTier {
  id: string
  title: string
  vehicleType: 'Bike' | 'Auto' | 'EV Loader'
  earningsMonth: string
  icon: string
  highlights: string[]
  recommendedFor: string
}

export interface RetailerTestimonial {
  id: string
  name: string
  storeName: string
  location: string
  quote: string
  highlight: string
  salesGrowth: string
  rating: number
  image: string
}

export interface CompanyLeader {
  id: string
  name: string
  role: string
  bio: string
  linkedinUrl: string
  initials: string
}

export interface FAIRValue {
  key: 'F' | 'A' | 'I' | 'R'
  title: string
  tagline: string
  description: string
}
