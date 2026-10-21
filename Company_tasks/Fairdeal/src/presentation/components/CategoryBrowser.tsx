import React from 'react'

export const CategoryBrowser: React.FC = () => {
  return (
    <section className="w-full py-14 lg:py-20 px-6 sm:px-10 lg:px-[80px] bg-[#F3F8FF] font-satoshi">
      <div className="max-w-[1440px] mx-auto">
        {/* Authentic Section Heading with Blue Underline */}
        <div className="mb-10 lg:mb-12">
          <h2 className="font-satoshi font-bold text-2xl sm:text-3xl lg:text-[34px] leading-snug text-[#575757]">
            Everything Your Shop Needs,{' '}
            <span className="text-[#2959A3] inline-block relative pb-2.5">
              All in One Place
              <span className="absolute bottom-0 left-0 right-0 h-[4px] bg-[#7F9BC8] rounded-full" />
            </span>
          </h2>
        </div>

        {/* 3-Card Grid (Alternating Image Pattern from Original Fairdeal Site) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {/* Card 1: Image Top -> Text Bottom */}
          <div className="flex flex-col gap-4">
            <div className="rounded-[20px] overflow-hidden h-[230px] shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=800&q=80"
                alt="Extensive FMCG Product Selection"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="bg-white rounded-[20px] p-6 lg:p-7 flex-1 text-center shadow-xs border border-gray-100 flex flex-col justify-center">
              <h3 className="mb-3 font-satoshi font-bold text-[20px] lg:text-[22px] leading-tight text-gray-900">
                <span className="text-[#2B5EB0]">Extensive</span> Product Selection
              </h3>
              <p className="font-satoshi text-[15px] sm:text-[16px] leading-relaxed text-[#3F3F3F]">
                From household essentials to the latest snacks, access a massive catalogue of FMCG brands at your fingertips.
              </p>
            </div>
          </div>

          {/* Card 2: Text Top -> Image Bottom (Authentic Fairdeal Center Card) */}
          <div className="flex flex-col gap-4">
            <div className="bg-white rounded-[20px] p-6 lg:p-7 flex-1 text-center shadow-xs border border-gray-100 flex flex-col justify-center">
              <h3 className="mb-3 font-satoshi font-bold text-[20px] lg:text-[22px] leading-tight text-gray-900">
                <span className="text-[#2B5EB0]">60 Min</span> Rapid Delivery
              </h3>
              <p className="font-satoshi text-[15px] sm:text-[16px] leading-relaxed text-[#3F3F3F]">
                Get the products your customers need in under 60 minutes. Fast, reliable, and right when you need it.
              </p>
            </div>
            <div className="rounded-[20px] overflow-hidden h-[230px] shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&w=800&q=80"
                alt="60-Minute Rapid Delivery Fleet"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>

          {/* Card 3: Image Top -> Text Bottom */}
          <div className="flex flex-col gap-4">
            <div className="rounded-[20px] overflow-hidden h-[230px] shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=800&q=80"
                alt="Better Margin Sourcing for Kirana Retailers"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="bg-white rounded-[20px] p-6 lg:p-7 flex-1 text-center shadow-xs border border-gray-100 flex flex-col justify-center">
              <h3 className="mb-3 font-satoshi font-bold text-[20px] lg:text-[22px] leading-tight text-gray-900">
                <span className="text-[#2B5EB0]">Better Margin</span> Better Sourcing
              </h3>
              <p className="font-satoshi text-[15px] sm:text-[16px] leading-relaxed text-[#3F3F3F]">
                Order at wholesale prices, track your spending, and reorder in seconds. Increase your profitability with Fairdeal built specifically for Kirana store owners.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
