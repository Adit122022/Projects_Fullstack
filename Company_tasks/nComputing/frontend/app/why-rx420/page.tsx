'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, HelpCircle, AlertCircle, CheckCircle2 } from 'lucide-react';
import LeadModal from '@/components/lead-modal';

export default function WhyRX420() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  const comparisonRows = [
    {
      feature: 'Initial Hardware Cost',
      pc: '₹40,000 - ₹50,000 per user desktop PC',
      rx420: '₹12,000 per user thin client + virtual server allocation',
      advantage: '60% - 65% Capex savings'
    },
    {
      feature: 'Power Consumption',
      pc: '200W - 250W continuous power consumption',
      rx420: '5W ultra-low power consumption',
      advantage: '98% power savings'
    },
    {
      feature: 'Maintenance & Support',
      pc: 'Requires local OS installs, antivirus, driver fixes, and manual troubleshooting on every unit',
      rx420: 'Zero local OS. Updates are managed centrally at the virtual host level in minutes',
      advantage: '90% maintenance cost savings'
    },
    {
      feature: 'Lifespan & Obsolescence',
      pc: 'Typically replaced every 3 to 4 years due to disk degradation or CPU slow-down',
      rx420: '7 to 10 year lifespan. No moving parts or hard drives to degrade',
      advantage: '2x hardware life cycle'
    },
    {
      feature: 'Data Security',
      pc: 'Files stored locally. Susceptible to virus infections, data leakage, and theft via USB ports',
      rx420: 'No local storage. High-level security sandbox, zero local vulnerabilities',
      advantage: 'Corporate IP secured'
    },
    {
      feature: 'Space & Heat Footprint',
      pc: 'Bulky desktop towers, loud fans, and substantial thermal load on office air conditioning',
      rx420: 'Compact mounting behind the monitor. No fans, zero noise, cool running',
      advantage: 'Ergonomic workspace'
    }
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12 bg-slate-50/10 dark:bg-slate-950/20">
      
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-3.5 py-1.5 rounded-full border border-emerald-500/20">
          Problem vs Solution
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Why Virtualize with RX420 Thin Clients?
        </h1>
        <p className="text-slate-500 dark:text-slate-400">
          Traditional PCs are expensive, difficult to manage, consume large amounts of electricity, and represent a major security risk. NComputing RX420 virtualizes the workspace at a fraction of the cost.
        </p>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-2xl bg-white/80 dark:bg-slate-900/80 shadow-sm backdrop-blur-md">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 text-slate-700 dark:text-slate-300 text-xs font-bold uppercase tracking-wider">
              <th className="p-5">Feature</th>
              <th className="p-5">Traditional PC Workspace</th>
              <th className="p-5 text-emerald-650 dark:text-emerald-450">NComputing RX420 Solution</th>
              <th className="p-5">Strategic Impact</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-sm">
            {comparisonRows.map((row, i) => (
              <tr key={i} className="hover:bg-slate-55/30 dark:hover:bg-slate-800/10 transition-colors">
                <td className="p-5 font-bold text-slate-800 dark:text-white max-w-[150px]">
                  {row.feature}
                </td>
                <td className="p-5 text-slate-500 dark:text-slate-400 max-w-[250px]">
                  <div className="flex items-start gap-2">
                    <AlertCircle size={16} className="text-red-550 mt-0.5 shrink-0" />
                    <span>{row.pc}</span>
                  </div>
                </td>
                <td className="p-5 text-slate-800 dark:text-slate-200 font-semibold max-w-[250px]">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-emerald-550 mt-0.5 shrink-0" />
                    <span>{row.rx420}</span>
                  </div>
                </td>
                <td className="p-5 text-slate-500 dark:text-slate-400">
                  <span className="inline-flex items-center rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-xs font-semibold px-2.5 py-0.5 border border-emerald-100 dark:border-emerald-900/50">
                    {row.advantage}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Corporate ROI strip */}
      <div className="rounded-3xl bg-slate-900 text-white p-8 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <h3 className="text-xl font-bold">Ready to benchmark in your own lab environment?</h3>
          <p className="text-sm text-slate-400">
            Request a 3-unit test lab kit containing pre-configured endpoints and central host licenses. Evaluate vSpace Pro and manage everything from a single console.
          </p>
        </div>
        <div className="flex gap-4 w-full md:w-auto shrink-0 justify-end">
          <button
            onClick={() => setIsDemoModalOpen(true)}
            className="w-full md:w-auto bg-white hover:bg-slate-100 text-slate-900 font-bold px-6 py-3 rounded-2xl text-sm transition-all text-center cursor-pointer"
          >
            Request Trial Kit
          </button>
          <Link
            href="/checkout"
            className="w-full md:w-auto bg-emerald-650 hover:bg-emerald-750 text-white font-bold px-6 py-3 rounded-2xl text-sm transition-all flex items-center justify-center gap-1.5"
          >
            Buy RX420 Endpoints <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      <LeadModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />
    </div>
  );
}
