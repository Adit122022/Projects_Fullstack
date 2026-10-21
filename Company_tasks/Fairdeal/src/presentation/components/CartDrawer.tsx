import React from 'react'
import { Plus, Minus, Trash2, ArrowRight, CheckCircle2, ShieldCheck, Zap } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '@/app/store/hooks'
import {
  closeCartDrawer,
  updateQuantity,
  removeFromCart,
  clearCart,
  setCheckoutStatus,
} from '@/application/features/cart/cartSlice'
import {
  selectIsCartDrawerOpen,
  selectCartItemsList,
  selectCartTotalCount,
  selectCartTotalWholesale,
  selectCartTotalMRP,
  selectCartTotalSavings,
  selectCartAverageMargin,
  selectCheckoutStatus,
} from '@/application/selectors/cartSelectors'
import { Sheet } from '@/presentation/ui/Sheet'
import { Dialog } from '@/presentation/ui/Dialog'
import { Button } from '@/presentation/ui/Button'
import { formatINR, formatDiscount } from '@/shared/utils/formatters'

export const CartDrawer: React.FC = () => {
  const dispatch = useAppDispatch()
  const isOpen = useAppSelector(selectIsCartDrawerOpen)
  const items = useAppSelector(selectCartItemsList)
  const totalCount = useAppSelector(selectCartTotalCount)
  const totalWholesale = useAppSelector(selectCartTotalWholesale)
  const totalMRP = useAppSelector(selectCartTotalMRP)
  const totalSavings = useAppSelector(selectCartTotalSavings)
  const avgMargin = useAppSelector(selectCartAverageMargin)
  const checkoutStatus = useAppSelector(selectCheckoutStatus)

  const handleSimulateCheckout = () => {
    dispatch(setCheckoutStatus('processing'))
    setTimeout(() => {
      dispatch(setCheckoutStatus('confirmed'))
    }, 1200)
  }

  return (
    <>
      <Sheet
        isOpen={isOpen}
        onClose={() => dispatch(closeCartDrawer())}
        title="Kirana Wholesale Cart"
        description={`${totalCount} wholesale items selected for 60-min delivery`}
        side="right"
      >
        <div className="flex flex-col h-full justify-between gap-6">
          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8 text-gray-500">
              <div className="w-16 h-16 rounded-3xl bg-blue-50 text-[#2959A3] flex items-center justify-center mb-4">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-1">Your cart is empty</h3>
              <p className="text-xs text-gray-500 max-w-xs mb-6">
                Explore our wholesale catalog to calculate your store profit margins and test the 60-minute delivery flow.
              </p>
              <Button
                variant="primary"
                size="md"
                onClick={() => dispatch(closeCartDrawer())}
              >
                Browse FMCG Catalog
              </Button>
            </div>
          ) : (
            <>
              {/* Items List */}
              <div className="flex-1 overflow-y-auto flex flex-col gap-3 pr-1">
                <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Product Details
                  </span>
                  <button
                    type="button"
                    onClick={() => dispatch(clearCart())}
                    className="text-xs text-red-600 hover:text-red-700 font-semibold"
                  >
                    Clear All
                  </button>
                </div>

                {items.map(({ product, quantity }) => {
                  const lineTotalWholesale = product.wholesalePrice * quantity
                  const lineTotalMRP = product.mrp * quantity
                  const lineSavings = lineTotalMRP - lineTotalWholesale

                  return (
                    <div
                      key={product.id}
                      className="p-3 rounded-2xl border border-gray-100 bg-white hover:border-gray-200 shadow-2xs flex gap-3 items-center"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 rounded-xl object-cover bg-gray-50 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-xs font-bold text-[#111827] truncate">
                            {product.name}
                          </h4>
                          <button
                            type="button"
                            onClick={() => dispatch(removeFromCart(product.id))}
                            aria-label={`Remove ${product.name}`}
                            className="text-gray-400 hover:text-red-600 transition-colors p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-[11px] text-gray-500">{product.packSize}</p>

                        <div className="flex items-center justify-between mt-2">
                          <div className="flex flex-col">
                            <span className="text-xs font-black text-[#2959A3]">
                              {formatINR(product.wholesalePrice)}
                              <span className="text-[10px] font-normal text-gray-500"> / unit</span>
                            </span>
                            <span className="text-[10px] text-gray-400 line-through">
                              MRP {formatINR(product.mrp)}
                            </span>
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg p-1">
                            <button
                              type="button"
                              onClick={() =>
                                dispatch(
                                  updateQuantity({
                                    productId: product.id,
                                    quantity: quantity - 1,
                                  })
                                )
                              }
                              className="w-6 h-6 rounded flex items-center justify-center bg-white text-gray-700 hover:bg-gray-100 shadow-2xs"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-bold px-1 min-w-[20px] text-center">
                              {quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                dispatch(
                                  updateQuantity({
                                    productId: product.id,
                                    quantity: quantity + 1,
                                  })
                                )
                              }
                              className="w-6 h-6 rounded flex items-center justify-center bg-white text-gray-700 hover:bg-gray-100 shadow-2xs"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>

                        {lineSavings > 0 && (
                          <div className="mt-1.5 text-[10px] font-semibold text-emerald-600">
                            Store profit: {formatINR(lineSavings)} ({formatDiscount(product.marginPercentage)})
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Order Cost & Margin Savings Summary */}
              <div className="pt-4 border-t border-gray-100 flex flex-col gap-3">
                <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-emerald-900 block">
                      Estimated Retailer Margin Profit
                    </span>
                    <span className="text-[11px] text-emerald-700">
                      Average {avgMargin.toFixed(1)}% savings vs MRP
                    </span>
                  </div>
                  <span className="text-base font-extrabold text-emerald-700">
                    +{formatINR(totalSavings)}
                  </span>
                </div>

                <div className="flex flex-col gap-1.5 text-xs text-gray-600">
                  <div className="flex justify-between">
                    <span>Total MRP Value</span>
                    <span className="line-through text-gray-400">{formatINR(totalMRP)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-[#111827] text-sm pt-1 border-t border-gray-100">
                    <span>Wholesale Total (Payable)</span>
                    <span className="text-base text-[#2959A3]">{formatINR(totalWholesale)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-gray-500 justify-center">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Guaranteed 60-Minute Delivery to Your Kirana</span>
                </div>

                <Button
                  variant="primary"
                  size="lg"
                  className="w-full text-sm font-bold shadow-md rounded-xl"
                  onClick={handleSimulateCheckout}
                  isLoading={checkoutStatus === 'processing'}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Simulate Wholesale Checkout
                </Button>
              </div>
            </>
          )}
        </div>
      </Sheet>

      {/* Confirmation Modal */}
      <Dialog
        isOpen={checkoutStatus === 'confirmed'}
        onClose={() => dispatch(setCheckoutStatus('idle'))}
        title="Prototype Wholesale Order Confirmed!"
        description="Demo confirmation demonstrating Redux state persistence & cart lifecycle."
      >
        <div className="flex flex-col items-center text-center p-4">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <h3 className="text-lg font-bold text-[#111827] mb-2">
            Order #FD-92841 Dispatched
          </h3>

          <p className="text-sm text-gray-600 max-w-md mb-6 leading-relaxed">
            Your prototype order has been simulated successfully. In the live Fairdeal retailer application, dark store pickers pack this order in under 10 minutes for last-mile delivery to your Kirana counter.
          </p>

          <div className="w-full bg-[#F3F8FF] rounded-2xl p-4 border border-[#2959A3]/20 mb-6 text-left flex flex-col gap-2 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-500">Dispatch Hub:</span>
              <span className="font-semibold text-gray-800">Sector 67 Dark Store, Gurugram</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Target Delivery Time:</span>
              <span className="font-semibold text-emerald-700">42 Minutes Remaining</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Estimated Profit Retained:</span>
              <span className="font-bold text-[#2959A3]">Higher Daily Kirana Margin</span>
            </div>
          </div>

          <Button
            variant="primary"
            size="md"
            className="w-full"
            onClick={() => dispatch(setCheckoutStatus('idle'))}
          >
            Done
          </Button>
        </div>
      </Dialog>
    </>
  )
}
