import React from 'react'
import { FileText, ExternalLink, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Badge } from '@/presentation/ui/Badge'
import { APP_CONFIG } from '@/infrastructure/config/appConfig'

export const LegalTermsPage: React.FC = () => {
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
              Trading & Service Agreement
            </Badge>
            <h1 className="text-3xl font-extrabold text-[#111827]">
              Terms & Conditions
            </h1>
            <p className="text-xs text-gray-400 mt-1">
              Applicable to B2B Kirana Procurement & Fleet Operations • {APP_CONFIG.entityName}
            </p>
          </div>

          <div className="space-y-6 text-sm text-gray-700 leading-relaxed">
            <section>
              <h2 className="text-base font-bold text-[#111827] mb-2">
                1. Nature of the B2B Wholesale Platform
              </h2>
              <p>
                Fairdeal.market operates exclusively as a Business-to-Business (B2B) marketplace
                connecting verified retail store merchants with licensed FMCG manufacturers and authorized
                supply chain distributors.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-[#111827] mb-2">
                2. Wholesale Pricing & Invoicing
              </h2>
              <p>
                All wholesale prices listed on the platform are inclusive of applicable GST unless explicitly
                specified otherwise. Goods dispatched from our fulfillment center include legal tax invoices
                with requisite HSN classifications.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-[#111827] mb-2">
                3. Delivery Windows & Inspection
              </h2>
              <p>
                The 60-minute delivery SLA applies to serviceable retail clusters within defined micro-fulfillment
                hub perimeters. Merchants are entitled to inspect product integrity and seal condition at the
                point of handover.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-[#111827] mb-2">
                4. Official Documentation References
              </h2>
              <p className="mb-4">
                To review the official binding legal terms, dispute resolutions, and delivery policies of
                FDMS Marketplace Pvt. Ltd., please consult the production links below:
              </p>

              <div className="flex flex-wrap gap-3">
                <a
                  href="https://fairdeal.market/terms-and-conditions/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-xs font-bold text-[#111827] transition-colors"
                >
                  <FileText className="w-4 h-4 text-[#2959A3]" />
                  <span>Official Terms and Conditions</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                </a>
                <a
                  href="https://fairdeal.market/shipping-and-delivery-policy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-xs font-bold text-[#111827] transition-colors"
                >
                  <FileText className="w-4 h-4 text-[#2959A3]" />
                  <span>Official Shipping Policy</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                </a>
                <a
                  href="https://fairdeal.market/returns-and-refunds-policy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-xs font-bold text-[#111827] transition-colors"
                >
                  <FileText className="w-4 h-4 text-[#2959A3]" />
                  <span>Official Returns & Refund Policy</span>
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
