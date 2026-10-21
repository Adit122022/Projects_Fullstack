import { describe, it, expect } from 'vitest'
import catalogReducer, {
  setSearchQuery,
  setSelectedCategory,
  setSortOption,
  setInStockOnly,
  setMaxPrice,
  setViewMode,
  resetFilters,
  type CatalogState,
} from './catalogSlice'
import {
  selectFilteredProducts,
  selectActiveCategoryDetails,
} from '@/application/selectors/catalogSelectors'
import type { RootState } from '@/app/store'

describe('Catalog Redux Slice & Selectors', () => {
  const initialTestState: CatalogState = {
    searchQuery: '',
    selectedCategory: 'all',
    sortOption: 'popularity',
    inStockOnly: false,
    maxPrice: undefined,
    viewMode: 'grid',
    items: [],
    categories: [
      { id: '1', name: 'All Categories', slug: 'all', icon: 'Sparkles', itemCount: 14, description: 'All items', color: 'blue' },
      { id: '2', name: 'Spices & Staples', slug: 'spices-staples', icon: 'Wheat', itemCount: 4, description: 'Staples and spices', color: 'amber' },
    ],
  }

  describe('Reducers', () => {
    it('sets search query', () => {
      const state = catalogReducer(initialTestState, setSearchQuery('Tata Salt'))
      expect(state.searchQuery).toBe('Tata Salt')
    })

    it('sets selected category', () => {
      const state = catalogReducer(initialTestState, setSelectedCategory('spices-staples'))
      expect(state.selectedCategory).toBe('spices-staples')
    })

    it('sets sort option', () => {
      const state = catalogReducer(initialTestState, setSortOption('margin-desc'))
      expect(state.sortOption).toBe('margin-desc')
    })

    it('toggles in-stock only filter', () => {
      const state = catalogReducer(initialTestState, setInStockOnly(true))
      expect(state.inStockOnly).toBe(true)
    })

    it('sets max price filter', () => {
      const state = catalogReducer(initialTestState, setMaxPrice(100))
      expect(state.maxPrice).toBe(100)
    })

    it('switches view mode between grid and list', () => {
      const state = catalogReducer(initialTestState, setViewMode('list'))
      expect(state.viewMode).toBe('list')
    })

    it('resets all filters to defaults', () => {
      let state = catalogReducer(initialTestState, setSearchQuery('Fortune'))
      state = catalogReducer(state, setSelectedCategory('edible-oils'))
      state = catalogReducer(state, setSortOption('price-asc'))
      state = catalogReducer(state, setInStockOnly(true))
      state = catalogReducer(state, setMaxPrice(500))

      const resetState = catalogReducer(state, resetFilters())
      expect(resetState.searchQuery).toBe('')
      expect(resetState.selectedCategory).toBe('all')
      expect(resetState.sortOption).toBe('popularity')
      expect(resetState.inStockOnly).toBe(false)
      expect(resetState.maxPrice).toBeUndefined()
    })
  })

  describe('Selectors', () => {
    it('filters products by search keyword across brand and title', () => {
      const state = {
        catalog: {
          ...initialTestState,
          searchQuery: 'Tata',
        },
      } as unknown as RootState

      const filtered = selectFilteredProducts(state)
      expect(filtered.length).toBeGreaterThan(0)
      expect(filtered.every((p) => p.name.includes('Tata') || p.brand.includes('Tata'))).toBe(true)
    })

    it('sorts products by highest retailer margin', () => {
      const state = {
        catalog: {
          ...initialTestState,
          sortOption: 'margin-desc',
        },
      } as unknown as RootState

      const filtered = selectFilteredProducts(state)
      for (let i = 0; i < filtered.length - 1; i++) {
        expect(filtered[i].marginPercentage).toBeGreaterThanOrEqual(
          filtered[i + 1].marginPercentage
        )
      }
    })

    it('selects active category details', () => {
      const state = {
        catalog: {
          ...initialTestState,
          selectedCategory: 'spices-staples',
        },
      } as unknown as RootState

      const activeCategory = selectActiveCategoryDetails(state)
      expect(activeCategory.slug).toBe('spices-staples')
      expect(activeCategory.name).toBe('Spices & Staples')
    })
  })
})
