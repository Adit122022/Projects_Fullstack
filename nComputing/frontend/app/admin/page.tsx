'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { AppSidebar } from '@/components/app-sidebar';
import { SiteHeader } from '@/components/site-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import {
  TrendingUp,
  ShoppingBag,
  Users,
  CheckCircle2,
  Search,
  RefreshCw,
  Mail,
  Phone,
  Building,
  User,
  Calendar,
  AlertCircle
} from 'lucide-react';

interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  companyName: string | null;
  quantity: number;
  unitPrice: number;
  totalAmount: number;
  paymentStatus: 'PENDING' | 'COMPLETED' | 'FAILED';
  orderStatus: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  createdAt: string;
}

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  organization: string;
  requiredSeats: number;
  message: string | null;
  status: 'NEW' | 'CONTACTED' | 'CLOSED';
  createdAt: string;
}

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Active Tab State (controlled via sidebar)
  const [activeTab, setActiveTab] = useState<'dashboard' | 'orders' | 'leads'>('dashboard');

  // Data State
  const [orders, setOrders] = useState<Order[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');

  // Search filter states
  const [orderSearch, setOrderSearch] = useState('');
  const [leadSearch, setLeadSearch] = useState('');

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

  const fetchData = async () => {
    if (!session?.user || !(session.user as any).accessToken) return;
    
    setError('');
    const token = (session.user as any).accessToken;

    try {
      // Fetch Orders
      const ordersRes = await fetch(`${apiUrl}/api/orders`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!ordersRes.ok) throw new Error('Failed to fetch orders');
      const ordersData = await ordersRes.json();
      setOrders(ordersData);

      // Fetch Leads
      const leadsRes = await fetch(`${apiUrl}/api/leads`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!leadsRes.ok) throw new Error('Failed to fetch leads');
      const leadsData = await leadsRes.json();
      setLeads(leadsData);

    } catch (err: any) {
      setError(err.message || 'Error loading dashboard records.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (status === 'authenticated') {
      fetchData();
    } else if (status === 'unauthenticated') {
      router.replace('/admin/login');
    }
  }, [status, session]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  const handleUpdateOrderStatus = async (orderId: string, newStatus: string) => {
    if (!session?.user) return;
    const token = (session.user as any).accessToken;

    try {
      const res = await fetch(`${apiUrl}/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to update order status');
      }

      // Update state locally
      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId
            ? { ...order, orderStatus: newStatus as Order['orderStatus'] }
            : order
        )
      );
    } catch (err: any) {
      alert(err.message || 'Error updating order status.');
    }
  };

  const handleUpdateLeadStatus = async (leadId: string, newStatus: string) => {
    if (!session?.user) return;
    const token = (session.user as any).accessToken;

    try {
      const res = await fetch(`${apiUrl}/api/leads/${leadId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to update lead status');
      }

      // Update state locally
      setLeads((prev) =>
        prev.map((lead) =>
          lead.id === leadId
            ? { ...lead, status: newStatus as Lead['status'] }
            : lead
        )
      );
    } catch (err: any) {
      alert(err.message || 'Error updating lead status.');
    }
  };

  // Metrics calculations
  const totalRevenue = orders
    .filter((o) => o.paymentStatus === 'COMPLETED')
    .reduce((sum, o) => sum + o.totalAmount, 0);

  const completedOrdersCount = orders.filter((o) => o.paymentStatus === 'COMPLETED').length;
  const activeLeadsCount = leads.filter((l) => l.status !== 'CLOSED').length;
  
  const deliveredUnitsCount = orders
    .filter((o) => o.orderStatus === 'DELIVERED' && o.paymentStatus === 'COMPLETED')
    .reduce((sum, o) => sum + o.quantity, 0);

  // Search filter implementations
  const filteredOrders = orders.filter(
    (o) =>
      o.customerName.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.id.toLowerCase().includes(orderSearch.toLowerCase()) ||
      (o.companyName && o.companyName.toLowerCase().includes(orderSearch.toLowerCase()))
  );

  const filteredLeads = leads.filter(
    (l) =>
      l.name.toLowerCase().includes(leadSearch.toLowerCase()) ||
      l.organization.toLowerCase().includes(leadSearch.toLowerCase()) ||
      l.email.toLowerCase().includes(leadSearch.toLowerCase())
  );

  if (status === 'loading' || loading) {
    return (
      <div className="flex h-screen items-center justify-center gap-2 bg-slate-50 dark:bg-slate-950">
        <RefreshCw className="animate-spin text-blue-600" size={24} />
        <span className="text-sm font-semibold text-slate-500">Loading Admin System...</span>
      </div>
    );
  }

  // Define sidebar user information
  const sidebarUser = {
    name: session?.user?.name || 'Administrator',
    email: session?.user?.email || 'admin@ncomputing.in',
    avatar: 'https://placehold.co/100x100/3b82f6/ffffff?text=A'
  };

  // Tab Header title mapping
  const titleMap = {
    dashboard: 'General Overview',
    orders: 'E-Commerce Orders',
    leads: 'B2B Demo Request Leads'
  };

  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "18rem",
        "--header-height": "4rem",
      } as React.CSSProperties}
    >
      {/* Dynamic AppSidebar linking layout state */}
      <AppSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        user={sidebarUser}
      />

      <SidebarInset>
        {/* Dynamic header title depending on selection */}
        <SiteHeader title={titleMap[activeTab]} />

        {/* Content area */}
        <div className="flex flex-1 flex-col gap-6 p-6 overflow-y-auto bg-slate-50/50 dark:bg-slate-950/20">
          
          {error && (
            <div className="flex items-center gap-2 text-xs font-semibold text-red-500 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-950/45 p-4 rounded-xl">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          {/* Render Dashboard Summary Overview */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              
              {/* Metrics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                
                {/* Total Revenue */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm flex items-center justify-between">
                  <div className="space-y-1.5">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Total Revenue
                    </span>
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                      ₹{totalRevenue.toLocaleString('en-IN')}
                    </h3>
                    <p className="text-[10px] text-slate-400">Total completed sandbox orders</p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                    <TrendingUp size={20} />
                  </div>
                </div>

                {/* Total Orders */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm flex items-center justify-between">
                  <div className="space-y-1.5">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Paid Orders
                    </span>
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                      {completedOrdersCount} Orders
                    </h3>
                    <p className="text-[10px] text-slate-400">Confirmed transactions</p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                    <ShoppingBag size={20} />
                  </div>
                </div>

                {/* Active Demo Leads */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm flex items-center justify-between">
                  <div className="space-y-1.5">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Active Leads
                    </span>
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                      {activeLeadsCount} Leads
                    </h3>
                    <p className="text-[10px] text-slate-400">Awaiting contact/closure</p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                    <Users size={20} />
                  </div>
                </div>

                {/* Delivered Units */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm flex items-center justify-between">
                  <div className="space-y-1.5">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Delivered Units
                    </span>
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                      {deliveredUnitsCount} Units
                    </h3>
                    <p className="text-[10px] text-slate-400">Total units shipped</p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                    <CheckCircle2 size={20} />
                  </div>
                </div>

              </div>

              {/* Welcome card & details */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-6 text-white shadow-lg space-y-3 relative overflow-hidden">
                  <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 border border-white/10 px-2 py-0.5 rounded-full inline-block">
                    Operational Info
                  </span>
                  <h4 className="text-xl font-bold">NComputing B2B virtual Desktop Operations</h4>
                  <p className="text-xs text-blue-100 leading-relaxed max-w-xl">
                    Welcome to the management control center. From this system, you can monitor bulk lead requests submitted by IT decision-makers, track active orders via Razorpay transaction logs, update logistic statuses, and claim inputs.
                  </p>
                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={() => setActiveTab('orders')}
                      className="bg-white hover:bg-slate-100 text-blue-900 font-bold text-xs px-4 py-2 rounded-xl transition-all cursor-pointer"
                    >
                      Manage Orders
                    </button>
                    <button
                      onClick={() => setActiveTab('leads')}
                      className="bg-blue-900/40 hover:bg-blue-900/60 text-white font-bold text-xs px-4 py-2 rounded-xl border border-white/10 transition-all cursor-pointer"
                    >
                      Process Demo Leads
                    </button>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl shadow-sm space-y-4">
                  <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm border-b border-slate-150 dark:border-slate-800 pb-2">
                    Recent Database Status
                  </h4>
                  <div className="space-y-3 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Total Leads captured:</span>
                      <span className="font-semibold text-slate-800 dark:text-white">{leads.length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Total Orders logged:</span>
                      <span className="font-semibold text-slate-800 dark:text-white">{orders.length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Database Engine:</span>
                      <span className="font-mono text-[10px] text-blue-600 dark:text-blue-400">Neon serverless DB</span>
                    </div>
                    <div className="pt-2">
                      <button
                        onClick={handleRefresh}
                        disabled={refreshing}
                        className="w-full flex items-center justify-center gap-1.5 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs font-bold text-slate-650 hover:bg-slate-50 dark:hover:bg-slate-850 cursor-pointer"
                      >
                        <RefreshCw size={12} className={refreshing ? 'animate-spin' : ''} /> Sync live records
                      </button>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* Render Orders Table View */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              
              {/* Search bar */}
              <div className="relative max-w-md bg-white dark:bg-slate-900 rounded-xl shadow-xs">
                <Search className="absolute left-3.5 top-3 text-slate-400" size={16} />
                <input
                  type="text"
                  placeholder="Search orders by customer, ID, or company..."
                  value={orderSearch}
                  onChange={(e) => setOrderSearch(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 pl-10 pr-4 py-2.5 text-xs focus:border-blue-500 focus:outline-none dark:bg-slate-900"
                />
              </div>

              {/* Table Container */}
              <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[900px]">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                        <th className="p-4">Order Ref / Date</th>
                        <th className="p-4">Customer Details</th>
                        <th className="p-4">Quantity</th>
                        <th className="p-4">Amount</th>
                        <th className="p-4">Payment</th>
                        <th className="p-4">Order Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-xs">
                      {filteredOrders.length > 0 ? (
                        filteredOrders.map((order) => (
                          <tr key={order.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/10 transition-colors">
                            <td className="p-4">
                              <div className="font-bold text-slate-850 dark:text-white font-mono">{order.id}</div>
                              <div className="text-[10px] text-slate-400 mt-0.5">
                                {new Date(order.createdAt).toLocaleDateString('en-IN', {
                                  day: '2-digit',
                                  month: 'short',
                                  year: 'numeric'
                                })}
                              </div>
                            </td>
                            <td className="p-4 space-y-0.5">
                              <div className="font-semibold text-slate-850 dark:text-slate-200">{order.customerName}</div>
                              <div className="text-[10px] text-slate-400 flex items-center gap-1">
                                <Mail size={10} /> {order.customerEmail}
                              </div>
                              <div className="text-[10px] text-slate-400 flex items-center gap-1">
                                <Phone size={10} /> {order.customerPhone}
                              </div>
                              {order.companyName && (
                                <div className="text-[10px] text-blue-600 dark:text-blue-400 font-bold bg-blue-50 dark:bg-blue-950/20 px-1.5 py-0.5 rounded inline-block mt-1">
                                  {order.companyName}
                                </div>
                              )}
                            </td>
                            <td className="p-4 font-bold text-slate-800 dark:text-slate-200">
                              {order.quantity} units
                            </td>
                            <td className="p-4 font-black text-slate-800 dark:text-slate-200">
                              ₹{order.totalAmount.toLocaleString('en-IN')}
                            </td>
                            <td className="p-4">
                              <span
                                className={`inline-flex items-center rounded-full text-[10px] font-bold px-2 py-0.5 border ${
                                  order.paymentStatus === 'COMPLETED'
                                    ? 'bg-green-50 text-green-700 border-green-200 dark:bg-green-950/20 dark:text-green-400 dark:border-green-950'
                                    : order.paymentStatus === 'FAILED'
                                    ? 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950/20 dark:text-red-400 dark:border-red-950'
                                    : 'bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-950/20 dark:text-yellow-400 dark:border-yellow-950'
                                }`}
                              >
                                {order.paymentStatus}
                              </span>
                            </td>
                            <td className="p-4">
                              {order.paymentStatus === 'COMPLETED' ? (
                                <select
                                  value={order.orderStatus}
                                  onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                                  className="rounded-lg border border-slate-350 dark:border-slate-700 bg-white dark:bg-slate-800 px-2 py-1 text-xs focus:outline-none focus:border-blue-500 font-medium cursor-pointer"
                                >
                                  <option value="PENDING">Pending</option>
                                  <option value="PROCESSING">Processing</option>
                                  <option value="SHIPPED">Shipped</option>
                                  <option value="DELIVERED">Delivered</option>
                                  <option value="CANCELLED">Cancelled</option>
                                </select>
                              ) : (
                                <span className="text-slate-400 italic">Awaiting Payment</span>
                              )}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={6} className="p-8 text-center text-slate-450 italic">
                            No e-commerce orders found matching the filter.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* Render Leads Table View */}
          {activeTab === 'leads' && (
            <div className="space-y-4">
              
              {/* Search bar */}
              <div className="relative max-w-md bg-white dark:bg-slate-900 rounded-xl shadow-xs">
                <Search className="absolute left-3.5 top-3 text-slate-400" size={16} />
                <input
                  type="text"
                  placeholder="Search leads by name, org, or email..."
                  value={leadSearch}
                  onChange={(e) => setLeadSearch(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 pl-10 pr-4 py-2.5 text-xs focus:border-blue-500 focus:outline-none dark:bg-slate-900"
                />
              </div>

              {/* Table Container */}
              <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[900px]">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                        <th className="p-4">Contact Profile</th>
                        <th className="p-4">Organization</th>
                        <th className="p-4">Required Seats</th>
                        <th className="p-4">Message / Requirements</th>
                        <th className="p-4">Status</th>
                        <th className="p-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-xs">
                      {filteredLeads.length > 0 ? (
                        filteredLeads.map((lead) => (
                          <tr key={lead.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/10 transition-colors">
                            <td className="p-4 space-y-0.5">
                              <div className="font-bold text-slate-800 dark:text-white flex items-center gap-1">
                                <User size={12} className="text-slate-400" /> {lead.name}
                              </div>
                              <div className="text-[10px] text-slate-400 flex items-center gap-1">
                                <Mail size={10} /> {lead.email}
                              </div>
                              <div className="text-[10px] text-slate-400 flex items-center gap-1">
                                <Phone size={10} /> {lead.phone}
                              </div>
                              <div className="text-[9px] text-slate-400 font-mono mt-1">
                                Ref: {lead.id}
                              </div>
                            </td>
                            <td className="p-4">
                              <div className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1">
                                <Building size={12} className="text-slate-400" /> {lead.organization}
                              </div>
                              <div className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
                                <Calendar size={10} /> {new Date(lead.createdAt).toLocaleDateString('en-IN')}
                              </div>
                            </td>
                            <td className="p-4 font-extrabold text-blue-600 dark:text-blue-400">
                              {lead.requiredSeats} Seats
                            </td>
                            <td className="p-4 max-w-[280px]">
                              {lead.message ? (
                                <p className="italic text-slate-650 dark:text-slate-400 line-clamp-3">
                                  "{lead.message}"
                                </p>
                              ) : (
                                <span className="text-slate-400 italic">No notes left</span>
                              )}
                            </td>
                            <td className="p-4">
                              <span
                                className={`inline-flex items-center rounded-full text-[10px] font-bold px-2 py-0.5 border ${
                                  lead.status === 'NEW'
                                    ? 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/20 dark:text-blue-400 dark:border-blue-950'
                                    : lead.status === 'CONTACTED'
                                    ? 'bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-950/20 dark:text-yellow-400 dark:border-yellow-950'
                                    : 'bg-slate-100 text-slate-700 border-slate-300 dark:bg-slate-800 dark:text-slate-400 dark:border-sidebar-border'
                                }`}
                              >
                                {lead.status}
                              </span>
                            </td>
                            <td className="p-4">
                              <select
                                value={lead.status}
                                onChange={(e) => handleUpdateLeadStatus(lead.id, e.target.value)}
                                className="rounded-lg border border-slate-350 dark:border-slate-700 bg-white dark:bg-slate-800 px-2 py-1 text-xs focus:outline-none focus:border-blue-500 font-medium cursor-pointer"
                              >
                                <option value="NEW">New</option>
                                <option value="CONTACTED">Contacted</option>
                                <option value="CLOSED">Closed</option>
                              </select>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={6} className="p-8 text-center text-slate-450 italic">
                            No demo request leads found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
