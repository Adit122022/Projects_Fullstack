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
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      
      {/* Product Introduction */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 space-y-6">
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-full">
            Product Profile
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            NComputing RX420 Thin Client
          </h1>
          <p className="text-base text-slate-500 dark:text-slate-400 leading-relaxed">
            The RX420 is an enterprise-grade thin client virtual desktop endpoint built on the Raspberry Pi 4 platform. It features full dual-monitor capabilities, ultra-low energy footprint, and native transparent redirect support for standard peripherals. For global updates and documentation, check the official site at <a href="https://www.ncomputing.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">ncomputing.com</a>.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <Link
              href="/checkout"
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-2xl transition-all shadow-lg hover:shadow-blue-500/25"
            >
              Order Online <ArrowRight size={18} />
            </Link>
            <button
              onClick={() => setIsDemoModalOpen(true)}
              className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-slate-200 text-white dark:text-slate-950 font-bold py-3 px-6 rounded-2xl transition-all shadow-md hover:shadow-lg cursor-pointer"
            >
              Request B2B Trial Kit
            </button>
          </div>
        </div>

        {/* Visual Product Box Spec Mockup */}
        <div className="lg:col-span-6 flex justify-center">
          <div className="w-full max-w-[450px] bg-slate-900 text-white border border-slate-800 p-8 rounded-3xl shadow-xl space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full blur-2xl" />
            <h3 className="text-xl font-bold border-b border-slate-800 pb-4">
              Hardware Highlights
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-start gap-2.5">
                <Monitor size={18} className="text-blue-500 mt-0.5 shrink-0" />
                <div>
                  <h5 className="text-xs font-bold text-slate-200">Dual 4K Video</h5>
                  <p className="text-[10px] text-slate-400">Micro-HDMI outputs</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Cpu size={18} className="text-blue-500 mt-0.5 shrink-0" />
                <div>
                  <h5 className="text-xs font-bold text-slate-200">ARM Cortex-A72</h5>
                  <p className="text-[10px] text-slate-400">1.5GHz 64-bit SoC</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Wifi size={18} className="text-blue-500 mt-0.5 shrink-0" />
                <div>
                  <h5 className="text-xs font-bold text-slate-200">Gigabit / WiFi</h5>
                  <p className="text-[10px] text-slate-400">5G WiFi + LAN</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Settings size={18} className="text-blue-500 mt-0.5 shrink-0" />
                <div>
                  <h5 className="text-xs font-bold text-slate-200">PMC Managed</h5>
                  <p className="text-[10px] text-slate-400">Central management</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-800 text-xs text-slate-400 leading-relaxed">
              <strong>vSpace Pro Enterprise</strong> enables multiple users to run isolated sessions from a single central host server. Combined with the RX420 hardware, it delivers the ultimate desktop virtualization experience.
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
        <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-white dark:bg-slate-900">
          <div className="divide-y divide-slate-200 dark:divide-slate-800">
            {specSpecs.map((spec, i) => (
              <div key={i} className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-slate-50/50 dark:hover:bg-slate-800/10 transition-colors">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 sm:col-span-1 flex items-center">
                  {spec.label}
                </div>
                <div className="text-sm text-slate-800 dark:text-slate-200 sm:col-span-2 mt-1 sm:mt-0 font-medium">
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
