import React, { useState } from 'react'
import {
  Bike,
  Truck,
  Zap,
  Phone,
  MapPin,
  CheckCircle2,
  DollarSign,
  Gift,
  ShieldCheck,
  Calendar,
  Users,
} from 'lucide-react'
import { MOCK_DELIVERY_TIERS } from '@/infrastructure/mock-data/mockDeliveryTiers'
import { APP_CONFIG } from '@/infrastructure/config/appConfig'
import { Accordion } from '@/presentation/ui/Accordion'
import { Button } from '@/presentation/ui/Button'
import { Badge } from '@/presentation/ui/Badge'
import { formatINR } from '@/shared/utils/formatters'

export const DeliverWithUsPage: React.FC = () => {
  // Interactive Earnings Calculator state
  const [vehicle, setVehicle] = useState<'Bike' | 'Auto' | 'EV Loader'>('Bike')
  const [dailyDeliveries, setDailyDeliveries] = useState<number>(14)

  // Rate card logic based on vehicle tier
  const ratePerDrop = vehicle === 'Bike' ? 65 : vehicle === 'Auto' ? 110 : 160
  const dailyIncome = dailyDeliveries * ratePerDrop
  const weeklyIncome = dailyIncome * 6
  const monthlyProjected = weeklyIncome * 4.3 + (vehicle === 'EV Loader' ? 6000 : 3000)

  const deliveryFaqs = [
    {
      id: 'del-faq-docs',
      question: 'What documents do I need to register as a delivery partner?',
      answer:
        'You only need your valid Aadhar Card, Driving License, Vehicle RC (Registration Certificate), and Bank Account Details / UPI ID. Bring original copies to our Gurugram warehouse for on-the-spot verification.',
    },
    {
      id: 'del-faq-vehicle',
      question: 'Do I need to own my own vehicle?',
      answer:
        'Yes. You will need a commercial or private two-wheeler (bike/scooter), commercial auto rickshaw, or electric loader (EV Loader) in roadworthy condition.',
    },
    {
      id: 'del-faq-signup',
      question: 'How do I start delivering?',
      answer:
        'Bike and auto riders can walk into our central warehouse at VenturX, Landmark Cyber Park, Sector 67, Gurugram. Our onboarding desk will inspect your vehicle, activate your driver app, and you can start taking trips on the same day.',
    },
    {
      id: 'del-faq-ev',
      question: 'How do EV Loader fleet vendors join?',
      answer:
        'Commercial EV loader owners and fleet aggregators can call our fleet manager directly at +91 74286 14455 for dedicated route contracts and corporate volume allocations.',
    },
    {
      id: 'del-faq-payouts',
      question: 'When do I receive my earnings?',
      answer:
        'Fairdeal processes settlements every single week directly into your bank account. There are zero hidden fees, zero commission deductions, and all bonuses are itemized clearly in the partner app.',
    },
  ]

  return (
    <div className="w-full flex flex-col bg-white">
      {/* Hero Section */}
      <section className="relative w-full py-16 lg:py-24 bg-gradient-to-r from-[#363E51] via-[#2A303F] to-[#1E2533] text-white">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16 text-center">
          <Badge variant="accent" size="md" className="mb-4">
            Join India's Fastest Last-Mile Network
          </Badge>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15]">
            Earn up to <span className="text-[#63C7ED]">₹60,000/month</span>
          </h1>

          <p className="text-xl sm:text-2xl font-bold text-gray-200 mt-3 italic">
            Ride with Purpose. Earn on Your Terms.
          </p>

          <p className="text-sm sm:text-base text-gray-300 mt-4 max-w-2xl mx-auto leading-relaxed">
            Join Fairdeal.market’s growing B2B delivery network. Whether you are a{' '}
            <strong className="text-white">bike rider</strong>, an{' '}
            <strong className="text-white">auto driver</strong>, or an{' '}
            <strong className="text-white">EV Loader vendor</strong> — there is a lucrative place for you.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            <a href={`tel:${APP_CONFIG.supportPhone}`}>
              <Button
                variant="accent"
                size="lg"
                className="font-bold rounded-2xl shadow-lg"
                leftIcon={<Phone className="w-4 h-4" />}
              >
                Call Fleet Onboarding: {APP_CONFIG.supportPhoneDisplay}
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Interactive Earnings Estimator */}
      <section className="w-full py-16 lg:py-20 bg-[#F3F8FF] border-b border-gray-100">
        <div className="max-w-[1100px] mx-auto px-6 sm:px-8">
          <div className="text-center mb-10">
            <span className="text-xs font-bold text-[#2959A3] uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full border border-blue-100 inline-block mb-2">
              Transparent Payout Calculator
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111827]">
              Estimate Your Potential Monthly Income
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Select your vehicle type and expected daily Kirana drops to project your weekly and monthly earnings.
            </p>
          </div>

          <div className="p-6 sm:p-10 rounded-3xl bg-white border border-gray-200 shadow-xl flex flex-col gap-8">
            {/* Vehicle Selection */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-3">
                1. Select Your Vehicle Category
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {(['Bike', 'Auto', 'EV Loader'] as const).map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setVehicle(v)}
                    className={`flex items-center justify-center gap-3 p-4 rounded-2xl border text-sm font-bold transition-all cursor-pointer ${
                      vehicle === v
                        ? 'bg-[#2959A3] text-white border-[#2959A3] shadow-md scale-102'
                        : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    {v === 'Bike' && <Bike className="w-5 h-5" />}
                    {v === 'Auto' && <Truck className="w-5 h-5" />}
                    {v === 'EV Loader' && <Zap className="w-5 h-5" />}
                    <span>{v}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Slider for Daily Completed Orders */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="delivery-slider"
                  className="text-xs font-bold uppercase tracking-wider text-gray-500"
                >
                  2. Completed Drops Per Day
                </label>
                <span className="text-lg font-black text-[#2959A3]">
                  {dailyDeliveries} Drops / Day
                </span>
              </div>
              <input
                id="delivery-slider"
                type="range"
                min="6"
                max="24"
                step="1"
                value={dailyDeliveries}
                onChange={(e) => setDailyDeliveries(Number(e.target.value))}
                className="w-full h-2.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#2959A3]"
              />
              <div className="flex justify-between text-[11px] text-gray-400 mt-1">
                <span>6 drops (Part-time)</span>
                <span>14 drops (Standard)</span>
                <span>24 drops (Power Fleet)</span>
              </div>
            </div>

            {/* Calculated Breakdown Display */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-gray-100">
              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 flex flex-col items-center text-center">
                <span className="text-xs font-semibold text-gray-500">Daily Earnings</span>
                <span className="text-2xl font-black text-gray-900 mt-1">
                  {formatINR(dailyIncome)}
                </span>
                <span className="text-[10px] text-gray-400 mt-0.5">@ {formatINR(ratePerDrop)} / drop</span>
              </div>

              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 flex flex-col items-center text-center">
                <span className="text-xs font-semibold text-gray-500">Weekly Payout (6 Days)</span>
                <span className="text-2xl font-black text-[#2959A3] mt-1">
                  {formatINR(weeklyIncome)}
                </span>
                <span className="text-[10px] text-emerald-600 font-semibold mt-0.5">Settled Every Monday</span>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-col items-center text-center">
                <span className="text-xs font-bold text-emerald-800">Projected Monthly Take-Home</span>
                <span className="text-2xl font-black text-emerald-700 mt-1">
                  {formatINR(monthlyProjected)}
                </span>
                <span className="text-[10px] text-emerald-700 font-semibold mt-0.5">
                  Includes bonuses & incentives
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Onboarding Steps and Warehouse Map */}
      <section className="w-full py-16 lg:py-24 bg-white border-b border-gray-100">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Steps Column */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <span className="text-xs font-bold text-[#2959A3] uppercase tracking-wider">
                How to Join
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111827]">
                Fast Onboarding at Our Central Warehouse
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                No complicated multi-week tests. Walk in with your documents, meet our dispatch manager,
                and receive your Fairdeal rider kit on the same day.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-4 p-5 rounded-2xl bg-[#F3F8FF] border border-[#D4E3FC]">
                  <div className="w-9 h-9 rounded-xl bg-[#2959A3] text-white flex items-center justify-center font-bold text-sm shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#111827]">Visit Our Warehouse</h3>
                    <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                      Bring your original Aadhar card, valid driving license, and vehicle registration (RC).
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 rounded-2xl bg-[#F3F8FF] border border-[#D4E3FC]">
                  <div className="w-9 h-9 rounded-xl bg-[#2959A3] text-white flex items-center justify-center font-bold text-sm shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#111827]">Document & Vehicle Inspection</h3>
                    <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                      Our dispatch team verifies your credentials, conducts an app training session, and issues your account.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 rounded-2xl bg-[#F3F8FF] border border-[#D4E3FC]">
                  <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#111827]">Start Delivering & Earning</h3>
                    <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                      Accept orders routed directly to nearby Kirana stores and start earning immediate drop rates.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Hub Details & Map Location Card */}
            <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-[#363E51] text-white shadow-xl flex flex-col gap-6">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#63C7ED]">
                  Central Staging Warehouse
                </span>
                <h3 className="text-xl font-bold text-white mt-1">
                  Gurugram Dispatch Hub
                </h3>
              </div>

              <div className="flex items-start gap-3 text-xs text-gray-200">
                <MapPin className="w-5 h-5 text-[#63C7ED] shrink-0 mt-0.5" />
                <span>{APP_CONFIG.warehouseAddress}</span>
              </div>

              <div className="p-4 rounded-2xl bg-white/10 border border-white/10 flex flex-col gap-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Walk-In Timings:</span>
                  <span className="font-bold text-white">Mon–Sat • 9:00 AM – 6:00 PM</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Direct Fleet Phone:</span>
                  <a
                    href={`tel:${APP_CONFIG.supportPhone}`}
                    className="font-bold text-[#63C7ED] hover:underline"
                  >
                    {APP_CONFIG.supportPhoneDisplay}
                  </a>
                </div>
              </div>

              <a
                href={`tel:${APP_CONFIG.supportPhone}`}
                className="w-full"
              >
                <Button variant="accent" size="lg" className="w-full font-bold rounded-xl">
                  Call Hub Team Now
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 5 Pillars of Rider Transparency */}
      <section className="w-full py-16 lg:py-24 bg-[#F8FAFC] border-b border-gray-100">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16 text-center">
          <div className="max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold text-[#2959A3] uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full border border-blue-100 inline-block mb-3">
              Rider Trust
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111827]">
              We Believe in Total Transparency
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="p-6 rounded-2xl bg-white border border-gray-200/80 shadow-2xs flex flex-col items-center">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 mb-3" />
              <h3 className="text-sm font-bold text-[#111827]">No Joining Fee</h3>
              <p className="text-xs text-gray-500 mt-1">100% free to onboard with zero deposit</p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-gray-200/80 shadow-2xs flex flex-col items-center">
              <DollarSign className="w-8 h-8 text-[#2959A3] mb-3" />
              <h3 className="text-sm font-bold text-[#111827]">Clear Payouts</h3>
              <p className="text-xs text-gray-500 mt-1">Know exact trip earnings in advance</p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-gray-200/80 shadow-2xs flex flex-col items-center">
              <Calendar className="w-8 h-8 text-sky-600 mb-3" />
              <h3 className="text-sm font-bold text-[#111827]">Weekly Settlements</h3>
              <p className="text-xs text-gray-500 mt-1">Direct bank transfers without delay</p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-gray-200/80 shadow-2xs flex flex-col items-center">
              <Gift className="w-8 h-8 text-amber-500 mb-3" />
              <h3 className="text-sm font-bold text-[#111827]">Fixed Incentives</h3>
              <p className="text-xs text-gray-500 mt-1">Milestone bonuses shared upfront</p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-gray-200/80 shadow-2xs flex flex-col items-center">
              <Phone className="w-8 h-8 text-indigo-600 mb-3" />
              <h3 className="text-sm font-bold text-[#111827]">Real On-Ground Support</h3>
              <p className="text-xs text-gray-500 mt-1">Dedicated hub coordinator on call</p>
            </div>
          </div>
        </div>
      </section>

      {/* Delivery FAQs */}
      <section className="w-full py-16 lg:py-24 bg-white">
        <div className="max-w-[1000px] mx-auto px-6 sm:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111827]">
              Delivery Partner <span className="text-[#2959A3]">FAQs</span>
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              Everything you need to know about joining and earning with Fairdeal.
            </p>
          </div>

          <Accordion items={deliveryFaqs} defaultOpenIndex={0} />
        </div>
      </section>
    </div>
  )
}
