import React from 'react'
import { Link } from 'react-router-dom'
import { Store, ArrowLeft } from 'lucide-react'
import { Button } from '@/presentation/ui/Button'

export const NotFoundPage: React.FC = () => {
  return (
    <div className="w-full min-h-[60vh] flex flex-col items-center justify-center text-center px-6 py-20">
      <div className="w-20 h-20 rounded-3xl bg-blue-50 text-[#2959A3] flex items-center justify-center mb-6 shadow-sm">
        <Store className="w-10 h-10" />
      </div>
      <span className="text-xs font-bold text-[#2959A3] uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full mb-3">
        404 Page Not Found
      </span>
      <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111827] mb-2">
        Looking for a Kirana Wholesale Route?
      </h1>
      <p className="text-sm text-gray-500 max-w-md mb-8 leading-relaxed">
        The page you requested doesn’t exist or has moved. Return to the homepage or explore our active 1,000+ SKU wholesale catalog.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link to="/">
          <Button variant="primary" size="md" leftIcon={<ArrowLeft className="w-4 h-4" />}>
            Back to Home
          </Button>
        </Link>
        <Link to="/retailer-experience">
          <Button variant="outline" size="md">
            Explore Wholesale Catalog
          </Button>
        </Link>
      </div>
    </div>
  )
}
