import type { Product, Category } from '@/domain/entities'
import type { CatalogFilterCriteria } from '@/domain/types'
import { MOCK_PRODUCTS } from '../mock-data/mockProducts'
import { MOCK_CATEGORIES } from '../mock-data/mockCategories'

export class CatalogRepository {
  public static getAllCategories(): Category[] {
    return MOCK_CATEGORIES
  }

  public static getAllProducts(): Product[] {
    return MOCK_PRODUCTS
  }

  public static getProductById(id: string): Product | undefined {
    return MOCK_PRODUCTS.find((p) => p.id === id)
  }

  public static filterProducts(criteria: CatalogFilterCriteria): Product[] {
    let result = [...MOCK_PRODUCTS]

    // Category filter
    if (criteria.categorySlug && criteria.categorySlug !== 'all') {
      result = result.filter((item) => item.category === criteria.categorySlug)
    }

    // Search query filter (search across name, brand, packSize)
    if (criteria.searchQuery.trim()) {
      const q = criteria.searchQuery.toLowerCase().trim()
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.brand.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          item.packSize.toLowerCase().includes(q)
      )
    }

    // In stock filter
    if (criteria.inStockOnly) {
      result = result.filter((item) => item.inStock)
    }

    // Max price filter
    if (criteria.maxPrice !== undefined && criteria.maxPrice > 0) {
      result = result.filter((item) => item.wholesalePrice <= criteria.maxPrice!)
    }

    // Sorting
    switch (criteria.sortOption) {
      case 'margin-desc':
        result.sort((a, b) => b.marginPercentage - a.marginPercentage)
        break
      case 'price-asc':
        result.sort((a, b) => a.wholesalePrice - b.wholesalePrice)
        break
      case 'price-desc':
        result.sort((a, b) => b.wholesalePrice - a.wholesalePrice)
        break
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'popularity':
      default:
        result.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0))
        break
    }

    return result
  }
}
