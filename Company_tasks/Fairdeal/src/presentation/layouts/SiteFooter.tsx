import React from 'react'
import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Linkedin, Instagram } from 'lucide-react'
import { APP_CONFIG } from '@/infrastructure/config/appConfig'

export const SiteFooter: React.FC = () => {
  return (
    <footer className="w-full bg-[#363E51] text-white pt-16 pb-12 border-t border-gray-700/50">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Company Narrative & Contact */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#2959A3] flex items-center justify-center text-white font-extrabold text-xl shadow-md">
                <span className="text-[#63C7ED]">F</span>
                <span>D</span>
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-white">
                Fairdeal<span className="text-[#63C7ED]">.market</span>
              </span>
            </Link>

            <p className="text-sm text-gray-300 leading-relaxed max-w-md">
              India's fastest-growing B2B wholesale platform empowering 20,000+ Kirana
              and retail store owners with 60-minute FMCG delivery, high-margin direct brand sourcing,
              and seamless replenishment.
            </p>

            <div className="flex flex-col gap-2.5 text-xs text-gray-300 pt-2">
              <p className="font-semibold text-white/90">
                {APP_CONFIG.entityName} / {APP_CONFIG.secondaryEntity}
              </p>
              <div className="flex items-start gap-2.5 text-gray-300">
                <MapPin className="w-4 h-4 text-[#63C7ED] shrink-0 mt-0.5" />
                <span>{APP_CONFIG.warehouseAddress}</span>
              </div>
              <a
                href={`tel:${APP_CONFIG.supportPhone}`}
                className="flex items-center gap-2.5 text-gray-300 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 text-[#63C7ED] shrink-0" />
                <span>{APP_CONFIG.supportPhoneDisplay}</span>
              </a>
              <a
                href={`mailto:${APP_CONFIG.supportEmail}`}
                className="flex items-center gap-2.5 text-gray-300 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-[#63C7ED] shrink-0" />
                <span>{APP_CONFIG.supportEmail}</span>
              </a>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={APP_CONFIG.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Fairdeal on LinkedIn"
                className="w-10 h-10 rounded-xl bg-[#0A66C2] flex items-center justify-center text-white hover:scale-105 transition-transform"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href={APP_CONFIG.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Fairdeal on Instagram"
                className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] flex items-center justify-center text-white hover:scale-105 transition-transform"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#63C7ED]">
              Company & Ecosystem
            </h3>
            <ul className="flex flex-col gap-2.5 text-sm list-none p-0 m-0">
              {APP_CONFIG.footerLinks.company.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-white transition-colors inline-block py-0.5"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links Column */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#63C7ED]">
              Legal & Trust
            </h3>
            <ul className="flex flex-col gap-2.5 text-sm list-none p-0 m-0">
              {APP_CONFIG.footerLinks.legal.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-white transition-colors inline-block py-0.5"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Retailer App Download Column */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#63C7ED]">
              Retailer Mobile App
            </h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              Order wholesale stock on Android & iOS with guaranteed 60-minute store doorstep delivery.
            </p>
            <div className="flex flex-col gap-2.5">
              <a
                href={APP_CONFIG.social.playStore}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white text-xs font-bold transition-all"
              >
                <span>Google Play Store</span>
              </a>
              <a
                href={APP_CONFIG.social.appStore}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white text-xs font-bold transition-all"
              >
                <span>Apple App Store</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>© {new Date().getFullYear()} FDMS Marketplace Pvt. Ltd. All rights reserved.</p>
          <div className="p-2.5 rounded-xl bg-black/20 border border-white/5 text-[11px] text-gray-400 text-center sm:text-right">
            Independent UI/UX Frontend Redesign Proposal — Developed for Fairdeal Engineering Team Review
          </div>
        </div>
      </div>
    </footer>
  )
}
