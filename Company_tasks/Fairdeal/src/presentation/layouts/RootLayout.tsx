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
      {/* Top Banner Clarifying Independent Proposal */}
      <div className="w-full bg-[#111827] text-white py-1.5 px-4 text-center text-[11px] font-semibold tracking-wide border-b border-white/10 flex items-center justify-center gap-2">
        <span className="px-1.5 py-0.2 rounded bg-[#63C7ED] text-[#0A2540] font-bold text-[9px] uppercase">
          Proposal
        </span>
        <span>
          Fairdeal.market UI/UX Redesign Prototype — Engineering Showcase by Senior Frontend Candidate
        </span>
      </div>

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
