import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogOut, Plus, ShoppingCart, FileText, TicketIcon, Settings, User } from 'lucide-react';

interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
}

interface UserService {
  id: number;
  serviceId: number;
  status: string;
  createdAt: string;
}

export const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [services, setServices] = useState<Service[]>([]);
  const [userServices, setUserServices] = useState<UserService[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'services' | 'documents' | 'tickets'>('dashboard');

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    // Simulate loading services
    setLoading(false);
    
    // Mock data
    setServices([
      {
        id: 1,
        name: 'Company Incorporation',
        description: 'Register your company as Private/Public Limited',
        price: 5000,
      },
      {
        id: 2,
        name: 'PAN Registration',
        description: 'Apply for Permanent Account Number',
        price: 500,
      },
      {
        id: 3,
        name: 'GST Registration',
        description: 'Register for Goods and Services Tax',
        price: 1500,
      },
      {
        id: 4,
        name: 'LLP Formation',
        description: 'Form Limited Liability Partnership',
        price: 4000,
      },
      {
        id: 5,
        name: 'Income Tax Return Filing',
        description: 'File your annual ITR',
        price: 2000,
      },
      {
        id: 6,
        name: 'Trademark Registration',
        description: 'Register your brand/logo',
        price: 3500,
      },
    ]);

    setUserServices([
      {
        id: 1,
        serviceId: 1,
        status: 'ACTIVE',
        createdAt: '2026-01-15',
      },
      {
        id: 2,
        serviceId: 2,
        status: 'COMPLETED',
        createdAt: '2026-01-10',
      },
    ]);
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-blue-100 text-blue-800';
      case 'COMPLETED':
        return 'bg-green-100 text-green-800';
      case 'PENDING_PAYMENT':
        return 'bg-yellow-100 text-yellow-800';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-primary">Welcome, {user?.name}!</h1>
              <p className="text-gray-600 mt-1">{user?.email}</p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/profile')}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
                title="Profile"
              >
                <User className="w-6 h-6" />
              </button>
              <button
                onClick={() => navigate('/settings')}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
                title="Settings"
              >
                <Settings className="w-6 h-6" />
              </button>
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-8 overflow-hidden">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex-1 px-6 py-4 font-semibold transition ${
                activeTab === 'dashboard'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-gray-600 hover:text-primary'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('services')}
              className={`flex-1 px-6 py-4 font-semibold transition ${
                activeTab === 'services'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-gray-600 hover:text-primary'
              }`}
            >
              Browse Services
            </button>
            <button
              onClick={() => setActiveTab('documents')}
              className={`flex-1 px-6 py-4 font-semibold transition ${
                activeTab === 'documents'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-gray-600 hover:text-primary'
              }`}
            >
              Documents
            </button>
            <button
              onClick={() => setActiveTab('tickets')}
              className={`flex-1 px-6 py-4 font-semibold transition ${
                activeTab === 'tickets'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-gray-600 hover:text-primary'
              }`}
            >
              Support
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {/* Dashboard Tab */}
            {activeTab === 'dashboard' && (
              <div className="space-y-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-600 text-sm font-medium">Active Services</p>
                        <p className="text-3xl font-bold text-blue-900 mt-2">
                          {userServices.filter((s) => s.status === 'ACTIVE').length}
                        </p>
                      </div>
                      <ShoppingCart className="w-12 h-12 text-blue-300" />
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 border border-green-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-green-600 text-sm font-medium">Completed</p>
                        <p className="text-3xl font-bold text-green-900 mt-2">
                          {userServices.filter((s) => s.status === 'COMPLETED').length}
                        </p>
                      </div>
                      <FileText className="w-12 h-12 text-green-300" />
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 border border-purple-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-purple-600 text-sm font-medium">Total Services</p>
                        <p className="text-3xl font-bold text-purple-900 mt-2">{userServices.length}</p>
                      </div>
                      <TicketIcon className="w-12 h-12 text-purple-300" />
                    </div>
                  </div>
                </div>

                {/* Recent Services */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Your Recent Services</h3>
                  {userServices.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead className="bg-white border-b">
                          <tr>
                            <th className="px-6 py-3 text-left font-semibold text-gray-900">Service</th>
                            <th className="px-6 py-3 text-left font-semibold text-gray-900">Status</th>
                            <th className="px-6 py-3 text-left font-semibold text-gray-900">Date</th>
                            <th className="px-6 py-3 text-left font-semibold text-gray-900">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          {userServices.map((userService) => {
                            const service = services.find((s) => s.id === userService.serviceId);
                            return (
                              <tr key={userService.id} className="bg-white hover:bg-gray-50">
                                <td className="px-6 py-4 text-gray-900 font-medium">{service?.name}</td>
                                <td className="px-6 py-4">
                                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(userService.status)}`}>
                                    {userService.status}
                                  </span>
                                </td>
                                <td className="px-6 py-4 text-gray-600">{userService.createdAt}</td>
                                <td className="px-6 py-4">
                                  <button className="text-primary hover:text-primary/80 font-semibold transition">
                                    View Details
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="text-gray-600 text-center py-8">No services purchased yet</p>
                  )}
                </div>
              </div>
            )}

            {/* Services Tab */}
            {activeTab === 'services' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Available CA Services</h3>
                  <p className="text-sm text-gray-600">Showing {services.length} services</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {services.map((service) => (
                    <div key={service.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                      <div className="bg-gradient-to-r from-primary to-secondary p-6 text-white">
                        <h4 className="text-lg font-bold mb-2">{service.name}</h4>
                        <p className="text-sm opacity-90">{service.description}</p>
                      </div>
                      <div className="p-6">
                        <div className="mb-6">
                          <p className="text-3xl font-bold text-primary">₹{service.price.toLocaleString()}</p>
                          <p className="text-xs text-gray-500 mt-1">One-time fee</p>
                        </div>
                        <button className="w-full py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition flex items-center justify-center gap-2 font-semibold">
                          <Plus className="w-5 h-5" />
                          Purchase Service
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Documents Tab */}
            {activeTab === 'documents' && (
              <div className="text-center py-12">
                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Documents Yet</h3>
                <p className="text-gray-600 mb-6">Upload documents for your CA services here</p>
                <button className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition">
                  Upload Document
                </button>
              </div>
            )}

            {/* Support Tickets Tab */}
            {activeTab === 'tickets' && (
              <div className="text-center py-12">
                <TicketIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Support Tickets</h3>
                <p className="text-gray-600 mb-6">Create a support ticket if you need assistance</p>
                <button className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition">
                  Create Ticket
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
