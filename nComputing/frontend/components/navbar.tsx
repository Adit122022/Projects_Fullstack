'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import { useTheme } from 'next-themes';
import { ShoppingCart, LogOut, LayoutDashboard, Menu, X, ArrowRight, Sun, Moon, User } from 'lucide-react';
import { useCartStore } from '@/lib/store';
import LeadModal from './lead-modal';

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = authClient.useSession();
  const quantity = useCartStore((state) => state.quantity);
  const { theme, setTheme } = useTheme();
  
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch by waiting for mount
  useEffect(() => {
    setMounted(true);
  }, []);

  const navLinks = [
    { href: '/', label: 'Overview' },
    { href: '/why-rx420', label: 'Why RX420' },
    { href: '/product/rx420', label: 'Tech Specifications' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-950/80">
        <div className="mx-auto flex max-w-7xl h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 font-bold text-white shadow-md shadow-blue-500/20">
              N
            </div>
            <div className="flex flex-col">
              <span className="text-base font-extrabold tracking-tight text-slate-900 dark:text-white leading-none">
                NComputing
              </span>
              <span className="text-[10px] font-semibold text-blue-600 dark:text-blue-400 tracking-wider uppercase">
                India Portal
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400 ${
                  pathname === link.href
                    ? 'text-blue-600 dark:text-blue-400 font-semibold'
                    : 'text-slate-600 dark:text-slate-300'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-4">
            
            {/* Theme Toggle Button */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-xl text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors cursor-pointer"
                title="Toggle Theme"
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            )}

            {/* Cart Icon */}
            <Link
              href="/checkout"
              className="relative p-2 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <ShoppingCart size={20} />
              {quantity > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white shadow-sm ring-2 ring-white dark:ring-slate-950">
                  {quantity}
                </span>
              )}
            </Link>

            {/* Admin Buttons / Auth Status */}
            {session ? (
              <div className="flex items-center gap-2">
                {(session.user as any).role === 'ADMIN' ? (
                  <Link
                    href="/admin"
                    className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:border-slate-800 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900"
                  >
                    <LayoutDashboard size={14} /> Admin
                  </Link>
                ) : (
                  <Link
                    href="/profile"
                    className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:border-slate-800 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900"
                  >
                    <User size={14} /> Profile
                  </Link>
                )}
                <button
                  onClick={async () => {
                    await authClient.signOut();
                    window.location.href = '/';
                  }}
                  className="flex items-center gap-1.5 rounded-lg border border-red-200/50 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-650 dark:border-red-950/50 dark:bg-red-950/20 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-950/40 cursor-pointer"
                >
                  <LogOut size={14} /> Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/login"
                  className="text-xs font-semibold text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors"
                >
                  Client Sign In
                </Link>
                <Link
                  href="/admin/login"
                  className="text-xs font-semibold text-slate-450 hover:text-blue-600 dark:text-slate-500 dark:hover:text-blue-400 transition-colors border-l border-slate-200 dark:border-slate-800 pl-3"
                >
                  Admin Login
                </Link>
              </div>
            )}

            {/* CTA Button */}
            <button
              onClick={() => setIsDemoModalOpen(true)}
              className="flex items-center gap-1 bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-slate-200 text-white dark:text-slate-900 text-sm font-bold px-4 py-2 rounded-xl transition-all shadow-md hover:shadow-lg cursor-pointer"
            >
              Request Demo <ArrowRight size={14} />
            </button>
          </div>

          {/* Mobile Menu Buttons */}
          <div className="flex items-center gap-2 md:hidden">
            {mounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-xl text-slate-500 dark:text-slate-400 cursor-pointer"
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            )}

            <Link href="/checkout" className="relative p-2 text-slate-600 dark:text-slate-300">
              <ShoppingCart size={20} />
              {quantity > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white">
                  {quantity}
                </span>
              )}
            </Link>
            
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-slate-600 dark:text-slate-300"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Dropdown */}
        {isMobileMenuOpen && (
          <div className="border-b border-slate-200 bg-white px-4 py-4 dark:border-slate-800 dark:bg-slate-950 md:hidden flex flex-col gap-4">
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-sm font-semibold transition-colors ${
                    pathname === link.href ? 'text-blue-600' : 'text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              {session ? (
                <>
                  {(session.user as any).role === 'ADMIN' && (
                    <Link
                      href="/admin"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-sm font-semibold text-slate-600 dark:text-slate-300 flex items-center gap-2"
                    >
                      <LayoutDashboard size={16} /> Admin Dashboard
                    </Link>
                  )}
                  <Link
                    href="/profile"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-sm font-semibold text-slate-600 dark:text-slate-300 flex items-center gap-2"
                  >
                    <User size={16} /> Profile Settings
                  </Link>
                  <button
                    onClick={async () => {
                      setIsMobileMenuOpen(false);
                      await authClient.signOut();
                      window.location.href = '/';
                    }}
                    className="text-sm font-semibold text-red-600 text-left flex items-center gap-2 cursor-pointer"
                  >
                    <LogOut size={16} /> Sign Out
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-2.5">
                  <Link
                    href="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-sm font-semibold text-slate-600 dark:text-slate-300"
                  >
                    Client Sign In
                  </Link>
                  <Link
                    href="/admin/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-sm font-semibold text-slate-500 dark:text-slate-400"
                  >
                    Admin Login
                  </Link>
                </div>
              )}
            </nav>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsDemoModalOpen(true);
              }}
              className="w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-xl"
            >
              Request Demo
            </button>
          </div>
        )}
      </header>

      {/* Demo lead capture modal */}
      <LeadModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />
    </>
  );
}
