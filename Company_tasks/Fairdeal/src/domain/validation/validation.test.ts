import { describe, it, expect } from 'vitest'
import { isValidEmail, isValidIndianPhone, validatePartnerInquiry } from './index'

describe('Domain Validation Utilities', () => {
  describe('isValidEmail', () => {
    it('accepts valid email addresses', () => {
      expect(isValidEmail('vendor@fmcgbrand.com')).toBe(true)
      expect(isValidEmail('partner.growth@fairdeal.market')).toBe(true)
      expect(isValidEmail('supply-chain+testing@domain.co.in')).toBe(true)
    })

    it('rejects invalid email formats', () => {
      expect(isValidEmail('')).toBe(false)
      expect(isValidEmail('plainaddress')).toBe(false)
      expect(isValidEmail('missing@tld')).toBe(false)
      expect(isValidEmail('@nodomain.com')).toBe(false)
      expect(isValidEmail('spaces in@address.com')).toBe(false)
    })
  })

  describe('isValidIndianPhone', () => {
    it('accepts valid 10-digit Indian mobile numbers', () => {
      expect(isValidIndianPhone('9876543210')).toBe(true)
      expect(isValidIndianPhone('7428614455')).toBe(true)
      expect(isValidIndianPhone('+919876543210')).toBe(true)
      expect(isValidIndianPhone('09876543210')).toBe(true)
      expect(isValidIndianPhone('98765 43210')).toBe(true)
      expect(isValidIndianPhone('9876-543-210')).toBe(true)
    })

    it('rejects numbers not conforming to Indian telecom numbering', () => {
      expect(isValidIndianPhone('')).toBe(false)
      expect(isValidIndianPhone('1234567890')).toBe(false) // Doesn't start with 6-9
      expect(isValidIndianPhone('987654321')).toBe(false) // 9 digits
      expect(isValidIndianPhone('987654321000')).toBe(false) // 12 digits
      expect(isValidIndianPhone('abcdefghij')).toBe(false)
    })
  })

  describe('validatePartnerInquiry', () => {
    const validData = {
      companyName: 'Sunrise Spices Ltd',
      contactPerson: 'Sunil Sharma',
      email: 'sunil@sunrisespices.com',
      phone: '9811223344',
      category: 'spices-staples',
      city: 'Delhi NCR',
    }

    it('returns isValid: true when all required fields meet criteria', () => {
      const result = validatePartnerInquiry(validData)
      expect(result.isValid).toBe(true)
      expect(result.errors).toEqual({})
    })

    it('flags empty and malformed fields with clear user feedback', () => {
      const result = validatePartnerInquiry({
        companyName: '',
        contactPerson: 'S',
        email: 'invalid-email',
        phone: '12345',
        category: '',
        city: '',
      })

      expect(result.isValid).toBe(false)
      expect(result.errors.companyName).toBeDefined()
      expect(result.errors.contactPerson).toBeDefined()
      expect(result.errors.email).toBeDefined()
      expect(result.errors.phone).toBeDefined()
      expect(result.errors.category).toBeDefined()
      expect(result.errors.city).toBeDefined()
    })
  })
})
