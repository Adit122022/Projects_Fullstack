'use client';

import React, { useState } from 'react';
import { useCartStore } from '@/lib/store';
import RazorpayButton from '@/components/razorpay-button';
import { Info, ShoppingBag, ShieldCheck, Truck } from 'lucide-react';

export default function CheckoutPage() {
  const quantity = useCartStore((state) => state.quantity);
  const setQuantity = useCartStore((state) => state.setQuantity);
  const { baseAmount, gstAmount, totalAmount } = useCartStore((state) => state.getTotals)();

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    companyName: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Form Validation check
  const isFormValid =
    formData.name.trim().length > 1 &&
    formData.email.trim().includes('@') &&
    formData.phone.trim().length >= 10 &&
    formData.address.trim().length > 5;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          B2B Online Checkout
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Configure your quantity, input shipping details, and finalize your enterprise RX420 order.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Form Details */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">
              Shipping & Billing Details
            </h3>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                    Contact Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-850 dark:text-white"
                    placeholder="Enter full name"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                    Corporate Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-850 dark:text-white"
                    placeholder="name@company.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-850 dark:text-white"
                    placeholder="10-digit number"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                    Company Name / Institution (Optional)
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-850 dark:text-white"
                    placeholder="e.g. Infosys, St. Joseph School"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                  Complete Delivery Address
                </label>
                <textarea
                  name="address"
                  rows={3}
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-850 dark:text-white resize-none"
                  placeholder="Street address, building, city, state, pin code"
                />
              </div>
            </div>
          </div>

          {/* Quick info alerts */}
          <div className="grid grid-cols-3 gap-4 text-slate-500 dark:text-slate-400 text-xs">
            <div className="flex items-center gap-2 border border-slate-200 dark:border-slate-800 p-3 rounded-2xl bg-white dark:bg-slate-900 shadow-sm">
              <Truck size={18} className="text-blue-500 shrink-0" />
              <span>Free Delivery Pan-India</span>
            </div>
            <div className="flex items-center gap-2 border border-slate-200 dark:border-slate-800 p-3 rounded-2xl bg-white dark:bg-slate-900 shadow-sm">
              <ShieldCheck size={18} className="text-blue-500 shrink-0" />
              <span>1-Year Hardware Warranty</span>
            </div>
            <div className="flex items-center gap-2 border border-slate-200 dark:border-slate-800 p-3 rounded-2xl bg-white dark:bg-slate-900 shadow-sm">
              <Info size={18} className="text-blue-500 shrink-0" />
              <span>GST 18% Input Credit Claimable</span>
            </div>
          </div>
        </div>

        {/* Right Side: Cart Summary & Payment Trigger */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center gap-2">
              <ShoppingBag size={20} className="text-blue-600" /> Order Summary
            </h3>

            {/* Quantity Configurator */}
            <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">RX420 Thin Client</span>
                <span className="text-[10px] text-slate-500 mt-0.5">₹12,000 INR / Unit</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setQuantity(quantity - 1)}
                  className="w-8 h-8 rounded-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white font-bold flex items-center justify-center cursor-pointer hover:bg-slate-100"
                >
                  -
                </button>
                <span className="text-sm font-extrabold text-slate-800 dark:text-white min-w-4 text-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white font-bold flex items-center justify-center cursor-pointer hover:bg-slate-100"
                >
                  +
                </button>
              </div>
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-2.5 text-xs border-t border-b border-slate-100 dark:border-slate-800 py-4">
              <div className="flex justify-between text-slate-500 dark:text-slate-400">
                <span>Base Amount (₹12,000 × {quantity}):</span>
                <span className="font-semibold text-slate-700 dark:text-slate-200">
                  ₹{baseAmount.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between text-slate-500 dark:text-slate-400">
                <span>GST (18% GST Input Credit):</span>
                <span className="font-semibold text-slate-700 dark:text-slate-200">
                  ₹{gstAmount.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between text-slate-500 dark:text-slate-400">
                <span>Shipping & Delivery:</span>
                <span className="font-semibold text-green-500">FREE</span>
              </div>
            </div>

            {/* Total */}
            <div className="flex justify-between items-baseline">
              <span className="text-sm font-extrabold text-slate-900 dark:text-white">
                Total Amount (INR):
              </span>
              <span className="text-2xl font-black text-blue-600 dark:text-blue-400">
                ₹{totalAmount.toLocaleString('en-IN')}
              </span>
            </div>

            {/* Razorpay Button trigger */}
            {isFormValid ? (
              <RazorpayButton
                customerName={formData.name}
                customerEmail={formData.email}
                customerPhone={formData.phone}
                shippingAddress={formData.address}
                companyName={formData.companyName}
                quantity={quantity}
              />
            ) : (
              <div className="space-y-2">
                <button
                  type="button"
                  disabled
                  className="w-full bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 font-bold py-3.5 px-6 rounded-2xl cursor-not-allowed text-center text-sm border border-dashed border-slate-300 dark:border-slate-750"
                >
                  Please Complete Shipping Form
                </button>
                <p className="text-[10px] text-slate-400 text-center">
                  Fill in your contact name, corporate email, phone, and complete shipping address to unlock checkout.
                </p>
              </div>
            )}

          </div>
        </div>

      </div>

    </div>
  );
}
