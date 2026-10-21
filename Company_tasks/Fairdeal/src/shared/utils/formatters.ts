/**
 * Formats a numeric value into Indian Rupee format (e.g., ₹1,250)
 */
export function formatINR(value: number, includeDecimals = false): string {
  if (isNaN(value)) return '₹0'
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: includeDecimals ? 2 : 0,
    minimumFractionDigits: includeDecimals ? 2 : 0,
  }).format(value)
}

/**
 * Formats a regular number with Indian comma separators (e.g., 20,000+)
 */
export function formatNumberIN(value: number): string {
  if (isNaN(value)) return '0'
  return new Intl.NumberFormat('en-IN').format(value)
}

/**
 * Formats discount percentage
 */
export function formatDiscount(percent: number): string {
  return `${Math.round(percent)}% OFF`
}
