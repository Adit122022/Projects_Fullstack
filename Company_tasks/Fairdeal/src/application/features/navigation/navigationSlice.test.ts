import { describe, it, expect } from 'vitest'
import navigationReducer, {
  openMobileMenu,
  closeMobileMenu,
  toggleMobileMenu,
  openSearchModal,
  closeSearchModal,
  setActiveRoute,
  type NavigationState,
} from './navigationSlice'

describe('Navigation Redux Slice', () => {
  const initialState: NavigationState = {
    isMobileMenuOpen: false,
    isSearchModalOpen: false,
    activeRoute: '/',
  }

  it('handles mobile menu opening, closing, and toggling', () => {
    let state = navigationReducer(initialState, openMobileMenu())
    expect(state.isMobileMenuOpen).toBe(true)

    state = navigationReducer(state, closeMobileMenu())
    expect(state.isMobileMenuOpen).toBe(false)

    state = navigationReducer(state, toggleMobileMenu())
    expect(state.isMobileMenuOpen).toBe(true)
  })

  it('handles search modal toggle states', () => {
    let state = navigationReducer(initialState, openSearchModal())
    expect(state.isSearchModalOpen).toBe(true)

    state = navigationReducer(state, closeSearchModal())
    expect(state.isSearchModalOpen).toBe(false)
  })

  it('updates active route and automatically closes mobile drawer for seamless navigation', () => {
    let state = navigationReducer(initialState, openMobileMenu())
    expect(state.isMobileMenuOpen).toBe(true)

    state = navigationReducer(state, setActiveRoute('/brand-partner'))
    expect(state.activeRoute).toBe('/brand-partner')
    expect(state.isMobileMenuOpen).toBe(false)
  })
})
