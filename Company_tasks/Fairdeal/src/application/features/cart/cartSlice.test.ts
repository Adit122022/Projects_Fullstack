import { describe, it, expect } from 'vitest'
import cartReducer, {
  addToCart,
  updateQuantity,
  removeFromCart,
  clearCart,
  openCartDrawer,
  closeCartDrawer,
  toggleCartDrawer,
  setCheckoutStatus,
  type CartState,
} from './cartSlice'
import type { Product } from '@/domain/entities'
import {
  selectCartItemsList,
  selectCartTotalCount,
  selectCartTotalWholesale,
  selectCartTotalMRP,
  selectCartTotalSavings,
  selectCartAverageMargin,
  selectIsCartEmpty,
} from '@/application/selectors/cartSelectors'
import type { RootState } from '@/app/store'

const mockProductA: Product = {
  id: 'prod-1',
  name: 'Tata Salt Iodized 1kg',
  brand: 'Tata Consumer',
  category: 'spices-staples',
  mrp: 28,
  wholesalePrice: 23,
  marginPercentage: 17.8,
  minOrderQty: 24,
  packSize: '24 units / carton',
  inStock: true,
  image: 'https://images.unsplash.com/photo-1518843875459-f738682238a6?auto=format&fit=crop&w=400&q=80',
}

const mockProductB: Product = {
  id: 'prod-2',
  name: 'Fortune Sunlite Sunflower Oil 1L',
  brand: 'Fortune',
  category: 'edible-oils',
  mrp: 145,
  wholesalePrice: 122,
  marginPercentage: 15.8,
  minOrderQty: 10,
  packSize: '10 units / box',
  inStock: true,
  image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=400&q=80',
}

describe('Cart Redux Slice & Selectors', () => {
  const initialEmptyState: CartState = {
    items: {},
    isDrawerOpen: false,
    lastAddedProductId: null,
    checkoutStatus: 'idle',
  }

  describe('Reducers', () => {
    it('adds a new product to cart respecting minOrderQty', () => {
      const state = cartReducer(initialEmptyState, addToCart({ product: mockProductA }))
      expect(state.items['prod-1']).toBeDefined()
      // Since minOrderQty is 24, initial quantity should be 24
      expect(state.items['prod-1'].quantity).toBe(24)
      expect(state.lastAddedProductId).toBe('prod-1')
    })

    it('increments quantity when existing item is added again', () => {
      const state1 = cartReducer(initialEmptyState, addToCart({ product: mockProductA, quantity: 24 }))
      const state2 = cartReducer(state1, addToCart({ product: mockProductA, quantity: 12 }))
      expect(state2.items['prod-1'].quantity).toBe(36)
    })

    it('updates quantity to specific value', () => {
      const state1 = cartReducer(initialEmptyState, addToCart({ product: mockProductA }))
      const state2 = cartReducer(state1, updateQuantity({ productId: 'prod-1', quantity: 50 }))
      expect(state2.items['prod-1'].quantity).toBe(50)
    })

    it('removes item when quantity is reduced to 0 or less', () => {
      const state1 = cartReducer(initialEmptyState, addToCart({ product: mockProductA }))
      const state2 = cartReducer(state1, updateQuantity({ productId: 'prod-1', quantity: 0 }))
      expect(state2.items['prod-1']).toBeUndefined()
    })

    it('removes item directly via removeFromCart', () => {
      let state = cartReducer(initialEmptyState, addToCart({ product: mockProductA }))
      state = cartReducer(state, addToCart({ product: mockProductB }))
      state = cartReducer(state, removeFromCart('prod-1'))
      expect(state.items['prod-1']).toBeUndefined()
      expect(state.items['prod-2']).toBeDefined()
    })

    it('clears all items from cart', () => {
      let state = cartReducer(initialEmptyState, addToCart({ product: mockProductA }))
      state = cartReducer(state, addToCart({ product: mockProductB }))
      state = cartReducer(state, clearCart())
      expect(Object.keys(state.items).length).toBe(0)
    })

    it('toggles drawer state correctly', () => {
      let state = cartReducer(initialEmptyState, openCartDrawer())
      expect(state.isDrawerOpen).toBe(true)
      state = cartReducer(state, closeCartDrawer())
      expect(state.isDrawerOpen).toBe(false)
      state = cartReducer(state, toggleCartDrawer())
      expect(state.isDrawerOpen).toBe(true)
    })

    it('clears cart when checkoutStatus is set to confirmed', () => {
      let state = cartReducer(initialEmptyState, addToCart({ product: mockProductA }))
      state = cartReducer(state, setCheckoutStatus('confirmed'))
      expect(state.checkoutStatus).toBe('confirmed')
      expect(Object.keys(state.items).length).toBe(0)
    })
  })

  describe('Memoized Selectors', () => {
    const mockRootState = {
      cart: {
        items: {
          'prod-1': { product: mockProductA, quantity: 24 }, // wholesale: 23*24 = 552, mrp: 28*24 = 672
          'prod-2': { product: mockProductB, quantity: 10 }, // wholesale: 122*10 = 1220, mrp: 145*10 = 1450
        },
        isDrawerOpen: false,
        lastAddedProductId: 'prod-2',
        checkoutStatus: 'idle',
      },
    } as unknown as RootState

    it('correctly calculates total item count', () => {
      expect(selectCartTotalCount(mockRootState)).toBe(34) // 24 + 10
    })

    it('correctly calculates wholesale order total', () => {
      expect(selectCartTotalWholesale(mockRootState)).toBe(552 + 1220) // 1772
    })

    it('correctly calculates total MRP', () => {
      expect(selectCartTotalMRP(mockRootState)).toBe(672 + 1450) // 2122
    })

    it('correctly computes retailer margin savings (MRP - Wholesale)', () => {
      expect(selectCartTotalSavings(mockRootState)).toBe(2122 - 1772) // 350
    })

    it('computes accurate retailer margin percentage', () => {
      const margin = selectCartAverageMargin(mockRootState)
      expect(margin).toBeCloseTo((350 / 2122) * 100, 1)
    })

    it('accurately identifies empty vs non-empty cart state', () => {
      expect(selectIsCartEmpty(mockRootState)).toBe(false)

      const emptyRootState = {
        cart: initialEmptyState,
      } as unknown as RootState
      expect(selectIsCartEmpty(emptyRootState)).toBe(true)
    })
  })
})
