import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { HelpCircle, Store, Briefcase, Truck, CreditCard, ArrowRight } from 'lucide-react'
import { Accordion } from '@/presentation/ui/Accordion'
import { Badge } from '@/presentation/ui/Badge'
import { Button } from '@/presentation/ui/Button'
import { APP_CONFIG } from '@/infrastructure/config/appConfig'

export const FAQPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'retailers' | 'brands' | 'riders' | 'payments'>('retailers')

  const retailerFaqs = [
    {
      id: 'ret-1',
      question: 'How do Kirana stores register on Fairdeal?',
      answer:
        'Download the official Fairdeal Retailer app from the Google Play Store or Apple App Store. Enter your 10-digit mobile number, verify the OTP, and input your store name and delivery address. Your account is immediately ready for ordering.',
    },
    {
      id: 'ret-2',
      question: 'Is the 60-minute delivery promise guaranteed?',
      answer:
        'Yes! We operate localized dark stores across Gurugram and Delhi-NCR within 3–5km of your shop. Orders are picked and staged in under 10 minutes, and our dedicated delivery fleet delivers right to your counter in under an hour.',
    },
    {
      id: 'ret-3',
      question: 'What happens if a product is damaged or missing?',
      answer:
        'You can inspect all sealed packages upon delivery with the rider. Any damaged, leaked, or missing item is refunded immediately or replaced within 60 minutes with zero hassle.',
    },
    {
      id: 'ret-4',
      question: 'Can I pay cash on delivery (COD)?',
      answer:
        'Yes. We support Cash on Delivery (COD), UPI QR code scan on delivery, and direct net banking/credit line settlements for verified retailer partners.',
    },
  ]

  const brandFaqs = [
    {
      id: 'brand-1',
      question: 'How can FMCG brands partner with Fairdeal?',
      answer:
        'Submit the Brand Partner Inquiry form on our Sell With Us page. Our category managers review your product catalog, establish wholesale margins, and guide your first inventory shipment to our dark store hub within 2–3 business days.',
    },
    {
      id: 'brand-2',
      question: 'Who handles customer support and retail returns?',
      answer:
        'Fairdeal manages all retail Kirana customer support, last-mile return inspections, and cash collection. Brands receive clean reconciliation statements and net settlements.',
    },
    {
      id: 'brand-3',
      question: 'What visibility do brands get on sales data?',
      answer:
        'Partners receive real-time dashboard analytics tracking daily orders, ward-level sell-through velocity, retailer re-order rates, and inventory days-of-cover.',
    },
  ]

  const riderFaqs = [
    {
      id: 'rider-1',
      question: 'What are the vehicle requirements for delivery partners?',
      answer:
        'We onboard two-wheelers (bikes/scooters), three-wheeler autos, and electric commercial loaders (EV Loaders). All vehicles must have a valid RC and commercial insurance where applicable.',
    },
    {
      id: 'rider-2',
      question: 'When are rider incentives and payouts credited?',
      answer:
        'Earnings are deposited weekly directly into your bank account every Monday without any commission cuts or hidden service deductions.',
    },
    {
      id: 'rider-3',
      question: 'Is there a joining fee?',
      answer:
        'No. Joining Fairdeal as a delivery partner is 100% free. We never charge registration fees or security deposits.',
    },
  ]

  const paymentFaqs = [
    {
      id: 'pay-1',
      question: 'Which payment modes are supported on wholesale orders?',
      answer:
        'Retailers can pay via UPI (PhonePe, Google Pay, Paytm), net banking, NEFT/RTGS for bulk invoices, and Cash on Delivery at your store counter.',
    },
    {
      id: 'pay-2',
      question: 'Are digital GST tax invoices provided for every purchase?',
      answer:
        'Yes! Every order generates an immediate digital GST-compliant tax invoice accessible in your app history, complete with HSN codes and input tax credit (ITC) details for your accountant.',
    },
  ]

  const categoryMap = {
    retailers: retailerFaqs,
    brands: brandFaqs,
    riders: riderFaqs,
    payments: paymentFaqs,
  }

  return (
    <div className="w-full flex flex-col bg-white">
      {/* FAQ Hero */}
      <section className="relative w-full py-16 lg:py-24 bg-gradient-to-b from-[#F3F8FF] to-white border-b border-gray-100 text-center">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16">
          <Badge variant="primary" size="md" className="mb-4">
            Help & Knowledge Base
          </Badge>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#111827] tracking-tight leading-[1.15]">
            Frequently Asked <span className="text-[#2959A3]">Questions</span>
          </h1>

          <p className="text-sm sm:text-base text-gray-600 mt-3 max-w-xl mx-auto">
            Everything you need to know about Kirana wholesale ordering, 60-minute delivery, brand partnerships, and delivery fleets.
          </p>
        </div>
      </section>

      {/* Categories Tabs & Accordion */}
      <section className="w-full py-12 lg:py-20 bg-white">
        <div className="max-w-[1000px] mx-auto px-6 sm:px-8">
          {/* Category Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-10">
            <button
              type="button"
              onClick={() => setActiveCategory('retailers')}
              className={`flex items-center justify-center gap-2 py-3 px-4 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                activeCategory === 'retailers'
                  ? 'bg-[#2959A3] text-white shadow-md'
                  : 'bg-[#F1F5F9] text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Store className="w-4 h-4" />
              <span>For Retailers</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveCategory('brands')}
              className={`flex items-center justify-center gap-2 py-3 px-4 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                activeCategory === 'brands'
                  ? 'bg-[#2959A3] text-white shadow-md'
                  : 'bg-[#F1F5F9] text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>For Brands</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveCategory('riders')}
              className={`flex items-center justify-center gap-2 py-3 px-4 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                activeCategory === 'riders'
                  ? 'bg-[#2959A3] text-white shadow-md'
                  : 'bg-[#F1F5F9] text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Truck className="w-4 h-4" />
              <span>Delivery Fleet</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveCategory('payments')}
              className={`flex items-center justify-center gap-2 py-3 px-4 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                activeCategory === 'payments'
                  ? 'bg-[#2959A3] text-white shadow-md'
                  : 'bg-[#F1F5F9] text-gray-700 hover:bg-gray-200'
              }`}
            >
              <CreditCard className="w-4 h-4" />
              <span>Invoices & Pay</span>
            </button>
          </div>

          {/* Accordion Content */}
          <Accordion items={categoryMap[activeCategory]} defaultOpenIndex={0} />

          {/* Still Have Questions Box */}
          <div className="mt-14 p-8 rounded-3xl bg-[#F3F8FF] border border-[#D4E3FC] text-center flex flex-col items-center gap-4">
            <HelpCircle className="w-10 h-10 text-[#2959A3]" />
            <div>
              <h3 className="text-lg font-bold text-[#111827]">
                Still Have Questions?
              </h3>
              <p className="text-xs text-gray-600 mt-1 max-w-md">
                Our Gurugram support desk is available Monday through Saturday to answer any questions from store owners and brand partners.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a href={`tel:${APP_CONFIG.supportPhone}`}>
                <Button variant="primary" size="md">
                  Call Hub Support: {APP_CONFIG.supportPhoneDisplay}
                </Button>
              </a>
              <a href={`mailto:${APP_CONFIG.supportEmail}`}>
                <Button variant="outline" size="md">
                  Email Support Team
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
