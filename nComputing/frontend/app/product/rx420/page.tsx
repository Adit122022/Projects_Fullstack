'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Cpu, Layers, HardDrive, Monitor, Settings, Wifi } from 'lucide-react';
import ProductCard from '@/components/product-card';
import LeadModal from '@/components/lead-modal';

export default function ProductDetails() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  const specSpecs = [
    { label: 'Processor', value: 'Broadcom BCM2711, Quad-core Cortex-A72 (ARM v8) 64-bit SoC @ 1.5GHz' },
    { label: 'RAM Memory', value: '4GB LPDDR4-3200 SDRAM' },
    { label: 'Display Output', value: '2 × micro-HDMI ports (up to 4Kp60 supported)' },
    { label: 'Connectivity', value: 'Dual-band 2.4/5.0 GHz wireless LAN, Bluetooth 5.0, Gigabit Ethernet' },
    { label: 'USB Ports', value: '2 × USB 3.0 ports; 2 × USB 2.0 ports' },
    { label: 'Virtualization Protocol', value: 'vSpace Pro Enterprise, SuperRDP, Citrix HDX (RX-HDX variant)' },
    { label: 'Management Suite', value: 'PMC Device Management Console (centralized control)' },
    { label: 'Power Consumption', value: '5W maximum (5V @ 3A DC via USB-C or PoE option)' }
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16 bg-slate-50/10 dark:bg-slate-950/10">
      
      {/* Product Introduction */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 space-y-6">
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-3.5 py-1.5 rounded-full border border-emerald-500/20">
            Product Profile
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            NComputing RX420 Thin Client
          </h1>
          <p className="text-base text-slate-500 dark:text-slate-400 leading-relaxed">
            The RX420 is an enterprise-grade thin client virtual desktop endpoint built on the Raspberry Pi 4 platform. It features full dual-monitor capabilities, ultra-low energy footprint, and native transparent redirect support for standard peripherals. For global updates and documentation, check the official site at <a href="https://www.ncomputing.com" target="_blank" rel="noopener noreferrer" className="text-emerald-600 dark:text-emerald-400 hover:underline">ncomputing.com</a>.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <Link
              href="/checkout"
              className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-6 rounded-2xl transition-all shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30"
            >
              Order Online <ArrowRight size={18} />
            </Link>
            <button
              onClick={() => setIsDemoModalOpen(true)}
              className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-slate-200 text-white dark:text-slate-950 font-bold py-3.5 px-6 rounded-2xl transition-all shadow-md hover:shadow-lg cursor-pointer"
            >
              Request B2B Trial Kit
            </button>
          </div>
        </div>

        {/* Visual Product Box Spec Mockup */}
        <div className="lg:col-span-6 flex flex-col gap-6 items-center justify-center">
          <div className="relative group w-full max-w-[500px]">
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-teal-500/20 rounded-3xl blur-3xl opacity-80 group-hover:opacity-100 transition-opacity pointer-events-none" />
            <div className="relative rounded-3xl overflow-hidden border border-slate-200/60 dark:border-slate-800/60 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-2xl p-2 transition-transform duration-500 hover:scale-[1.01]">
              <img
                src="/image.png"
                alt="NComputing RX420(RDP) Product Setup"
                className="rounded-2xl w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Grid Specification Cards */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Comprehensive Specification Breakdown
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Check the underlying specifications that support virtual workspace scalability.
          </p>
        </div>
        <ProductCard />
      </section>

      {/* Detail Specifications Table */}
      <section className="space-y-6 max-w-4xl mx-auto">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-3">
          Detailed Datasheet Specs
        </h3>
        <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
          <div className="divide-y divide-slate-200 dark:divide-slate-800">
            {specSpecs.map((spec, i) => (
              <div key={i} className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-slate-50/50 dark:hover:bg-slate-800/10 transition-colors">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 sm:col-span-1 flex items-center">
                  {spec.label}
                </div>
                <div className="text-sm text-slate-800 dark:text-slate-200 sm:col-span-2 mt-1 sm:mt-0 font-medium font-sans">
                  {spec.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <LeadModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />
    </div>
  );
}
