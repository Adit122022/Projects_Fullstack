import React from 'react'
import {
  Users,
  Truck,
  BarChart3,
  CreditCard,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import { BrandMarquee } from '@/presentation/components/BrandMarquee'
import { PartnerInquiryForm } from '@/presentation/components/PartnerInquiryForm'
import { Accordion } from '@/presentation/ui/Accordion'
import { Badge } from '@/presentation/ui/Badge'

export const BrandPartnerPage: React.FC = () => {
  const brandFaqs = [
    {
      id: 'brand-faq-types',
      question: 'What types of products can I list on Fairdeal.market?',
      answer:
        'We onboard packaged FMCG goods, cold beverages, carbonated drinks, confectionery, snacks, personal care, oral hygiene, staples, and packaged goods. If your SKU fits everyday retail Kirana shelves, we can distribute it.',
    },
    {
      id: 'brand-faq-live',
      question: 'How soon will my products go live on the retailer app?',
      answer:
        'Once legal verification, GST details, and master catalog data are finalized, your SKUs are digitized, staged in our regional dark stores, and made live to 20,000+ Kirana owners within 2 to 3 business days.',
    },
    {
      id: 'brand-faq-logistics',
      question: 'Do brand partners need to manage last-mile Kirana logistics?',
      answer:
        'No. Brand partners simply supply bulk inventory to our central warehouse hubs. Fairdeal takes full ownership of picking, packing, staging, invoicing, last-mile rider dispatch, and cash collection.',
    },
    {
      id: 'brand-faq-data',
      question: 'Can I track real-time product sales and stock velocities?',
      answer:
        'Yes! Brands receive dedicated access to our partner analytics dashboard with hourly order volume, regional ward-level sell-through, retailer re-order rates, and inventory velocity insights.',
    },
    {
      id: 'brand-faq-payouts',
      question: 'What are the payment settlement terms for suppliers?',
      answer:
        'We adhere to transparent, contractual weekly or bi-weekly automated bank settlements with zero deductions or hidden marketing surcharges.',
    },
  ]

  const uspItems = [
    {
      icon: Users,
      title: 'Retailer Network',
      description:
        'Get instant, friction-free access to 20,000+ active Kirana stores and a retail network expanding across North India every month.',
    },
    {
      icon: Truck,
      title: 'Seamless Supply Chain',
      description:
        'From micro-warehousing in Sector 67 to under-60-minute last-mile delivery, we handle the fulfillment so you can focus on production.',
    },
    {
      icon: BarChart3,
      title: 'Real-Time Sales Data',
      description:
        'Track SKU velocity, monitor repeat-order behaviors, and run targeted retailer trade schemes with actionable live analytics.',
    },
    {
      icon: CreditCard,
      title: 'On-Time Payouts',
      description:
        'Predictable cash flow, transparent reconciliations, and automated weekly bank disbursements with zero surprise deductions.',
    },
  ]

  return (
    <div className="w-full flex flex-col bg-white">
      {/* Brand Hero */}
      <section className="relative w-full py-16 lg:py-24 bg-gradient-to-b from-[#F3F8FF] to-white border-b border-gray-100 text-center">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16">
          <Badge variant="primary" size="md" className="mb-4">
            B2B FMCG Brand Distribution
          </Badge>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#111827] tracking-tight leading-[1.15]">
            Sell on <span className="text-[#2959A3]">Fairdeal.market</span>
          </h1>

          <p className="text-lg sm:text-2xl text-[#3F3F3F] mt-4 font-normal max-w-2xl mx-auto">
            Reach thousands of retailers. Build real, high-velocity distribution.
          </p>

          <div className="mt-8 p-4 sm:p-5 rounded-2xl bg-[#363E51] text-white max-w-2xl mx-auto shadow-md">
            <p className="text-sm sm:text-base font-medium">
              Join India’s fastest-growing B2B platform and bring your products directly to Kiranas, paan stores, and convenience counters — with seamless logistics and zero hassle.
            </p>
          </div>
        </div>
      </section>

      {/* Marquee ticker of partner brands */}
      <BrandMarquee />

      {/* Why Sell With Us USPs */}
      <section className="w-full py-16 lg:py-24 bg-white border-b border-gray-100">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111827] tracking-tight">
              Why Sell with <span className="text-[#2959A3]">Fairdeal?</span>
            </h2>
            <p className="text-sm sm:text-base text-[#6F6F6F] mt-2">
              Transform your FMCG supply chain from slow, multi-layered distribution into a modern quick-commerce engine.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {uspItems.map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.title}
                  className="p-8 rounded-3xl bg-[#F3F8FF] border border-[#D4E3FC] flex flex-col items-start hover:shadow-lg transition-all"
                >
                  <div className="w-14 h-14 rounded-2xl bg-[#2959A3] text-white flex items-center justify-center mb-6 shadow-sm">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-lg font-bold text-[#111827] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Onboarding Workflow & Form */}
      <section className="w-full py-16 lg:py-24 bg-[#F8FAFC] border-b border-gray-100">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left: How Brand Onboarding Works */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <span className="text-xs font-bold uppercase tracking-wider text-[#2959A3]">
                Simple 3-Step Process
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-[#111827] leading-tight">
                Get Your SKUs Live in <br />
                <span className="text-[#2959A3]">Under 3 Days.</span>
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                We remove the traditional months-long distributor bureaucracy. Connect directly with our category management team, align wholesale rate-cards, and ship directly to our dark stores.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-gray-200 shadow-2xs">
                  <div className="w-8 h-8 rounded-xl bg-[#2959A3] text-white flex items-center justify-center font-bold text-sm shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#111827]">Submit Brand Profile</h4>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Share your product catalog, GST documentation, and preferred wholesale supply volumes.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-gray-200 shadow-2xs">
                  <div className="w-8 h-8 rounded-xl bg-[#2959A3] text-white flex items-center justify-center font-bold text-sm shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#111827]">Warehouse Staging</h4>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Dispatch pallets to our Gurugram micro-fulfillment center for barcode tagging and quality intake.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-gray-200 shadow-2xs">
                  <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#111827]">Live on 20,000+ Retailer Apps</h4>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Your products appear prominently in search and category carousels with 60-minute delivery.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Partner Inquiry Form */}
            <div className="lg:col-span-7">
              <PartnerInquiryForm />
            </div>
          </div>
        </div>
      </section>

      {/* Brand FAQs */}
      <section className="w-full py-16 lg:py-24 bg-white">
        <div className="max-w-[1000px] mx-auto px-6 sm:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight">
              Brand Partner <span className="text-[#2959A3]">FAQs</span>
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              Common questions from national and regional FMCG manufacturers partnering with Fairdeal.
            </p>
          </div>

          <Accordion items={brandFaqs} defaultOpenIndex={0} />
        </div>
      </section>
    </div>
  )
}
