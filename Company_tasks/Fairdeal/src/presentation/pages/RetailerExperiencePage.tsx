import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  Search,
  SlidersHorizontal,
  LayoutGrid,
  List,
  Sparkles,
  ShoppingBag,
  RotateCcw,
  Store,
  Clock,
  ShieldCheck,
} from 'lucide-react'
import { useAppDispatch, useAppSelector } from '@/app/store/hooks'
import {
  setSearchQuery,
  setSelectedCategory,
  setSortOption,
  setInStockOnly,
  setViewMode,
  resetFilters,
} from '@/application/features/catalog/catalogSlice'
import { openCartDrawer } from '@/application/features/cart/cartSlice'
import {
  selectFilteredProducts,
  selectAllCategories,
  selectActiveCategoryDetails,
} from '@/application/selectors/catalogSelectors'
import {
  selectCartTotalCount,
  selectCartTotalWholesale,
  selectCartTotalSavings,
} from '@/application/selectors/cartSelectors'
import type { CatalogSortOption } from '@/domain/types'
import { ProductCard } from '@/presentation/components/ProductCard'
import { Button } from '@/presentation/ui/Button'
import { Badge } from '@/presentation/ui/Badge'
import { Input } from '@/presentation/ui/Input'
import { Select } from '@/presentation/ui/Select'
import { formatINR } from '@/shared/utils/formatters'
import { cn } from '@/shared/utils/cn'

export const RetailerExperiencePage: React.FC = () => {
  const dispatch = useAppDispatch()
  const [searchParams] = useSearchParams()

  const products = useAppSelector(selectFilteredProducts)
  const categories = useAppSelector(selectAllCategories)
  const activeCategory = useAppSelector(selectActiveCategoryDetails)
  const searchQuery = useAppSelector((state) => state.catalog.searchQuery)
  const selectedCategory = useAppSelector(
    (state) => state.catalog.selectedCategory
  )
  const sortOption = useAppSelector((state) => state.catalog.sortOption)
  const inStockOnly = useAppSelector((state) => state.catalog.inStockOnly)
  const viewMode = useAppSelector((state) => state.catalog.viewMode)

  const cartCount = useAppSelector(selectCartTotalCount)
  const cartWholesale = useAppSelector(selectCartTotalWholesale)
  const cartSavings = useAppSelector(selectCartTotalSavings)

  // Sync category param from URL if present
  useEffect(() => {
    const catParam = searchParams.get('cat')
    if (catParam) {
      dispatch(setSelectedCategory(catParam))
    }
  }, [searchParams, dispatch])

  return (
    <div className="w-full flex flex-col bg-[#F8FAFC] min-h-screen pb-24">
      {/* Top Banner Notice */}
      <div className="bg-[#2959A3] text-white py-2 px-4 text-center text-xs font-semibold flex items-center justify-center gap-2">
        <Sparkles className="w-4 h-4 text-[#63C7ED] shrink-0" />
        <span>
          Independent Retailer Ordering Prototype — Test wholesale margins & 60-min delivery flow in real time.
        </span>
      </div>

      {/* Page Header */}
      <div className="bg-white border-b border-gray-200/80 py-8 lg:py-12">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="primary" size="sm">
                  Wholesale Kirana Portal
                </Badge>
                <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  60-Min Doorstep SLA
                </span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black text-[#111827] tracking-tight">
                Wholesale FMCG Catalog
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 mt-1 max-w-xl">
                Source directly from top national FMCG brands at true wholesale rate-cards. Free up capital with small-batch daily deliveries.
              </p>
            </div>

            {/* Quick Cart Pill Floating Header Trigger */}
            <div className="flex items-center gap-3">
              <Button
                variant="primary"
                size="md"
                onClick={() => dispatch(openCartDrawer())}
                className="font-bold shadow-md rounded-2xl"
                leftIcon={<ShoppingBag className="w-4 h-4" />}
              >
                <span>Demo Cart ({cartCount})</span>
                {cartCount > 0 && (
                  <span className="ml-1 text-xs opacity-90">
                    • {formatINR(cartWholesale)}
                  </span>
                )}
              </Button>
            </div>
          </div>

          {/* Category Horizontal Scrolling Pill Bar */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-8 pb-1">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.slug
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => dispatch(setSelectedCategory(cat.slug))}
                  className={cn(
                    'px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all duration-150 cursor-pointer flex items-center gap-2',
                    isActive
                      ? 'bg-[#2959A3] text-white shadow-sm scale-102'
                      : 'bg-[#F1F5F9] text-gray-700 hover:bg-gray-200'
                  )}
                >
                  <span>{cat.name}</span>
                  <span
                    className={cn(
                      'text-[10px] px-1.5 py-0.2 rounded-full font-bold',
                      isActive ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-600'
                    )}
                  >
                    {cat.itemCount}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Main Filter & Products Area */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-8 w-full flex-1">
        {/* Controls Bar: Search, In Stock, Sorting, View Mode */}
        <div className="bg-white p-4 sm:p-5 rounded-3xl border border-gray-200/80 shadow-2xs mb-8 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="w-full lg:w-96">
            <Input
              placeholder="Search 1,000+ SKUs (e.g. Parle, Bisleri, Sting, Haldiram)..."
              leftIcon={<Search className="w-4 h-4 text-gray-400" />}
              value={searchQuery}
              onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            />
          </div>

          {/* Secondary Controls */}
          <div className="flex flex-wrap items-center justify-between lg:justify-end gap-3">
            {/* In-Stock Only Toggle */}
            <label className="flex items-center gap-2 text-xs font-semibold text-gray-700 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => dispatch(setInStockOnly(e.target.checked))}
                className="w-4 h-4 text-[#2959A3] rounded border-gray-300 focus:ring-[#2959A3]"
              />
              <span>In-Stock Only</span>
            </label>

            {/* Sort Dropdown */}
            <div className="w-48">
              <Select
                value={sortOption}
                onChange={(e) =>
                  dispatch(setSortOption(e.target.value as CatalogSortOption))
                }
                options={[
                  { label: 'Most Popular', value: 'popularity' },
                  { label: 'Highest Margin %', value: 'margin-desc' },
                  { label: 'Price: Low to High', value: 'price-asc' },
                  { label: 'Price: High to Low', value: 'price-desc' },
                  { label: 'Product Name (A-Z)', value: 'name-asc' },
                ]}
              />
            </div>

            {/* Grid / List Toggle */}
            <div className="flex items-center gap-1 p-1 bg-gray-100 rounded-xl">
              <button
                type="button"
                onClick={() => dispatch(setViewMode('grid'))}
                aria-label="Grid layout"
                className={cn(
                  'p-1.5 rounded-lg transition-colors',
                  viewMode === 'grid'
                    ? 'bg-white text-[#2959A3] shadow-2xs'
                    : 'text-gray-500 hover:text-gray-800'
                )}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => dispatch(setViewMode('list'))}
                aria-label="List layout"
                className={cn(
                  'p-1.5 rounded-lg transition-colors',
                  viewMode === 'list'
                    ? 'bg-white text-[#2959A3] shadow-2xs'
                    : 'text-gray-500 hover:text-gray-800'
                )}
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            {/* Reset Filters */}
            {(searchQuery || selectedCategory !== 'all' || inStockOnly) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => dispatch(resetFilters())}
                leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
              >
                Reset
              </Button>
            )}
          </div>
        </div>

        {/* Results Counter and Active Category Headline */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold text-[#111827]">
              {activeCategory.name}
            </h2>
            <p className="text-xs text-gray-500">{activeCategory.description}</p>
          </div>
          <span className="text-xs font-semibold text-gray-500">
            Showing {products.length} products
          </span>
        </div>

        {/* Products Grid / List */}
        {products.length === 0 ? (
          <div className="p-16 rounded-3xl bg-white border border-gray-200 text-center flex flex-col items-center">
            <Store className="w-16 h-16 text-gray-300 mb-4" />
            <h3 className="text-lg font-bold text-gray-900 mb-1">
              No products found
            </h3>
            <p className="text-xs text-gray-500 max-w-sm mb-6 leading-relaxed">
              We couldn't find any items matching your search criteria. Try clearing filters or searching for another FMCG brand.
            </p>
            <Button
              variant="primary"
              size="md"
              onClick={() => dispatch(resetFilters())}
              leftIcon={<RotateCcw className="w-4 h-4" />}
            >
              Reset All Filters
            </Button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} layout="grid" />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} layout="list" />
            ))}
          </div>
        )}
      </div>

      {/* Floating Bottom Cart Bar (if items in cart) */}
      {cartCount > 0 && (
        <div className="fixed bottom-6 inset-x-4 max-w-xl mx-auto z-30 animate-in slide-in-from-bottom duration-300">
          <div className="p-4 rounded-3xl bg-[#363E51] text-white shadow-2xl border border-white/10 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#63C7ED] text-[#0A2540] flex items-center justify-center font-bold">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">
                  {cartCount} items • {formatINR(cartWholesale)}
                </p>
                <p className="text-[11px] text-emerald-400 font-semibold">
                  You save {formatINR(cartSavings)} vs MRP
                </p>
              </div>
            </div>

            <Button
              variant="accent"
              size="md"
              onClick={() => dispatch(openCartDrawer())}
              className="font-bold rounded-xl"
            >
              Review Cart
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
