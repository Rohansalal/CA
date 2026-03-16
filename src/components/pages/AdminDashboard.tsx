/// <reference types="vite/client" />
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../../contexts/AdminContext';
import {
  BarChart3,
  Users,
  ShoppingCart,
  DollarSign,
  AlertCircle,
  LogOut,
  Settings,
  User as UserIcon,
  TrendingUp,
  FileText,
  MessageSquare,
  Upload,
  XCircle
} from 'lucide-react';

interface DashboardStats {
  totalUsers: number;
  totalAdmins: number;
  totalServices: number;
  totalServicesPurchased: number;
  totalRevenue: number;
  totalPayments: number;
  totalTickets: number;
  openTickets: number;
}

interface RecentUser {
  id: number;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
}

interface RecentService {
  id: number;
  user: { name: string; email: string };
  service: { name: string; price: number };
  status: string;
  createdAt: string;
}

interface ConsultationRequest {
  id: number;
  fullName: string;
  email: string;
  mobile: string;
  businessName: string;
  services: { serviceCode: string }[];
  status: string;
  createdAt: string;
}

interface Ticket {
  id: number;
  subject: string;
  message: string;
  status: 'OPEN' | 'RESOLVED' | 'CLOSED';
  adminReply: string | null;
  createdAt: string;
  userId: number;
  user: {
    name: string;
    email: string;
  };
}

export const AdminDashboard: React.FC = () => {
  const { adminUser, adminLogout } = useAdmin();
  const navigate = useNavigate();

  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentUsers, setRecentUsers] = useState<RecentUser[]>([]);
  const [recentServices, setRecentServices] = useState<RecentService[]>([]);
  const [consultations, setConsultations] = useState<ConsultationRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'services' | 'payments' | 'analytics' | 'tickets' | 'consultations'>('overview');

  const [payments, setPayments] = useState<any[]>([]);
  const [showReportModal, setShowReportModal] = useState(false);
  const [selectedOrderForReport, setSelectedOrderForReport] = useState<{ orderId: number, userId: number } | null>(null);
  const [reportFile, setReportFile] = useState<File | null>(null);
  const [uploadingReport, setUploadingReport] = useState(false);

  // Tickets State
  const [dashboardTickets, setDashboardTickets] = useState<Ticket[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [ticketReplyText, setTicketReplyText] = useState('');
  const [ticketReplyStatus, setTicketReplyStatus] = useState<'RESOLVED' | 'CLOSED' | 'OPEN'>('RESOLVED');
  const [submittingTicketReply, setSubmittingTicketReply] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  useEffect(() => {
    if (activeTab === 'payments') {
      fetchPayments();
    } else if (activeTab === 'tickets') {
      fetchDashboardTickets();
    }
  }, [activeTab]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('adminToken');
      const headers = { 'Authorization': `Bearer ${token}` };
      const baseUrl = import.meta.env.VITE_API_BASE_URL;

      // Fetch dashboard stats and consultations in parallel
      const [dashRes, consultRes] = await Promise.all([
        fetch(`${baseUrl}/dashboard/admin`, { headers, credentials: 'include' }),
        fetch(`${baseUrl}/consultations?limit=5`, { headers, credentials: 'include' })
      ]);

      if (!dashRes.ok) throw new Error('Failed to fetch dashboard data');

      const dashData = await dashRes.json();

      // Map backend data to frontend stats structure
      const mappedStats: DashboardStats = {
        totalUsers: dashData.stats.users.total,
        totalAdmins: 0, // Backend doesn't provide this separately in dashboard
        totalServices: dashData.stats.services,
        totalServicesPurchased: dashData.stats.payments.total,
        totalRevenue: dashData.stats.payments.totalRevenue,
        totalPayments: dashData.stats.payments.total,
        totalTickets: dashData.stats.tickets.total,
        openTickets: dashData.stats.tickets.open
      };

      setStats(mappedStats);
      setRecentUsers(dashData.recentActivity.users || []);

      // Map payments to recentServices if they represent service purchases
      const mappedServices = dashData.recentActivity.payments.map((p: any) => ({
        id: p.id,
        user: { name: p.user?.name || 'Unknown', email: p.user?.email || 'N/A' },
        service: { name: p.service?.name || 'Standard Service', price: p.amount },
        status: p.status,
        createdAt: p.createdAt
      }));
      setRecentServices(mappedServices);

      if (consultRes.ok) {
        const consultData = await consultRes.json();
        setConsultations(Array.isArray(consultData) ? consultData : []);
      }

    } catch (err: any) {
      console.error('Fetch error:', err);
      setError(err.message || 'Error loading dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');
      const headers: HeadersInit = {};
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/payments`, {
        headers,
        credentials: 'include'
      });

      if (res.ok) {
        const data = await res.json();
        // The backend might return { payments: [...] } or just an array
        setPayments(Array.isArray(data) ? data : (data.payments || []));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchDashboardTickets = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');
      const headers: HeadersInit = {};
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/tickets`, {
        headers,
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();
        setDashboardTickets(data.tickets || []);
      }
    } catch (error) {
      console.error('Error fetching tickets:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTicketReplySubmit = async () => {
    if (!selectedTicket || !ticketReplyText.trim()) return;

    try {
      setSubmittingTicketReply(true);
      const token = localStorage.getItem('adminToken');

      const headers: HeadersInit = {
        'Content-Type': 'application/json'
      };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/tickets/${selectedTicket.id}`, {
        method: 'PUT',
        headers,
        credentials: 'include',
        body: JSON.stringify({
          adminReply: ticketReplyText,
          status: ticketReplyStatus
        })
      });

      if (response.ok) {
        alert('Reply sent successfully');
        fetchDashboardTickets();
        setSelectedTicket(null);
        setTicketReplyText('');
      } else {
        alert('Failed to send reply');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to send reply');
    } finally {
      setSubmittingTicketReply(false);
    }
  };

  const handleVerifyPayment = async (paymentId: number, status: 'APPROVE' | 'REJECT') => {
    if (!window.confirm(`Are you sure you want to ${status} this payment?`)) return;

    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/payments/verify-manual`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ paymentId, status }),
        credentials: 'include'
      });

      if (res.ok) {
        alert('Payment status updated');
        fetchPayments();
      } else {
        alert('Failed to update status');
      }
    } catch (err) {
      console.error(err);
      alert('Error updating status');
    }
  };

  const handleUploadReport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrderForReport || !reportFile) return;

    try {
      setUploadingReport(true);
      const token = localStorage.getItem('adminToken');
      const formData = new FormData();
      formData.append('orderId', selectedOrderForReport.orderId.toString());
      formData.append('userId', selectedOrderForReport.userId.toString());
      formData.append('report', reportFile);

      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/documents/upload-report`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData,
        credentials: 'include'
      });

      if (res.ok) {
        alert('Report uploaded successfully');
        setShowReportModal(false);
        setReportFile(null);
        setSelectedOrderForReport(null);
      } else {
        alert('Failed to upload report');
      }
    } catch (err) {
      console.error(err);
      alert('Error uploading report');
    } finally {
      setUploadingReport(false);
    }
  };

  const handleDeleteConsultation = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this consultation request?')) return;

    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');

      const headers: HeadersInit = {};
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/consultations/${id}`, {
        method: 'DELETE',
        headers,
        credentials: 'include'
      });

      if (!response.ok) throw new Error('Failed to delete consultation');

      await fetchDashboardData();
    } catch (err: any) {
      console.error(err);
      alert('Failed to delete consultation request');
      setLoading(false);
    }
  };

  const handleLogout = () => {
    adminLogout();
    navigate('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-primary">Admin Dashboard</h1>
              <p className="text-gray-600 mt-1">Role: <span className="font-semibold text-primary">{adminUser?.role}</span></p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="font-semibold text-gray-900">{adminUser?.name}</p>
                <p className="text-sm text-gray-600">{adminUser?.email}</p>
              </div>
              <button
                onClick={() => navigate('/admin/profile')}
                className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition"
                title="Profile"
              >
                <UserIcon className="w-6 h-6" />
              </button>
              <div className="h-8 w-px bg-gray-300 mx-1"></div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center gap-2"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 m-4 rounded">
          <p className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            {error}
          </p>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-8 overflow-hidden">
          <div className="flex border-b overflow-x-auto">
            {(['overview', 'users', 'services', 'payments', 'analytics', 'tickets', 'consultations'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 px-6 py-4 font-semibold transition whitespace-nowrap ${activeTab === tab
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-gray-600 hover:text-primary'
                  }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className="p-8">

            {/* Overview Tab */}
            {activeTab === 'overview' && stats && (
              <div className="space-y-8">
                {/* Admin Quick Actions */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">🔧 Admin Actions</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <button onClick={() => navigate('/admin/users')} className="bg-white hover:bg-blue-50 border border-blue-300 rounded-lg p-4 text-left transition shadow-sm">
                      <p className="text-sm text-gray-600">👥 Manage Users</p>
                      <p className="font-semibold text-gray-900">View & Modify</p>
                    </button>
                    <button onClick={() => navigate('/admin/services')} className="bg-white hover:bg-green-50 border border-green-300 rounded-lg p-4 text-left transition shadow-sm">
                      <p className="text-sm text-gray-600">🛍️ Services</p>
                      <p className="font-semibold text-gray-900">Create & Edit</p>
                    </button>
                    <button onClick={() => navigate('/admin/analytics')} className="bg-white hover:bg-purple-50 border border-purple-300 rounded-lg p-4 text-left transition shadow-sm">
                      <p className="text-sm text-gray-600">📊 Analytics</p>
                      <p className="font-semibold text-gray-900">View Reports</p>
                    </button>
                    <button onClick={() => navigate('/admin/tickets')} className="bg-white hover:bg-orange-50 border border-orange-300 rounded-lg p-4 text-left transition shadow-sm">
                      <p className="text-sm text-gray-600">🎫 Support Tickets</p>
                      <p className="font-semibold text-gray-900">Respond & Resolve</p>
                    </button>
                  </div>
                </div>

                {/* CRM Actions */}
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg p-6 border border-emerald-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">💼 CRM Modules</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <button onClick={() => navigate('/admin/crm', { state: { tab: 'tasks' } })} className="bg-white hover:bg-emerald-50 border border-emerald-300 rounded-lg p-4 text-left transition shadow-sm">
                      <p className="text-sm text-gray-600">✅ Tasks</p>
                      <p className="font-semibold text-gray-900">Track & Manage</p>
                    </button>
                    <button onClick={() => navigate('/admin/crm', { state: { tab: 'leads' } })} className="bg-white hover:bg-teal-50 border border-teal-300 rounded-lg p-4 text-left transition shadow-sm">
                      <p className="text-sm text-gray-600">🎯 Leads</p>
                      <p className="font-semibold text-gray-900">Pipeline Funnel</p>
                    </button>
                    <button onClick={() => navigate('/admin/crm', { state: { tab: 'orders' } })} className="bg-white hover:bg-cyan-50 border border-cyan-300 rounded-lg p-4 text-left transition shadow-sm">
                      <p className="text-sm text-gray-600">📦 Orders</p>
                      <p className="font-semibold text-gray-900">Audit & Progress</p>
                    </button>
                    <button onClick={() => navigate('/admin/crm', { state: { tab: 'notifications' } })} className="bg-white hover:bg-sky-50 border border-sky-300 rounded-lg p-4 text-left transition shadow-sm">
                      <p className="text-sm text-gray-600">🔔 Notifications</p>
                      <p className="font-semibold text-gray-900">Send Alerts</p>
                    </button>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { label: 'Total Users', value: stats.totalUsers, icon: Users, color: 'blue' },
                    { label: 'Total Admins', value: stats.totalAdmins, icon: UserIcon, color: 'purple' },
                    { label: 'Services Purchased', value: stats.totalServicesPurchased, icon: ShoppingCart, color: 'green' },
                    { label: 'Total Revenue', value: `₹${stats.totalRevenue}`, icon: DollarSign, color: 'yellow' }
                  ].map((stat, idx) => {
                    const Icon = stat.icon;
                    const colorClasses = {
                      blue: 'from-blue-50 to-blue-100 border-blue-200',
                      purple: 'from-purple-50 to-purple-100 border-purple-200',
                      green: 'from-green-50 to-green-100 border-green-200',
                      yellow: 'from-yellow-50 to-yellow-100 border-yellow-200'
                    };

                    return (
                      <div key={idx} className={`bg-gradient-to-br ${colorClasses[stat.color as keyof typeof colorClasses]} rounded-lg p-6 border`}>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                            <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                          </div>
                          <Icon className="w-12 h-12 text-gray-300" />
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Tickets Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-6 border border-orange-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-orange-600 text-sm font-medium">Total Support Tickets</p>
                        <p className="text-3xl font-bold text-orange-900 mt-2">{stats.totalTickets}</p>
                      </div>
                      <MessageSquare className="w-12 h-12 text-orange-300" />
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-6 border border-red-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-red-600 text-sm font-medium">Open Tickets</p>
                        <p className="text-3xl font-bold text-red-900 mt-2">{stats.openTickets}</p>
                      </div>
                      <AlertCircle className="w-12 h-12 text-red-300" />
                    </div>
                  </div>
                </div>

                {/* Recent Users */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Users</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-white border-b">
                        <tr>
                          <th className="px-6 py-3 text-left font-semibold text-gray-900">Name</th>
                          <th className="px-6 py-3 text-left font-semibold text-gray-900">Email</th>
                          <th className="px-6 py-3 text-left font-semibold text-gray-900">Phone</th>
                          <th className="px-6 py-3 text-left font-semibold text-gray-900">Registered</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {recentUsers.map((usr) => (
                          <tr key={usr.id} className="bg-white hover:bg-gray-50">
                            <td className="px-6 py-4 text-gray-900">{usr.name}</td>
                            <td className="px-6 py-4 text-gray-600">{usr.email}</td>
                            <td className="px-6 py-4 text-gray-600">{usr.phone || 'N/A'}</td>
                            <td className="px-6 py-4 text-gray-600">{new Date(usr.createdAt).toLocaleDateString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Recent Services */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Service Purchases</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-white border-b">
                        <tr>
                          <th className="px-6 py-3 text-left font-semibold text-gray-900">User</th>
                          <th className="px-6 py-3 text-left font-semibold text-gray-900">Service</th>
                          <th className="px-6 py-3 text-left font-semibold text-gray-900">Price</th>
                          <th className="px-6 py-3 text-left font-semibold text-gray-900">Status</th>
                          <th className="px-6 py-3 text-left font-semibold text-gray-900">Date</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {recentServices.map((svc) => (
                          <tr key={svc.id} className="bg-white hover:bg-gray-50">
                            <td className="px-6 py-4">
                              <div>
                                <p className="font-medium text-gray-900">{svc.user?.name || 'Unknown User'}</p>
                                <p className="text-xs text-gray-500">{svc.user?.email || ''}</p>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-gray-900">{svc.service?.name || 'Unknown Service'}</td>
                            <td className="px-6 py-4 text-gray-900">₹{svc.service?.price || 0}</td>
                            <td className="px-6 py-4">
                              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${(svc.status === 'ACTIVE' || svc.status === 'SUCCESS') ? 'bg-green-100 text-green-800' :
                                svc.status === 'COMPLETED' ? 'bg-blue-100 text-blue-800' :
                                  (svc.status === 'PENDING_PAYMENT' || svc.status === 'CREATED') ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-red-100 text-red-800'
                                }`}>
                                {svc.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-gray-600">{new Date(svc.createdAt).toLocaleDateString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Payments Tab */}
            {activeTab === 'payments' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-gray-900">Manage Payments & Orders</h3>
                  <button onClick={fetchPayments} className="text-sm text-primary hover:underline">Refresh</button>
                </div>

                <div className="bg-white rounded-lg border overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="px-6 py-3 text-left font-semibold text-gray-900">User</th>
                        <th className="px-6 py-3 text-left font-semibold text-gray-900">Amount</th>
                        <th className="px-6 py-3 text-left font-semibold text-gray-900">Status</th>
                        <th className="px-6 py-3 text-left font-semibold text-gray-900">Proof</th>
                        <th className="px-6 py-3 text-left font-semibold text-gray-900">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {payments.map((payment) => (
                        <tr key={payment.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div className="font-medium text-gray-900">{payment.user?.name}</div>
                            <div className="text-xs text-gray-500">{payment.user?.email}</div>
                          </td>
                          <td className="px-6 py-4 font-medium">₹{payment.amount}</td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${payment.status === 'SUCCESS' ? 'bg-green-100 text-green-800' :
                              payment.status === 'PENDING_VERIFICATION' ? 'bg-purple-100 text-purple-800' :
                                payment.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-red-100 text-red-800'
                              }`}>
                              {payment.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            {payment.paymentProof ? (
                              <a
                                href={`${import.meta.env.VITE_API_BASE_URL}${payment.paymentProof}`}
                                target="_blank"
                                rel="noreferrer"
                                className="text-blue-600 hover:underline flex items-center gap-1"
                              >
                                <FileText className="w-4 h-4" /> View Proof
                              </a>
                            ) : '-'}
                          </td>
                          <td className="px-6 py-4 space-x-2">
                            {payment.status === 'PENDING_VERIFICATION' && (
                              <>
                                <button
                                  onClick={() => handleVerifyPayment(payment.id, 'APPROVE')}
                                  className="px-3 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700"
                                >
                                  Approve
                                </button>
                                <button
                                  onClick={() => handleVerifyPayment(payment.id, 'REJECT')}
                                  className="px-3 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700"
                                >
                                  Reject
                                </button>
                              </>
                            )}
                            {(payment.status === 'SUCCESS' && payment.orderRefId) && (
                              <button
                                onClick={() => {
                                  setSelectedOrderForReport({ orderId: payment.orderRefId, userId: payment.userId });
                                  setShowReportModal(true);
                                }}
                                className="px-3 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700 flex items-center gap-1"
                              >
                                <Upload className="w-3 h-3" /> Upload Report
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Other Tabs Placeholders */}
            {activeTab === 'users' && (
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Users Management</h3>
                <p className="text-gray-600">Navigate to <button onClick={() => navigate('/admin/users')} className="text-primary font-semibold hover:underline">Users Page</button></p>
              </div>
            )}

            {activeTab === 'services' && (
              <div className="text-center py-12">
                <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Services Management</h3>
                <p className="text-gray-600">Navigate to <button onClick={() => navigate('/admin/services')} className="text-primary font-semibold hover:underline">Services Page</button></p>
              </div>
            )}

            {activeTab === 'consultations' && (
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Recent Consultation Requests</h3>
                  <button onClick={fetchDashboardData} className="text-sm text-primary hover:underline">Refresh</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-white border-b">
                      <tr>
                        <th className="px-6 py-3 text-left font-semibold text-gray-900">Date</th>
                        <th className="px-6 py-3 text-left font-semibold text-gray-900">Client Name</th>
                        <th className="px-6 py-3 text-left font-semibold text-gray-900">Mobile</th>
                        <th className="px-6 py-3 text-left font-semibold text-gray-900">Business</th>
                        <th className="px-6 py-3 text-left font-semibold text-gray-900">Services</th>
                        <th className="px-6 py-3 text-left font-semibold text-gray-900">Status</th>
                        <th className="px-6 py-3 text-right font-semibold text-gray-900">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {consultations.length > 0 ? (
                        consultations.map((req) => (
                          <tr key={req.id} className="bg-white hover:bg-gray-50">
                            <td className="px-6 py-4 text-gray-600">{new Date(req.createdAt).toLocaleDateString()}</td>
                            <td className="px-6 py-4 text-gray-900 font-medium">{req.fullName}<br /><span className="text-xs text-gray-500">{req.email}</span></td>
                            <td className="px-6 py-4 text-gray-600">{req.mobile}</td>
                            <td className="px-6 py-4 text-gray-600">{req.businessName || '-'}</td>
                            <td className="px-6 py-4 text-gray-600 uppercase">
                              {Array.isArray(req.services)
                                ? req.services.map((s: any) => s.serviceCode || s).join(', ')
                                : (typeof req.services === 'string' ? req.services : 'View Details')}
                            </td>
                            <td className="px-6 py-4">
                              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${req.status === 'NEW' ? 'bg-blue-100 text-blue-800' :
                                req.status === 'CONTACTED' ? 'bg-yellow-100 text-yellow-800' :
                                  req.status === 'CLOSED' ? 'bg-green-100 text-green-800' :
                                    'bg-gray-100 text-gray-800'
                                }`}>
                                {req.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-right">
                              <button
                                onClick={() => handleDeleteConsultation(req.id)}
                                className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded"
                                title="Delete"
                              >
                                <LogOut className="w-4 h-4" /> {/* Using LogOut since Trash isn't imported, or simple text X */}
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={7} className="px-6 py-8 text-center text-gray-500">No consultation requests found.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="text-center py-12">
                <TrendingUp className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Analytics</h3>
                <p className="text-gray-600">Navigate to <button onClick={() => navigate('/admin/analytics')} className="text-primary font-semibold hover:underline">Analytics Page</button></p>
              </div>
            )}

            {activeTab === 'tickets' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-gray-900">Support Tickets</h3>
                  <div className="flex gap-2">
                    <button onClick={fetchDashboardTickets} className="text-sm text-primary hover:underline">Refresh</button>
                    <span className="text-gray-300">|</span>
                    <button onClick={() => navigate('/admin/tickets')} className="text-sm text-primary hover:underline">Full Tickets Page</button>
                  </div>
                </div>

                <div className="bg-white rounded-lg border overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="px-6 py-3 text-left font-semibold text-gray-900">User</th>
                        <th className="px-6 py-3 text-left font-semibold text-gray-900">Subject</th>
                        <th className="px-6 py-3 text-left font-semibold text-gray-900">Status</th>
                        <th className="px-6 py-3 text-left font-semibold text-gray-900">Date</th>
                        <th className="px-6 py-3 text-right font-semibold text-gray-900">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {dashboardTickets.length > 0 ? (
                        dashboardTickets.map((ticket) => (
                          <tr key={ticket.id} className="hover:bg-gray-50 transition">
                            <td className="px-6 py-4">
                              <div className="font-medium text-gray-900">{ticket.user?.name}</div>
                              <div className="text-xs text-gray-500">{ticket.user?.email}</div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="font-medium text-gray-900">{ticket.subject}</div>
                              <p className="text-xs text-gray-500 line-clamp-1">{ticket.message}</p>
                            </td>
                            <td className="px-6 py-4">
                              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${ticket.status === 'OPEN' ? 'bg-amber-100 text-amber-800' :
                                ticket.status === 'RESOLVED' ? 'bg-green-100 text-green-800' :
                                  'bg-gray-100 text-gray-800'
                                }`}>
                                {ticket.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-gray-500">
                              {new Date(ticket.createdAt).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 text-right">
                              <button
                                onClick={() => {
                                  setSelectedTicket(ticket);
                                  setTicketReplyText(ticket.adminReply || '');
                                }}
                                className="text-primary hover:text-primary/80 font-medium text-xs border border-primary/20 hover:bg-primary/5 px-3 py-1.5 rounded-lg transition"
                              >
                                View & Reply
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                            No support tickets found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Support Ticket Reply Modal */}
        {selectedTicket && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-bold">Ticket #{selectedTicket.id}</h3>
                  <p className="text-sm text-gray-500">From: {selectedTicket.user?.name} ({selectedTicket.user?.email})</p>
                </div>
                <button onClick={() => setSelectedTicket(null)} className="text-gray-400 hover:text-gray-600">
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg border">
                  <h4 className="font-bold text-gray-900 mb-2">{selectedTicket.subject}</h4>
                  <p className="text-gray-700 whitespace-pre-wrap text-sm">{selectedTicket.message}</p>
                </div>

                {selectedTicket.adminReply && (
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">Previous Admin Reply</p>
                    <p className="text-sm text-gray-800 whitespace-pre-wrap">{selectedTicket.adminReply}</p>
                  </div>
                )}

                <div className="pt-4 border-t">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Response Intelligence</label>
                  <textarea
                    value={ticketReplyText}
                    onChange={(e) => setTicketReplyText(e.target.value)}
                    className="w-full p-4 border rounded-xl h-32 focus:ring-2 focus:ring-primary outline-none text-sm"
                    placeholder="Provide your expert response here..."
                    required
                  />

                  <div className="flex flex-wrap items-center justify-between gap-4 mt-6">
                    <div className="flex bg-gray-100 p-1 rounded-lg">
                      {(['OPEN', 'RESOLVED', 'CLOSED'] as const).map((status) => (
                        <button
                          key={status}
                          onClick={() => setTicketReplyStatus(status)}
                          className={`px-4 py-1.5 rounded-md text-[10px] font-black uppercase tracking-widest transition ${ticketReplyStatus === status
                            ? 'bg-white text-black shadow-sm'
                            : 'text-gray-400 hover:text-gray-600'
                            }`}
                        >
                          {status}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={handleTicketReplySubmit}
                      disabled={submittingTicketReply || !ticketReplyText.trim()}
                      className="px-8 py-3 bg-[#0b1f3a] text-black rounded-xl font-black text-xs uppercase tracking-widest hover:bg-[#ee7228] transition-all disabled:opacity-50"
                    >
                      {submittingTicketReply ? 'Sending...' : 'Dispatch Reply'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Report Upload Modal */}
        {showReportModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-bold mb-4">Upload Final Report</h3>
              <form onSubmit={handleUploadReport}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Document</label>
                  <input
                    type="file"
                    onChange={(e) => setReportFile(e.target.files?.[0] || null)}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                    required
                  />
                </div>
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => { setShowReportModal(false); setReportFile(null); }}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={uploadingReport}
                    className="px-4 py-2 bg-primary text-black rounded-lg hover:bg-primary/90 disabled:opacity-50"
                  >
                    {uploadingReport ? 'Uploading...' : 'Upload & Complete'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
