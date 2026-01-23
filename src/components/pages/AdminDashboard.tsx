/// <reference types="vite/client" />
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
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
  MessageSquare
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

export const AdminDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const { adminUser } = useAdmin();
  const navigate = useNavigate();

  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentUsers, setRecentUsers] = useState<RecentUser[]>([]);
  const [recentServices, setRecentServices] = useState<RecentService[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'services' | 'analytics' | 'tickets'>('overview');

  useEffect(() => {
    if (!adminUser) {
      navigate('/admin/login');
      return;
    }
    fetchDashboardData();
  }, [adminUser, navigate]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('authToken');

      if (!token) {
        setError('No authentication token');
        return;
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/admin/dashboard/stats`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch dashboard data');
      }

      const data = await response.json();
      setStats(data.stats);
      setRecentUsers(data.recentUsers);
      setRecentServices(data.recentServices);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error fetching data';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
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
                <p className="font-semibold text-gray-900">{user?.name}</p>
                <p className="text-sm text-gray-600">{user?.email}</p>
              </div>
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
            {(['overview', 'users', 'services', 'analytics', 'tickets'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 px-6 py-4 font-semibold transition whitespace-nowrap ${
                  activeTab === tab
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-gray-600 hover:text-primary'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className="p-8">
            {/* Admin Quick Actions */}
            <div className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">🔧 Admin Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <button
                  onClick={() => navigate('/admin/users')}
                  className="bg-white hover:bg-blue-50 border border-blue-300 rounded-lg p-4 text-left transition"
                >
                  <p className="text-sm text-gray-600">👥 Manage Users</p>
                  <p className="font-semibold text-gray-900">View & Modify</p>
                </button>
                <button
                  onClick={() => navigate('/admin/services')}
                  className="bg-white hover:bg-green-50 border border-green-300 rounded-lg p-4 text-left transition"
                >
                  <p className="text-sm text-gray-600">🛍️ Services</p>
                  <p className="font-semibold text-gray-900">Create & Edit</p>
                </button>
                <button
                  onClick={() => navigate('/admin/analytics')}
                  className="bg-white hover:bg-purple-50 border border-purple-300 rounded-lg p-4 text-left transition"
                >
                  <p className="text-sm text-gray-600">📊 Analytics</p>
                  <p className="font-semibold text-gray-900">View Reports</p>
                </button>
                <button
                  onClick={() => navigate('/admin/tickets')}
                  className="bg-white hover:bg-orange-50 border border-orange-300 rounded-lg p-4 text-left transition"
                >
                  <p className="text-sm text-gray-600">🎫 Support Tickets</p>
                  <p className="font-semibold text-gray-900">Respond & Resolve</p>
                </button>
              </div>
            </div>

            {/* Overview Tab */}
            {activeTab === 'overview' && stats && (
              <div className="space-y-8">
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
                                <p className="font-medium text-gray-900">{svc.user.name}</p>
                                <p className="text-xs text-gray-500">{svc.user.email}</p>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-gray-900">{svc.service.name}</td>
                            <td className="px-6 py-4 text-gray-900">₹{svc.service.price}</td>
                            <td className="px-6 py-4">
                              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                svc.status === 'ACTIVE' ? 'bg-green-100 text-green-800' :
                                svc.status === 'COMPLETED' ? 'bg-blue-100 text-blue-800' :
                                svc.status === 'PENDING_PAYMENT' ? 'bg-yellow-100 text-yellow-800' :
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

            {activeTab === 'analytics' && (
              <div className="text-center py-12">
                <TrendingUp className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Analytics</h3>
                <p className="text-gray-600">Navigate to <button onClick={() => navigate('/admin/analytics')} className="text-primary font-semibold hover:underline">Analytics Page</button></p>
              </div>
            )}

            {activeTab === 'tickets' && (
              <div className="text-center py-12">
                <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Support Tickets</h3>
                <p className="text-gray-600">Navigate to <button onClick={() => navigate('/admin/tickets')} className="text-primary font-semibold hover:underline">Tickets Page</button></p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
