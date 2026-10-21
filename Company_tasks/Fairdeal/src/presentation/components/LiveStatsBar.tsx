import React from 'react'
import { APP_CONFIG } from '@/infrastructure/config/appConfig'

export const LiveStatsBar: React.FC = () => {
  return (
    <section className="w-full bg-white py-12 lg:py-16 border-b border-gray-100">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-gray-100">
          {APP_CONFIG.stats.map((stat, idx) => (
            <div
              key={stat.label}
              className={`flex flex-col items-center justify-center ${
                idx > 1 ? 'pt-6 md:pt-0' : ''
              } px-3`}
            >
              <div className="flex items-baseline justify-center gap-1">
                {stat.prefix && (
                  <span className="text-xl sm:text-2xl font-bold text-[#2959A3]">
                    {stat.prefix}
                  </span>
                )}
                <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#111827] tracking-tight tabular-nums">
                  {stat.value.toLocaleString('en-IN')}
                </span>
                <span className="text-xl sm:text-2xl font-black text-[#2959A3]">
                  {stat.suffix}
                </span>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-[#6F6F6F] mt-2">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
