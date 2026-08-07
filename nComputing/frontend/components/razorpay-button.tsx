'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CreditCard, Loader2 } from 'lucide-react';

interface RazorpayButtonProps {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  companyName?: string;
  quantity: number;
  disabled?: boolean;
}

export default function RazorpayButton({
  customerName,
  customerEmail,
  customerPhone,
  shippingAddress,
  companyName,
  quantity,
  disabled
}: RazorpayButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Dynamically load Razorpay SDK script
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    setLoading(true);
    setError('');

    const isScriptLoaded = await loadRazorpayScript();
    if (!isScriptLoaded) {
      setError('Failed to load Razorpay SDK. Please check your internet connection.');
      setLoading(false);
      return;
    }

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

    try {
      // Step 1: Create Razorpay Order in the Express backend
      const res = await fetch(`${apiUrl}/api/payments/create-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          customerName,
          customerEmail,
          customerPhone,
          shippingAddress,
          companyName,
          quantity
        })
      });

      const orderData = await res.json();

      if (!res.ok) {
        throw new Error(orderData.error || 'Failed to create payment order.');
      }

      // Step 2: Open Razorpay checkout modal
      // If it's a mock order ID, handle mock redirect instantly
      if (orderData.razorpayOrderId.startsWith('order_mock_')) {
        console.log('Sandbox checkout: simulating successful payment for mock order.');
        // Verify payment instantly on mock
        const verifyRes = await fetch(`${apiUrl}/api/payments/verify`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            razorpayOrderId: orderData.razorpayOrderId,
            razorpayPaymentId: `pay_mock_${Math.random().toString(36).substring(2, 11)}`,
            razorpaySignature: 'mock_signature'
          })
        });

        const verifyData = await verifyRes.json();

        if (verifyRes.ok) {
          router.push(`/checkout/success?orderId=${verifyData.order.id}`);
        } else {
          throw new Error(verifyData.error || 'Mock signature verification failed.');
        }
        return;
      }

      // Options for Razorpay checkout dialog
      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'NComputing India',
        description: `RX420 Thin Client (x${quantity} units)`,
        image: 'https://placehold.co/100x100/3b82f6/ffffff?text=N',
        order_id: orderData.razorpayOrderId,
        handler: async function (response: any) {
          try {
            setLoading(true);
            
            // Step 3: Verify Razorpay signature in backend
            const verifyRes = await fetch(`${apiUrl}/api/payments/verify`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature
              })
            });

            const verifyData = await verifyRes.json();

            if (verifyRes.ok) {
              router.push(`/checkout/success?orderId=${verifyData.order.id}`);
            } else {
              throw new Error(verifyData.error || 'Payment signature verification failed.');
            }
          } catch (err: any) {
            setError(err.message || 'Signature verification process failed.');
            setLoading(false);
          }
        },
        prefill: {
          name: orderData.customerDetails.name,
          email: orderData.customerDetails.email,
          contact: orderData.customerDetails.phone
        },
        theme: {
          color: '#2563eb' // NComputing primary blue
        }
      };

      const paymentWindow = new (window as any).Razorpay(options);
      
      paymentWindow.on('payment.failed', function (response: any) {
        setError(response.error.description || 'Payment transaction failed.');
      });

      paymentWindow.open();

    } catch (err: any) {
      setError(err.message || 'Unable to process checkout. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full space-y-3">
      {error && (
        <div className="text-xs font-semibold text-red-600 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-950 p-3 rounded-xl">
          {error}
        </div>
      )}

      <button
        type="button"
        disabled={disabled || loading}
        onClick={handlePayment}
        className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-6 rounded-2xl transition-all shadow-lg hover:shadow-blue-500/25 disabled:bg-slate-300 disabled:cursor-not-allowed cursor-pointer"
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin" size={18} /> Processing Transaction...
          </>
        ) : (
          <>
            <CreditCard size={18} /> Pay Securely via Razorpay
          </>
        )}
      </button>
      <div className="text-center text-[10px] text-slate-400">
        Secured sandbox connection. Accepts standard UPI, card options.
      </div>
    </div>
  );
}
