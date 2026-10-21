import React from 'react'
import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin } from 'lucide-react'
import { APP_CONFIG } from '@/infrastructure/config/appConfig'
import fairdealLogo from '@/assets/logo.png'

export const SiteFooter: React.FC = () => {
  return (
    <footer
      className="w-full font-satoshi text-white"
      style={{
        background:
          'linear-gradient(90deg, rgba(0,0,0,0.2), rgba(0,0,0,0.2)), linear-gradient(90deg, rgb(54,62,81), rgb(54,62,81))',
      }}
    >
      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-[54px] pt-[54px] pb-[28px]">
        {/* Main Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 items-start justify-between pb-10 border-b border-white/10">
          {/* Column 1: Brand & Contact Info */}
          <div className="lg:col-span-5 flex flex-col gap-5 items-start max-w-[380px]">
            <Link to="/" className="cursor-pointer bg-white rounded-lg p-2 inline-block">
              <img
                src={fairdealLogo}
                alt="Fairdeal Logo"
                className="h-8 w-auto object-contain"
              />
            </Link>

            <p className="font-satoshi text-[14px] leading-relaxed text-white/70 m-0">
              India&apos;s fast-growing B2B wholesale platform helping retailers stock smarter with quick delivery, wide assortment, and better margins.
            </p>

            <div className="flex flex-col gap-2 text-[13px] text-white/60">
              <p className="text-white/80 font-semibold m-0">{APP_CONFIG.entityName}</p>
              <p className="flex items-start gap-2 m-0 text-white/65">
                <MapPin className="w-4 h-4 text-[#63C7ED] shrink-0 mt-0.5" />
                <span>{APP_CONFIG.warehouseAddress}</span>
              </p>
              <a
                href={`tel:${APP_CONFIG.supportPhone}`}
                className="flex items-center gap-2 text-white/65 hover:text-white transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#63C7ED] shrink-0" />
                <span>{APP_CONFIG.supportPhoneDisplay}</span>
              </a>
              <a
                href={`mailto:${APP_CONFIG.supportEmail}`}
                className="flex items-center gap-2 text-white/65 hover:text-white transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#63C7ED] shrink-0" />
                <span>{APP_CONFIG.supportEmail}</span>
              </a>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-2.5 pt-1">
              <a
                href={APP_CONFIG.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-[8px] bg-[#0A66C2] flex items-center justify-center text-white hover:scale-105 transition-all"
              >
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.238 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a
                href={APP_CONFIG.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-[8px] bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] flex items-center justify-center text-white hover:scale-105 transition-all"
              >
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Company Links */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <p className="font-satoshi text-[11px] font-bold tracking-[0.13em] uppercase text-white/40 m-0">
              Company
            </p>
            <ul className="flex flex-col gap-3 list-none p-0 m-0">
              <li>
                <Link to="/about-us" className="text-[14px] text-white/80 hover:text-white hover:underline transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-[14px] text-white/80 hover:text-white hover:underline transition-colors">
                  Join Team
                </Link>
              </li>
              <li>
                <Link to="/deliver-with-us" className="text-[14px] text-white/80 hover:text-white hover:underline transition-colors">
                  Deliver With Us
                </Link>
              </li>
              <li>
                <Link to="/brand-partner" className="text-[14px] text-white/80 hover:text-white hover:underline transition-colors">
                  Sell With Us
                </Link>
              </li>
              <li>
                <Link to="/retailer-experience" className="text-[14px] text-[#63C7ED] hover:underline font-semibold">
                  Retailer Catalog Demo
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal Links */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <p className="font-satoshi text-[11px] font-bold tracking-[0.13em] uppercase text-white/40 m-0">
              Legal
            </p>
            <ul className="flex flex-col gap-3 list-none p-0 m-0">
              <li>
                <Link to="/privacy" className="text-[14px] text-white/80 hover:text-white hover:underline transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-[14px] text-white/80 hover:text-white hover:underline transition-colors">
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-[14px] text-white/80 hover:text-white hover:underline transition-colors">
                  FAQs &amp; Help Center
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: App Download Badges */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <p className="font-satoshi text-[11px] font-bold tracking-[0.13em] uppercase text-white/40 m-0">
              Download App
            </p>
            <div className="flex flex-col gap-3">
              <a
                href={APP_CONFIG.social.playStore}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-2.5 rounded-[12px] bg-black/40 border border-white/15 hover:border-white/30 hover:bg-black/60 transition-all max-w-[190px]"
              >
                <div className="text-xl">▶</div>
                <div className="text-left">
                  <span className="block text-[10px] text-white/60 uppercase tracking-wider leading-none">GET IT ON</span>
                  <span className="block text-[13px] font-bold text-white leading-tight">Google Play</span>
                </div>
              </a>

              <a
                href={APP_CONFIG.social.appStore}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-2.5 rounded-[12px] bg-black/40 border border-white/15 hover:border-white/30 hover:bg-black/60 transition-all max-w-[190px]"
              >
                <div className="text-xl"></div>
                <div className="text-left">
                  <span className="block text-[10px] text-white/60 uppercase tracking-wider leading-none">Download on the</span>
                  <span className="block text-[13px] font-bold text-white leading-tight">App Store</span>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Rights Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[13px] text-white/40 font-normal">
          <p className="m-0">© 2026 FDMS Marketplace Pvt Ltd. All rights reserved.</p>
          <p className="m-0 text-white/30">Made with ♥ in India</p>
        </div>
      </div>
    </footer>
  )
}
