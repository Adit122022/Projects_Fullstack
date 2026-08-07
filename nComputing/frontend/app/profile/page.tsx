'use client';

import React, { useState, useEffect } from 'react';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { 
  User as UserIcon, 
  Building2, 
  MapPin, 
  Phone, 
  FileText, 
  Briefcase, 
  Mail, 
  Loader2, 
  CheckCircle, 
  LogOut,
  Map,
  Hash
} from 'lucide-react';
import { toast } from 'sonner';

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  // Local Form state
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [taxId, setTaxId] = useState('');
  const [department, setDepartment] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('India');
  
  const [isUpdating, setIsUpdating] = useState(false);

  // Sync session user data to local state
  useEffect(() => {
    if (session?.user) {
      const u = session.user as any;
      setName(u.name || '');
      setPhone(u.phone || '');
      setCompanyName(u.companyName || '');
      setTaxId(u.taxId || '');
      setDepartment(u.department || '');
      setStreetAddress(u.streetAddress || '');
      setCity(u.city || '');
      setState(u.state || '');
      setPostalCode(u.postalCode || '');
      setCountry(u.country || 'India');
    }
  }, [session]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);

    try {
      const { error } = await authClient.updateUser({
        name,
        // Custom fields passed directly to updateUser
        phone,
        companyName,
        taxId,
        department,
        streetAddress,
        city,
        state,
        postalCode,
        country
      } as any);

      if (error) {
        toast.error(error.message || 'Failed to update corporate profile');
      } else {
        toast.success('Corporate profile updated successfully!');
      }
    } catch (err: any) {
      toast.error('An unexpected error occurred during profile update.');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSignOut = async () => {
    await authClient.signOut();
    window.location.href = '/';
  };

  if (isPending) {
    return (
      <div className="flex h-96 items-center justify-center gap-2">
        <Loader2 className="animate-spin text-blue-600" size={24} />
        <span className="text-sm font-semibold text-slate-500">Loading profile data...</span>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="mx-auto max-w-md w-full px-4 py-24 text-center space-y-4">
        <div className="mx-auto w-12 h-12 rounded-full bg-red-50 dark:bg-red-950/20 text-red-650 flex items-center justify-center">
          <UserIcon size={24} />
        </div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Authentication Required</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Please log in to your corporate account to view and update your profile.
        </p>
        <button
          onClick={() => router.push('/login')}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2.5 rounded-xl cursor-pointer shadow-sm transition-all"
        >
          Go to Sign In
        </button>
      </div>
    );
  }

  const userInitials = name ? name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'CO';

  return (
    <div className="mx-auto max-w-4xl w-full px-4 py-12 sm:py-16 space-y-8">
      
      {/* Header Profile Info */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 p-6 sm:p-8 rounded-3xl shadow-sm flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <div className="w-16 h-16 rounded-2xl bg-blue-600/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-black text-xl border border-blue-500/20 shadow-xs">
            {userInitials}
          </div>
          <div className="space-y-1">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2 justify-center sm:justify-start">
              {name || 'Corporate Account'}
              <span className="text-[10px] bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-extrabold uppercase px-2 py-0.5 rounded-md border border-blue-100 dark:border-blue-950">
                {(session.user as any).role || 'USER'}
              </span>
            </h1>
            <p className="text-xs text-slate-400 flex items-center gap-1.5 justify-center sm:justify-start">
              <Mail size={12} /> {session.user.email}
            </p>
          </div>
        </div>

        <button
          onClick={handleSignOut}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-red-650 bg-red-50/50 hover:bg-red-50 dark:bg-red-950/10 dark:hover:bg-red-950/20 border border-red-200/30 dark:border-red-950/30 cursor-pointer transition-all"
        >
          <LogOut size={13} /> Sign Out
        </button>
      </div>

      {/* Main Forms */}
      <form onSubmit={handleUpdateProfile} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card 1: Corporate Details */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 p-6 sm:p-8 rounded-3xl shadow-sm space-y-6">
            <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800/60 pb-3">
              <Building2 className="text-blue-600" size={18} />
              <h2 className="text-sm font-black uppercase tracking-wider text-slate-900 dark:text-white">
                Corporate Credentials
              </h2>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                  <UserIcon size={10} /> Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full text-xs rounded-lg border border-slate-200 focus:border-blue-500 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 px-3 py-2.5 focus:outline-none dark:text-white"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                  <Phone size={10} /> Contact Phone
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full text-xs rounded-lg border border-slate-200 focus:border-blue-500 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 px-3 py-2.5 focus:outline-none dark:text-white"
                  placeholder="+91 99999 99999"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                  <Building2 size={10} /> Company Name
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full text-xs rounded-lg border border-slate-200 focus:border-blue-500 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 px-3 py-2.5 focus:outline-none dark:text-white"
                  placeholder="Acme Tech Solutions Ltd."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                    <FileText size={10} /> Corporate GST / Tax ID
                  </label>
                  <input
                    type="text"
                    value={taxId}
                    onChange={(e) => setTaxId(e.target.value.toUpperCase())}
                    className="w-full text-xs rounded-lg border border-slate-200 focus:border-blue-500 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 px-3 py-2.5 focus:outline-none dark:text-white"
                    placeholder="29AAAAA0000A1Z5"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                    <Briefcase size={10} /> Department
                  </label>
                  <input
                    type="text"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full text-xs rounded-lg border border-slate-200 focus:border-blue-500 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 px-3 py-2.5 focus:outline-none dark:text-white"
                    placeholder="IT Operations"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Shipping/Billing Address */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 p-6 sm:p-8 rounded-3xl shadow-sm space-y-6">
            <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800/60 pb-3">
              <MapPin className="text-blue-600" size={18} />
              <h2 className="text-sm font-black uppercase tracking-wider text-slate-900 dark:text-white">
                Corporate Address Details
              </h2>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                  <MapPin size={10} /> Street Address
                </label>
                <input
                  type="text"
                  value={streetAddress}
                  onChange={(e) => setStreetAddress(e.target.value)}
                  className="w-full text-xs rounded-lg border border-slate-200 focus:border-blue-500 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 px-3 py-2.5 focus:outline-none dark:text-white"
                  placeholder="Plot No. 45, Phase III, Industrial Area"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                    <Map size={10} /> City
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full text-xs rounded-lg border border-slate-200 focus:border-blue-500 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 px-3 py-2.5 focus:outline-none dark:text-white"
                    placeholder="Bengaluru"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                    <Map size={10} /> State
                  </label>
                  <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full text-xs rounded-lg border border-slate-200 focus:border-blue-500 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 px-3 py-2.5 focus:outline-none dark:text-white"
                    placeholder="Karnataka"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                    <Hash size={10} /> PIN / Postal Code
                  </label>
                  <input
                    type="text"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="w-full text-xs rounded-lg border border-slate-200 focus:border-blue-500 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 px-3 py-2.5 focus:outline-none dark:text-white"
                    placeholder="560001"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                    Country
                  </label>
                  <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full text-xs rounded-lg border border-slate-200 focus:border-blue-500 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 px-3 py-2.5 focus:outline-none dark:text-white"
                    placeholder="India"
                  />
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isUpdating}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-md shadow-blue-500/10 hover:shadow-blue-500/20 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isUpdating ? (
              <>
                <Loader2 className="animate-spin" size={16} /> Saving Changes...
              </>
            ) : (
              <>
                <CheckCircle size={16} /> Save Corporate Details
              </>
            )}
          </button>
        </div>
      </form>

    </div>
  );
}
