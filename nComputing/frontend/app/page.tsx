'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Laptop, ArrowRight, CheckCircle } from 'lucide-react';
import Calculator from '@/components/calculator';
import LeadModal from '@/components/lead-modal';

export default function Home() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  const stats = [
    { label: 'CAPEX Reduction', value: '65%', desc: 'Compared to traditional business PCs' },
    { label: 'Electricity Cost Saved', value: '98%', desc: '5W thin client vs 250W desktop towers' },
    { label: 'Deployment Time', value: '< 10 min', desc: 'Centralized management & PMC configuration' },
    { label: 'Device Lifespan', value: '7+ Years', desc: 'No moving parts, runs cool, low hardware wear' }
  ];

  return (
    <div className="flex flex-col gap-16 py-8 sm:py-12 lg:py-16">
      
      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-200/50 dark:border-blue-900/30 px-3.5 py-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400"
            >
              <Zap size={14} /> Next-Gen Enterprise Workspace Virtualization
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-tight"
            >
              Transform 1 PC into <br />
              <span className="gradient-text">50 High-Performance Workstations</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed"
            >
              Empower your school lab, call center, or corporate office with the Raspberry Pi 4-based NComputing RX420 thin client. Eliminate expensive endpoint upgrades, lock down security, and slash administrative overhead.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 pt-2"
            >
              <Link
                href="/checkout"
                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-2xl transition-all shadow-lg hover:shadow-blue-500/25"
              >
                Buy RX420 Thin Client <ArrowRight size={18} />
              </Link>
              <button
                onClick={() => setIsDemoModalOpen(true)}
                className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-slate-200 text-white dark:text-slate-950 font-bold py-3 px-6 rounded-2xl transition-all shadow-md hover:shadow-lg cursor-pointer"
              >
                Request Demo Lab Kit
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400"
            >
              <div className="flex items-center gap-1.5">
                <CheckCircle size={14} className="text-green-500" /> Fully Pi 4 Powered
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle size={14} className="text-green-500" /> 18% GST Invoices
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle size={14} className="text-green-500" /> UPI/Card Checkout
              </div>
            </motion.div>
          </div>

          {/* Hero Image / Product Visual mockup */}
          <div className="lg:col-span-5 relative flex justify-center">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7 }}
              className="w-full max-w-[380px] aspect-[4/3] rounded-3xl bg-gradient-to-tr from-slate-200 to-slate-100 dark:from-slate-900 dark:to-slate-800 border border-slate-200 dark:border-slate-800 p-8 shadow-xl flex flex-col justify-between relative overflow-hidden"
            >
              {/* Internal layout simulating client device view */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-xl" />
              
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold tracking-widest text-blue-600 dark:text-blue-400 uppercase">
                  Featured Model
                </span>
                <span className="text-[10px] font-bold bg-green-500/10 text-green-500 border border-green-500/20 px-2 py-0.5 rounded-full uppercase">
                  In Stock
                </span>
              </div>

              <div className="my-6">
                <h3 className="text-3xl font-black text-slate-800 dark:text-white">
                  RX420(HDX)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Enterprise Virtualization Endpoint based on Raspberry Pi 4.
                </p>
              </div>

              <div className="space-y-2 border-t border-slate-200 dark:border-slate-800 pt-4 text-xs text-slate-600 dark:text-slate-400">
                <div className="flex justify-between">
                  <span>Unit Price:</span>
                  <span className="font-bold text-slate-800 dark:text-white">₹12,000 INR</span>
                </div>
                <div className="flex justify-between">
                  <span>Virtualization Support:</span>
                  <span className="font-semibold text-blue-600 dark:text-blue-400">Citrix HDX, vSpace Pro</span>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* Stats strip */}
      <section className="bg-slate-900 text-white py-12 border-y border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center sm:text-left space-y-1">
                <div className="text-3xl sm:text-4xl font-extrabold text-blue-400">
                  {stat.value}
                </div>
                <div className="text-sm font-semibold text-slate-200">{stat.label}</div>
                <div className="text-xs text-slate-400">{stat.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Calculated Savings For Your Scale
          </h2>
          <p className="text-slate-500 dark:text-slate-400">
            Use the slider below to dynamically estimate your business CAPEX and OPEX savings. See exactly how virtualization pays for itself in under 6 months.
          </p>
        </div>
        <Calculator />
      </section>

      {/* Features summary grids */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-3xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Laptop size={24} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Zero Client Maintenance
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Endpoints have no hard drives, fans, or moving parts. Firmware updates are pushed globally from a central management console in minutes.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-3xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <ShieldCheck size={24} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Centralized Lockdown Security
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              No local data storage. Endpoints are immune to local malware, unauthorized USB data theft, and OS corruption. Protect your IP easily.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-3xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Zap size={24} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Extreme Energy Efficiency
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Consumes only 5 watts of electricity under peak load. Keep your carbon footprint small and cut air-conditioning cooling expenses.
            </p>
          </div>

        </div>
      </section>

      {/* Demo capturing trigger */}
      <LeadModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />
    </div>
  );
}
