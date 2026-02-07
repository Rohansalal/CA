import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  LogOut, Plus, ShoppingCart, FileText, Ticket, Settings, User,
  Upload, CreditCard, CheckCircle, Clock, XCircle, Download, Eye,
  AlertCircle, TrendingUp, Package, Loader, Map, ChevronRight, MessageSquare, Trash2
} from 'lucide-react';


// API Configuration
const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

interface RoadmapStep {
  step: number;
  title: string;
  description: string;
  status?: 'pending' | 'in_progress' | 'completed';
}

interface Service {
  id: number;
  name: string;
  description: string;
  price: string | number;
  roadmap?: RoadmapStep[];
  defaultPlanId?: number;
}

interface UserService {
  id: number;
  userId: number;
  serviceId: number;
  status: string;
  createdAt: string;
  service: Service;
}

interface Document {
  id: number;
  fileName: string;
  fileType: string;
  uploadedAt: string;
  url: string;
  userServiceId?: number;
  userService?: UserService;
}

interface DashboardStats {
  total: number;
  active: number;
  pending: number;
  completed: number;
}

interface SupportTicket {
  id: number;
  subject: string;
  message: string;
  status: 'OPEN' | 'RESOLVED' | 'CLOSED';
  adminReply?: string;
  createdAt: string;
}

interface ServiceCategory {
  id: number;
  name: string;
  description: string;
  services: Service[];
}

export const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Data State
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [userServices, setUserServices] = useState<UserService[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [tickets, setTickets] = useState<SupportTicket[]>([]); // Added tickets state
  const [stats, setStats] = useState<DashboardStats>({ total: 0, active: 0, pending: 0, completed: 0 });

  // UI State
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'services' | 'documents' | 'tickets'>('dashboard');
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showRoadmapModal, setShowRoadmapModal] = useState(false);
  const [showTicketModal, setShowTicketModal] = useState(false); // Added ticket modal state
  const [viewingRoadmapService, setViewingRoadmapService] = useState<UserService | null>(null);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [uploadServiceId, setUploadServiceId] = useState<string>(''); // For manual upload selection
  const [newTicket, setNewTicket] = useState({ subject: '', message: '' }); // Added new ticket form state
  const [error, setError] = useState<string | null>(null);

  // Payment State
  const [availablePaymentMethods, setAvailablePaymentMethods] = useState<any>({});
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('razorpay');

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (location.state?.selectedServiceSlug) {
      handlePurchaseBySlug(location.state.selectedServiceSlug);
      // Clear state so it doesn't re-trigger on refresh
      window.history.replaceState({}, document.title);
    } else if (location.state?.selectedService && services.length > 0) {
      // Legacy fallback (string match)
      const initialService = services.find(s => s.name.includes(location.state.selectedService));
      if (initialService) {
        handlePurchaseService(initialService);
      }
      setActiveTab('services');
    }

    fetchData();
  }, [user, navigate]);


  const getAuthHeader = (includeIdempotencyKey = false) => {
    const token = localStorage.getItem('authToken');
    const headers: any = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    // Add idempotency key for payment operations
    if (includeIdempotencyKey) {
      headers['X-Idempotency-Key'] = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }

    return headers;
  };

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const headers = getAuthHeader();

      const [servicesRes, userServicesRes, docsRes, statsRes, ticketsRes, methodsRes] = await Promise.all([
        fetch(`${API_URL}/services/categories`, { headers }), // Fetch nested categories
        fetch(`${API_URL}/services/my-services`, { headers }),
        fetch(`${API_URL}/documents/my-documents`, { headers }),
        fetch(`${API_URL}/dashboard/user`, { headers }),
        fetch(`${API_URL}/tickets/my-tickets`, { headers }),
        fetch(`${API_URL}/payments/methods`, { headers })
      ]);

      if (servicesRes.ok) {
        const data = await servicesRes.json();
        const categoriesData = data.categories || [];
        setCategories(categoriesData);
        // Flatten categories to get all services
        const allServices: Service[] = [];
        if (Array.isArray(categoriesData)) {
          categoriesData.forEach((cat: any) => {
            if (cat.services && Array.isArray(cat.services)) {
              cat.services.forEach((svc: any) => {
                // Determine price: Plan price > Service base price > 0
                let displayPrice = 0;
                let defaultPlanId = undefined;

                if (svc.plans && svc.plans.length > 0) {
                  displayPrice = svc.plans[0].price;
                  defaultPlanId = svc.plans[0].id;
                } else if (svc.price !== undefined && svc.price !== null) {
                  displayPrice = Number(svc.price);
                }

                allServices.push({
                  id: svc.id,
                  name: svc.name,
                  description: svc.description,
                  price: displayPrice,
                  defaultPlanId: defaultPlanId
                });
              });
            }
          });
        }
        setServices(allServices);
      }

      if (userServicesRes.ok) setUserServices(await userServicesRes.json());
      if (docsRes.ok) setDocuments(await docsRes.json());
      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData.stats);
      }
      if (ticketsRes.ok) setTickets(await ticketsRes.json());
      if (methodsRes.ok) {
        const methods = await methodsRes.json();
        setAvailablePaymentMethods(methods);
        // Default to first active method
        if (methods.razorpay) setSelectedPaymentMethod('razorpay');
        else if (methods.stripe) setSelectedPaymentMethod('stripe');
      }

    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to load dashboard data. Please check connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handlePurchaseService = (service: Service) => {
    setSelectedService(service);
    setShowPaymentModal(true);
  };

  const handleViewRoadmap = (userService: UserService) => {
    setViewingRoadmapService(userService);
    setShowRoadmapModal(true);
  };

  const handlePurchaseBySlug = async (slug: string) => {
    setLoading(true);
    try {
      const headers = getAuthHeader();
      const res = await fetch(`${API_URL}/services/select`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ serviceSlug: slug })
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to select service');
      }

      // Refresh data to show the new pending service
      await fetchData();
      setActiveTab('dashboard');

    } catch (err: any) {
      console.error('Auto-select error:', err);
      setError(err.message || 'Failed to select service automatically');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteService = async (userServiceId: number) => {
    if (!window.confirm('Are you sure you want to remove this service?')) return;
    setLoading(true);
    try {
      const headers = getAuthHeader();
      const res = await fetch(`${API_URL}/services/my-services/${userServiceId}`, {
        method: 'DELETE',
        headers
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to delete service');
      }
      await fetchData();
    } catch (err: any) {
      console.error(err);
      alert(err.message || 'Failed to delete service');
    } finally {
      setLoading(false);
    }
  };



  const handlePayment = async () => {
    if (!selectedService) return;
    setActionLoading(true);

    try {
      const headers = getAuthHeader();

      const payload: any = {};

      // Smart fallback: If defaultPlanId is available, use it. 
      // If NOT (e.g. simple service with base price), we still need to select the service.
      if (selectedService.defaultPlanId) {
        payload.planId = selectedService.defaultPlanId;
      } else {
        // Fallback: This service might not have plans, but we can't 'select' it without a plan if the backend requires one.
        // Assuming the backend 'select' endpoint handles standard service selection via body if planId is missing but service is known context.
        // However, based on API context, we usually select by Plan. 
        // If no plan, we might need to rely on the backend creating a default one or handling it.
        // For now, if "Select" fails because of no plan, we instruct user.
        if (selectedService.price > 0 && !selectedService.defaultPlanId) {
          // This is a direct priced service without plans
          // HACK: In some systems, we pass serviceId directly? 
          // Let's assumme we pass a query param or body param if supported.
          console.warn("Service has price but no plan ID");
        }
      }

      // 1. Create Order directly
      const orderRes = await fetch(`${API_URL}/payments/create-order`, {
        method: 'POST',
        headers: getAuthHeader(true),
        body: JSON.stringify({
          serviceId: selectedService.id,
          amount: selectedService.price, // Backend should verify this, but passing for now
          provider: selectedPaymentMethod
        })
      });

      if (!orderRes.ok) throw new Error('Failed to initiate payment');
      const orderData = await orderRes.json();

      // Check for Mock Mode
      if (orderData.id && orderData.id.startsWith('order_mock_')) {
        const verifyRes = await fetch(`${API_URL}/payments/verify`, {
          method: 'POST',
          headers: getAuthHeader(true),
          body: JSON.stringify({
            paymentId: 'pay_mock_' + Date.now(),
            orderId: orderData.id,
            signature: 'mock_signature',
            provider: 'razorpay'
          })
        });

        if (!verifyRes.ok) throw new Error('Mock Payment verification failed');

        setShowPaymentModal(false);
        alert('Mock Payment successful! Service is now active.');
        await fetchData();
        setActiveTab('dashboard');
        setActionLoading(false);
        return;
      }

      // Handle Razorpay
      if (selectedPaymentMethod === 'razorpay') {
        const options = {
          key: orderData.key || import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_S8VGOfGXpXIMJV',
          amount: orderData.amount,
          currency: orderData.currency,
          name: 'Professional CA Services',
          description: selectedService.name,
          order_id: orderData.id,
          handler: async function (response: any) {
            try {
              const verifyRes = await fetch(`${API_URL}/payments/verify`, {
                method: 'POST',
                headers: getAuthHeader(true),
                body: JSON.stringify({
                  paymentId: response.razorpay_payment_id,
                  orderId: response.razorpay_order_id,
                  signature: response.razorpay_signature,
                  userServiceId: userService.id,
                  provider: 'razorpay'
                })
              });

              if (!verifyRes.ok) throw new Error('Payment verification failed');

              setShowPaymentModal(false);
              alert('Payment successful! Your service is now active.');
              await fetchData();
              setActiveTab('dashboard');
            } catch (verifyErr: any) {
              console.error(verifyErr);
              alert('Payment succeeded but verification failed. Please contact support.');
            }
          },
          prefill: {
            name: user?.name,
            email: user?.email,
            contact: user?.phone
          },
          theme: {
            color: "#3399cc"
          },
          modal: {
            ondismiss: function () {
              setShowPaymentModal(false);
              setActionLoading(false);
            }
          }
        };

        const rzp1 = new (window as any).Razorpay(options);
        rzp1.on('payment.failed', function (response: any) {
          alert(response.error.description);
          setActionLoading(false);
        });
        rzp1.open();
      }
      // Handle Stripe (Placeholder)
      else if (selectedPaymentMethod === 'stripe') {
        alert("Stripe integration is coming soon!");
        setActionLoading(false);
      }

    } catch (err: any) {
      console.error(err);
      alert(err.message || 'Payment process failed');
      setActionLoading(false);
    }
  };


  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>, userServiceId: number) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('File size exceeds 5MB limit');
      return;
    }

    setUploadingFile(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('userServiceId', userServiceId.toString());

      const token = localStorage.getItem('authToken');
      const response = await fetch(`${API_URL}/documents/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || 'Upload failed');
      }

      alert('Document uploaded successfully!');
      fetchData();

    } catch (err: any) {
      console.error(err);
      alert(err.message || 'Failed to upload document');
    } finally {
      setUploadingFile(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'COMPLETED': return 'bg-green-100 text-green-800 border-green-200';
      case 'PENDING_PAYMENT': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'CANCELLED': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ACTIVE': return <Clock className="w-4 h-4" />;
      case 'COMPLETED': return <CheckCircle className="w-4 h-4" />;
      case 'PENDING_PAYMENT': return <AlertCircle className="w-4 h-4" />;
      case 'CANCELLED': return <XCircle className="w-4 h-4" />;
      default: return <Package className="w-4 h-4" />;
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100">
      <header className="bg-white shadow-md border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg">
                {user?.name?.charAt(0) || 'U'}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Welcome, {user?.name}!
                </h1>
                <p className="text-gray-500 text-sm">{user?.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate(`/dashboard/users/profile/${user?.name || 'user'}`)}
                className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition" title="Profile">
                <User className="w-5 h-5" />
              </button>
              <div className="h-8 w-px bg-gray-300 mx-1"></div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-50 text-red-600 border border-red-200 rounded-lg hover:bg-red-100 transition flex items-center gap-2 font-medium"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            {error}
            <button onClick={fetchData} className="ml-auto text-sm font-semibold underline hover:text-red-800">Retry</button>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-lg mb-8 overflow-hidden border border-gray-200 sticky top-24 z-20">
          <div className="flex border-b border-gray-200 overflow-x-auto">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
              { id: 'services', label: 'Browse Services', icon: ShoppingCart },
              { id: 'documents', label: 'Documents', icon: FileText },
              { id: 'tickets', label: 'Support', icon: Ticket },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 min-w-[150px] px-6 py-4 font-semibold transition flex items-center justify-center gap-2 whitespace-nowrap ${activeTab === tab.id
                  ? 'text-primary border-b-3 border-primary bg-blue-50'
                  : 'text-gray-600 hover:text-primary hover:bg-gray-50'
                  }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-8">
            {activeTab === 'dashboard' && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg transform hover:-translate-y-1 transition-all">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-100 text-sm font-medium">Active Services</p>
                        <p className="text-4xl font-bold mt-2">{stats.active}</p>
                      </div>
                      <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                        <ShoppingCart className="w-8 h-8 text-white" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg transform hover:-translate-y-1 transition-all">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-green-100 text-sm font-medium">Completed</p>
                        <p className="text-4xl font-bold mt-2">{stats.completed}</p>
                      </div>
                      <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                        <CheckCircle className="w-8 h-8 text-white" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg transform hover:-translate-y-1 transition-all">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-purple-100 text-sm font-medium">Total Services</p>
                        <p className="text-4xl font-bold mt-2">{stats.total}</p>
                      </div>
                      <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                        <Package className="w-8 h-8 text-white" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white shadow-lg transform hover:-translate-y-1 transition-all">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-orange-100 text-sm font-medium">Documents</p>
                        <p className="text-4xl font-bold mt-2">{documents.length}</p>
                      </div>
                      <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                        <FileText className="w-8 h-8 text-white" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 shadow-md overflow-hidden">
                  <div className="bg-gradient-to-r from-primary to-secondary p-6">
                    <h3 className="text-2xl font-bold text-white">Your Services</h3>
                    <p className="text-white/80 mt-1">Manage and track your CA services</p>
                  </div>

                  <div className="p-6">
                    {userServices.length > 0 ? (
                      <div className="space-y-4">
                        {userServices.map((userService) => (
                          <div
                            key={userService.id}
                            className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition duration-300 relative group"
                          >
                            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <h4 className="text-lg font-bold text-gray-900 line-clamp-1">
                                    {userService.service?.name}
                                  </h4>
                                  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(userService.status)}`}>
                                    {getStatusIcon(userService.status)}
                                    {userService.status}
                                  </span>
                                </div>
                                <p className="text-gray-600 text-sm mb-3">
                                  {userService.service?.description}
                                </p>
                                <div className="flex items-center gap-4 text-xs text-gray-500">
                                  <span>ID: #{userService.id}</span>
                                  <span>Started: {new Date(userService.createdAt).toLocaleDateString()}</span>
                                </div>
                              </div>

                              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto items-center">
                                {userService.status === 'PENDING_PAYMENT' && (
                                  <>
                                    <button
                                      onClick={() => {
                                        const originalService = services.find(s => s.id === userService.serviceId);
                                        if (originalService) handlePurchaseService(originalService);
                                        else alert("Please contact support to complete this payment manually.");
                                      }}
                                      className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition text-sm font-medium flex items-center justify-center gap-2 shadow-sm"
                                    >
                                      <CreditCard className="w-4 h-4" />
                                      Complete Payment
                                    </button>
                                    <button
                                      onClick={() => handleDeleteService(userService.id)}
                                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition border border-red-200"
                                      title="Remove Service"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </>
                                )}

                                <button
                                  onClick={() => handleViewRoadmap(userService)}
                                  className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition text-sm font-medium flex items-center justify-center gap-2 shadow-sm"
                                >
                                  <Map className="w-4 h-4" />
                                  Track Progress
                                </button>

                                {userService.status === 'ACTIVE' && (
                                  <label className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm font-medium flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:shadow-md">
                                    {uploadingFile ? <Loader className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                                    Upload Docs
                                    <input
                                      type="file"
                                      className="hidden"
                                      onChange={(e) => handleFileUpload(e, userService.id)}
                                      accept=".pdf,.jpg,.jpeg,.png"
                                      disabled={uploadingFile}
                                    />
                                  </label>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-16 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Package className="w-8 h-8 text-primary" />
                        </div>
                        <h4 className="text-lg font-semibold text-gray-900">No services yet</h4>
                        <p className="text-gray-600 mb-6">Select a service to get started with your CA journey</p>
                        <button
                          onClick={() => setActiveTab('services')}
                          className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                        >
                          Browse Services
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'services' && (
              <div className="space-y-12">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Available Services</h3>
                    <p className="text-sm text-gray-600 mt-1">Professional CA services for your business</p>
                  </div>
                  <div className="px-4 py-2 bg-blue-50 text-primary rounded-full text-sm font-semibold self-start md:self-auto">
                    {services.length} Services Available
                  </div>
                </div>

                {categories.length > 0 ? (
                  categories.map((category) => (
                    <div key={category.id} className="border-b border-gray-100 pb-8 last:border-0 last:pb-0">
                      <div className="mb-6">
                        <h4 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                          <TrendingUp className="w-5 h-5 text-primary" />
                          {category.name}
                        </h4>
                        <p className="text-sm text-gray-500 ml-7">{category.description}</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {category.services && category.services.map((serviceRaw: any) => {
                          // The raw service from backend might have nested plans, we need to adapt it 
                          // to match the 'Service' interface structure we use for display (with price)
                          let displayPrice = 0;
                          let defaultPlanId = undefined;

                          if (serviceRaw.plans && serviceRaw.plans.length > 0) {
                            displayPrice = serviceRaw.plans[0].price;
                            defaultPlanId = serviceRaw.plans[0].id;
                          } else if (serviceRaw.price !== undefined && serviceRaw.price !== null) {
                            displayPrice = Number(serviceRaw.price);
                          }

                          const service = {
                            ...serviceRaw,
                            price: displayPrice,
                            defaultPlanId: defaultPlanId
                          };

                          return (
                            <div
                              key={service.id}
                              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300 border border-gray-100 group flex flex-col h-full"
                            >
                              <div className="bg-gradient-to-r from-primary to-secondary p-6 text-white relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-10 -mt-10 blur-xl"></div>
                                <h4 className="text-xl font-bold mb-2 relative z-10">{service.name}</h4>
                                <p className="text-sm opacity-90 line-clamp-2 relative z-10">{service.description}</p>
                              </div>

                              <div className="p-6 flex-1 flex flex-col">
                                <div className="mb-6 flex-1">
                                  <div className="flex items-baseline gap-1">
                                    <span className="text-3xl font-bold text-gray-900">₹{Number(service.price).toLocaleString()}</span>
                                    <span className="text-sm text-gray-500">/ service</span>
                                  </div>
                                  <ul className="mt-4 space-y-2 text-sm text-gray-600">
                                    <li className="flex items-center gap-2">
                                      <CheckCircle className="w-4 h-4 text-green-500" /> Professional Consultation
                                    </li>
                                    <li className="flex items-center gap-2">
                                      <CheckCircle className="w-4 h-4 text-green-500" /> Document Verification
                                    </li>
                                    <li className="flex items-center gap-2">
                                      <CheckCircle className="w-4 h-4 text-green-500" /> Application Filing
                                    </li>
                                  </ul>
                                </div>

                                <button
                                  onClick={() => handlePurchaseService(service)}
                                  className="w-full py-3 bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white rounded-lg transition font-semibold flex items-center justify-center gap-2 group-hover:shadow-md"
                                >
                                  <CreditCard className="w-5 h-5" />
                                  Purchase Now
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-20">
                    <div className="animate-pulse flex flex-col items-center">
                      <div className="h-4 w-48 bg-gray-200 rounded mb-4"></div>
                      <div className="h-3 w-32 bg-gray-200 rounded"></div>
                    </div>
                    <p className="text-gray-500 mt-4">Loading services or no services available...</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'documents' && (
              <div>
                <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">My Documents</h3>
                    <p className="text-gray-600">Securely stored documents for your applications</p>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-blue-100 shadow-sm flex flex-col sm:flex-row gap-3 items-end sm:items-center">
                    <div className="w-full sm:w-64">
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Select Service to Upload</label>
                      <select
                        className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                        value={uploadServiceId}
                        onChange={(e) => setUploadServiceId(e.target.value)}
                      >
                        <option value="">-- Select Active Service --</option>
                        {userServices.filter(us => us.status === 'ACTIVE' || us.status === 'COMPLETED').map(us => (
                          <option key={us.id} value={us.id}>
                            {us.service?.name} (ID: #{us.id})
                          </option>
                        ))}
                      </select>
                    </div>
                    <label className={`px-4 py-2 rounded-lg text-white text-sm font-medium flex items-center gap-2 cursor-pointer transition shadow-md whitespace-nowrap
                        ${!uploadServiceId || uploadingFile ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-primary/90'}`}>
                      {uploadingFile ? <Loader className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                      Upload Document
                      <input
                        type="file"
                        className="hidden"
                        onChange={(e) => {
                          if (uploadServiceId) {
                            handleFileUpload(e, parseInt(uploadServiceId));
                          }
                        }}
                        disabled={!uploadServiceId || uploadingFile}
                        accept=".pdf,.jpg,.jpeg,.png"
                      />
                    </label>
                  </div>
                </div>

                {documents.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {documents.map((doc) => (
                      <div
                        key={doc.id}
                        className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-lg transition relative group"
                      >
                        {/* Service Tag Badge */}
                        {doc.userService?.service?.name && (
                          <div className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] uppercase font-bold px-2 py-1 rounded-bl-lg rounded-tr-lg shadow-sm z-10">
                            {doc.userService.service.name}
                          </div>
                        )}

                        <div className="absolute top-8 right-3 opacity-0 group-hover:opacity-100 transition">
                          <button className="p-1 hover:bg-gray-100 rounded text-gray-500"><Settings className="w-4 h-4" /></button>
                        </div>

                        <div className="flex items-center gap-4 mb-4 mt-2">
                          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <FileText className="w-6 h-6 text-primary" />
                          </div>
                          <div className="overflow-hidden">
                            <h4 className="font-semibold text-gray-900 truncate" title={doc.fileName}>{doc.fileName}</h4>
                            <span className="text-xs text-gray-500 uppercase">{doc.fileType.split('/')[1] || 'FILE'}</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="text-xs text-gray-500">
                            {doc.userServiceId && (
                              <div className="flex items-center gap-1 mb-1 text-gray-400">
                                <Package className="w-3 h-3" /> <span>Service ID: #{doc.userServiceId}</span>
                              </div>
                            )}
                            Uploaded: {new Date(doc.uploadedAt).toLocaleDateString()}
                          </div>

                          <div className="flex gap-2">
                            <a
                              href={doc.url}
                              target="_blank"
                              rel="noreferrer"
                              className="flex-1 text-xs px-3 py-2 bg-primary text-white rounded hover:bg-primary/90 transition flex items-center justify-center gap-1"
                            >
                              <Download className="w-3 h-3" /> Download
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                    <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No Documents Yet</h3>
                    <p className="text-gray-600 mb-6">Select a service above to upload your first document.</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'tickets' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">My Support Tickets</h3>
                    <p className="text-gray-600">View and manage your support requests</p>
                  </div>
                  <button
                    onClick={() => setShowTicketModal(true)}
                    className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition font-medium flex items-center gap-2 shadow-lg">
                    <Plus className="w-5 h-5" />
                    Create Support Ticket
                  </button>
                </div>

                {tickets.length > 0 ? (
                  <div className="space-y-4">
                    {tickets.map((ticket) => (
                      <div key={ticket.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <div className="flex items-center gap-3">
                              <span className="text-gray-500 text-sm">#{ticket.id}</span>
                              <h4 className="text-lg font-bold text-gray-900">{ticket.subject}</h4>
                              <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${ticket.status === 'OPEN' ? 'bg-blue-100 text-blue-700' :
                                ticket.status === 'RESOLVED' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                                }`}>
                                {ticket.status}
                              </span>
                            </div>
                            <p className="text-gray-500 text-xs mt-1">
                              Created: {new Date(ticket.createdAt).toLocaleString()}
                            </p>
                          </div>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg mb-4">
                          <p className="text-gray-700 text-sm">{ticket.message}</p>
                        </div>

                        {ticket.adminReply && (
                          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                                <User className="w-3 h-3 text-white" />
                              </div>
                              <span className="text-sm font-bold text-blue-900">Admin Reply</span>
                            </div>
                            <p className="text-blue-800 text-sm">{ticket.adminReply}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 bg-gray-50 rounded-xl border border-gray-200">
                    <Ticket className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No Tickets Yet</h3>
                    <p className="text-gray-600 mb-6">Need help? Create a new support ticket.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Payment Modal */}
      {showPaymentModal && selectedService && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl transform transition-all scale-100 opacity-100">
            <div className="bg-gradient-to-r from-primary to-secondary p-6 text-white rounded-t-2xl relative">
              <button
                onClick={() => setShowPaymentModal(false)}
                className="absolute top-4 right-4 text-white/80 hover:text-white transition"
              >
                <XCircle className="w-6 h-6" />
              </button>
              <h3 className="text-2xl font-bold">Secure Checkout</h3>
              <p className="text-white/80 mt-1 flex items-center gap-2">
                <Shield className="w-4 h-4" /> 256-bit SSL Encrypted
              </p>
            </div>

            <div className="p-6">
              <div className="mb-6">
                <h4 className="font-bold text-gray-900 text-lg mb-1">{selectedService.name}</h4>
                <p className="text-sm text-gray-600">{selectedService.description}</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 mb-6 border border-gray-100">
                <div className="flex justify-between items-center mb-2 text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold text-gray-900">₹{Number(selectedService.price).toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center mb-4 text-sm">
                  <span className="text-gray-600">GST (18%)</span>
                  <span className="font-semibold text-gray-900">₹{Math.round(Number(selectedService.price) * 0.18).toLocaleString()}</span>
                </div>
                <div className="border-t border-gray-200 pt-3 flex justify-between items-center">
                  <span className="font-bold text-gray-900 text-lg">Total</span>
                  <span className="text-2xl font-bold text-primary">
                    ₹{Math.round(Number(selectedService.price) * 1.18).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Payment Method Selection */}
              <div className="mb-6">
                <p className="block text-sm font-medium text-gray-700 mb-2">Select Payment Method</p>
                <div className="space-y-2">
                  {availablePaymentMethods.razorpay && (
                    <label className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition ${selectedPaymentMethod === 'razorpay' ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-gray-300'}`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={selectedPaymentMethod === 'razorpay'}
                        onChange={() => setSelectedPaymentMethod('razorpay')}
                        className="text-primary focus:ring-primary"
                      />
                      <span className="font-medium text-gray-900">Razorpay</span>
                    </label>
                  )}
                  {availablePaymentMethods.stripe && (
                    <label className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition ${selectedPaymentMethod === 'stripe' ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-gray-300'}`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={selectedPaymentMethod === 'stripe'}
                        onChange={() => setSelectedPaymentMethod('stripe')}
                        className="text-primary focus:ring-primary"
                      />
                      <span className="font-medium text-gray-900">Stripe</span>
                    </label>
                  )}
                  {(!availablePaymentMethods.razorpay && !availablePaymentMethods.stripe) && (
                    <p className="text-sm text-red-500">No payment methods available. Please contact admin.</p>
                  )}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowPaymentModal(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePayment}
                  disabled={actionLoading || (!availablePaymentMethods.razorpay && !availablePaymentMethods.stripe)}
                  className="flex-1 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition font-medium flex items-center justify-center gap-2 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {actionLoading ? (
                    <Loader className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5" />
                      Pay Now
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Ticket Modal */}
      {
        showTicketModal && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            <div className="bg-white rounded-2xl max-w-lg w-full shadow-xl">
              <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-900">Create Support Ticket</h3>
                <button onClick={() => setShowTicketModal(false)} className="text-gray-400 hover:text-gray-600">
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                    placeholder="Briefly describe your issue"
                    value={newTicket.subject}
                    onChange={(e) => setNewTicket({ ...newTicket, subject: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition h-32 resize-none"
                    placeholder="Provide details about your issue..."
                    value={newTicket.message}
                    onChange={(e) => setNewTicket({ ...newTicket, message: e.target.value })}
                  ></textarea>
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => setShowTicketModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 text-sm">
                    Cancel
                  </button>
                  <button
                    onClick={async () => {
                      if (!newTicket.subject.trim() || !newTicket.message.trim()) {
                        alert('Please fill in all fields');
                        return;
                      }
                      try {
                        setActionLoading(true);
                        const response = await fetch(`${API_URL}/tickets`, {
                          method: 'POST',
                          headers: getAuthHeader(),
                          body: JSON.stringify(newTicket)
                        });

                        if (!response.ok) throw new Error('Failed to create ticket');

                        const createdTicket = await response.json();
                        setTickets([createdTicket, ...tickets]);
                        setShowTicketModal(false);
                        setNewTicket({ subject: '', message: '' });
                        alert('Ticket created successfully!');
                      } catch (e) {
                        console.error(e);
                        alert('Failed to create ticket');
                      } finally {
                        setActionLoading(false);
                      }
                    }}
                    disabled={actionLoading}
                    className="flex-1 px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 text-sm flex items-center justify-center gap-2">
                    {actionLoading ? <Loader className="w-4 h-4 animate-spin" /> : 'Submit Ticket'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
      }

      {/* Roadmap Modal */}
      {
        showRoadmapModal && viewingRoadmapService && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl transform transition-all scale-100 opacity-100 max-h-[90vh] overflow-y-auto">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white rounded-t-2xl relative sticky top-0 z-10">
                <button
                  onClick={() => setShowRoadmapModal(false)}
                  className="absolute top-4 right-4 text-white/80 hover:text-white transition"
                >
                  <XCircle className="w-6 h-6" />
                </button>
                <h3 className="text-2xl font-bold">Service Roadmap</h3>
                <p className="text-white/80 mt-1 flex items-center gap-2">
                  <Map className="w-4 h-4" /> {viewingRoadmapService.service.name}
                </p>
              </div>

              <div className="p-8">
                {viewingRoadmapService.service.roadmap && viewingRoadmapService.service.roadmap.length > 0 ? (
                  <div className="relative">
                    {/* Vertical Line */}
                    <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200"></div>

                    <div className="space-y-8">
                      {viewingRoadmapService.service.roadmap.map((step, index) => {
                        const isCompleted = index < 2; // Mock status: assume first 2 steps done for demo
                        const isCurrent = index === 2;

                        return (
                          <div key={index} className="relative flex items-start gap-6 group">
                            {/* Step Indicator */}
                            <div className={`w-16 h-16 rounded-full flex items-center justify-center font-bold text-xl border-4 z-10 relative bg-white transition-all duration-300 
                                ${isCompleted ? 'border-green-500 text-green-600' : isCurrent ? 'border-blue-500 text-blue-600 shadow-lg scale-110' : 'border-gray-300 text-gray-400'}`}>
                              {isCompleted ? <CheckCircle className="w-8 h-8" /> : step.step}
                            </div>

                            {/* Content */}
                            <div className={`flex-1 bg-white rounded-xl p-5 border transition-all duration-300
                                ${isCurrent ? 'border-blue-200 shadow-md ring-1 ring-blue-100' : 'border-gray-200 hover:border-gray-300'}`}>
                              <div className="flex justify-between items-start mb-2">
                                <h4 className={`text-lg font-bold ${isCompleted ? 'text-green-800' : isCurrent ? 'text-blue-800' : 'text-gray-700'}`}>
                                  {step.title}
                                </h4>
                                <span className={`text-xs px-2 py-1 rounded-full font-medium
                                    ${isCompleted ? 'bg-green-100 text-green-700' : isCurrent ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500'}`}>
                                  {isCompleted ? 'Completed' : isCurrent ? 'In Progress' : 'Pending'}
                                </span>
                              </div>
                              <p className="text-gray-600">{step.description}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                      <Map className="w-10 h-10 text-gray-400" />
                    </div>
                    <h4 className="text-lg font-bold text-gray-800">No Roadmap Available</h4>
                    <p className="text-gray-500">A detailed roadmap for this service is being prepared.</p>
                  </div>
                )}
              </div>

              <div className="p-6 bg-gray-50 border-t border-gray-200 rounded-b-2xl">
                <button
                  onClick={() => setShowRoadmapModal(false)}
                  className="w-full py-3 bg-white border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-100 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )
      }

      {/* Upload Loading Overlay */}
      {
        uploadingFile && (
          <div className="fixed bottom-6 right-6 bg-white rounded-xl shadow-2xl p-4 border border-gray-200 z-50 animate-bounce-in">
            <div className="flex items-center gap-3">
              <Loader className="w-6 h-6 animate-spin text-primary" />
              <div>
                <p className="text-sm font-bold text-gray-900">Uploading Document...</p>
                <p className="text-xs text-gray-500">Please do not close this window</p>
              </div>
            </div>
          </div>
        )
      }
    </div>
  );
};

// Missing Icon Component
function Shield({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
    </svg>
  );
}
