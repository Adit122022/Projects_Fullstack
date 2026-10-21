import { createSelector } from '@reduxjs/toolkit'
import type { RootState } from '@/app/store'

export const selectCartState = (state: RootState) => state.cart
export const selectCartItemsDict = (state: RootState) => state.cart.items
export const selectIsCartDrawerOpen = (state: RootState) => state.cart.isDrawerOpen
export const selectCheckoutStatus = (state: RootState) => state.cart.checkoutStatus

export const selectCartItemsList = createSelector(
  [selectCartItemsDict],
  (itemsDict) => Object.values(itemsDict)
)

export const selectCartTotalCount = createSelector(
  [selectCartItemsList],
  (items) => items.reduce((sum, item) => sum + item.quantity, 0)
)

export const selectCartTotalWholesale = createSelector(
  [selectCartItemsList],
  (items) =>
    items.reduce((sum, item) => sum + item.product.wholesalePrice * item.quantity, 0)
)

export const selectCartTotalMRP = createSelector(
  [selectCartItemsList],
  (items) => items.reduce((sum, item) => sum + item.product.mrp * item.quantity, 0)
)

export const selectCartTotalSavings = createSelector(
  [selectCartTotalMRP, selectCartTotalWholesale],
  (mrp, wholesale) => Math.max(0, mrp - wholesale)
)

export const selectCartAverageMargin = createSelector(
  [selectCartTotalMRP, selectCartTotalSavings],
  (mrp, savings) => (mrp > 0 ? (savings / mrp) * 100 : 0)
)

export const selectIsCartEmpty = createSelector(
  [selectCartTotalCount],
  (count) => count === 0
)
