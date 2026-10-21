import { createSelector } from '@reduxjs/toolkit'
import type { RootState } from '@/app/store'
import { CatalogRepository } from '@/infrastructure/repositories/CatalogRepository'

export const selectCatalogState = (state: RootState) => state.catalog

export const selectSearchQuery = (state: RootState) => state.catalog.searchQuery
export const selectSelectedCategory = (state: RootState) => state.catalog.selectedCategory
export const selectSortOption = (state: RootState) => state.catalog.sortOption
export const selectInStockOnly = (state: RootState) => state.catalog.inStockOnly
export const selectMaxPrice = (state: RootState) => state.catalog.maxPrice
export const selectViewMode = (state: RootState) => state.catalog.viewMode
export const selectAllCategories = (state: RootState) => state.catalog.categories

/**
 * Memoized selector applying search, category, in-stock, and sort rules
 */
export const selectFilteredProducts = createSelector(
  [selectSearchQuery, selectSelectedCategory, selectSortOption, selectInStockOnly, selectMaxPrice],
  (searchQuery, categorySlug, sortOption, inStockOnly, maxPrice) => {
    return CatalogRepository.filterProducts({
      searchQuery,
      categorySlug,
      sortOption,
      inStockOnly,
      maxPrice,
    })
  }
)

export const selectActiveCategoryDetails = createSelector(
  [selectAllCategories, selectSelectedCategory],
  (categories, selectedSlug) => {
    return categories.find((c) => c.slug === selectedSlug) || categories[0]
  }
)
