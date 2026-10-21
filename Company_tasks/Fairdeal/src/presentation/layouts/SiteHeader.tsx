import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu } from 'lucide-react'
import { useAppDispatch } from '@/app/store/hooks'
import { openMobileMenu } from '@/application/features/navigation/navigationSlice'
import { APP_CONFIG } from '@/infrastructure/config/appConfig'
import fairdealLogo from '@/assets/logo.png'

export const SiteHeader: React.FC = () => {
  const dispatch = useAppDispatch()
  const location = useLocation()

  const navItems = [
    { label: 'About Us', path: '/about-us' },
    { label: 'Careers', path: '/careers' },
    { label: 'Sell With Fairdeal', path: '/brand-partner' },
    { label: 'Deliver With Us', path: '/deliver-with-us' },
  ]

  return (
    <header className="sticky top-0 z-50 w-full bg-white h-[68px] border-b border-gray-100 flex items-center justify-between px-4 sm:px-8 lg:px-[54px] transition-all">
      {/* Authentic Fairdeal Logo */}
      <Link to="/" className="flex-shrink-0 cursor-pointer flex items-center focus:outline-none">
        <img
          src={fairdealLogo}
          alt="Fairdeal Market Logo"
          className="h-9 sm:h-11 w-auto object-contain"
        />
      </Link>

      {/* Center Navigation Links (Authentic Fairdeal Pill Buttons) */}
      <nav className="hidden lg:flex items-center justify-center gap-3.5 mx-auto font-satoshi" aria-label="Main Navigation">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`h-[39px] px-3.5 flex items-center justify-center whitespace-nowrap text-[14px] font-medium rounded-[8px] border transition-colors duration-200 no-underline ${
                isActive
                  ? 'border-[#2959A3] bg-[#2959A3] text-white'
                  : 'border-[#363E51] bg-white text-[#363E51] hover:bg-[#363E51] hover:text-white'
              }`}
            >
              {item.label}
            </Link>
          )
        })}

      </nav>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Authentic Fairdeal "Download App" CTA Button */}
        <a
          href={APP_CONFIG.social.playStore}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:flex items-center justify-center text-white text-[13px] font-semibold uppercase tracking-wider transition hover:opacity-90 font-satoshi shadow-xs"
          style={{
            height: '46px',
            padding: '12px 22px',
            borderRadius: '14px',
            background: '#3B3F59',
            border: '1px solid #D4DEED',
          }}
        >
          Download App
        </a>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => dispatch(openMobileMenu())}
          aria-label="Open menu"
          className="lg:hidden flex flex-col justify-center items-center gap-1 w-10 h-10 rounded-lg border border-gray-200 bg-white text-[#333]"
        >
          <span className="block h-0.5 w-5 bg-[#333] rounded-full" />
          <span className="block h-0.5 w-5 bg-[#333] rounded-full" />
          <span className="block h-0.5 w-5 bg-[#333] rounded-full" />
        </button>
      </div>
    </header>
  )
}
