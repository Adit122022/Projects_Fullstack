'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { IndianRupee, Zap, Wallet, ArrowRight, Lightbulb } from 'lucide-react';
import { useCartStore } from '@/lib/store';
import Link from 'next/link';

export default function Calculator() {
  const [seats, setSeats] = useState(30);
  const setQuantity = useCartStore((state) => state.setQuantity);

  // Constants
  const PC_COST_PER_UNIT = 42000; // Traditional PC CAPEX
  const RX420_COST_PER_UNIT = 12000; // Thin client CAPEX
  const SERVER_OVERHEAD_PER_USER = 3000; // Server overhead per virtualization seat
  
  const PC_POWER_WATTS = 250;
  const RX420_POWER_WATTS = 5;
  const HOURS_PER_DAY = 8;
  const DAYS_PER_YEAR = 260; // 52 weeks * 5 days
  const POWER_COST_PER_KWH = 8.5; // Average commercial tariff in INR

  // Calculations
  const traditionalCapex = PC_COST_PER_UNIT * seats;
  const ncomputingCapex = (RX420_COST_PER_UNIT + SERVER_OVERHEAD_PER_USER) * seats;
  const capexSavings = traditionalCapex - ncomputingCapex;
  const capexPercentage = Math.round((capexSavings / traditionalCapex) * 100);

  // Power Calculations per year
  // (Watts * Hours * Days) / 1000 = kWh
  const pcKwhPerYear = (PC_POWER_WATTS * HOURS_PER_DAY * DAYS_PER_YEAR * seats) / 1000;
  const rxKwhPerYear = (RX420_POWER_WATTS * HOURS_PER_DAY * DAYS_PER_YEAR * seats) / 1000;
  
  const pcPowerCost = pcKwhPerYear * POWER_COST_PER_KWH;
  const rxPowerCost = rxKwhPerYear * POWER_COST_PER_KWH;
  
  const powerSavings = pcPowerCost - rxPowerCost;
  const totalSavingsFirstYear = capexSavings + powerSavings;

  return (
    <div className="rounded-3xl bg-slate-900 text-white p-6 sm:p-8 lg:p-10 shadow-2xl border border-slate-800 relative overflow-hidden">
      {/* Decorative Gradients */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Input Section */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <span className="text-xs font-semibold text-blue-400 uppercase tracking-widest">
              ROI & Savings Calculator
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1">
              Estimate Your Capital & Operating Savings
            </h3>
            <p className="text-sm text-slate-400 mt-2">
              Virtualizing your workflow with NComputing endpoints slashes hardware acquisition and power cost significantly. Slide to check.
            </p>
          </div>

          {/* Slider */}
          <div className="space-y-4 bg-slate-800/40 p-5 rounded-2xl border border-slate-800">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-slate-300">
                Number of Virtualized Seats:
              </label>
              <span className="text-2xl font-extrabold text-blue-400">
                {seats} Seats
              </span>
            </div>
            
            <input
              type="range"
              min="10"
              max="200"
              step="5"
              value={seats}
              onChange={(e) => setSeats(Number(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
            
            <div className="flex justify-between text-xs text-slate-500">
              <span>10 Seats</span>
              <span>100 Seats</span>
              <span>200 Seats</span>
            </div>
          </div>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-2 gap-4 text-xs text-slate-400">
            <div className="flex items-start gap-2">
              <Zap size={14} className="text-yellow-500 mt-0.5 shrink-0" />
              <span>Electricity calculated at ₹{POWER_COST_PER_KWH}/kWh, 8 hours/day, 260 days/year.</span>
            </div>
            <div className="flex items-start gap-2">
              <Lightbulb size={14} className="text-cyan-500 mt-0.5 shrink-0" />
              <span>Thin Client cost includes virtualization hardware + allocation for central host server resources.</span>
            </div>
          </div>
        </div>

        {/* Right Output Section */}
        <div className="lg:col-span-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Capex Card */}
            <motion.div
              layout
              className="bg-slate-800/80 rounded-2xl p-5 border border-slate-700/60"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 font-medium">CAPEX Investment</span>
                <Wallet size={16} className="text-blue-400" />
              </div>
              <div className="mt-3">
                <div className="text-xs text-slate-400 line-through">
                  ₹{traditionalCapex.toLocaleString('en-IN')} (PCs)
                </div>
                <div className="text-xl font-extrabold text-white mt-0.5">
                  ₹{ncomputingCapex.toLocaleString('en-IN')}
                </div>
                <div className="text-[10px] text-green-400 font-semibold bg-green-950/40 border border-green-900/30 px-2 py-0.5 rounded-full inline-block mt-2">
                  {capexPercentage}% lower CAPEX
                </div>
              </div>
            </motion.div>

            {/* Power savings card */}
            <motion.div
              layout
              className="bg-slate-800/80 rounded-2xl p-5 border border-slate-700/60"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 font-medium">Annual Power cost</span>
                <Zap size={16} className="text-yellow-400" />
              </div>
              <div className="mt-3">
                <div className="text-xs text-slate-400 line-through">
                  ₹{Math.round(pcPowerCost).toLocaleString('en-IN')} (PCs)
                </div>
                <div className="text-xl font-extrabold text-white mt-0.5">
                  ₹{Math.round(rxPowerCost).toLocaleString('en-IN')}
                </div>
                <div className="text-[10px] text-green-400 font-semibold bg-green-950/40 border border-green-900/30 px-2 py-0.5 rounded-full inline-block mt-2">
                  98% Power Reduction
                </div>
              </div>
            </motion.div>

          </div>

          {/* Grand Total Savings Box */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 shadow-xl relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
            
            <span className="text-xs font-semibold text-blue-100 uppercase tracking-wider block">
              Estimated First-Year Total Savings
            </span>
            <div className="flex items-baseline gap-1 mt-2">
              <span className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                ₹{Math.round(totalSavingsFirstYear).toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-blue-200">saved</span>
            </div>

            <div className="mt-4 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-blue-100 max-w-xs text-center sm:text-left">
                Setup your virtual desktop project today. Ready to transition?
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setQuantity(seats)}
                  className="bg-white hover:bg-slate-100 text-blue-900 font-bold text-xs px-3.5 py-2 rounded-xl transition-all cursor-pointer"
                >
                  Apply to Cart
                </button>
                <Link
                  href="/checkout"
                  onClick={() => setQuantity(seats)}
                  className="bg-blue-900/40 hover:bg-blue-900/60 text-white font-bold text-xs px-3.5 py-2 rounded-xl border border-white/10 flex items-center gap-1 transition-all"
                >
                  Buy Now <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
