'use client';

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Loader2, Lock, Mail } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false // Do not redirect automatically, let us handle it
      });

      if (res?.error) {
        setError('Invalid credentials. Please verify your email and password.');
        setLoading(false);
      } else {
        router.replace('/admin');
        router.refresh();
      }
    } catch (err) {
      setError('An unexpected authentication error occurred.');
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md px-4 py-20 sm:py-28">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-3xl shadow-xl space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-2">
            <Lock size={22} />
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            Admin Portal Sign-In
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Authorized NComputing India administrators only.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3.5 text-slate-400" size={16} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-300 pl-10 pr-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-850 dark:text-white"
                placeholder="admin@ncomputing.in"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 text-slate-400" size={16} />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-slate-300 pl-10 pr-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-850 dark:text-white"
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && (
            <div className="text-xs font-semibold text-red-500 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-950/50 p-2.5 rounded-lg">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-4 rounded-xl transition-all shadow-lg hover:shadow-blue-500/25 disabled:bg-blue-400 cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={18} /> Authenticating...
              </>
            ) : (
              'Sign In to Dashboard'
            )}
          </button>
        </form>

        <div className="text-center text-[10px] text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
          Default seed account: <code className="font-semibold text-slate-600 dark:text-slate-300">admin@ncomputing.in</code> / <code className="font-semibold text-slate-600 dark:text-slate-300">Admin@123</code>
        </div>

      </div>
    </div>
  );
}
