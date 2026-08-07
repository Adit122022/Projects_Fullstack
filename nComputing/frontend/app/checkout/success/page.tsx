'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, FileText, ArrowRight, ArrowLeft, Mail } from 'lucide-react';

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId') || 'ORD-' + Math.random().toString(36).substring(2, 9).toUpperCase();

  return (
    <div className="mx-auto max-w-xl px-4 py-16 sm:py-24 text-center space-y-8">
      {/* Icon */}
      <div className="flex justify-center">
        <div className="w-20 h-20 bg-green-50 dark:bg-green-950/40 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center border border-green-200/50 dark:border-green-900/40 shadow-lg">
          <CheckCircle2 size={44} />
        </div>
      </div>

      {/* Header */}
      <div className="space-y-3">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">
          Order Successfully Placed!
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
          Thank you for choosing NComputing India. Your payment transaction has been confirmed, and your order is being processed.
        </p>
      </div>

      {/* Order Info Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm text-left space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center gap-2">
          <FileText size={16} className="text-blue-500" /> Checkout Details
        </h3>
        
        <div className="grid grid-cols-2 text-xs gap-y-3">
          <span className="text-slate-500">Order reference:</span>
          <span className="font-mono font-bold text-slate-800 dark:text-white text-right">
            {orderId}
          </span>
          <span className="text-slate-500">Delivery Timeline:</span>
          <span className="font-semibold text-slate-800 dark:text-white text-right">
            3 - 5 Business Days
          </span>
          <span className="text-slate-500">Logistics Partner:</span>
          <span className="font-semibold text-slate-800 dark:text-white text-right">
            Blue Dart / Delhivery Bulk
          </span>
        </div>
      </div>

      {/* Check inbox alert */}
      <div className="flex items-center gap-3 bg-blue-50 dark:bg-blue-950/30 text-blue-800 dark:text-blue-300 border border-blue-100 dark:border-blue-900/50 p-4 rounded-2xl text-left text-xs">
        <Mail size={18} className="text-blue-600 dark:text-blue-400 shrink-0" />
        <div>
          <h5 className="font-bold">Check Your Corporate Inbox</h5>
          <p className="text-slate-500 dark:text-slate-400 mt-0.5">
            We have triggered a dynamic HTML invoice containing your order breakdown, unit count, and 18% GST credit breakdown via Resend.
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
        <Link
          href="/"
          className="flex items-center justify-center gap-2 bg-slate-950 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-slate-200 text-white dark:text-slate-950 font-bold py-2.5 px-6 rounded-xl text-sm transition-all"
        >
          <ArrowLeft size={16} /> Back to Overview
        </Link>
        <Link
          href="/product/rx420"
          className="flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-850 hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300 font-bold py-2.5 px-6 rounded-xl text-sm transition-all"
        >
          View Specs <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <p className="text-sm font-semibold text-slate-500">Loading Order Details...</p>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
