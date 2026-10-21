import React from 'react'
import { HeroSection } from '@/presentation/components/HeroSection'
import { LiveStatsBar } from '@/presentation/components/LiveStatsBar'
import { CategoryBrowser } from '@/presentation/components/CategoryBrowser'
import { BrandMarquee } from '@/presentation/components/BrandMarquee'
import { DeliverSection } from '@/presentation/components/DeliverSection'
import { RetailerTestimonials } from '@/presentation/components/RetailerTestimonials'
import { InvestorSection } from '@/presentation/components/InvestorSection'
import { CareersBanner } from '@/presentation/components/CareersBanner'

export const HomePage: React.FC = () => {
  return (
    <div className="w-full flex flex-col font-satoshi">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Live Stats Bar */}
      <LiveStatsBar />

      {/* 3. Everything Your Shop Needs (3-Card Grid) */}
      <CategoryBrowser />

      {/* 4. Brands That Chose Fairdeal */}
      <BrandMarquee />

      {/* 5. Deliver With Us Card */}
      <DeliverSection />

      {/* 6. Voices from the Shop Floor */}
      <RetailerTestimonials />

      {/* 7. Our Investors */}
      <InvestorSection />

      {/* 8. Careers Banner */}
      <CareersBanner />
    </div>
  )
}
