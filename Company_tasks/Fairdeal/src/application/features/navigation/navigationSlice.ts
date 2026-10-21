import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface NavigationState {
  isMobileMenuOpen: boolean
  isSearchModalOpen: boolean
  activeRoute: string
}

const initialState: NavigationState = {
  isMobileMenuOpen: false,
  isSearchModalOpen: false,
  activeRoute: '/',
}

export const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    openMobileMenu: (state) => {
      state.isMobileMenuOpen = true
    },
    closeMobileMenu: (state) => {
      state.isMobileMenuOpen = false
    },
    toggleMobileMenu: (state) => {
      state.isMobileMenuOpen = !state.isMobileMenuOpen
    },
    openSearchModal: (state) => {
      state.isSearchModalOpen = true
    },
    closeSearchModal: (state) => {
      state.isSearchModalOpen = false
    },
    setActiveRoute: (state, action: PayloadAction<string>) => {
      state.activeRoute = action.payload
      state.isMobileMenuOpen = false // Automatically close mobile menu on route change
    },
  },
})

export const {
  openMobileMenu,
  closeMobileMenu,
  toggleMobileMenu,
  openSearchModal,
  closeSearchModal,
  setActiveRoute,
} = navigationSlice.actions

export default navigationSlice.reducer
