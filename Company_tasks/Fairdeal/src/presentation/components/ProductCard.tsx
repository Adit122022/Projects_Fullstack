import React from 'react'
import { Plus, Minus, ShoppingCart, Check } from 'lucide-react'
import type { Product } from '@/domain/entities'
import { useAppDispatch, useAppSelector } from '@/app/store/hooks'
import { addToCart, updateQuantity } from '@/application/features/cart/cartSlice'
import { selectCartItemsDict } from '@/application/selectors/cartSelectors'
import { formatINR, formatDiscount } from '@/shared/utils/formatters'
import { Badge } from '@/presentation/ui/Badge'
import { Button } from '@/presentation/ui/Button'

export interface ProductCardProps {
  product: Product
  layout?: 'grid' | 'list'
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  layout = 'grid',
}) => {
  const dispatch = useAppDispatch()
  const cartDict = useAppSelector(selectCartItemsDict)
  const cartItem = cartDict[product.id]
  const inCartQty = cartItem ? cartItem.quantity : 0

  const profitPerUnit = product.mrp - product.wholesalePrice

  if (layout === 'list') {
    return (
      <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-white rounded-2xl border border-gray-200/80 hover:border-[#2959A3]/40 hover:shadow-md transition-all gap-4">
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-gray-50 shrink-0">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            {product.marginPercentage > 0 && (
              <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded-md bg-emerald-600 text-white font-extrabold text-[10px]">
                {formatDiscount(product.marginPercentage)}
              </span>
            )}
          </div>

          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#2959A3]">
                {product.brand}
              </span>
              {product.isBestSeller && (
                <Badge variant="accent" size="sm">
                  Best Seller
                </Badge>
              )}
            </div>
            <h3 className="text-sm font-bold text-[#111827] truncate mt-0.5">
              {product.name}
            </h3>
            <p className="text-xs text-gray-500">{product.packSize}</p>
            <span className="text-[11px] font-semibold text-emerald-600 mt-1">
              Store profit: +{formatINR(profitPerUnit)} / unit
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100">
          <div className="flex flex-col items-start sm:items-end">
            <span className="text-base font-black text-[#2959A3]">
              {formatINR(product.wholesalePrice)}
            </span>
            <span className="text-xs text-gray-400 line-through">
              MRP {formatINR(product.mrp)}
            </span>
          </div>

          {inCartQty > 0 ? (
            <div className="flex items-center gap-2 bg-[#F3F8FF] border border-[#2959A3]/30 rounded-xl p-1">
              <button
                type="button"
                onClick={() =>
                  dispatch(
                    updateQuantity({
                      productId: product.id,
                      quantity: inCartQty - 1,
                    })
                  )
                }
                className="w-8 h-8 rounded-lg flex items-center justify-center bg-white text-[#2959A3] hover:bg-gray-100 shadow-2xs"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="text-xs font-bold px-2 text-[#2959A3] min-w-[24px] text-center">
                {inCartQty}
              </span>
              <button
                type="button"
                onClick={() =>
                  dispatch(
                    updateQuantity({
                      productId: product.id,
                      quantity: inCartQty + 1,
                    })
                  )
                }
                className="w-8 h-8 rounded-lg flex items-center justify-center bg-white text-[#2959A3] hover:bg-gray-100 shadow-2xs"
                aria-label="Increase quantity"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <Button
              variant="primary"
              size="sm"
              onClick={() => dispatch(addToCart({ product }))}
              leftIcon={<ShoppingCart className="w-3.5 h-3.5" />}
            >
              Add
            </Button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="group flex flex-col justify-between bg-white rounded-3xl border border-gray-200/80 hover:border-[#2959A3]/40 hover:shadow-xl transition-all duration-300 p-4 relative overflow-hidden">
      <div>
        {/* Thumbnail & Badges */}
        <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-gray-50 mb-3.5">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />

          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start">
            <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white font-black text-[10px] tracking-wide shadow-xs">
              {formatDiscount(product.marginPercentage)}
            </span>
            {product.isBestSeller && (
              <span className="px-2 py-0.5 rounded-full bg-[#2959A3] text-white font-bold text-[10px] shadow-xs">
                Popular
              </span>
            )}
          </div>
        </div>

        {/* Brand & Title */}
        <span className="text-[11px] font-bold uppercase tracking-wider text-[#2959A3] block">
          {product.brand}
        </span>
        <h3 className="text-sm font-bold text-[#111827] mt-0.5 line-clamp-2 leading-snug">
          {product.name}
        </h3>
        <p className="text-xs text-gray-500 mt-1">{product.packSize}</p>

        {/* Unit Profit Tag */}
        <div className="mt-2.5 px-2.5 py-1 rounded-xl bg-emerald-50 border border-emerald-100 inline-block text-[11px] font-bold text-emerald-800">
          Store Profit: +{formatINR(profitPerUnit)}
        </div>
      </div>

      {/* Pricing & Cart Action */}
      <div className="pt-4 mt-3 border-t border-gray-100 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-lg font-black text-[#2959A3] leading-none">
            {formatINR(product.wholesalePrice)}
          </span>
          <span className="text-[11px] text-gray-400 line-through mt-0.5">
            MRP {formatINR(product.mrp)}
          </span>
        </div>

        {inCartQty > 0 ? (
          <div className="flex items-center gap-1.5 bg-[#F3F8FF] border border-[#2959A3]/30 rounded-xl p-1 shadow-2xs">
            <button
              type="button"
              onClick={() =>
                dispatch(
                  updateQuantity({
                    productId: product.id,
                    quantity: inCartQty - 1,
                  })
                )
              }
              className="w-7 h-7 rounded-lg flex items-center justify-center bg-white text-[#2959A3] hover:bg-gray-100 shadow-2xs"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="text-xs font-bold px-1 text-[#2959A3] min-w-[20px] text-center">
              {inCartQty}
            </span>
            <button
              type="button"
              onClick={() =>
                dispatch(
                  updateQuantity({
                    productId: product.id,
                    quantity: inCartQty + 1,
                  })
                )
              }
              className="w-7 h-7 rounded-lg flex items-center justify-center bg-white text-[#2959A3] hover:bg-gray-100 shadow-2xs"
              aria-label="Increase quantity"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <Button
            variant="primary"
            size="sm"
            onClick={() => dispatch(addToCart({ product }))}
            className="rounded-xl font-bold"
            leftIcon={<Plus className="w-3.5 h-3.5" />}
          >
            Add
          </Button>
        )}
      </div>
    </div>
  )
}
