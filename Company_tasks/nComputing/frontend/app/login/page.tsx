'use client';

import React, { useState } from 'react';
import { authClient } from '@/lib/auth-client';
import { Mail, KeyRound, Loader2, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await authClient.emailOtp.sendVerificationOtp({
        email,
        type: 'sign-in',
      });

      if (error) {
        toast.error(error.message || 'Failed to send OTP code');
      } else {
        setIsOtpSent(true);
        toast.success(`Verification code sent to ${email}`);
      }
    } catch (err: any) {
      toast.error('An unexpected error occurred sending OTP.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp) {
      toast.error('Please enter the verification code');
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await authClient.signIn.emailOtp({
        email,
        otp,
      });

      if (error) {
        toast.error(error.message || 'Invalid or expired OTP');
      } else {
        toast.success('Successfully authenticated!');
        router.push('/profile');
        router.refresh();
      }
    } catch (err: any) {
      toast.error('Authentication verification failed.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    try {
      await authClient.signIn.social({
        provider: 'google',
        callbackURL: '/profile',
      });
    } catch (err) {
      toast.error('Google authenticaton failed.');
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md w-full px-4 py-16 sm:py-24 flex-1 flex flex-col justify-center">
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/60 dark:border-slate-800/60 p-8 sm:p-10 rounded-3xl shadow-2xl space-y-8 relative overflow-hidden">
        
        {/* Glow element */}
        <div className="absolute -top-24 -left-24 w-48 h-48 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

        {/* Branding header */}
        <div className="text-center space-y-2 relative">
          <div className="mx-auto w-12 h-12 rounded-2xl bg-blue-650/10 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-2 shadow-inner">
            <KeyRound size={22} className="animate-pulse" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
            Client Access Portal
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
            Log in to manage thin client configurations, track B2B checkouts, and request customized demos.
          </p>
        </div>

        {/* Social Provider */}
        <div className="space-y-4">
          <button
            onClick={handleGoogleLogin}
            disabled={isGoogleLoading || isLoading}
            className="w-full flex items-center justify-center gap-3 bg-slate-55/10 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-850 text-slate-700 dark:text-slate-200 font-bold py-3 px-4 rounded-xl transition-all shadow-xs cursor-pointer disabled:opacity-50"
          >
            {isGoogleLoading ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
              </svg>
            )}
            Sign In with Google
          </button>

          {/* Separator */}
          <div className="flex items-center gap-3 text-slate-450 my-6">
            <div className="h-[1px] bg-slate-200 dark:bg-slate-800 flex-1" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">or use secure OTP</span>
            <div className="h-[1px] bg-slate-200 dark:bg-slate-800 flex-1" />
          </div>

          {/* Email OTP Login forms */}
          {!isOtpSent ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-[10px] font-extrabold text-slate-500 dark:text-slate-450 uppercase tracking-widest">
                  Corporate Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3.5 text-slate-400" size={16} />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                    className="w-full rounded-xl border border-slate-200 focus:border-blue-500 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 pl-10 pr-4 py-3 text-sm focus:outline-none dark:text-white transition-all focus:ring-2 focus:ring-blue-500/20"
                    placeholder="name@company.com"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading || isGoogleLoading}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-md shadow-blue-500/20 hover:shadow-blue-500/35 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin" size={18} /> Sending OTP...
                  </>
                ) : (
                  <>
                    Get Access Code <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div className="space-y-1.5 animate-fadeIn">
                <div className="flex justify-between items-baseline">
                  <label className="block text-[10px] font-extrabold text-slate-500 dark:text-slate-450 uppercase tracking-widest">
                    Verification Code
                  </label>
                  <button
                    type="button"
                    onClick={() => setIsOtpSent(false)}
                    className="text-[10px] text-blue-550 font-bold hover:underline"
                  >
                    Change Email
                  </button>
                </div>
                <div className="relative">
                  <KeyRound className="absolute left-3.5 top-3.5 text-slate-400" size={16} />
                  <input
                    type="text"
                    required
                    value={otp}
                    maxLength={6}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                    disabled={isLoading}
                    className="w-full rounded-xl border border-slate-200 focus:border-blue-500 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 pl-10 pr-4 py-3 text-sm focus:outline-none dark:text-white transition-all text-center tracking-[0.5em] font-mono font-black"
                    placeholder="••••••"
                  />
                </div>
                <p className="text-[10px] text-slate-400 text-center">
                  We've sent a 6-digit access code to <code className="font-semibold text-slate-700 dark:text-slate-200">{email}</code>.
                </p>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-md shadow-emerald-500/20 hover:shadow-emerald-500/35 cursor-pointer disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin" size={18} /> Authenticating...
                  </>
                ) : (
                  'Verify & Log In'
                )}
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
