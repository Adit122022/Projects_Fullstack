import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export const DeliverSection: React.FC = () => {
  return (
    <section className="w-full py-14 lg:py-20 px-6 sm:px-10 lg:px-[80px] bg-white font-satoshi">
      <div className="max-w-[1440px] mx-auto">
        {/* Section Title */}
        <div className="mb-8">
          <h2 className="font-satoshi font-bold text-2xl sm:text-3xl lg:text-[32px] leading-snug text-[#575757] mb-1">
            <span className="text-[#2959A3] inline-block relative pb-2">
              Deliver
              <span className="absolute bottom-0 left-0 right-0 h-[4px] bg-[#7F9BC8] rounded-full" />
            </span>{' '}
            With Us
          </h2>
        </div>

        {/* Delivery Partner Card */}
        <div className="relative overflow-hidden rounded-[20px] bg-[#2D3A6B] min-h-[260px] flex flex-col sm:flex-row items-center justify-between px-8 sm:px-12 py-10 gap-8">
          {/* Diagonal stripes decoration */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                'repeating-linear-gradient(135deg, #fff 0px, #fff 1px, transparent 1px, transparent 40px)',
            }}
          />

          {/* Content */}
          <div className="relative z-10 max-w-[540px]">
            <span className="inline-block text-[#63C7ED] text-xs font-bold uppercase tracking-widest mb-3">
              For Our Delivery Partners
            </span>
            <h3 className="font-satoshi font-bold text-[22px] sm:text-[26px] leading-snug text-white mb-3">
              Deliver With Us / Join Our Delivery Network
            </h3>
            <p className="font-satoshi font-bold text-[#63C7ED] text-base sm:text-lg mb-1">
              Earn up to ₹60,000/month
            </p>
            <p className="font-satoshi font-medium text-[#A0B4D6] text-sm mb-4">
              Ride with Purpose. Earn on Your Terms.
            </p>
            <p className="font-satoshi text-sm sm:text-[15px] text-white/80 leading-relaxed mb-6 max-w-md">
              Fairdeal.market is expanding its last-mile B2B delivery network, and we're looking for delivery
              partners to grow with us. Whether you own a bike, an auto, or an EV loader, we have a place for you.
            </p>
            <Link
              to="/deliver-with-us"
              className="inline-flex items-center gap-2 text-[#63C7ED] font-semibold text-sm hover:underline"
            >
              See how it works <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Delivery Vehicle Image */}
          <div className="relative z-10 w-full sm:w-auto flex justify-center sm:justify-end flex-shrink-0">
            <img
              src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=80"
              alt="Fairdeal Delivery Fleet"
              className="w-[260px] sm:w-[320px] lg:w-[380px] h-[180px] sm:h-[200px] object-cover rounded-[14px] opacity-90"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
