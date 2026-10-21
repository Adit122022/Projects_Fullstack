import React, { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { SiteHeader } from './SiteHeader'
import { MobileNavigation } from './MobileNavigation'
import { SiteFooter } from './SiteFooter'
import { CartDrawer } from '@/presentation/components/CartDrawer'
import { useAppDispatch } from '@/app/store/hooks'
import { setActiveRoute } from '@/application/features/navigation/navigationSlice'

export const RootLayout: React.FC = () => {
  const location = useLocation()
  const dispatch = useAppDispatch()

  // Scroll to top and sync route on change
  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(setActiveRoute(location.pathname))
  }, [location.pathname, dispatch])

  return (
    <div className="flex min-h-screen flex-col bg-white text-[#111827]">
      {/* Main Responsive Header */}
      <SiteHeader />

      {/* Mobile Slide-Out Navigation Drawer */}
      <MobileNavigation />

      {/* Page Content Body */}
      <main className="flex-1 w-full" id="main-content">
        <Outlet />
      </main>

      {/* Interactive Global Demo Cart Drawer */}
      <CartDrawer />

      {/* Comprehensive Site Footer */}
      <SiteFooter />
    </div>
  )
}
