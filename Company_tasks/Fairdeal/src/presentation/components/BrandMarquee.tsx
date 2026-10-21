import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { MOCK_BRANDS } from '@/infrastructure/mock-data/mockBrands'

export const BrandMarquee: React.FC = () => {
  // Double array for seamless loop
  const brandsRow1 = [...MOCK_BRANDS, ...MOCK_BRANDS]
  const brandsRow2 = [...MOCK_BRANDS.slice().reverse(), ...MOCK_BRANDS.slice().reverse()]

  return (
    <section className="w-full py-16 lg:py-24 bg-white overflow-hidden border-b border-gray-100">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16 mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#111827] tracking-tight">
              Brands That <span className="text-[#2959A3]">Chose Fairdeal</span>
            </h2>
            <p className="text-sm sm:text-base text-[#6F6F6F] mt-2 max-w-xl">
              Put your products in front of 20,000+ active retailers through our rapid last-mile distribution network.
            </p>
          </div>

          <Link
            to="/brand-partner"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#2959A3] hover:text-[#1E437C] group shrink-0"
          >
            <span>Explore Brand Partnership</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Marquee Container with subtle gradient masks */}
      <div className="relative w-full overflow-hidden">
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        {/* Row 1 (Moving Left) */}
        <div className="flex gap-4 animate-marquee-left mb-4 hover:[animation-play-state:paused]">
          {brandsRow1.map((brand, idx) => (
            <div
              key={`${brand.id}-row1-${idx}`}
              className="flex items-center gap-3.5 px-6 py-4 rounded-2xl bg-[#F9FAFB] border border-gray-200/80 shrink-0 hover:border-[#2959A3]/40 hover:bg-[#F3F8FF] transition-all shadow-2xs"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs text-white shadow-xs"
                style={{ backgroundColor: brand.accentColor }}
              >
                {brand.logoText.slice(0, 3)}
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#111827] leading-tight">
                  {brand.name}
                </h3>
                <p className="text-[11px] font-semibold text-emerald-600">
                  {brand.growthMetric}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Row 2 (Moving Right) */}
        <div className="flex gap-4 animate-marquee-right hover:[animation-play-state:paused]">
          {brandsRow2.map((brand, idx) => (
            <div
              key={`${brand.id}-row2-${idx}`}
              className="flex items-center gap-3.5 px-6 py-4 rounded-2xl bg-[#F9FAFB] border border-gray-200/80 shrink-0 hover:border-[#2959A3]/40 hover:bg-[#F3F8FF] transition-all shadow-2xs"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs text-white shadow-xs"
                style={{ backgroundColor: brand.accentColor }}
              >
                {brand.logoText.slice(0, 3)}
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#111827] leading-tight">
                  {brand.name}
                </h3>
                <p className="text-[11px] font-semibold text-[#2959A3]">
                  {brand.category}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Verified Banner Bar */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16 mt-10">
        <div className="p-4 sm:p-5 rounded-2xl bg-[#363E51] text-white flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-md">
          <p className="text-sm font-medium">
            <strong className="text-white font-bold">25+ national brands</strong> grew their retailer reach by{' '}
            <strong className="text-[#63C7ED] font-bold">38% in just 4 months</strong> on Fairdeal.
          </p>
          <Link
            to="/brand-partner"
            className="text-xs font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 px-4 py-2 rounded-xl transition-colors whitespace-nowrap"
          >
            Sell with us &rarr;
          </Link>
        </div>
      </div>
    </section>
  )
}
