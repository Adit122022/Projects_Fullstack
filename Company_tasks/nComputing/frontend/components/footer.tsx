import React from 'react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950/60 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Logo and Brand */}
          <div className="flex flex-col gap-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 font-bold text-white">
                N
              </div>
              <span className="text-base font-extrabold text-slate-900 dark:text-white">
                NComputing India
              </span>
            </Link>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              High-performance, cost-effective desktop virtualization solutions. Learn more at <a href="https://www.ncomputing.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">ncomputing.com</a>.
            </p>
          </div>

          {/* Solutions links */}
          <div>
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-3 uppercase tracking-wider text-[11px]">
              Solutions
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li><Link href="/product/rx420" className="hover:text-blue-600">RX420 Thin Client</Link></li>
              <li><a href="#" className="hover:text-blue-600">vSpace Pro Enterprise</a></li>
              <li><a href="#" className="hover:text-blue-600">VERDE VDI</a></li>
              <li><a href="#" className="hover:text-blue-600">Education Virtualization</a></li>
            </ul>
          </div>

          {/* Portal links */}
          <div>
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-3 uppercase tracking-wider text-[11px]">
              Portal
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li><Link href="/" className="hover:text-blue-600">ROI Calculator</Link></li>
              <li><Link href="/why-rx420" className="hover:text-blue-600">Why Thin Clients</Link></li>
              <li><Link href="/checkout" className="hover:text-blue-600">Place Order</Link></li>
              <li><Link href="/admin" className="hover:text-blue-600">Admin Dashboard</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-3 uppercase tracking-wider text-[11px]">
              Contact Sales
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li>Email: sales@ncomputing.in</li>
              <li>Support: support@ncomputing.in</li>
              <li>Phone: +91 80 4000 0000</li>
              <li>Office: Bengaluru, Karnataka, India</li>
            </ul>
          </div>

        </div>

        <div className="border-t border-slate-200/60 dark:border-slate-800/60 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <span>
            &copy; {currentYear} NComputing India. All rights reserved. Powered by Raspberry Pi 4 technology.
          </span>
          <div className="flex gap-4">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
            <a href="#" className="hover:underline">Refund Policy</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
