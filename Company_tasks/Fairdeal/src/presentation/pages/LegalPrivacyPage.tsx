import React from 'react'
import { Shield, ExternalLink, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Badge } from '@/presentation/ui/Badge'
import { Button } from '@/presentation/ui/Button'
import { APP_CONFIG } from '@/infrastructure/config/appConfig'

export const LegalPrivacyPage: React.FC = () => {
  return (
    <div className="w-full bg-[#F8FAFC] py-16 lg:py-24">
      <div className="max-w-[900px] mx-auto px-6 sm:px-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-[#2959A3] hover:underline mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-200/80 shadow-md flex flex-col gap-6">
          <div className="border-b border-gray-100 pb-6">
            <Badge variant="primary" size="sm" className="mb-3">
              Official Policy Disclosure
            </Badge>
            <h1 className="text-3xl font-extrabold text-[#111827]">
              Privacy & Data Protection Notice
            </h1>
            <p className="text-xs text-gray-400 mt-1">
              Effective Date: {new Date().getFullYear()} • Published by {APP_CONFIG.entityName}
            </p>
          </div>

          <div className="space-y-6 text-sm text-gray-700 leading-relaxed">
            <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-xs text-blue-900 flex items-start gap-3">
              <Shield className="w-5 h-5 text-[#2959A3] shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold">Independent Redesign Prototype Notice:</strong>
                This application is an independent frontend redesign proposal. No real personal data,
                credit card numbers, or live telemetry are stored or transmitted to commercial marketing brokers.
              </div>
            </div>

            <section>
              <h2 className="text-base font-bold text-[#111827] mb-2">
                1. Information We Collect in the Commercial Application
              </h2>
              <p>
                In Fairdeal’s official mobile apps, store information (Kirana shop name, business owner contact,
                delivery location coordinates, and GST details) is collected strictly to verify trade credentials,
                route wholesale deliveries, and produce tax-compliant commercial invoices.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-[#111827] mb-2">
                2. Location Coordinates & Dispatch Routing
              </h2>
              <p>
                Precise geographic coordinates are utilized to assign orders to the nearest micro-fulfillment
                dark store and dispatch last-mile delivery riders within the guaranteed 60-minute delivery window.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-[#111827] mb-2">
                3. Direct Links to Official Legal Documentation
              </h2>
              <p className="mb-4">
                To inspect the official legal documentation, terms, and privacy disclosures published by
                FDMS Marketplace Pvt. Ltd., please visit the production references:
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="https://fairdeal.market/privacy-policy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-xs font-bold text-[#111827] transition-colors"
                >
                  <span>Official Privacy Policy</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                </a>
                <a
                  href="https://fairdeal.market/terms-and-conditions/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-xs font-bold text-[#111827] transition-colors"
                >
                  <span>Terms & Conditions</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                </a>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
