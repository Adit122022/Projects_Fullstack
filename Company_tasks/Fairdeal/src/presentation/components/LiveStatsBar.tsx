import React from 'react'

export const LiveStatsBar: React.FC = () => {
  const stats = [
    { value: '20,000+', label: 'Active Retailers' },
    { value: '60 Min', label: 'Delivery Time' },
    { value: '1,000+', label: 'Active SKUs' },
    { value: '15%', label: 'Saving' },
  ]

  return (
    <section className="w-full bg-white py-12 lg:py-[72px] border-b border-gray-100 font-satoshi">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 lg:gap-16 justify-items-center text-center">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center justify-center">
              <h3 className="tabular-nums mb-2 font-satoshi font-bold text-[32px] sm:text-[38px] leading-tight text-[#272727]">
                {stat.value}
              </h3>
              <p className="text-center font-satoshi font-medium text-[16px] sm:text-[18px] lg:text-[20px] text-[#6F6F6F]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
