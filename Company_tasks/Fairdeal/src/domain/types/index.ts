export type CatalogSortOption =
  | 'popularity'
  | 'margin-desc'
  | 'price-asc'
  | 'price-desc'
  | 'name-asc'

export interface CatalogFilterCriteria {
  searchQuery: string
  categorySlug: string
  inStockOnly: boolean
  sortOption: CatalogSortOption
  maxPrice?: number
}

export type SubmissionStatus = 'idle' | 'loading' | 'success' | 'error'

export interface ValidationResult<T> {
  isValid: boolean
  errors: Partial<Record<keyof T, string>>
}
