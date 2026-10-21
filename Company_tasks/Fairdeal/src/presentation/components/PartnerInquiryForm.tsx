import React, { useState } from 'react'
import { Send, CheckCircle2, AlertCircle } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '@/app/store/hooks'
import {
  submitPartnerInquiry,
  resetPartnerFormState,
} from '@/application/features/brandPartners/brandPartnerSlice'
import { validatePartnerInquiry } from '@/domain/validation'
import type { PartnerInquiry } from '@/domain/entities'
import { Input } from '@/presentation/ui/Input'
import { Select } from '@/presentation/ui/Select'
import { Button } from '@/presentation/ui/Button'

export const PartnerInquiryForm: React.FC = () => {
  const dispatch = useAppDispatch()
  const { status, feedbackMessage } = useAppSelector(
    (state) => state.brandPartners
  )

  const [formData, setFormData] = useState<Partial<PartnerInquiry>>({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    category: 'Cold Drinks & Juices',
    city: 'Gurugram',
    message: '',
  })

  const [errors, setErrors] = useState<Partial<Record<keyof PartnerInquiry, string>>>({})

  const handleChange = (
    field: keyof PartnerInquiry,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[field]
        return next
      })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const validation = validatePartnerInquiry(formData)

    if (!validation.isValid) {
      setErrors(validation.errors)
      return
    }

    setErrors({})
    dispatch(submitPartnerInquiry(formData as PartnerInquiry))
  }

  if (status === 'success') {
    return (
      <div className="p-8 rounded-3xl bg-emerald-50 border border-emerald-200 text-center flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-emerald-950 mb-2">
          Partner Inquiry Submitted Successfully!
        </h3>
        <p className="text-sm text-emerald-800 max-w-md mb-6 leading-relaxed">
          {feedbackMessage ||
            'Thank you for your interest! The Fairdeal Brand Partnerships team will review your catalog and reach out within 24 hours.'}
        </p>
        <div className="p-3 bg-white rounded-xl border border-emerald-100 text-xs text-gray-500 mb-6">
          Prototype Note: Form submission executed locally via Redux store simulation.
        </div>
        <Button
          variant="outline"
          size="md"
          onClick={() => {
            dispatch(resetPartnerFormState())
            setFormData({
              companyName: '',
              contactPerson: '',
              email: '',
              phone: '',
              category: 'Cold Drinks & Juices',
              city: 'Gurugram',
              message: '',
            })
          }}
        >
          Submit Another Inquiry
        </Button>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="p-6 sm:p-10 rounded-3xl bg-white border border-gray-200/80 shadow-xl flex flex-col gap-5 text-left"
    >
      <div className="border-b border-gray-100 pb-4">
        <h3 className="text-xl font-bold text-[#111827]">
          Connect with Fairdeal Distribution Team
        </h3>
        <p className="text-xs text-gray-500 mt-1">
          Expand your FMCG footprint across 20,000+ Kirana counters with last-mile quick delivery.
        </p>
      </div>

      {status === 'error' && (
        <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 flex items-center gap-2 text-xs text-red-700">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{feedbackMessage || 'Failed to submit inquiry. Please review the form.'}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Brand / Company Name"
          placeholder="e.g. Parle Agro, Amul, Paper Boat"
          required
          value={formData.companyName || ''}
          error={errors.companyName}
          onChange={(e) => handleChange('companyName', e.target.value)}
        />

        <Input
          label="Contact Person Name"
          placeholder="e.g. Rahul Sharma"
          required
          value={formData.contactPerson || ''}
          error={errors.contactPerson}
          onChange={(e) => handleChange('contactPerson', e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Business Email"
          type="email"
          placeholder="e.g. rahul@brand.com"
          required
          value={formData.email || ''}
          error={errors.email}
          onChange={(e) => handleChange('email', e.target.value)}
        />

        <Input
          label="Phone Number"
          type="tel"
          placeholder="e.g. 9876543210"
          required
          value={formData.phone || ''}
          error={errors.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Select
          label="Product Category"
          required
          value={formData.category || 'Cold Drinks & Juices'}
          options={[
            'Cold Drinks & Juices',
            'Namkeen & Chips',
            'Biscuits & Cookies',
            'Ghee & Cooking Oils',
            'Tea, Coffee & Beverages',
            'Instant Food & Ready-to-Eat',
            'Personal Care & Hygiene',
            'Other FMCG Specialties',
          ]}
          onChange={(e) => handleChange('category', e.target.value)}
        />

        <Input
          label="Primary Operating City / Hub"
          placeholder="e.g. Gurugram, Delhi-NCR, Noida"
          required
          value={formData.city || ''}
          error={errors.city}
          onChange={(e) => handleChange('city', e.target.value)}
        />
      </div>

      <div>
        <label
          htmlFor="partner-notes"
          className="text-xs font-semibold uppercase tracking-wider text-gray-700 block mb-1.5"
        >
          Additional Details / Distribution Goals (Optional)
        </label>
        <textarea
          id="partner-notes"
          rows={3}
          value={formData.message || ''}
          onChange={(e) => handleChange('message', e.target.value)}
          placeholder="Tell us about your SKUs, monthly volume goals, or current distributor pain points..."
          className="w-full p-3.5 bg-white border border-gray-300 rounded-xl text-sm text-[#111827] outline-none focus:border-[#2959A3] focus:ring-2 focus:ring-[#2959A3]/15 transition-all resize-none"
        />
      </div>

      <div className="pt-2">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full font-bold shadow-md rounded-xl"
          isLoading={status === 'loading'}
          rightIcon={<Send className="w-4 h-4" />}
        >
          Submit Brand Partner Application
        </Button>
      </div>

      <p className="text-[11px] text-gray-400 text-center">
        Demo Notice: Sourced data stays local. We respect brand confidentiality.
      </p>
    </form>
  )
}
