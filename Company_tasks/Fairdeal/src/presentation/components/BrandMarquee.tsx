import React from 'react'
import { Link } from 'react-router-dom'

export const BrandMarquee: React.FC = () => {
  // Authentic FMCG brand list from the live Fairdeal website
  const brandsRow1 = [
    { name: 'Parle', color: 'from-amber-500/10 to-red-500/10', text: 'PARLE', category: 'Biscuits & Confectionery' },
    { name: 'Hell Energy', color: 'from-red-600/10 to-stone-900/10', text: 'HELL', category: 'Energy Drinks' },
    { name: "Haldiram's", color: 'from-yellow-500/10 to-red-600/10', text: "HALDIRAM'S", category: 'Namkeen & Sweets' },
    { name: 'Mentos', color: 'from-cyan-500/10 to-blue-600/10', text: 'MENTOS', category: 'Candy & Mints' },
    { name: 'Mountain Dew', color: 'from-lime-500/10 to-emerald-600/10', text: 'DEW', category: 'Soft Drinks' },
    { name: 'Chupa Chups', color: 'from-rose-500/10 to-amber-500/10', text: 'CHUPA CHUPS', category: 'Lollipops' },
  ]

  const brandsRow2 = [
    { name: 'Pass Pass', color: 'from-green-600/10 to-emerald-700/10', text: 'PASS PASS', category: 'Mouth Fresheners' },
    { name: 'Uncle Chipps', color: 'from-yellow-400/10 to-amber-600/10', text: 'UNCLE CHIPPS', category: 'Potato Chips' },
    { name: 'Bisleri', color: 'from-teal-500/10 to-cyan-600/10', text: 'BISLERI', category: 'Mineral Water' },
    { name: 'Sting Energy', color: 'from-red-600/10 to-rose-700/10', text: 'STING', category: 'Energy Drinks' },
    { name: 'Coca-Cola', color: 'from-red-700/10 to-rose-900/10', text: 'COCA-COLA', category: 'Beverages' },
    { name: 'Kurkure', color: 'from-amber-600/10 to-orange-700/10', text: 'KURKURE', category: 'Snacks' },
  ]

  return (
    <section className="relative w-full py-16 lg:py-[80px] bg-white font-satoshi overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-[80px]">
        {/* Section Title */}
        <div className="mb-8 lg:mb-10">
          <h2 className="font-satoshi font-bold text-2xl sm:text-3xl lg:text-[32px] leading-snug text-[#575757] mb-3">
            <span className="text-[#2959A3] inline-block relative pb-2.5">
              Brands
              <span className="absolute bottom-0 left-0 right-0 h-[4px] bg-[#7F9BC8] rounded-full" />
            </span>{' '}
            That Chose Fairdeal
          </h2>
          <p className="font-satoshi font-normal text-base sm:text-[18px] text-[#6F6F6F] max-w-2xl">
            Put your products in front of 94533+ active retailers through our last-mile distribution network.
          </p>
        </div>

        {/* Brand Container Box */}
        <div className="bg-white rounded-[20px] border border-gray-100 shadow-sm overflow-hidden">
          {/* Marquee Rows with Edge Fade Masks */}
          <div
            className="flex flex-col gap-4 py-8 overflow-hidden"
            style={{
              maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
              WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
            }}
          >
            {/* Row 1 Marquee */}
            <div className="flex gap-4 overflow-hidden select-none">
              <div className="flex animate-marquee-left gap-4 whitespace-nowrap will-change-transform">
                {[...brandsRow1, ...brandsRow1].map((brand, idx) => (
                  <div
                    key={`r1-${idx}`}
                    className="flex flex-col items-center justify-center w-[150px] sm:w-[170px] h-[90px] sm:h-[96px] bg-[#F9FAFB] rounded-[16px] border border-gray-100/80 px-4 shrink-0 transition-transform hover:scale-105"
                  >
                    <span className="font-satoshi font-black text-sm sm:text-base tracking-wider text-[#363E51]">
                      {brand.text}
                    </span>
                    <span className="text-[10px] text-gray-500 font-medium mt-1 truncate max-w-full">
                      {brand.category}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Row 2 Marquee (Reverse) */}
            <div className="flex gap-4 overflow-hidden select-none">
              <div className="flex animate-marquee-right gap-4 whitespace-nowrap will-change-transform">
                {[...brandsRow2, ...brandsRow2].map((brand, idx) => (
                  <div
                    key={`r2-${idx}`}
                    className="flex flex-col items-center justify-center w-[150px] sm:w-[170px] h-[90px] sm:h-[96px] bg-[#F9FAFB] rounded-[16px] border border-gray-100/80 px-4 shrink-0 transition-transform hover:scale-105"
                  >
                    <span className="font-satoshi font-black text-sm sm:text-base tracking-wider text-[#363E51]">
                      {brand.text}
                    </span>
                    <span className="text-[10px] text-gray-500 font-medium mt-1 truncate max-w-full">
                      {brand.category}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Authentic Dark Bottom Strip */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2.5 py-4 px-4 bg-[#363E51] text-white text-center">
            <p className="font-satoshi text-xs sm:text-[14px] text-white">
              <span className="font-bold">25+ brands</span> grew their retailer reach by{' '}
              <span className="font-bold">38% in just 4 months.</span>
            </p>
            <Link
              to="/brand-partner"
              className="font-satoshi font-semibold text-xs sm:text-[14px] text-[#63C7ED] hover:underline"
            >
              Sell with us &gt;
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
