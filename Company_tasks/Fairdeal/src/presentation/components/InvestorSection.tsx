import React from 'react'

export const InvestorSection: React.FC = () => {
  const investors = [
    { name: 'British International Investment', tag: 'BII' },
    { name: 'Incubate Fund', tag: 'Incubate Fund' },
    { name: 'WaterBridge Ventures', tag: 'WaterBridge' },
    { name: 'Shiprocket', tag: 'Shiprocket' },
    { name: 'Alteria Capital', tag: 'Alteria Capital' },
    { name: 'HEM Holdings', tag: 'HEM' },
    { name: 'Real Time Accelerator', tag: 'Real Time' },
    { name: 'State Bank of India', tag: 'SBI' },
    { name: 'Lead Invest', tag: 'Lead Invest' },
  ]

  return (
    <section className="w-full bg-[#EEF3FB] py-14 lg:py-20 px-6 sm:px-10 lg:px-[80px] font-satoshi">
      <div className="max-w-[1440px] mx-auto">
        {/* Section Heading */}
        <div className="mb-10 lg:mb-12">
          <h2 className="font-satoshi font-bold text-2xl sm:text-3xl lg:text-[32px] leading-snug text-[#575757] mb-3">
            Our{' '}
            <span className="text-[#2959A3] inline-block relative pb-2.5">
              Investors
              <span className="absolute bottom-0 left-0 right-0 h-[4px] bg-[#7F9BC8] rounded-full" />
            </span>
          </h2>
          <p className="font-satoshi font-normal text-base sm:text-[18px] leading-relaxed text-[#6F6F6F] max-w-4xl">
            We are proud to be supported by investors who see the same thing we do: millions of shop owners underserved by outdated supply chains. Together, we are bridging the gap between global FMCG brands and local shopfronts and building the fastest infrastructure that helps them grow.
          </p>
        </div>

        {/* Investor Logos Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 items-center justify-center">
          {investors.map((inv) => (
            <div
              key={inv.name}
              className="flex items-center justify-center h-[72px] sm:h-[84px] bg-white rounded-[16px] border border-blue-100/60 shadow-xs px-4 text-center hover:shadow-md hover:border-[#2959A3]/30 transition-all duration-200"
            >
              <span className="font-satoshi font-bold text-sm sm:text-base text-[#363E51]">
                {inv.tag}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
