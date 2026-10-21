import React from 'react'
import { Link } from 'react-router-dom'
import { Package, Zap, TrendingUp, ArrowRight, ShieldCheck } from 'lucide-react'
import { HeroSection } from '@/presentation/components/HeroSection'
import { LiveStatsBar } from '@/presentation/components/LiveStatsBar'
import { BrandMarquee } from '@/presentation/components/BrandMarquee'
import { CategoryBrowser } from '@/presentation/components/CategoryBrowser'
import { RetailerTestimonials } from '@/presentation/components/RetailerTestimonials'
import { DeliveryTeaser } from '@/presentation/components/DeliveryTeaser'
import { InvestorSection } from '@/presentation/components/InvestorSection'
import { Accordion } from '@/presentation/ui/Accordion'
import { Button } from '@/presentation/ui/Button'

export const HomePage: React.FC = () => {
  const quickFaqs = [
    {
      id: 'faq-delivery-time',
      question: 'How does Fairdeal deliver wholesale FMCG in under 60 minutes?',
      answer:
        'Fairdeal operates hyper-local dark store fulfillment centers strategically placed within 3–5km of high-density retail clusters. When a Kirana store places an order, automated pickers stage the goods in under 10 minutes, and dedicated last-mile riders dispatch immediately.',
    },
    {
      id: 'faq-margins',
      question: 'Are wholesale prices and retailer margins transparent?',
      answer:
        'Yes! Fairdeal sources directly from national FMCG brands like Parle, Coca-Cola, Haldiram’s, and Bisleri. Retailers enjoy direct distributor pricing with up to 15%–25% gross margins, allowing small shop owners to compete on level terms with modern trade supermarkets.',
    },
    {
      id: 'faq-min-order',
      question: 'Is there a huge minimum order value required?',
      answer:
        'No. Traditional distributors force shop owners to buy ₹30,000–₹50,000 bulk stock per brand. Fairdeal allows Kirana owners to buy in small, flexible unit bundles (e.g. ₹3,000–₹5,000 daily), freeing up crucial working capital and eliminating stock expiry risk.',
    },
  ]

  return (
    <div className="w-full flex flex-col">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Live Key Stats */}
      <LiveStatsBar />

      {/* 3. Core Sourcing Value Propositions */}
      <section className="w-full py-16 lg:py-24 bg-white border-b border-gray-100">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-[#2959A3] uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full border border-blue-100 inline-block mb-3">
              Built for Bharat's Retailers
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111827] tracking-tight">
              Everything Your Shop Needs, <span className="text-[#2959A3]">All in One Place</span>
            </h2>
            <p className="text-sm sm:text-base text-[#6F6F6F] mt-3">
              Traditional wholesale requires visiting multiple mandis and waiting days for distributors.
              Fairdeal brings the entire FMCG supply chain straight to your counter.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Value Card 1 */}
            <div className="p-8 rounded-3xl bg-[#F3F8FF] border border-[#D4E3FC] flex flex-col items-start hover:shadow-lg transition-all">
              <div className="w-14 h-14 rounded-2xl bg-[#2959A3] text-white flex items-center justify-center mb-6 shadow-md">
                <Package className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-[#111827] mb-2">
                Extensive Product Selection
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                From household essentials and staples to cold beverages, confectionery, and personal care.
                Access 1,000+ top FMCG brands directly from verified manufacturers.
              </p>
              <div className="mt-6 flex items-center gap-2 text-xs font-bold text-[#2959A3]">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>100% Genuine Sealed Stock</span>
              </div>
            </div>

            {/* Value Card 2 */}
            <div className="p-8 rounded-3xl bg-white border border-gray-200 shadow-md flex flex-col items-start hover:shadow-xl transition-all relative overflow-hidden">
              <div className="absolute top-0 right-0 px-4 py-1 bg-[#63C7ED] text-[#0A2540] font-black text-[11px] rounded-bl-2xl">
                FLAGSHIP SLA
              </div>
              <div className="w-14 h-14 rounded-2xl bg-[#0284C7] text-white flex items-center justify-center mb-6 shadow-md">
                <Zap className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-[#111827] mb-2">
                60-Minute Rapid Delivery
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Get the products your customers demand right now. Avoid lost sales during afternoon and
                evening customer rush hours with our guaranteed under-60-minute dispatch.
              </p>
              <div className="mt-6 flex items-center gap-2 text-xs font-bold text-[#0284C7]">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Real-Time Rider GPS Tracking</span>
              </div>
            </div>

            {/* Value Card 3 */}
            <div className="p-8 rounded-3xl bg-[#F3F8FF] border border-[#D4E3FC] flex flex-col items-start hover:shadow-lg transition-all">
              <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center mb-6 shadow-md">
                <TrendingUp className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-[#111827] mb-2">
                Better Margins, Better Cashflow
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Order at true wholesale prices, rotate your cash 6x faster, and avoid heavy capital lockup.
                Retain up to 22% higher store profits compared to unorganized distributors.
              </p>
              <div className="mt-6 flex items-center gap-2 text-xs font-bold text-emerald-700">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Daily Small-Ticket Reordering</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Brand Marquee Showcase */}
      <BrandMarquee />

      {/* 5. Product Category Browser */}
      <CategoryBrowser />

      {/* 6. Retailer Testimonials */}
      <RetailerTestimonials />

      {/* 7. Delivery Partner Recruitment Teaser */}
      <DeliveryTeaser />

      {/* 8. Institutional Credibility & Investors */}
      <InvestorSection />

      {/* 9. Quick FAQs Preview */}
      <section className="w-full py-16 lg:py-24 bg-white">
        <div className="max-w-[1000px] mx-auto px-6 sm:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight">
              Frequently Asked <span className="text-[#2959A3]">Questions</span>
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              Everything you need to know about Kirana wholesale ordering and 60-minute delivery.
            </p>
          </div>

          <Accordion items={quickFaqs} defaultOpenIndex={0} />

          <div className="text-center mt-10">
            <Link to="/faq">
              <Button variant="outline" size="md">
                <span>View All Frequently Asked Questions</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
