import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Product, CartItem } from '@/domain/entities'

export interface CartState {
  items: Record<string, CartItem>
  isDrawerOpen: boolean
  lastAddedProductId: string | null
  checkoutStatus: 'idle' | 'processing' | 'confirmed'
}

const initialState: CartState = {
  items: {},
  isDrawerOpen: false,
  lastAddedProductId: null,
  checkoutStatus: 'idle',
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{ product: Product; quantity?: number }>
    ) => {
      const { product, quantity = 1 } = action.payload
      const existing = state.items[product.id]

      if (existing) {
        existing.quantity += quantity
      } else {
        state.items[product.id] = {
          product,
          quantity: Math.max(quantity, product.minOrderQty || 1),
        }
      }

      state.lastAddedProductId = product.id
      state.checkoutStatus = 'idle'
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ productId: string; quantity: number }>
    ) => {
      const { productId, quantity } = action.payload
      if (quantity <= 0) {
        delete state.items[productId]
      } else if (state.items[productId]) {
        state.items[productId].quantity = quantity
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      delete state.items[action.payload]
    },
    clearCart: (state) => {
      state.items = {}
      state.checkoutStatus = 'idle'
    },
    openCartDrawer: (state) => {
      state.isDrawerOpen = true
    },
    closeCartDrawer: (state) => {
      state.isDrawerOpen = false
    },
    toggleCartDrawer: (state) => {
      state.isDrawerOpen = !state.isDrawerOpen
    },
    setCheckoutStatus: (
      state,
      action: PayloadAction<'idle' | 'processing' | 'confirmed'>
    ) => {
      state.checkoutStatus = action.payload
      if (action.payload === 'confirmed') {
        state.items = {}
      }
    },
  },
})

export const {
  addToCart,
  updateQuantity,
  removeFromCart,
  clearCart,
  openCartDrawer,
  closeCartDrawer,
  toggleCartDrawer,
  setCheckoutStatus,
} = cartSlice.actions

export default cartSlice.reducer
