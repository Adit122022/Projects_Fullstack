import type { PartnerInquiry } from '@/domain/entities'
import { validatePartnerInquiry } from '@/domain/validation'

export class PartnerRepository {
  /**
   * Simulates asynchronous form submission with mock latency
   */
  public static async submitInquiry(
    inquiry: PartnerInquiry
  ): Promise<{ success: boolean; message: string }> {
    const validation = validatePartnerInquiry(inquiry)
    if (!validation.isValid) {
      throw new Error(Object.values(validation.errors)[0] || 'Invalid submission')
    }

    // Simulate 600ms network roundtrip
    await new Promise((resolve) => setTimeout(resolve, 600))

    return {
      success: true,
      message:
        'Thank you for your interest! The Fairdeal Brand Partnerships team will review your catalog and contact you within 24 hours.',
    }
  }
}
