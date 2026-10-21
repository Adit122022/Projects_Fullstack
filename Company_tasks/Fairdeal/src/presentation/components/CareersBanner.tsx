import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export const CareersBanner: React.FC = () => {
  return (
    <section className="relative w-full min-h-[440px] sm:min-h-[480px] flex items-center justify-center overflow-hidden font-satoshi bg-black">
      {/* Background Logistics / Warehouse Operations Image */}
      <img
        src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1920&q=80"
        alt="Shape the Future of B2B Quick Commerce"
        className="absolute inset-0 w-full h-full object-cover object-center opacity-40"
      />

      {/* Dark Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/80" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto text-center px-6 sm:px-12 lg:px-[80px] py-16">
        <h2 className="font-satoshi font-bold text-2xl sm:text-3xl lg:text-[34px] leading-tight text-white mb-4 sm:mb-5">
          Shape the future of B2B Quick Commerce
        </h2>
        <p className="font-satoshi font-normal text-base sm:text-[18px] leading-relaxed text-white/90 max-w-2xl mx-auto mb-6 sm:mb-8">
          We&apos;re moving fast, solving hard problems, and building something that matters for millions of shop owners across India. If that excites you, there&apos;s a place for you here.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <p className="font-satoshi font-normal text-base sm:text-[18px] text-white">
            Build with us —{' '}
            <a
              href="mailto:careers@fairdeal.market"
              className="font-bold text-[#63C7ED] hover:underline"
            >
              careers@fairdeal.market
            </a>
          </p>

          <span className="hidden sm:inline text-white/40">•</span>

          <Link
            to="/careers"
            className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-white/15 hover:bg-white/25 px-5 py-2.5 rounded-full border border-white/20 transition-colors"
          >
            <span>View Open Roles</span>
            <ArrowRight className="w-4 h-4 text-[#63C7ED]" />
          </Link>
        </div>
      </div>
    </section>
  )
}
