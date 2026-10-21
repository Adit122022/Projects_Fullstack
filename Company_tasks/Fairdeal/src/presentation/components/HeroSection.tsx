import React from 'react'
import { Link } from 'react-router-dom'
import { Clock, ShoppingCart, ArrowRight, CheckCircle2 } from 'lucide-react'
import { Button } from '@/presentation/ui/Button'
import { Badge } from '@/presentation/ui/Badge'
import { APP_CONFIG } from '@/infrastructure/config/appConfig'

export const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F3F8FF] via-white to-white py-14 lg:py-24 border-b border-gray-100">
      {/* Subtle Background Glow Elements */}
      <div
        className="absolute top-0 left-1/4 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-blue-100/50 blur-[120px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-10 w-[450px] h-[450px] rounded-full bg-sky-100/40 blur-[100px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Hero Content */}
          <div className="lg:col-span-7 flex flex-col items-start gap-6">
            <div className="flex flex-wrap items-center gap-2.5">
              <Badge variant="accent" size="md" className="gap-1.5 font-bold">
                <Clock className="w-3.5 h-3.5 text-[#0369A1]" />
                <span>60-Minute FMCG Delivery SLA</span>
              </Badge>
              <Badge variant="primary" size="md">
                20,000+ Kirana Stores Empowered
              </Badge>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#111827] tracking-tight leading-[1.12]">
              Deals That <span className="text-[#2959A3]">Power</span> <br />
              <span className="text-[#0284C7]">Your Business.</span>
            </h1>

            <div className="border-l-4 border-[#2959A3] pl-4 py-1">
              <p className="text-lg sm:text-xl text-[#3F3F3F] leading-relaxed max-w-xl">
                Wholesale FMCG products delivered to your Kirana counter in under{' '}
                <strong className="font-extrabold text-[#111827]">60 minutes</strong>.
                Stock high-demand brands, free up working capital, and never face stockouts.
              </p>
            </div>

            {/* Value Checkpoints */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs font-semibold text-gray-700 w-full max-w-lg">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>1,000+ Direct FMCG Brand SKUs</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Transparent Wholesale Margin Pricing</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>No Minimum Cart Penalty</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Zero Middlemen & Doorstep Delivery</span>
              </div>
            </div>

            {/* Interactive CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2 w-full sm:w-auto">
              <Link to="/retailer-experience" className="w-full sm:w-auto">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto font-bold shadow-md hover:shadow-lg rounded-2xl"
                  leftIcon={<ShoppingCart className="w-4 h-4" />}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Explore Retailer Catalog (Demo)
                </Button>
              </Link>
              <Link to="/brand-partner" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto font-semibold rounded-2xl"
                >
                  Sell on Fairdeal
                </Button>
              </Link>
            </div>

            <div className="flex items-center gap-3 text-xs text-gray-500 pt-1">
              <span>Official Retailer Apps available on:</span>
              <a
                href={APP_CONFIG.social.playStore}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-[#2959A3] hover:underline"
              >
                Google Play
              </a>
              <span>•</span>
              <a
                href={APP_CONFIG.social.appStore}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-[#2959A3] hover:underline"
              >
                App Store
              </a>
            </div>
          </div>

          {/* Right Column: Visual Product & Delivery Showcase Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto w-full max-w-md lg:max-w-none rounded-3xl bg-gradient-to-tr from-[#363E51] via-[#2A303F] to-[#1E2533] text-white p-6 sm:p-8 shadow-2xl overflow-hidden border border-white/10">
              {/* Speed Tag Badge */}
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#63C7ED]">
                    Live Dark Store Dispatch
                  </span>
                  <h3 className="text-lg font-extrabold text-white">
                    Sector 67 Hub • Gurugram
                  </h3>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>Avg. 38 Min Delivery</span>
                </div>
              </div>

              {/* Sample Live Order Dispatch Preview */}
              <div className="py-6 flex flex-col gap-3">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  High-Moving FMCG Restock Bundle
                </span>

                <div className="space-y-2.5">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-red-500/20 text-red-400 flex items-center justify-center font-bold text-xs">
                        ST
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white leading-tight">
                          Sting Energy Drink 250ml (Pack of 30)
                        </p>
                        <p className="text-[10px] text-gray-400">Wholesale Sourcing Price</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-[#63C7ED]">₹485</span>
                      <span className="text-[10px] text-gray-400 line-through block">₹600 MRP</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs">
                        BS
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white leading-tight">
                          Bisleri 1L Mineral Water (Case of 12)
                        </p>
                        <p className="text-[10px] text-gray-400">Wholesale Sourcing Price</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-[#63C7ED]">₹182</span>
                      <span className="text-[10px] text-gray-400 line-through block">₹240 MRP</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs">
                        HD
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white leading-tight">
                          Haldiram's Bikaneri Bhujia 200g (x12)
                        </p>
                        <p className="text-[10px] text-gray-400">Wholesale Sourcing Price</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-[#63C7ED]">₹535</span>
                      <span className="text-[10px] text-gray-400 line-through block">₹660 MRP</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Profit Pill */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/60 to-[#1F3327] border border-emerald-500/30 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-medium text-emerald-300">
                    Retailer Margin Retained
                  </span>
                  <p className="text-sm font-bold text-white">Save ₹298 on this restock</p>
                </div>
                <span className="text-xs font-black px-2.5 py-1 rounded-full bg-emerald-400 text-gray-950">
                  +19.8% PROFIT
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
