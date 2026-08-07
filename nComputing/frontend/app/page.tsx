'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Laptop, ArrowRight, CheckCircle, Cpu, Monitor, Wifi, Settings, HelpCircle, HardDrive, RefreshCw } from 'lucide-react';
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
    <div className="flex flex-col gap-20 py-10 sm:py-16 lg:py-20 relative overflow-hidden bg-slate-50/30 dark:bg-slate-950/40">
      
      {/* Ocean White background glow blobs */}
      <div className="absolute top-20 left-10 w-96 h-96 rounded-full bg-emerald-500/5 dark:bg-emerald-550/5 blur-3xl pointer-events-none" />
      <div className="absolute top-80 right-20 w-96 h-96 rounded-full bg-teal-500/5 dark:bg-teal-550/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-40 left-1/3 w-96 h-96 rounded-full bg-green-500/5 dark:bg-green-550/5 blur-3xl pointer-events-none" />

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/50 dark:border-emerald-900/30 px-4 py-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400"
            >
              <Zap size={13} className="animate-pulse" /> Next-Gen Enterprise Workspace Virtualization
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6.5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1]"
            >
              Transform 1 PC into <br />
              <span className="bg-gradient-to-r from-emerald-600 to-teal-550 bg-clip-text text-transparent">
                50 High-Performance Workstations
              </span>
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
                className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-7 rounded-2xl transition-all shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30"
              >
                Buy RX420 Thin Client <ArrowRight size={18} />
              </Link>
              <button
                onClick={() => setIsDemoModalOpen(true)}
                className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-slate-200 text-white dark:text-slate-950 font-bold py-3.5 px-7 rounded-2xl transition-all shadow-md hover:shadow-lg cursor-pointer"
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
                <CheckCircle size={14} className="text-emerald-550" /> Fully Pi 4 Powered
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle size={14} className="text-emerald-550" /> 18% GST Invoices
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle size={14} className="text-emerald-550" /> UPI/Card Checkout
              </div>
            </motion.div>
          </div>

          {/* Hero Image / Product Visual mockup */}
          <div className="lg:col-span-5 relative flex justify-center">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7 }}
              className="relative group w-full max-w-[500px]"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-teal-500/20 rounded-3xl blur-3xl opacity-80 group-hover:opacity-100 transition-opacity pointer-events-none" />
              <div className="relative rounded-3xl overflow-hidden border border-slate-200/60 dark:border-slate-800/60 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-2xl p-2 transition-transform duration-500 hover:scale-[1.01]">
                <img
                  src="/image.png"
                  alt="NComputing RX420(RDP) Thin Client Product Diagram"
                  className="rounded-2xl w-full h-auto object-cover"
                />
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* Stats strip */}
      <section className="bg-slate-900 text-white py-12 border-y border-slate-800 w-full z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center sm:text-left space-y-1">
                <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400">
                  {stat.value}
                </div>
                <div className="text-sm font-semibold text-slate-200">{stat.label}</div>
                <div className="text-xs text-slate-400">{stat.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why NComputing RX420 (Benefits) Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-4 py-1.5 rounded-full border border-emerald-500/20">
            Why RX420 Virtualization?
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Unmatched Performance & Cost Efficiency
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base">
            Virtualization solves the major hardware, security, and administrative limitations of traditional user desktop PCs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          <div className="bg-white/80 dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800/60 p-8 rounded-3xl space-y-4 shadow-sm hover:shadow-md transition-all backdrop-blur-md">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Laptop size={22} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              65% CAPEX Cost Reduction
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Thin client units cost only ₹12,000 per user compared to ₹40,000+ for standard PC setups. Virtual server allocation is highly scalable.
            </p>
          </div>

          <div className="bg-white/80 dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800/60 p-8 rounded-3xl space-y-4 shadow-sm hover:shadow-md transition-all backdrop-blur-md">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Zap size={22} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              98% Energy Savings
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Consumes only 5W of power per thin client terminal, compared to 250W for full desktop towers. Reduces utility costs and cooling loads dramatically.
            </p>
          </div>

          <div className="bg-white/80 dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800/60 p-8 rounded-3xl space-y-4 shadow-sm hover:shadow-md transition-all backdrop-blur-md">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Settings size={22} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Zero Local Maintenance
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              No moving parts, hard drives, or fans to break down. System updates, security patches, and application deployments are pushed globally from a central console.
            </p>
          </div>

          <div className="bg-white/80 dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800/60 p-8 rounded-3xl space-y-4 shadow-sm hover:shadow-md transition-all backdrop-blur-md">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <ShieldCheck size={22} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Centralized Lockdown Security
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              No local data storage. Completely immune to local virus infections, unauthorized USB data theft, and OS corruption. Protect your IP easily.
            </p>
          </div>

          <div className="bg-white/80 dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800/60 p-8 rounded-3xl space-y-4 shadow-sm hover:shadow-md transition-all backdrop-blur-md">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Monitor size={22} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Native Dual Display Support
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Equipped with two micro-HDMI ports, enabling native dual-monitor setups up to 4K resolution. Perfect for productivity-focused call centers or design labs.
            </p>
          </div>

          <div className="bg-white/80 dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800/60 p-8 rounded-3xl space-y-4 shadow-sm hover:shadow-md transition-all backdrop-blur-md">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Cpu size={22} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              7+ Years Hardware Lifespan
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Traditional PCs slow down and degrade within 3-4 years. RX420 terminals remain fast and operational for over 7 years without hardware upgrades.
            </p>
          </div>

        </div>
      </section>

      {/* Calculator Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Calculated Savings For Your Scale
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base">
            Use the slider below to dynamically estimate your business CAPEX and OPEX savings. See exactly how virtualization pays for itself in under 6 months.
          </p>
        </div>
        <Calculator />
      </section>

      {/* Technical Specifications Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full z-10 pb-10">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-4 py-1.5 rounded-full border border-emerald-500/20">
            Technical Specifications
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            RX420(RDP) Hardware Specs
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base">
            Under the hood details for NComputing virtual desktop environments.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-white/70 dark:bg-slate-900/70 border border-slate-200/50 dark:border-slate-800/50 p-8 sm:p-12 rounded-3xl backdrop-blur-xl">
          
          <div className="space-y-6">
            <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Cpu className="text-emerald-555" /> System Features
            </h3>
            
            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">Processor Platform</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Broadcom BCM2711 Quad-core ARM Cortex-A72 (64-bit) SoC @ 1.5GHz</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">System Memory</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">4GB LPDDR4-3200 SDRAM</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">Display Support</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">2 × micro-HDMI ports (supporting single 4K@60Hz or dual displays up to 4K@30Hz)</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">High-Resolution Audio</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">16-bit/44.1kHz stereo audio output via 3.5mm jack or HDMI audio redirection</p>
                </div>
              </div>
            </div>

          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Wifi className="text-teal-555" /> Connectivity & Software
            </h3>
            
            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <div className="w-1.5 h-1.5 bg-teal-500 rounded-full mt-2 shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">Gigabit & Dual-Band Wireless</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Dual-band 2.4/5GHz Wi-Fi (802.11 b/g/n/ac), Bluetooth 5.0, and Gigabit Ethernet</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-1.5 h-1.5 bg-teal-500 rounded-full mt-2 shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">USB Peripheral Redirection</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">2 × USB 3.0 ports, 2 × USB 2.0 ports. Supports mass storage, headsets, webcams, and 3D mice</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-1.5 h-1.5 bg-teal-500 rounded-full mt-2 shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">Protocols & Environments</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">vSpace Pro Enterprise, Microsoft RemoteFX/RDP, Citrix HDX, and VERDE VDI</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-1.5 h-1.5 bg-teal-500 rounded-full mt-2 shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">Management & Power</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Centrally managed using PMC Device Management software. Ultra-low 5W power draw</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Demo capturing trigger */}
      <LeadModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />
    </div>
  );
}
