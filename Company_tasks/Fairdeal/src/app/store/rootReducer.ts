import { combineReducers } from '@reduxjs/toolkit'
import catalogReducer from '@/application/features/catalog/catalogSlice'
import cartReducer from '@/application/features/cart/cartSlice'
import navigationReducer from '@/application/features/navigation/navigationSlice'
import brandPartnerReducer from '@/application/features/brandPartners/brandPartnerSlice'
import careersReducer from '@/application/features/careers/careersSlice'

export const rootReducer = combineReducers({
  catalog: catalogReducer,
  cart: cartReducer,
  navigation: navigationReducer,
  brandPartners: brandPartnerReducer,
  careers: careersReducer,
})
