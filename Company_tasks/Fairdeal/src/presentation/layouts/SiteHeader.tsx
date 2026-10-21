import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ShoppingBag, Menu, Sparkles } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '@/app/store/hooks'
import { openMobileMenu } from '@/application/features/navigation/navigationSlice'
import { toggleCartDrawer } from '@/application/features/cart/cartSlice'
import { selectCartTotalCount } from '@/application/selectors/cartSelectors'
import { Button } from '@/presentation/ui/Button'
import { APP_CONFIG } from '@/infrastructure/config/appConfig'
import { cn } from '@/shared/utils/cn'

export const SiteHeader: React.FC = () => {
  const dispatch = useAppDispatch()
  const location = useLocation()
  const cartItemCount = useAppSelector(selectCartTotalCount)

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true
    if (path !== '/' && location.pathname.startsWith(path)) return true
    return false
  }

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-gray-100 transition-all duration-200">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 h-18 flex items-center justify-between gap-4">
        {/* Brand Logo & Prototype Tag */}
        <Link
          to="/"
          className="flex items-center gap-3 shrink-0 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2959A3] rounded-xl p-1"
        >
          <div className="w-10 h-10 rounded-xl bg-[#2959A3] flex items-center justify-center text-white font-extrabold text-xl shadow-md group-hover:scale-105 transition-transform">
            <span className="text-[#63C7ED]">F</span>
            <span>D</span>
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-xl tracking-tight text-[#111827] leading-none">
              Fairdeal<span className="text-[#2959A3]">.market</span>
            </span>
            <span className="text-[10px] font-semibold tracking-wider text-[#63C7ED] uppercase mt-0.5">
              Wholesale FMCG • 60 Min
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav
          className="hidden xl:flex items-center gap-1.5"
          aria-label="Main Navigation"
        >
          {APP_CONFIG.navLinks.map((item) => {
            const active = isActive(item.path)
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'relative px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-150',
                  active
                    ? 'bg-[#F3F8FF] text-[#2959A3] font-semibold shadow-xs'
                    : 'text-[#363E51] hover:text-[#111827] hover:bg-gray-50',
                  item.highlight &&
                    !active &&
                    'text-[#2959A3] font-semibold bg-blue-50/50 border border-blue-100/80'
                )}
              >
                <span className="flex items-center gap-1.5">
                  {item.highlight && (
                    <Sparkles className="w-3.5 h-3.5 text-[#2959A3] animate-pulse" />
                  )}
                  {item.label}
                </span>
                {active && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#2959A3] rounded-full" />
                )}
              </Link>
            )
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {/* Demo Cart Trigger */}
          <button
            type="button"
            onClick={() => dispatch(toggleCartDrawer())}
            aria-label={`Open shopping cart with ${cartItemCount} items`}
            className="relative flex items-center justify-center h-11 px-3.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-[#363E51] transition-all hover:border-[#2959A3]/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2959A3]"
          >
            <ShoppingBag className="w-5 h-5 text-[#2959A3]" />
            <span className="hidden sm:inline-block ml-2 text-xs font-bold text-gray-700">
              Demo Cart
            </span>
            {cartItemCount > 0 && (
              <span className="ml-1.5 flex h-5 min-w-5 px-1.5 items-center justify-center rounded-full bg-[#2959A3] text-white text-[11px] font-bold shadow-xs">
                {cartItemCount}
              </span>
            )}
          </button>

          {/* Download App CTA (Opens Official App Stores) */}
          <a
            href={APP_CONFIG.social.playStore}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex"
          >
            <Button
              variant="secondary"
              size="md"
              className="bg-[#3B3F59] hover:bg-[#2C3044] text-white font-semibold rounded-xl"
            >
              Download App
            </Button>
          </a>

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            onClick={() => dispatch(openMobileMenu())}
            aria-label="Open mobile navigation menu"
            className="xl:hidden flex items-center justify-center w-11 h-11 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2959A3]"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  )
}
