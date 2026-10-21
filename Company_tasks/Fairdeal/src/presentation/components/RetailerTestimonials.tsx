import React, { useState } from 'react'
import { ChevronLeft, ChevronRight, Quote, Star, TrendingUp } from 'lucide-react'
import { MOCK_TESTIMONIALS } from '@/infrastructure/mock-data/mockTestimonials'
import { cn } from '@/shared/utils/cn'

export const RetailerTestimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const current = MOCK_TESTIMONIALS[activeIndex]

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % MOCK_TESTIMONIALS.length)
  }

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + MOCK_TESTIMONIALS.length) % MOCK_TESTIMONIALS.length)
  }

  return (
    <section className="w-full py-16 lg:py-24 bg-white border-b border-gray-100 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#111827] tracking-tight">
              Voices from the <span className="text-[#2959A3]">Shop Floor</span>
            </h2>
            <p className="text-sm sm:text-base text-[#6F6F6F] mt-2 max-w-xl">
              20,000+ retailers trust Fairdeal every day across Delhi-NCR. Here is what they have to say:
            </p>
          </div>

          {/* Slider Navigation Buttons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous retailer story"
              className="w-11 h-11 rounded-full border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center text-gray-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2959A3]"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next retailer story"
              className="w-11 h-11 rounded-full border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center text-gray-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2959A3]"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Featured Testimonial Hero Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#F3F8FF] rounded-3xl p-6 sm:p-10 border border-[#D4E3FC]">
          {/* Left Column: Owner Photo & Quick Highlights */}
          <div className="lg:col-span-5 flex flex-col items-center sm:items-start gap-4">
            <div className="relative w-full max-w-xs sm:max-w-sm rounded-2xl overflow-hidden aspect-4/3 shadow-md bg-gray-100">
              <img
                src={current.image}
                alt={current.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/95 backdrop-blur-xs text-[#2959A3] text-xs font-bold shadow-xs flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                <span>{current.salesGrowth}</span>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-[#111827]">{current.name}</h3>
              <p className="text-xs font-semibold text-[#2959A3]">
                {current.storeName} • {current.location}
              </p>
            </div>
          </div>

          {/* Right Column: Verified Quote & Rating */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="flex items-center gap-1 text-amber-500">
              {[...Array(current.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
              <span className="text-xs font-bold text-gray-600 ml-2">5.0 Verified Kirana Store Partner</span>
            </div>

            <div className="relative">
              <Quote className="w-10 h-10 text-[#2959A3]/20 mb-2" />
              <blockquote className="text-lg sm:text-2xl font-semibold text-[#111827] leading-relaxed">
                “{current.quote}”
              </blockquote>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-gray-200/80 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                  Core Business Impact
                </span>
                <span className="text-sm font-bold text-emerald-700">
                  {current.highlight}
                </span>
              </div>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                Verified Customer
              </span>
            </div>
          </div>
        </div>

        {/* Thumbnail Selector Dots */}
        <div className="flex justify-center gap-3 mt-8">
          {MOCK_TESTIMONIALS.map((t, idx) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveIndex(idx)}
              aria-label={`Select testimonial by ${t.name}`}
              className={cn(
                'h-2.5 rounded-full transition-all duration-300',
                idx === activeIndex
                  ? 'w-10 bg-[#2959A3]'
                  : 'w-2.5 bg-gray-300 hover:bg-gray-400'
              )}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
