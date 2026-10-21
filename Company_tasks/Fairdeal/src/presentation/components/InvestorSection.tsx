import React from 'react'
import { Building2, ShieldCheck } from 'lucide-react'
import { APP_CONFIG } from '@/infrastructure/config/appConfig'

export const InvestorSection: React.FC = () => {
  return (
    <section className="w-full py-16 lg:py-24 bg-[#F8FAFC] border-b border-gray-100">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16 text-center">
        <div className="max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold text-[#2959A3] uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full border border-blue-100 inline-block mb-3">
            Institutional Credibility
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#111827] tracking-tight">
            Backed by <span className="text-[#2959A3]">Leading Global & Indian Investors</span>
          </h2>
          <p className="text-sm sm:text-base text-[#6F6F6F] mt-3 leading-relaxed">
            We are proud to be supported by investors who see the same thing we do: millions of shop owners
            underserved by outdated supply chains. Together, we are bridging the gap between global FMCG
            brands and local Kirana shopfronts.
          </p>
        </div>

        {/* Investors Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {APP_CONFIG.investors.map((inv) => (
            <div
              key={inv.name}
              className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white border border-gray-200/80 shadow-2xs hover:border-[#2959A3]/30 transition-all hover:shadow-sm"
            >
              <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-[#2959A3] mb-3">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-extrabold text-[#111827] text-center leading-snug">
                {inv.name}
              </h3>
              <span className="text-[11px] font-semibold text-gray-400 mt-1">
                {inv.type}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 text-xs text-gray-500">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Institutional institutional governance & growth capital backing Fairdeal's expansion</span>
        </div>
      </div>
    </section>
  )
}
