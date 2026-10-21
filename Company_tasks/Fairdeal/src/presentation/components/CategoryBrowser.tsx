import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Wine,
  Cookie,
  Cake,
  Flame,
  Coffee,
  Utensils,
  Sparkles,
  ArrowRight,
} from 'lucide-react'
import { useAppDispatch } from '@/app/store/hooks'
import { setSelectedCategory } from '@/application/features/catalog/catalogSlice'
import { MOCK_CATEGORIES } from '@/infrastructure/mock-data/mockCategories'

const iconMap: Record<string, React.ElementType> = {
  Wine,
  Cookie,
  Cake,
  Flame,
  Coffee,
  Utensils,
  Sparkles,
}

export const CategoryBrowser: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const categories = MOCK_CATEGORIES.filter((c) => c.slug !== 'all')

  const handleSelectCategory = (slug: string) => {
    dispatch(setSelectedCategory(slug))
    navigate(`/retailer-experience?cat=${slug}`)
  }

  return (
    <section className="w-full py-16 lg:py-24 bg-[#F3F8FF] border-b border-gray-100">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#111827] tracking-tight">
              Browse by <span className="text-[#2959A3]">Categories</span>
            </h2>
            <p className="text-sm sm:text-base text-[#6F6F6F] mt-2 max-w-xl">
              From cold drinks and snacks to personal care and staples, everything your store needs, all in one place.
            </p>
          </div>

          <button
            type="button"
            onClick={() => handleSelectCategory('all')}
            className="inline-flex items-center gap-2 text-sm font-bold text-[#2959A3] hover:text-[#1E437C] group shrink-0"
          >
            <span>View Full 1,000+ SKU Catalog</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((cat) => {
            const Icon = iconMap[cat.icon] || Sparkles

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleSelectCategory(cat.slug)}
                className="group flex flex-col items-start p-6 rounded-3xl bg-white border border-gray-200/80 hover:border-[#2959A3]/50 hover:shadow-lg transition-all duration-200 text-left cursor-pointer"
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 shadow-xs"
                  style={{ backgroundColor: `${cat.color}15`, color: cat.color }}
                >
                  <Icon className="w-6 h-6" />
                </div>

                <h3 className="text-base font-bold text-[#111827] group-hover:text-[#2959A3] transition-colors leading-snug">
                  {cat.name}
                </h3>
                <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                  {cat.description}
                </p>

                <div className="flex items-center justify-between w-full mt-4 pt-3 border-t border-gray-100 text-xs font-semibold text-[#2959A3]">
                  <span>{cat.itemCount}+ Wholesale SKUs</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
