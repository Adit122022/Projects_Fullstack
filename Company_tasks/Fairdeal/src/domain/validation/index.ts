import type { PartnerInquiry } from '../entities'
import type { ValidationResult } from '../types'

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email.trim())
}

export function isValidIndianPhone(phone: string): boolean {
  // Allows optional +91 or 0 prefix, followed by 10 digits starting with 6-9
  const cleaned = phone.replace(/[\s-]/g, '')
  const phoneRegex = /^(?:\+91|0)?[6-9]\d{9}$/
  return phoneRegex.test(cleaned)
}

export function validatePartnerInquiry(
  data: Partial<PartnerInquiry>
): ValidationResult<PartnerInquiry> {
  const errors: Partial<Record<keyof PartnerInquiry, string>> = {}

  if (!data.companyName || data.companyName.trim().length < 2) {
    errors.companyName = 'Company / Brand name must be at least 2 characters.'
  }

  if (!data.contactPerson || data.contactPerson.trim().length < 2) {
    errors.contactPerson = 'Contact person name is required.'
  }

  if (!data.email || !isValidEmail(data.email)) {
    errors.email = 'Please enter a valid business email address.'
  }

  if (!data.phone || !isValidIndianPhone(data.phone)) {
    errors.phone = 'Please enter a valid 10-digit Indian phone number.'
  }

  if (!data.category || data.category.trim() === '') {
    errors.category = 'Please select your primary product category.'
  }

  if (!data.city || data.city.trim().length < 2) {
    errors.city = 'Operating city is required.'
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}
