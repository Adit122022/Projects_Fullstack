import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Target, Compass, ExternalLink, ArrowRight, HeartHandshake, ShieldCheck, Zap, Sparkles } from 'lucide-react'
import { MOCK_LEADERS, MOCK_FAIR_VALUES } from '@/infrastructure/mock-data/mockLeaders'
import { Button } from '@/presentation/ui/Button'
import { Badge } from '@/presentation/ui/Badge'
import { cn } from '@/shared/utils/cn'

export const AboutUsPage: React.FC = () => {
  const [activeValueKey, setActiveValueKey] = useState<'F' | 'A' | 'I' | 'R'>('F')
  const activeValue = MOCK_FAIR_VALUES.find((v) => v.key === activeValueKey)!

  const mosaicImages = [
    {
      title: 'Dark Store Operations',
      tag: 'Tech-powered picking',
      src: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Kirana Retail Partners',
      tag: 'In Every Lane',
      src: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Speed & Dispatch',
      tag: '60 Min Delivery',
      src: 'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Team Collaboration',
      tag: 'Collaboration First',
      src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80',
    },
  ]

  return (
    <div className="w-full flex flex-col bg-white">
      {/* Header Hero Section */}
      <section className="relative w-full py-16 lg:py-24 bg-gradient-to-b from-[#F3F8FF] to-white border-b border-gray-100 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16 text-center">
          <Badge variant="primary" size="md" className="mb-4">
            About Fairdeal.market
          </Badge>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#111827] tracking-tight leading-[1.15] max-w-4xl mx-auto">
            Driven by Customers, <br />
            <span className="text-[#2959A3]">Enhanced by Technology.</span>
          </h1>

          <p className="text-base sm:text-xl text-[#3F3F3F] mt-5 max-w-2xl mx-auto leading-relaxed">
            We are building India's smartest & fastest B2B Wholesale platform — one store at a time.
          </p>

          <p className="text-sm font-semibold text-[#3B3F59] mt-3 italic">
            No middlemen. No complexity. No waiting till tomorrow.
          </p>

          {/* Culture Mosaic Gallery */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-14">
            {mosaicImages.map((img) => (
              <div
                key={img.title}
                className="group relative rounded-3xl overflow-hidden aspect-4/3 bg-gray-100 shadow-md border border-gray-100"
              >
                <img
                  src={img.src}
                  alt={img.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4 text-left">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#63C7ED]">
                    {img.tag}
                  </span>
                  <h3 className="text-xs sm:text-sm font-bold text-white mt-0.5">
                    {img.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Narrative Section: What is Fairdeal */}
      <section className="w-full py-16 lg:py-20 bg-white border-b border-gray-100">
        <div className="max-w-[1000px] mx-auto px-6 sm:px-8">
          <div className="p-8 sm:p-12 rounded-3xl bg-[#F3F8FF] border border-[#D4E3FC]">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111827] mb-4">
              Built for India's 13 Million Kirana Store Owners
            </h2>
            <p className="text-base sm:text-lg text-[#3F3F3F] leading-relaxed">
              <strong className="text-[#2959A3] font-bold">Fairdeal.market</strong> is a B2B quick commerce
              platform built specifically for India’s neighborhood Kirana stores. We deliver 1,000+ FMCG
              products at wholesale prices in under 60 minutes, so local retailers can stock smarter,
              spend less, and grow faster.
            </p>
            <p className="text-sm text-gray-600 mt-4 leading-relaxed">
              For decades, local retailers were forced to tie up excessive capital in monthly bulk orders,
              deal with dozens of fragmented sales agents, and bear the brunt of stockouts. By redesigning
              the supply chain with hyper-local micro-fulfillment centers, Fairdeal empowers Kirana owners
              with the same speed, pricing, and assortment benefits enjoyed by large supermarket chains.
            </p>
          </div>
        </div>
      </section>

      {/* Vision and Mission Cards */}
      <section className="w-full py-16 lg:py-20 bg-white border-b border-gray-100">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Vision Card */}
            <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#F3F8FF] to-blue-50/40 border border-[#D4E3FC] flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#2959A3] text-white flex items-center justify-center mb-6 shadow-sm">
                  <Compass className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-[#2959A3] uppercase tracking-wider block mb-1">
                  Long-Term Horizon
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#111827] mb-4">
                  Our Vision
                </h3>
                <blockquote className="text-xl sm:text-2xl font-bold text-[#111827] border-l-3 border-[#2959A3] pl-4 italic">
                  “To be in every shopping bag of the world.”
                </blockquote>
              </div>
              <p className="text-xs text-gray-500 mt-8 pt-4 border-t border-blue-100">
                Empowering neighborhood retailers to remain the primary shopping touchpoint for everyday consumers.
              </p>
            </div>

            {/* Mission Card */}
            <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#363E51] to-[#252B3A] text-white border border-gray-700 flex flex-col justify-between shadow-xl">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#63C7ED] text-[#0A2540] flex items-center justify-center mb-6 shadow-sm">
                  <Target className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-[#63C7ED] uppercase tracking-wider block mb-1">
                  Everyday Commitment
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
                  Our Mission
                </h3>
                <blockquote className="text-xl sm:text-2xl font-bold text-white border-l-3 border-[#63C7ED] pl-4 italic">
                  “To be the largest e-commerce company on the planet.”
                </blockquote>
              </div>
              <p className="text-xs text-gray-400 mt-8 pt-4 border-t border-white/10">
                Building world-class logistics infrastructure, inventory intelligence, and supplier connections tailored for Bharat.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAIR Values Interactive Section */}
      <section className="w-full py-16 lg:py-24 bg-[#F8FAFC] border-b border-gray-100">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold text-[#2959A3] uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full border border-blue-100 inline-block mb-3">
              Core Principles
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111827] tracking-tight">
              Our <span className="text-[#2959A3]">FAIR Values</span>
            </h2>
            <p className="text-sm sm:text-base text-[#6F6F6F] mt-2">
              The internal operating compass that shapes how we build technology, support partners, and scale operations.
            </p>
          </div>

          {/* Interactive Value Switcher Pill Tabs */}
          <div className="flex justify-center gap-2 sm:gap-4 mb-10">
            {MOCK_FAIR_VALUES.map((val) => (
              <button
                key={val.key}
                type="button"
                onClick={() => setActiveValueKey(val.key)}
                className={cn(
                  'flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-extrabold transition-all duration-200 cursor-pointer',
                  activeValueKey === val.key
                    ? 'bg-[#2959A3] text-white shadow-md scale-105'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                )}
              >
                <span className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center text-xs">
                  {val.key}
                </span>
                <span>{val.title}</span>
              </button>
            ))}
          </div>

          {/* Active Value Spotlight Card */}
          <div className="max-w-3xl mx-auto p-8 sm:p-12 rounded-3xl bg-white border border-gray-200/80 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 text-8xl font-black text-gray-100 select-none pointer-events-none">
              {activeValue.key}
            </div>

            <div className="relative z-10 flex flex-col gap-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#2959A3]">
                Value Principle {activeValue.key}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#111827]">
                {activeValue.title}
              </h3>
              <p className="text-sm font-bold text-gray-500 italic">
                {activeValue.tagline}
              </p>
              <p className="text-base text-gray-700 leading-relaxed pt-2">
                {activeValue.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="w-full py-16 lg:py-24 bg-white border-b border-gray-100">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-[#2959A3] uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full border border-blue-100 inline-block mb-3">
              Leadership Pedigree
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111827] tracking-tight">
              Meet the <span className="text-[#2959A3]">Founding Team</span>
            </h2>
            <p className="text-sm sm:text-base text-[#6F6F6F] mt-2">
              The technologists and supply chain leaders engineering India's fastest B2B wholesale platform.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {MOCK_LEADERS.map((leader) => (
              <div
                key={leader.id}
                className="group p-6 rounded-3xl bg-[#F3F8FF] border border-[#D4E3FC] flex flex-col justify-between hover:shadow-lg transition-all"
              >
                <div>
                  <div className="w-16 h-16 rounded-2xl bg-[#2959A3] text-white flex items-center justify-center font-black text-xl mb-4 shadow-sm group-hover:scale-105 transition-transform">
                    {leader.initials}
                  </div>
                  <h3 className="text-lg font-extrabold text-[#111827]">
                    {leader.name}
                  </h3>
                  <p className="text-xs font-bold text-[#2959A3] mt-0.5">
                    {leader.role}
                  </p>
                  <p className="text-xs text-gray-600 mt-3 leading-relaxed">
                    {leader.bio}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-blue-100 flex items-center justify-between">
                  <a
                    href={leader.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0A66C2] hover:underline"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3m1.37 9.74v-8.37H5.09v8.37z" />
                    </svg>
                    <span>LinkedIn Profile</span>
                    <ExternalLink className="w-3 h-3 opacity-60" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="w-full py-16 bg-[#363E51] text-white">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-8 text-center flex flex-col items-center gap-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold">
            Ready to Build or Partner with Fairdeal?
          </h2>
          <p className="text-sm text-gray-300 max-w-xl">
            We are actively expanding across Delhi-NCR and hiring exceptional engineers, operations leads, and account managers.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/careers">
              <Button variant="accent" size="lg" className="font-bold rounded-xl">
                Explore Open Careers
              </Button>
            </Link>
            <Link to="/brand-partner">
              <Button variant="outline" size="lg" className="text-white border-white hover:bg-white/10 rounded-xl">
                Become a Brand Partner
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
