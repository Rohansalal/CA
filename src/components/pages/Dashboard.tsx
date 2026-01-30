import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  LogOut, Plus, ShoppingCart, FileText, TicketIcon, Settings, User,
  Upload, CreditCard, CheckCircle, Clock, XCircle, Download, Eye,
  AlertCircle, TrendingUp, Package, Loader
} from 'lucide-react';

// API Configuration
const API_URL = 'http://localhost:5000/api';

interface Service {
  id: number;
  name: string;
  description: string;
  price: string | number; // Backend sends Decimal as string or number
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
}

interface PaymentOrder {
  id: string;
  amount: number;
  currency: string;
}

export const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Data State
  const [services, setServices] = useState<Service[]>([]);
  const [userServices, setUserServices] = useState<UserService[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);

  // UI State
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'services' | 'documents' | 'tickets'>('dashboard');
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    // Check if redirected from service page with a selection
    if (location.state?.selectedService && services.length > 0) {
      // Find the service object if name matches
      const initialService = services.find(s => s.name.includes(location.state.selectedService));
      if (initialService) {
        handlePurchaseService(initialService);
      }
      setActiveTab('services');
    }

    fetchData();
  }, [user, navigate]);

  const getAuthHeader = () => {
    const token = localStorage.getItem('authToken');
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
  };

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const headers = getAuthHeader();

      // Parallel fetching
      const [servicesRes, userServicesRes, docsRes] = await Promise.all([
        fetch(`${API_URL}/services`, { headers }),            // Public/Auth
        fetch(`${API_URL}/services/my-services`, { headers }), // Protected
        fetch(`${API_URL}/documents`, { headers })             // Protected
      ]);

      if (servicesRes.ok) setServices(await servicesRes.json());
      if (userServicesRes.ok) setUserServices(await userServicesRes.json());
      if (docsRes.ok) setDocuments(await docsRes.json());

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

  // Full Payment Flow: Select -> Create Order -> Verify (Mock/Real)
  const handlePayment = async () => {
    if (!selectedService) return;
    setActionLoading(true);

    try {
      const headers = getAuthHeader();

      // 1. Select Service (Create UserService record)
      const selectRes = await fetch(`${API_URL}/services/select`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ serviceId: selectedService.id })
      });

      if (!selectRes.ok) throw new Error('Failed to select service');
      const { userService } = await selectRes.json();

      // 2. Create Payment Order
      const orderRes = await fetch(`${API_URL}/payments/create-order`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ userServiceId: userService.id })
      });

      if (!orderRes.ok) throw new Error('Failed to initiate payment');
      const orderData = await orderRes.json();

      // 3. Open Razorpay Checkout
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_S8VGOfGXpXIMJV', // Use env variable
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Professional CA Services',
        description: selectedService.name,
        order_id: orderData.id,
        handler: async function (response: any) {
          try {
            // 4. Verify Payment on Backend
            const verifyRes = await fetch(`${API_URL}/payments/verify`, {
              method: 'POST',
              headers: getAuthHeader(), // Need to re-call to ensure fresh token if needed, or reuse headers variable
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                userServiceId: userService.id
              })
            });

            if (!verifyRes.ok) throw new Error('Payment verification failed');

            // Success!
            setShowPaymentModal(false);
            alert('Payment successful! Your service is now active.');

            // Refresh data
            fetchData();
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
            setShowPaymentModal(false); // If you had a loading state for the modal, reset it here
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

    } catch (err: any) {
      console.error(err);
      alert(err.message || 'Payment process failed');
      setActionLoading(false);
    }
    // Note: finally block removed or modified because async flow continues in handler
  };


  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>, userServiceId: number) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validation
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
          'Authorization': `Bearer ${token}`, // Content-Type is auto-set for FormData
        },
        body: formData
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || 'Upload failed');
      }

      alert('Document uploaded successfully!');
      fetchData(); // Refresh list

    } catch (err: any) {
      console.error(err);
      alert(err.message || 'Failed to upload document');
    } finally {
      setUploadingFile(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'COMPLETED':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'PENDING_PAYMENT':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
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
      {/* Header */}
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
              <button onClick={() => navigate('/profile')} className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition" title="Profile">
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

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-lg mb-8 overflow-hidden border border-gray-200 sticky top-24 z-20">
          <div className="flex border-b border-gray-200 overflow-x-auto">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
              { id: 'services', label: 'Browse Services', icon: ShoppingCart },
              { id: 'documents', label: 'Documents', icon: FileText },
              { id: 'tickets', label: 'Support', icon: TicketIcon },
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

          {/* Tab Content */}
          <div className="p-8">
            {/* Dashboard Tab */}
            {activeTab === 'dashboard' && (
              <div className="space-y-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-100 text-sm font-medium">Active Services</p>
                        <p className="text-4xl font-bold mt-2">
                          {userServices.filter((s) => s.status === 'ACTIVE').length}
                        </p>
                      </div>
                      <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                        <ShoppingCart className="w-8 h-8 text-white" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-green-100 text-sm font-medium">Completed</p>
                        <p className="text-4xl font-bold mt-2">
                          {userServices.filter((s) => s.status === 'COMPLETED').length}
                        </p>
                      </div>
                      <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                        <CheckCircle className="w-8 h-8 text-white" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-purple-100 text-sm font-medium">Total Services</p>
                        <p className="text-4xl font-bold mt-2">{userServices.length}</p>
                      </div>
                      <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                        <Package className="w-8 h-8 text-white" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white shadow-lg">
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

                {/* Recent Services */}
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

                              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                                {userService.status === 'PENDING_PAYMENT' && (
                                  <button
                                    onClick={() => {
                                      // Identify original service object
                                      const originalService = services.find(s => s.id === userService.serviceId);
                                      // Handle re-payment attempt if implementation allows or just navigation
                                      if (originalService) handlePurchaseService(originalService);
                                      else alert("Please contact support to complete this payment manually.");
                                    }}
                                    className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition text-sm font-medium flex items-center justify-center gap-2 shadow-sm"
                                  >
                                    <CreditCard className="w-4 h-4" />
                                    Complete Payment
                                  </button>
                                )}

                                <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition text-sm font-medium flex items-center justify-center gap-2 shadow-sm">
                                  <Eye className="w-4 h-4" />
                                  Details
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

            {/* Services Tab */}
            {activeTab === 'services' && (
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Available Services</h3>
                    <p className="text-sm text-gray-600 mt-1">Professional CA services for your business</p>
                  </div>
                  <div className="px-4 py-2 bg-blue-50 text-primary rounded-full text-sm font-semibold self-start md:self-auto">
                    {services.length} Services Available
                  </div>
                </div>

                {services.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service) => (
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
                    ))}
                  </div>
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

            {/* Documents Tab */}
            {activeTab === 'documents' && (
              <div>
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">My Documents</h3>
                  <p className="text-gray-600">Securely stored documents for your applications</p>
                </div>

                {documents.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {documents.map((doc) => (
                      <div
                        key={doc.id}
                        className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-lg transition relative group"
                      >
                        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition">
                          <button className="p-1 hover:bg-gray-100 rounded text-gray-500"><Settings className="w-4 h-4" /></button>
                        </div>

                        <div className="flex items-center gap-4 mb-4">
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
                    <p className="text-gray-600 mb-6">Documents you upload for services will appear here</p>
                    <p className="text-sm text-gray-400">Go to Dashboard to upload documents for active services</p>
                  </div>
                )}
              </div>
            )}

            {/* Support Tickets Tab */}
            {activeTab === 'tickets' && (
              <div className="text-center py-16 bg-gray-50 rounded-xl border border-gray-200">
                <TicketIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Support Center</h3>
                <p className="text-gray-600 mb-6">Need help with a service? Raise a ticket here.</p>
                <button className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition font-medium flex items-center mx-auto gap-2">
                  <Plus className="w-5 h-5" />
                  Create Support Ticket
                </button>
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

              <div className="flex gap-3">
                <button
                  onClick={() => setShowPaymentModal(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePayment}
                  disabled={actionLoading}
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
              <p className="text-center text-xs text-gray-400 mt-4">
                Powered by Razorpay Secure Payments
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Upload Loading Overlay */}
      {uploadingFile && (
        <div className="fixed bottom-6 right-6 bg-white rounded-xl shadow-2xl p-4 border border-gray-200 z-50 animate-bounce-in">
          <div className="flex items-center gap-3">
            <Loader className="w-6 h-6 animate-spin text-primary" />
            <div>
              <p className="text-sm font-bold text-gray-900">Uploading Document...</p>
              <p className="text-xs text-gray-500">Please do not close this window</p>
            </div>
          </div>
        </div>
      )}
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
