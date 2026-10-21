import React from 'react'
import { Link } from 'react-router-dom'
import { Bike, Truck, Zap, ArrowRight, ShieldAlert, Award } from 'lucide-react'
import { Button } from '@/presentation/ui/Button'
import { APP_CONFIG } from '@/infrastructure/config/appConfig'

export const DeliveryTeaser: React.FC = () => {
  return (
    <section className="w-full py-16 lg:py-24 bg-white border-b border-gray-100">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16">
        <div className="relative rounded-3xl bg-gradient-to-r from-[#363E51] via-[#2D3344] to-[#252B3A] text-white p-8 sm:p-12 lg:p-16 overflow-hidden shadow-2xl">
          {/* Subtle Ambient Shapes */}
          <div
            className="absolute top-0 right-0 w-96 h-96 bg-[#63C7ED]/10 rounded-full blur-3xl pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7 flex flex-col items-start gap-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#63C7ED]">
                For Delivery & Fleet Partners
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                Deliver With Us & Earn Up to{' '}
                <span className="text-[#63C7ED] underline decoration-2 underline-offset-8">
                  ₹60,000/month
                </span>
              </h2>

              <p className="text-sm sm:text-base text-gray-200 leading-relaxed max-w-xl">
                Fairdeal.market is expanding its last-mile B2B wholesale delivery network. Whether you own
                a <strong className="text-white">bike</strong>, an <strong className="text-white">auto</strong>, or
                an <strong className="text-white">EV loader</strong>, earn predictable weekly payouts on your own terms.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full max-w-lg pt-2">
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex flex-col">
                  <span className="text-xs font-semibold text-gray-300">Joining Bonus</span>
                  <span className="text-base font-extrabold text-[#63C7ED]">₹3,000</span>
                </div>
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex flex-col">
                  <span className="text-xs font-semibold text-gray-300">Payout Cycle</span>
                  <span className="text-base font-extrabold text-white">Every Week</span>
                </div>
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex flex-col col-span-2 sm:col-span-1">
                  <span className="text-xs font-semibold text-gray-300">Rider Referral</span>
                  <span className="text-base font-extrabold text-white">₹1,000</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Link to="/deliver-with-us">
                  <Button
                    variant="accent"
                    size="lg"
                    className="font-bold rounded-2xl shadow-md"
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                  >
                    See How It Works & Apply
                  </Button>
                </Link>
                <a
                  href={`tel:${APP_CONFIG.supportPhone}`}
                  className="text-xs font-bold text-gray-300 hover:text-white"
                >
                  Call Fleet Team: {APP_CONFIG.supportPhoneDisplay}
                </a>
              </div>
            </div>

            {/* Vehicle Fleet Category Badges */}
            <div className="lg:col-span-5 flex flex-col gap-3">
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#63C7ED]/20 text-[#63C7ED] flex items-center justify-center shrink-0">
                  <Bike className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Bike Riders</h3>
                  <p className="text-xs text-gray-300">Flexible rapid parcel routes across local hubs</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center shrink-0">
                  <Truck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Auto Three-Wheelers</h3>
                  <p className="text-xs text-gray-300">Medium FMCG crate delivery with dense shop drops</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-400/20 text-emerald-300 flex items-center justify-center shrink-0">
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">EV Loader Fleet Vendors</h3>
                  <p className="text-xs text-gray-300">Max bulk capacity with free warehouse charging</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
