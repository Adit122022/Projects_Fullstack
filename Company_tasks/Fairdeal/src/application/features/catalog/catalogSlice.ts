import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Product, Category } from '@/domain/entities'
import type { CatalogSortOption } from '@/domain/types'
import { CatalogRepository } from '@/infrastructure/repositories/CatalogRepository'

export interface CatalogState {
  searchQuery: string
  selectedCategory: string
  sortOption: CatalogSortOption
  inStockOnly: boolean
  maxPrice?: number
  viewMode: 'grid' | 'list'
  items: Product[]
  categories: Category[]
}

const initialState: CatalogState = {
  searchQuery: '',
  selectedCategory: 'all',
  sortOption: 'popularity',
  inStockOnly: false,
  maxPrice: undefined,
  viewMode: 'grid',
  items: CatalogRepository.getAllProducts(),
  categories: CatalogRepository.getAllCategories(),
}

export const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
    },
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload
    },
    setSortOption: (state, action: PayloadAction<CatalogSortOption>) => {
      state.sortOption = action.payload
    },
    setInStockOnly: (state, action: PayloadAction<boolean>) => {
      state.inStockOnly = action.payload
    },
    setMaxPrice: (state, action: PayloadAction<number | undefined>) => {
      state.maxPrice = action.payload
    },
    setViewMode: (state, action: PayloadAction<'grid' | 'list'>) => {
      state.viewMode = action.payload
    },
    resetFilters: (state) => {
      state.searchQuery = ''
      state.selectedCategory = 'all'
      state.sortOption = 'popularity'
      state.inStockOnly = false
      state.maxPrice = undefined
    },
  },
})

export const {
  setSearchQuery,
  setSelectedCategory,
  setSortOption,
  setInStockOnly,
  setMaxPrice,
  setViewMode,
  resetFilters,
} = catalogSlice.actions

export default catalogSlice.reducer
