import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  Home,
  Store,
  Users,
  Briefcase,
  Truck,
  HelpCircle,
  Phone,
  Mail,
  ShoppingBag,
  ExternalLink,
} from 'lucide-react'
import { useAppDispatch, useAppSelector } from '@/app/store/hooks'
import { closeMobileMenu } from '@/application/features/navigation/navigationSlice'
import { openCartDrawer } from '@/application/features/cart/cartSlice'
import { selectCartTotalCount } from '@/application/selectors/cartSelectors'
import { Sheet } from '@/presentation/ui/Sheet'
import { APP_CONFIG } from '@/infrastructure/config/appConfig'
import { cn } from '@/shared/utils/cn'

export const MobileNavigation: React.FC = () => {
  const dispatch = useAppDispatch()
  const location = useLocation()
  const isMenuOpen = useAppSelector((state) => state.navigation.isMobileMenuOpen)
  const cartItemCount = useAppSelector(selectCartTotalCount)

  const handleLinkClick = () => {
    dispatch(closeMobileMenu())
  }

  const navItems = [
    { label: 'Home', path: '/', icon: Home },
    {
      label: 'Retailer Catalog (Demo)',
      path: '/retailer-experience',
      icon: Store,
      badge: 'Live',
    },
    { label: 'About Us', path: '/about-us', icon: Users },
    { label: 'Sell With Fairdeal', path: '/brand-partner', icon: Briefcase },
    { label: 'Deliver With Us', path: '/deliver-with-us', icon: Truck },
    { label: 'Careers', path: '/careers', icon: Users },
    { label: 'Frequently Asked Questions', path: '/faq', icon: HelpCircle },
  ]

  return (
    <Sheet
      isOpen={isMenuOpen}
      onClose={() => dispatch(closeMobileMenu())}
      title="Fairdeal.market"
      description="India's Fastest Wholesale FMCG Platform"
      side="left"
    >
      <div className="flex flex-col h-full justify-between gap-6 py-2">
        {/* Navigation Link List */}
        <nav className="flex flex-col gap-1.5" aria-label="Mobile Navigation Menu">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive =
              item.path === '/'
                ? location.pathname === '/'
                : location.pathname.startsWith(item.path)

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={handleLinkClick}
                className={cn(
                  'flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-semibold transition-colors',
                  isActive
                    ? 'bg-[#F3F8FF] text-[#2959A3] border border-[#2959A3]/20 shadow-xs'
                    : 'text-gray-700 hover:bg-gray-50 active:bg-gray-100'
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={cn(
                      'w-5 h-5',
                      isActive ? 'text-[#2959A3]' : 'text-gray-400'
                    )}
                  />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#63C7ED]/20 text-[#0369A1]">
                    {item.badge}
                  </span>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Demo Cart CTA in Mobile Drawer */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-[#F3F8FF] to-blue-50/60 border border-blue-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-[#2959A3] uppercase tracking-wider">
              Kirana Wholesale Cart
            </span>
            <span className="text-xs font-semibold text-gray-500">
              {cartItemCount} SKUs added
            </span>
          </div>
          <button
            type="button"
            onClick={() => {
              dispatch(closeMobileMenu())
              dispatch(openCartDrawer())
            }}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#2959A3] text-white text-sm font-bold shadow-sm hover:bg-[#1E437C] transition-colors"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Open Demo Cart</span>
          </button>
        </div>

        {/* Contact and App Download CTAs */}
        <div className="flex flex-col gap-3 pt-4 border-t border-gray-100">
          <div className="flex flex-col gap-2 text-xs text-gray-600">
            <a
              href={`tel:${APP_CONFIG.supportPhone}`}
              className="flex items-center gap-2 text-gray-700 hover:text-[#2959A3]"
            >
              <Phone className="w-4 h-4 text-[#2959A3]" />
              <span>Fleet & Support: {APP_CONFIG.supportPhoneDisplay}</span>
            </a>
            <a
              href={`mailto:${APP_CONFIG.supportEmail}`}
              className="flex items-center gap-2 text-gray-700 hover:text-[#2959A3]"
            >
              <Mail className="w-4 h-4 text-[#2959A3]" />
              <span>{APP_CONFIG.supportEmail}</span>
            </a>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-2">
            <a
              href={APP_CONFIG.social.playStore}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#363E51] text-white text-xs font-bold hover:bg-[#282F3E] transition-colors"
            >
              <span>Google Play</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </a>
            <a
              href={APP_CONFIG.social.appStore}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#363E51] text-white text-xs font-bold hover:bg-[#282F3E] transition-colors"
            >
              <span>App Store</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </a>
          </div>
        </div>
      </div>
    </Sheet>
  )
}
